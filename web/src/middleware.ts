import { NextRequest, NextResponse } from "next/server";
import { verifyAccessToken, verifyRefreshToken } from "@/lib/auth";
import { checkRateLimit } from "@/lib/rate-limit";

const PROTECTED_ROUTES = ["/dashboard"];
const AUTH_ROUTES = ["/login", "/signup"];
const PROTECTED_API_ROUTES = [
  "/api/users",
  "/api/drops",
  "/api/settlements",
];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isApiRoute = pathname.startsWith("/api/");

  // Rate limiting for API routes
  if (isApiRoute) {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const { allowed, remaining, resetAt } = checkRateLimit(ip);

    if (!allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": "100",
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": String(Math.ceil(resetAt / 1000)),
            "Retry-After": String(Math.ceil((resetAt - Date.now()) / 1000)),
          },
        }
      );
    }

    // Add rate limit headers to successful responses
    const response = NextResponse.next();
    response.headers.set("X-RateLimit-Limit", "100");
    response.headers.set("X-RateLimit-Remaining", String(remaining));
    response.headers.set("X-RateLimit-Reset", String(Math.ceil(resetAt / 1000)));

    // Continue with auth checks if needed
    const isProtectedApi = PROTECTED_API_ROUTES.some((route) =>
      pathname.startsWith(route)
    );

    if (isProtectedApi) {
      const accessToken = req.cookies.get("access_token")?.value;
      const refreshToken = req.cookies.get("refresh_token")?.value;
      let isAuthenticated = false;
      if (accessToken) {
        const payload = verifyAccessToken(accessToken);
        if (payload) isAuthenticated = true;
      }
      if (!isAuthenticated && refreshToken) {
        const payload = verifyRefreshToken(refreshToken);
        if (payload) isAuthenticated = true;
      }
      if (!isAuthenticated) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    return response;
  }

  // Check if route is protected page
  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

  // Get tokens from cookies
  const accessToken = req.cookies.get("access_token")?.value;
  const refreshToken = req.cookies.get("refresh_token")?.value;

  // Check authentication
  let isAuthenticated = false;
  if (accessToken) {
    const payload = verifyAccessToken(accessToken);
    if (payload) isAuthenticated = true;
  }
  if (!isAuthenticated && refreshToken) {
    const payload = verifyRefreshToken(refreshToken);
    if (payload) isAuthenticated = true;
  }

  // Redirect unauthenticated users away from protected routes
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users away from auth routes
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/login",
    "/signup",
    "/api/users/:path*",
    "/api/drops/:path*",
    "/api/settlements/:path*",
    "/api/auth/:path*",
    "/api/platform/:path*",
  ],
};
