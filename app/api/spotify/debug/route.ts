import { NextResponse } from "next/server"

export async function GET() {
  // Check environment variables (don't expose actual values in production)
  const envStatus = {
    SPOTIFY_CLIENT_ID: !!process.env.SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET: !!process.env.SPOTIFY_CLIENT_SECRET,
    SPOTIFY_REDIRECT_URI: !!process.env.SPOTIFY_REDIRECT_URI,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || "Not set",
  }

  // Return environment variable status
  return NextResponse.json({
    message: "Spotify API debug information",
    environment: envStatus,
    nodeEnv: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  })
}
