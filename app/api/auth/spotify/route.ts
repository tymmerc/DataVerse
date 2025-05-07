import { NextResponse } from "next/server"

// Spotify OAuth configuration
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID || "your-client-id"
const REDIRECT_URI = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/auth/spotify/callback`
const SCOPE = "user-read-private user-read-email user-top-read user-read-recently-played"

export async function GET() {
  // Generate a random state value for security
  const state = Math.random().toString(36).substring(2, 15)

  // Store the state in a cookie for verification later
  const response = NextResponse.redirect(
    `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(
      REDIRECT_URI,
    )}&scope=${encodeURIComponent(SCOPE)}&state=${state}`,
  )

  // Set the state as a cookie
  response.cookies.set("spotify_auth_state", state, {
    maxAge: 60 * 10, // 10 minutes
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  })

  return response
}
