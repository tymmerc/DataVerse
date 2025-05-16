import { NextResponse } from "next/server"
import { getPlayerRecentStats } from "@/lib/league-mock"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const summonerName = searchParams.get("summonerName")

  // Debug information
  console.log("API Route called with summonerName:", summonerName)
  console.log("RIOT_API_KEY available:", !!process.env.RIOT_API_KEY)

  if (!summonerName) {
    return NextResponse.json({ error: "Summoner name is required" }, { status: 400 })
  }

  if (!process.env.RIOT_API_KEY) {
    return NextResponse.json(
      {
        error: "Riot API key is not configured",
        envVars: {
          hasRiotKey: !!process.env.RIOT_API_KEY,
          nodeEnv: process.env.NODE_ENV,
        },
      },
      { status: 500 },
    )
  }

  try {
    const playerStats = await getPlayerRecentStats(summonerName)
    return NextResponse.json(playerStats)
  } catch (error) {
    console.error("Error fetching League of Legends data:", error)

    // More specific error messages with debugging info
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred"

    if (errorMessage.includes("403")) {
      return NextResponse.json(
        {
          error: "API key invalid or expired",
          details: errorMessage,
        },
        { status: 403 },
      )
    }

    if (errorMessage.includes("404")) {
      return NextResponse.json(
        {
          error: `Summoner "${summonerName}" not found`,
          details: errorMessage,
        },
        { status: 404 },
      )
    }

    if (errorMessage.includes("429")) {
      return NextResponse.json(
        {
          error: "Rate limit exceeded. Try again later",
          details: errorMessage,
        },
        { status: 429 },
      )
    }

    return NextResponse.json(
      {
        error: errorMessage,
        details: String(error),
      },
      { status: 500 },
    )
  }
}
