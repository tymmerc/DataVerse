import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { region, summonerName } = await request.json()

    if (!region || !summonerName) {
      return NextResponse.json({ error: "Region and summoner name are required" }, { status: 400 })
    }

    // In a real app, you would validate the summoner name with the Riot API
    // For this demo, we'll simulate a successful validation

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Return success response
    return NextResponse.json({
      success: true,
      data: {
        region,
        summonerName,
        verified: true,
        // In a real app, you would include more data from the Riot API
        accountId: `MOCK_${Math.random().toString(36).substring(2, 15)}`,
      },
    })
  } catch (error) {
    console.error("League authentication error:", error)
    return NextResponse.json({ error: "Failed to authenticate with League of Legends" }, { status: 500 })
  }
}
