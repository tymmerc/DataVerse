// League of Legends API client

const RIOT_API_KEY = process.env.RIOT_API_KEY
// Log whether the API key is available (remove this in production)
console.log("Riot API Key available:", !!RIOT_API_KEY)
const REGION = "euw1" // Change this to your region if needed
const BASE_URL = `https://${REGION}.api.riotgames.com/lol`

// Types for League of Legends API responses
export interface SummonerData {
  id: string
  accountId: string
  puuid: string
  name: string
  profileIconId: number
  revisionDate: number
  summonerLevel: number
}

export interface LeagueEntry {
  leagueId: string
  summonerId: string
  summonerName: string
  queueType: string
  tier: string
  rank: string
  leaguePoints: number
  wins: number
  losses: number
  hotStreak: boolean
  veteran: boolean
  freshBlood: boolean
  inactive: boolean
}

export interface MatchSummary {
  metadata: {
    matchId: string
    participants: string[]
  }
  info: {
    gameCreation: number
    gameDuration: number
    gameId: number
    gameMode: string
    gameName: string
    gameType: string
    gameVersion: string
    mapId: number
    participants: MatchParticipant[]
    platformId: string
    queueId: number
    teams: any[]
  }
}

export interface MatchParticipant {
  assists: number
  baronKills: number
  bountyLevel: number
  champExperience: number
  champLevel: number
  championId: number
  championName: string
  deaths: number
  doubleKills: number
  firstBloodKill: boolean
  goldEarned: number
  goldSpent: number
  individualPosition: string
  kills: number
  lane: string
  neutralMinionsKilled?: number
  pentaKills: number
  quadraKills: number
  role: string
  summonerName?: string
  teamId: number
  teamPosition: string
  timeCCingOthers: number
  totalDamageDealt: number
  totalDamageDealtToChampions: number
  totalDamageTaken: number
  totalHeal: number
  totalMinionsKilled: number
  tripleKills: number
  trueDamageDealt: number
  trueDamageDealtToChampions: number
  trueDamageTaken: number
  visionScore: number
  wardsKilled: number
  wardsPlaced: number
  win: boolean
}

export interface ChampionMastery {
  championId: number
  championLevel: number
  championPoints: number
  lastPlayTime: number
  championPointsSinceLastLevel: number
  championPointsUntilNextLevel: number
  chestGranted: boolean
  tokensEarned: number
  summonerId: string
}

// Champion data mapping (simplified)
export const championIdToName: Record<number, string> = {
  1: "Annie",
  2: "Olaf",
  3: "Galio",
  4: "Twisted Fate",
  5: "Xin Zhao",
  // Add more as needed or fetch from Data Dragon
}

// API functions
export async function getSummonerByName(summonerName: string): Promise<SummonerData> {
  const url = `${BASE_URL}/summoner/v4/summoners/by-name/${encodeURIComponent(summonerName)}`

  const response = await fetch(url, {
    headers: {
      "X-Riot-Token": RIOT_API_KEY || "",
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch summoner data: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

export async function getLeagueEntries(summonerId: string): Promise<LeagueEntry[]> {
  const url = `${BASE_URL}/league/v4/entries/by-summoner/${summonerId}`

  const response = await fetch(url, {
    headers: {
      "X-Riot-Token": RIOT_API_KEY || "",
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch league entries: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

export async function getMatchIdsByPuuid(puuid: string, count = 10): Promise<string[]> {
  const url = `https://${REGION}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?count=${count}`

  const response = await fetch(url, {
    headers: {
      "X-Riot-Token": RIOT_API_KEY || "",
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch match IDs: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

export async function getMatchById(matchId: string): Promise<MatchSummary> {
  const url = `https://${REGION}.api.riotgames.com/lol/match/v5/matches/${matchId}`

  const response = await fetch(url, {
    headers: {
      "X-Riot-Token": RIOT_API_KEY || "",
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch match data: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

export async function getChampionMasteries(summonerId: string): Promise<ChampionMastery[]> {
  const url = `${BASE_URL}/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}`

  const response = await fetch(url, {
    headers: {
      "X-Riot-Token": RIOT_API_KEY || "",
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch champion masteries: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

// Helper function to get player stats from recent matches
export async function getPlayerRecentStats(summonerName: string): Promise<{
  summoner: SummonerData
  leagueEntries: LeagueEntry[]
  recentMatches: MatchSummary[]
  championMasteries: ChampionMastery[]
}> {
  try {
    // Get summoner data
    const summoner = await getSummonerByName(summonerName)

    // Get league entries
    const leagueEntries = await getLeagueEntries(summoner.id)

    // Get recent match IDs
    const matchIds = await getMatchIdsByPuuid(summoner.puuid, 5)

    // Get match details
    const matchPromises = matchIds.map((id) => getMatchById(id))
    const recentMatches = await Promise.all(matchPromises)

    // Get champion masteries
    const championMasteries = await getChampionMasteries(summoner.id)

    return {
      summoner,
      leagueEntries,
      recentMatches,
      championMasteries,
    }
  } catch (error) {
    console.error("Error fetching player stats:", error)
    throw error
  }
}
