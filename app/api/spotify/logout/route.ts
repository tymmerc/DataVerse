import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET() {
  const cookieStore = await cookies()

  // Clear Spotify cookies
  cookieStore.delete("spotify_access_token")
  cookieStore.delete("spotify_refresh_token")

  return NextResponse.json({ success: true })
}
