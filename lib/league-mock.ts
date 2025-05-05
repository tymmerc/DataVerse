// This file contains mock data for League of Legends
// In a real application, you would replace this with actual API calls

export interface PlayerInfo {
  summonerName: string
  region: string
  level: number
  rank: string
  lp: number
  winRate: number
  profileIcon: string
}

export interface Champion {
  name: string
  games: number
  winRate: number
  kda: string
  image: string
}

export interface Match {
  champion: string
  result: "Victory" | "Defeat"
  kda: string
  cs: number
  duration: string
  date: string
  image: string
}

export interface RankHistory {
  month: string
  lp: number
}

export interface RolePerformance {
  role: string
  value: number
}

// Function to simulate fetching player info
export async function getPlayerInfo(summonerName = "ProGamer123"): Promise<PlayerInfo> {
  // In a real app, this would be an API call like:
  // const response = await fetch(`https://your-api-gateway.com/lol/summoner/v4/summoners/by-name/${summonerName}`, {
  //   headers: {
  //     'X-Riot-Token': process.env.RIOT_API_KEY
  //   }
  // });
  // const data = await response.json();
  // Then fetch rank info with another call using the summoner ID

  // Mock data
  return {
    summonerName: "ProGamer123",
    region: "NA",
    level: 187,
    rank: "Platinum II",
    lp: 75,
    winRate: 58,
    profileIcon: "/placeholder.svg?height=100&width=100",
  }
}

// Function to simulate fetching top champions
export async function getTopChampions(): Promise<Champion[]> {
  // Mock data
  return [
    { name: "Yasuo", games: 152, winRate: 62, kda: "8.2/4.5/6.3", image: "/placeholder.svg?height=60&width=60" },
    { name: "Lee Sin", games: 98, winRate: 57, kda: "6.8/3.9/9.2", image: "/placeholder.svg?height=60&width=60" },
    { name: "Ahri", games: 87, winRate: 65, kda: "7.5/3.2/8.7", image: "/placeholder.svg?height=60&width=60" },
    { name: "Thresh", games: 76, winRate: 59, kda: "2.1/4.3/15.6", image: "/placeholder.svg?height=60&width=60" },
    { name: "Jinx", games: 68, winRate: 53, kda: "9.3/5.1/7.2", image: "/placeholder.svg?height=60&width=60" },
  ]
}

// Function to simulate fetching recent matches
export async function getRecentMatches(): Promise<Match[]> {
  // Mock data
  return [
    {
      champion: "Yasuo",
      result: "Victory",
      kda: "12/3/8",
      cs: 245,
      duration: "32:15",
      date: "Today",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      champion: "Lee Sin",
      result: "Defeat",
      kda: "5/7/12",
      cs: 178,
      duration: "28:42",
      date: "Today",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      champion: "Ahri",
      result: "Victory",
      kda: "9/2/11",
      cs: 213,
      duration: "35:08",
      date: "Yesterday",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      champion: "Yasuo",
      result: "Victory",
      kda: "15/5/7",
      cs: 267,
      duration: "38:21",
      date: "Yesterday",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      champion: "Thresh",
      result: "Defeat",
      kda: "1/6/22",
      cs: 45,
      duration: "25:36",
      date: "2 days ago",
      image: "/placeholder.svg?height=60&width=60",
    },
  ]
}

// Function to simulate fetching rank history
export async function getRankHistory(): Promise<RankHistory[]> {
  // Mock data
  return [
    { month: "Jan", lp: 45 },
    { month: "Feb", lp: 52 },
    { month: "Mar", lp: 48 },
    { month: "Apr", lp: 61 },
    { month: "May", lp: 57 },
    { month: "Jun", lp: 65 },
    { month: "Jul", lp: 75 },
  ]
}

// Function to simulate fetching role performance
export async function getRolePerformance(): Promise<RolePerformance[]> {
  // Mock data
  return [
    { role: "Top", value: 65 },
    { role: "Jungle", value: 80 },
    { role: "Mid", value: 90 },
    { role: "ADC", value: 70 },
    { role: "Support", value: 60 },
  ]
}
