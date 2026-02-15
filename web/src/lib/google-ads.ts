import { db } from "@/lib/db";
import { decrypt, encrypt } from "@/lib/encryption";

const TOKEN_URL = "https://oauth2.googleapis.com/token";

/**
 * Refresh a Google Ads OAuth access token.
 */
export async function refreshGoogleAdsToken(adsAccount: {
  id: string;
  refreshToken: string;
}): Promise<string> {
  const refreshToken = decrypt(adsAccount.refreshToken);

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_ADS_CLIENT_ID!,
      client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET!,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  });

  if (!res.ok) {
    throw new Error(`Google Ads token refresh failed: ${await res.text()}`);
  }

  const data = await res.json();

  await db.googleAdsAccount.update({
    where: { id: adsAccount.id },
    data: { accessToken: encrypt(data.access_token) },
  });

  return data.access_token;
}

/**
 * Create a YouTube ad campaign via Google Ads API.
 * In production, this would use the Google Ads API to create campaigns.
 * For now, this is a stub that records the deployment.
 */
export async function createAdCampaign(params: {
  dropId: string;
  accessToken: string;
  customerId: string;
  videoId: string;
  budget: number;
  adType: "pre_roll" | "discovery" | "shorts";
}): Promise<{
  spend: number;
  impressions: number;
  views: number;
  ctr: number;
  invoiceRef: string;
}> {
  // TODO: Implement actual Google Ads API campaign creation
  // For now, return a stub response
  // In production: POST to Google Ads API v17 with campaign, ad group, and ad

  console.log(
    `[Google Ads] Would create ${params.adType} campaign for video ${params.videoId} with budget ${params.budget}`
  );

  return {
    spend: params.budget,
    impressions: 0,
    views: 0,
    ctr: 0,
    invoiceRef: `INV-${Date.now().toString(36).toUpperCase()}`,
  };
}

/**
 * Pull campaign performance data from Google Ads.
 * Stub implementation — in production, queries Google Ads Reporting API.
 */
export async function pullAdReceipts(params: {
  accessToken: string;
  customerId: string;
  campaignId: string;
}): Promise<{
  spend: number;
  impressions: number;
  views: number;
  ctr: number;
}> {
  // TODO: Implement actual Google Ads Reporting API query
  console.log(
    `[Google Ads] Would pull receipts for campaign ${params.campaignId}`
  );

  return {
    spend: 0,
    impressions: 0,
    views: 0,
    ctr: 0,
  };
}
