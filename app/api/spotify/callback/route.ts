import { NextResponse } from "next/server"
import { getSpotifyToken } from "@/lib/spotify-mock"
import { cookies } from "next/headers"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get("code")
  const error = searchParams.get("error")

  if (error) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/spotify?error=${error}`)
  }

  if (!code) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/spotify?error=missing_code`)
  }

  try {
    const tokenData = await getSpotifyToken(code)

    // Store tokens in cookies (httpOnly for security)
    const cookieStore = await cookies()
    cookieStore.set("spotify_access_token", tokenData.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: tokenData.expires_in,
      path: "/",
    })

    if (tokenData.refresh_token) {
      cookieStore.set("spotify_refresh_token", tokenData.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: "/",
      })
    }

    // Redirect back to the Spotify page
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/spotify?success=true`)
  } catch (error) {
    console.error("Error in Spotify callback:", error)
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/spotify?error=token_error`)
  }
}
