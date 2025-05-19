import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import {
  getSpotifyUserData,
  refreshSpotifyToken,
  getMySpotifyData,
  type SpotifyTimeRange,
  timeRanges,
} from "@/lib/spotify-mock"

export async function GET(request: Request) {
  try {
    console.log("Spotify data API route called")

    const { searchParams } = new URL(request.url)
    const timeRangeParam = searchParams.get("timeRange") || "medium_term"

    // Find the time range object that matches the parameter
    const timeRange = timeRanges.find((range) => range.value === timeRangeParam) || timeRanges[1]

    console.log("Time range:", timeRange.value)

    const cookieStore = await cookies()
    const accessToken = cookieStore.get("spotify_access_token")?.value
    const refreshToken = cookieStore.get("spotify_refresh_token")?.value

    console.log("Tokens available:", {
      accessToken: !!accessToken,
      refreshToken: !!refreshToken,
    })

    // If no tokens, return the owner's data
    if (!accessToken && !refreshToken) {
      console.log("No tokens available, fetching owner data")
      try {
        const ownerData = await getMySpotifyData()
        return NextResponse.json(ownerData)
      } catch (error) {
        console.error("Error fetching owner Spotify data:", error)
        return NextResponse.json(
          {
            error: "Failed to fetch Spotify data",
            details: error instanceof Error ? error.message : String(error),
          },
          { status: 500 },
        )
      }
    }

    try {
      // If we have an access token, try to use it
      if (accessToken) {
        console.log("Using access token to fetch data")
        try {
          const userData = await getSpotifyUserData(accessToken, timeRange as SpotifyTimeRange)
          return NextResponse.json(userData)
        } catch (error) {
          console.error("Error using access token:", error)

          // If the error is due to an expired token and we have a refresh token, try refreshing
          if (refreshToken) {
            console.log("Refreshing token")
            const newTokenData = await refreshSpotifyToken(refreshToken)

            // Update the access token cookie
            const cookieStore = await cookies()
            cookieStore.set("spotify_access_token", newTokenData.access_token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              maxAge: newTokenData.expires_in,
              path: "/",
            })

            // If we got a new refresh token, update that too
            if (newTokenData.refresh_token) {
              cookieStore.set("spotify_refresh_token", newTokenData.refresh_token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 30 * 24 * 60 * 60, // 30 days
                path: "/",
              })
            }

            // Try again with the new token
            console.log("Trying again with new token")
            const userData = await getSpotifyUserData(newTokenData.access_token, timeRange as SpotifyTimeRange)
            return NextResponse.json(userData)
          } else {
            // If we don't have a refresh token, fall back to owner data
            console.log("No refresh token, falling back to owner data")
            const ownerData = await getMySpotifyData()
            return NextResponse.json(ownerData)
          }
        }
      } else if (refreshToken) {
        // If we only have a refresh token, try to get a new access token
        console.log("Using refresh token to get new access token")
        const newTokenData = await refreshSpotifyToken(refreshToken)

        // Update the access token cookie
        const cookieStore = await cookies()
        cookieStore.set("spotify_access_token", newTokenData.access_token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: newTokenData.expires_in,
          path: "/",
        })

        // If we got a new refresh token, update that too
        if (newTokenData.refresh_token) {
          cookieStore.set("spotify_refresh_token", newTokenData.refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 30 * 24 * 60 * 60, // 30 days
            path: "/",
          })
        }

        // Try with the new token
        console.log("Trying with new token from refresh")
        const userData = await getSpotifyUserData(newTokenData.access_token, timeRange as SpotifyTimeRange)
        return NextResponse.json(userData)
      }
    } catch (error) {
      console.error("Error in token handling:", error)

      // If all else fails, return the owner's data
      console.log("Error occurred, falling back to owner data")
      try {
        const ownerData = await getMySpotifyData()
        return NextResponse.json(ownerData)
      } catch (ownerError) {
        console.error("Error fetching owner Spotify data as fallback:", ownerError)
        return NextResponse.json(
          {
            error: "Failed to fetch Spotify data",
            details: ownerError instanceof Error ? ownerError.message : String(ownerError),
          },
          { status: 500 },
        )
      }
    }

    // If we somehow get here without returning, return a fallback error
    return NextResponse.json({ error: "Unknown error in Spotify data API" }, { status: 500 })
  } catch (error) {
    // Catch-all error handler
    console.error("Unhandled error in Spotify data API:", error)
    return NextResponse.json(
      {
        error: "Unhandled error in Spotify data API",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
