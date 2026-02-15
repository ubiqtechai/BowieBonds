import { NextResponse } from "next/server";
import { getAuthFromCookies } from "@/lib/auth";

const YOUTUBE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const SCOPES = [
  "https://www.googleapis.com/auth/youtube.readonly",
  "https://www.googleapis.com/auth/yt-analytics.readonly",
].join(" ");

export async function GET() {
  try {
    const auth = await getAuthFromCookies();
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (auth.role !== "artist") {
      return NextResponse.json(
        { error: "Only artistes can connect YouTube" },
        { status: 403 }
      );
    }

    const params = new URLSearchParams({
      client_id: process.env.YOUTUBE_CLIENT_ID!,
      redirect_uri: process.env.YOUTUBE_REDIRECT_URI!,
      response_type: "code",
      scope: SCOPES,
      access_type: "offline",
      prompt: "consent",
      state: auth.userId,
    });

    return NextResponse.redirect(`${YOUTUBE_AUTH_URL}?${params.toString()}`);
  } catch (error) {
    console.error("YouTube connect error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
