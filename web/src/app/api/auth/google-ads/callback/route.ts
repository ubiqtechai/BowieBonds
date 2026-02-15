import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { encrypt } from "@/lib/encryption";

const TOKEN_URL = "https://oauth2.googleapis.com/token";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");
    const state = searchParams.get("state"); // userId
    const error = searchParams.get("error");

    if (error) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?error=google_ads_denied`
      );
    }

    if (!code || !state) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?error=google_ads_missing_params`
      );
    }

    // Exchange code for tokens
    const tokenRes = await fetch(TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_ADS_CLIENT_ID!,
        client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET!,
        redirect_uri: process.env.GOOGLE_ADS_REDIRECT_URI!,
        grant_type: "authorization_code",
      }),
    });

    if (!tokenRes.ok) {
      console.error("Google Ads token exchange failed:", await tokenRes.text());
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?error=google_ads_token_failed`
      );
    }

    const tokens = await tokenRes.json();

    // Encrypt tokens before storing
    const encryptedAccess = encrypt(tokens.access_token);
    const encryptedRefresh = encrypt(tokens.refresh_token || "");

    // Upsert Google Ads account record
    // Note: customerId would normally come from the Google Ads API
    // For now, store with a placeholder until the customer ID is retrieved
    await db.googleAdsAccount.upsert({
      where: { userId: state },
      create: {
        userId: state,
        customerId: "pending",
        accessToken: encryptedAccess,
        refreshToken: encryptedRefresh,
        verified: true,
      },
      update: {
        accessToken: encryptedAccess,
        refreshToken: encryptedRefresh,
        verified: true,
      },
    });

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?google_ads=connected`
    );
  } catch (error) {
    console.error("Google Ads callback error:", error);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?error=google_ads_callback_failed`
    );
  }
}
