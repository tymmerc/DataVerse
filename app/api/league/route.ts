import { NextResponse } from "next/server"
import { getPlayerInfo, getTopChampions, getRecentMatches, getRankHistory, getRolePerformance } from "@/lib/league-mock"

// This is a mock API route that simulates fetching data from the Riot Games API
// In a real application, you would use the Riot Games API with proper authentication

export async function GET(request: Request) {
  // Get the data type from the URL
  const { searchParams } = new URL(request.url)
  const dataType = searchParams.get("type")
  const summonerName = searchParams.get("summoner") || "ProGamer123"

  try {
    let data

    // Return different mock data based on the requested type
    switch (dataType) {
      case "player-info":
        data = await getPlayerInfo(summonerName)
        break
      case "top-champions":
        data = await getTopChampions()
        break
      case "recent-matches":
        data = await getRecentMatches()
        break
      case "rank-history":
        data = await getRankHistory()
        break
      case "role-performance":
        data = await getRolePerformance()
        break
      default:
        return NextResponse.json({ error: "Invalid data type" }, { status: 400 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching League of Legends data:", error)
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 })
  }
}

// In a real application, you would need to implement proper API key handling
// Here's a simplified example of what a real Riot API call might look like:

/*
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const summonerName = searchParams.get('summoner');
  const region = searchParams.get('region') || 'na1';

  if (!summonerName) {
    return NextResponse.json({ error: 'Summoner name is required' }, { status: 400 });
  }

  try {
    // Get basic summoner info
    const summonerResponse = await fetch(
      `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURIComponent(summonerName)}`,
      {
        headers: {
          'X-Riot-Token': process.env.RIOT_API_KEY!
        }
      }
    );

    if (!summonerResponse.ok) {
      throw new Error(`Riot API error: ${summonerResponse.status}`);
    }

    const summonerData = await summonerResponse.json();

    // Get rank information using the summoner ID
    const rankResponse = await fetch(
      `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerData.id}`,
      {
        headers: {
          'X-Riot-Token': process.env.RIOT_API_KEY!
        }
      }
    );

    if (!rankResponse.ok) {
      throw new Error(`Riot API error: ${rankResponse.status}`);
    }

    const rankData = await rankResponse.json();

    // Combine and return the data
    return NextResponse.json({
      summoner: summonerData,
      rank: rankData
    });
  } catch (error) {
    console.error('Error fetching from Riot API:', error);
    return NextResponse.json({ error: 'Failed to fetch data from Riot API' }, { status: 500 });
  }
}
*/
