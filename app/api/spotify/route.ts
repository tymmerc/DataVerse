import { NextResponse } from "next/server"
import { getTopTracks, getTopArtists, getRecentlyPlayed, getGenreData } from "@/lib/spotify-mock"

// This is a mock API route that simulates fetching data from Spotify
// In a real application, you would use the Spotify API with proper authentication

export async function GET(request: Request) {
  // Get the data type from the URL
  const { searchParams } = new URL(request.url)
  const dataType = searchParams.get("type")
  const timeRange = searchParams.get("time_range") || "short_term"

  try {
    let data

    // Return different mock data based on the requested type
    switch (dataType) {
      case "top-tracks":
        data = await getTopTracks(timeRange)
        break
      case "top-artists":
        data = await getTopArtists(timeRange)
        break
      case "recently-played":
        data = await getRecentlyPlayed()
        break
      case "genres":
        data = await getGenreData()
        break
      default:
        return NextResponse.json({ error: "Invalid data type" }, { status: 400 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching Spotify data:", error)
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 })
  }
}

// In a real application, you would need to implement the Spotify OAuth flow
// Here's a simplified example of what that might look like:


export async function POST(request: Request) {
  try {
    const { code } = await request.json();

    // Exchange authorization code for access token
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString('base64')}`
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI!,
      })
    });

    const tokenData = await tokenResponse.json();

    // Store tokens securely (e.g., in a cookie or database)
    // ...

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error during Spotify authentication:', error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}

