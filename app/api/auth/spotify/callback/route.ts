import { type NextRequest, NextResponse } from "next/server"

// Spotify OAuth configuration
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID || "your-client-id"
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET || "your-client-secret"
const REDIRECT_URI = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/auth/spotify/callback`

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get("code")
  const state = searchParams.get("state")
  const storedState = request.cookies.get("spotify_auth_state")?.value

  // Verify state to prevent CSRF attacks
  if (!state || state !== storedState) {
    return NextResponse.redirect(new URL("/dashboard?error=state_mismatch", request.url))
  }

  if (!code) {
    return NextResponse.redirect(new URL("/dashboard?error=no_code", request.url))
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")}`,
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT_URI,
      }),
    })

    if (!tokenResponse.ok) {
      throw new Error(`Token request failed: ${tokenResponse.status}`)
    }

    const tokenData = await tokenResponse.json()

    // In a real app, you would store these tokens securely in a database
    // For this demo, we'll store them in localStorage via a client-side script
    const response = NextResponse.redirect(new URL("/dashboard?spotify_connected=true", request.url))

    // Set tokens in cookies (not secure for production, just for demo)
    response.cookies.set("spotify_access_token", tokenData.access_token, {
      maxAge: tokenData.expires_in,
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    })

    response.cookies.set("spotify_refresh_token", tokenData.refresh_token, {
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    })

    // Also set a non-httpOnly cookie for the client to read
    response.cookies.set("spotify_connected", "true", {
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    })

    return response
  } catch (error) {
    console.error("Error exchanging code for token:", error)
    return NextResponse.redirect(new URL("/dashboard?error=token_exchange", request.url))
  }
}
