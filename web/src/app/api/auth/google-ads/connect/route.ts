import { NextResponse } from "next/server";
import { getAuthFromCookies } from "@/lib/auth";

const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const SCOPES = [
  "https://www.googleapis.com/auth/adwords",
].join(" ");

export async function GET() {
  try {
    const auth = await getAuthFromCookies();
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (auth.role !== "artist") {
      return NextResponse.json(
        { error: "Only artists can connect Google Ads" },
        { status: 403 }
      );
    }

    const params = new URLSearchParams({
      client_id: process.env.GOOGLE_ADS_CLIENT_ID!,
      redirect_uri: process.env.GOOGLE_ADS_REDIRECT_URI!,
      response_type: "code",
      scope: SCOPES,
      access_type: "offline",
      prompt: "consent",
      state: auth.userId,
    });

    return NextResponse.redirect(`${GOOGLE_AUTH_URL}?${params.toString()}`);
  } catch (error) {
    console.error("Google Ads connect error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
