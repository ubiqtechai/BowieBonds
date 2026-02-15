import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { encrypt } from "@/lib/encryption";

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const CHANNEL_URL = "https://www.googleapis.com/youtube/v3/channels";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");
    const state = searchParams.get("state"); // userId
    const error = searchParams.get("error");

    if (error) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?error=youtube_denied`
      );
    }

    if (!code || !state) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?error=youtube_missing_params`
      );
    }

    // Exchange code for tokens
    const tokenRes = await fetch(TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.YOUTUBE_CLIENT_ID!,
        client_secret: process.env.YOUTUBE_CLIENT_SECRET!,
        redirect_uri: process.env.YOUTUBE_REDIRECT_URI!,
        grant_type: "authorization_code",
      }),
    });

    if (!tokenRes.ok) {
      console.error("YouTube token exchange failed:", await tokenRes.text());
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?error=youtube_token_failed`
      );
    }

    const tokens = await tokenRes.json();

    // Pull channel stats
    const channelRes = await fetch(
      `${CHANNEL_URL}?part=snippet,statistics&mine=true`,
      {
        headers: { Authorization: `Bearer ${tokens.access_token}` },
      }
    );

    const channelData = await channelRes.json();
    const channel = channelData.items?.[0];

    if (!channel) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?error=youtube_no_channel`
      );
    }

    const stats = channel.statistics;
    const snippet = channel.snippet;
    const publishedAt = new Date(snippet.publishedAt);
    const now = new Date();
    const ageMonths =
      (now.getFullYear() - publishedAt.getFullYear()) * 12 +
      (now.getMonth() - publishedAt.getMonth());
    const channelAge =
      ageMonths >= 12
        ? `${Math.floor(ageMonths / 12)}y ${ageMonths % 12}m`
        : `${ageMonths}m`;

    // Encrypt tokens before storing
    const encryptedAccess = encrypt(tokens.access_token);
    const encryptedRefresh = encrypt(tokens.refresh_token || "");

    // Upsert YouTube channel record
    await db.youtubeChannel.upsert({
      where: { userId: state },
      create: {
        userId: state,
        channelId: channel.id,
        accessToken: encryptedAccess,
        refreshToken: encryptedRefresh,
        tokenExpires: tokens.expires_in
          ? new Date(Date.now() + tokens.expires_in * 1000)
          : null,
        subscribers: parseInt(stats.subscriberCount) || 0,
        totalViews: BigInt(stats.viewCount || "0"),
        channelAge,
        yppActive: !stats.hiddenSubscriberCount,
        verified: true,
        lastSynced: new Date(),
      },
      update: {
        channelId: channel.id,
        accessToken: encryptedAccess,
        refreshToken: encryptedRefresh,
        tokenExpires: tokens.expires_in
          ? new Date(Date.now() + tokens.expires_in * 1000)
          : null,
        subscribers: parseInt(stats.subscriberCount) || 0,
        totalViews: BigInt(stats.viewCount || "0"),
        channelAge,
        yppActive: !stats.hiddenSubscriberCount,
        verified: true,
        lastSynced: new Date(),
      },
    });

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?youtube=connected`
    );
  } catch (error) {
    console.error("YouTube callback error:", error);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?error=youtube_callback_failed`
    );
  }
}
