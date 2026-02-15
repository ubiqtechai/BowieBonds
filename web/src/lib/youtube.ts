import { db } from "@/lib/db";
import { decrypt, encrypt } from "@/lib/encryption";

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const ANALYTICS_URL = "https://youtubeanalytics.googleapis.com/v2/reports";
const CHANNELS_URL = "https://www.googleapis.com/youtube/v3/channels";

/**
 * Refresh a YouTube OAuth access token using the stored refresh token.
 */
export async function refreshYouTubeToken(channelRecord: {
  id: string;
  refreshToken: string;
}): Promise<string> {
  const refreshToken = decrypt(channelRecord.refreshToken);

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.YOUTUBE_CLIENT_ID!,
      client_secret: process.env.YOUTUBE_CLIENT_SECRET!,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`YouTube token refresh failed: ${text}`);
  }

  const data = await res.json();
  const newAccessToken = data.access_token;

  // Update stored access token
  await db.youtubeChannel.update({
    where: { id: channelRecord.id },
    data: {
      accessToken: encrypt(newAccessToken),
      tokenExpires: data.expires_in
        ? new Date(Date.now() + data.expires_in * 1000)
        : null,
    },
  });

  return newAccessToken;
}

/**
 * Get a valid access token, refreshing if expired.
 */
export async function getValidToken(channelRecord: {
  id: string;
  accessToken: string;
  refreshToken: string;
  tokenExpires: Date | null;
}): Promise<string> {
  // If token is still valid (with 5-minute buffer)
  if (
    channelRecord.tokenExpires &&
    channelRecord.tokenExpires.getTime() > Date.now() + 5 * 60 * 1000
  ) {
    return decrypt(channelRecord.accessToken);
  }

  // Refresh the token
  return refreshYouTubeToken(channelRecord);
}

/**
 * Fetch daily channel-wide revenue from YouTube Analytics API.
 * Returns array of { date, revenue } for the given date range.
 * Revenue is in the channel's currency (smallest unit — cents/paise).
 */
export async function fetchDailyRevenue(
  accessToken: string,
  startDate: string, // YYYY-MM-DD
  endDate: string    // YYYY-MM-DD
): Promise<{ date: string; revenue: number }[]> {
  const params = new URLSearchParams({
    ids: "channel==MINE",
    startDate,
    endDate,
    metrics: "estimatedRevenue",
    dimensions: "day",
    sort: "day",
  });

  const res = await fetch(`${ANALYTICS_URL}?${params.toString()}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`YouTube Analytics API failed: ${text}`);
  }

  const data = await res.json();
  const rows = data.rows || [];

  return rows.map((row: [string, number]) => ({
    date: row[0],
    revenue: Math.round(row[1] * 100), // Convert dollars to cents
  }));
}

/**
 * Fetch channel statistics (subscribers, views, etc.)
 */
export async function fetchChannelStats(accessToken: string): Promise<{
  subscribers: number;
  totalViews: bigint;
  channelAge: string;
}> {
  const res = await fetch(
    `${CHANNELS_URL}?part=snippet,statistics&mine=true`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );

  if (!res.ok) {
    throw new Error(`YouTube Channels API failed: ${await res.text()}`);
  }

  const data = await res.json();
  const channel = data.items?.[0];

  if (!channel) {
    throw new Error("No YouTube channel found");
  }

  const stats = channel.statistics;
  const publishedAt = new Date(channel.snippet.publishedAt);
  const now = new Date();
  const ageMonths =
    (now.getFullYear() - publishedAt.getFullYear()) * 12 +
    (now.getMonth() - publishedAt.getMonth());
  const channelAge =
    ageMonths >= 12
      ? `${Math.floor(ageMonths / 12)}y ${ageMonths % 12}m`
      : `${ageMonths}m`;

  return {
    subscribers: parseInt(stats.subscriberCount) || 0,
    totalViews: BigInt(stats.viewCount || "0"),
    channelAge,
  };
}
