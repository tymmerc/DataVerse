"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Info, Trophy, Sword, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
} from "recharts"

// Mock data for League of Legends stats
// In a real application, this would come from the Riot Games API
const playerInfo = {
  summonerName: "ProGamer123",
  region: "NA",
  level: 187,
  rank: "Platinum II",
  lp: 75,
  winRate: 58,
  profileIcon: "/placeholder.svg?height=100&width=100",
}

const topChampions = [
  { name: "Yasuo", games: 152, winRate: 62, kda: "8.2/4.5/6.3", image: "/placeholder.svg?height=60&width=60" },
  { name: "Lee Sin", games: 98, winRate: 57, kda: "6.8/3.9/9.2", image: "/placeholder.svg?height=60&width=60" },
  { name: "Ahri", games: 87, winRate: 65, kda: "7.5/3.2/8.7", image: "/placeholder.svg?height=60&width=60" },
  { name: "Thresh", games: 76, winRate: 59, kda: "2.1/4.3/15.6", image: "/placeholder.svg?height=60&width=60" },
  { name: "Jinx", games: 68, winRate: 53, kda: "9.3/5.1/7.2", image: "/placeholder.svg?height=60&width=60" },
]

const recentMatches = [
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

const rankHistory = [
  { month: "Jan", lp: 45 },
  { month: "Feb", lp: 52 },
  { month: "Mar", lp: 48 },
  { month: "Apr", lp: 61 },
  { month: "May", lp: 57 },
  { month: "Jun", lp: 65 },
  { month: "Jul", lp: 75 },
]

const rolePerformance = [
  { role: "Top", value: 65 },
  { role: "Jungle", value: 80 },
  { role: "Mid", value: 90 },
  { role: "ADC", value: 70 },
  { role: "Support", value: 60 },
]

export default function LeaguePage() {
  const [statType, setStatType] = useState("overview")

  return (
    <main className="min-h-screen bg-gray-950 text-gray-200">
      <div className="container mx-auto px-4 py-8">
        {/* Header with back button */}
        <div className="flex items-center mb-8">
          <Link href="/">
            <Button variant="ghost" className="mr-4 text-gray-300 hover:text-white hover:bg-gray-800">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-white">Your League of Legends Stats</h1>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="ml-2 text-gray-300 hover:text-white hover:bg-gray-800">
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-gray-800 border-gray-700 text-gray-200">
                <p className="max-w-xs">
                  This page shows mock League of Legends data. In a real application, this would be fetched from the
                  Riot Games API.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Stat type selector */}
        <div className="mb-8">
          <Tabs defaultValue="overview" onValueChange={setStatType} className="w-full">
            <TabsList className="bg-gray-800">
              <TabsTrigger value="overview" className="data-[state=active]:bg-gray-700">
                Overview
              </TabsTrigger>
              <TabsTrigger value="champions" className="data-[state=active]:bg-gray-700">
                Champions
              </TabsTrigger>
              <TabsTrigger value="matches" className="data-[state=active]:bg-gray-700">
                Match History
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Player overview section */}
        {statType === "overview" && (
          <section className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Card className="lg:col-span-1 bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Player Profile</CardTitle>
                  <CardDescription className="text-gray-400">Your summoner information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center text-center">
                    <img
                      src={playerInfo.profileIcon || "/placeholder.svg"}
                      alt="Summoner Icon"
                      className="w-24 h-24 rounded-full mb-4"
                    />
                    <h3 className="text-xl font-bold mb-1 text-white">{playerInfo.summonerName}</h3>
                    <p className="text-gray-400 mb-4">
                      {playerInfo.region} • Level {playerInfo.level}
                    </p>

                    <div className="w-full mb-4">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium text-gray-300">{playerInfo.rank}</span>
                        <span className="text-gray-300">{playerInfo.lp} LP</span>
                      </div>
                      <Progress value={playerInfo.lp} className="h-2 bg-gray-700" />
                    </div>

                    <div className="flex items-center justify-center gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">{playerInfo.winRate}%</div>
                        <div className="text-sm text-gray-400">Win Rate</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2 bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Rank Progression</CardTitle>
                  <CardDescription className="text-gray-400">Your LP changes over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={rankHistory} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                        <XAxis dataKey="month" stroke="#888" />
                        <YAxis stroke="#888" />
                        <RechartsTooltip
                          formatter={(value) => [`${value} LP`, "League Points"]}
                          contentStyle={{ backgroundColor: "#333", border: "1px solid #555", borderRadius: "4px" }}
                          itemStyle={{ color: "#ddd" }}
                          labelStyle={{ color: "#fff" }}
                        />
                        <Line type="monotone" dataKey="lp" stroke="#0070f3" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Role Performance</CardTitle>
                  <CardDescription className="text-gray-400">Your performance across different roles</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={rolePerformance}>
                        <PolarGrid stroke="#444" />
                        <PolarAngleAxis dataKey="role" stroke="#888" />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#888" />
                        <Radar name="Performance" dataKey="value" stroke="#0070f3" fill="#0070f3" fillOpacity={0.6} />
                        <Legend wrapperStyle={{ color: "#ddd" }} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {/* Champions section */}
        {statType === "champions" && (
          <section className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Most Played Champions</CardTitle>
                  <CardDescription className="text-gray-400">Your favorite champions by games played</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topChampions.map((champion, index) => (
                      <div key={index} className="flex items-center">
                        <div className="text-lg font-medium w-8 text-gray-300">{index + 1}</div>
                        <img
                          src={champion.image || "/placeholder.svg"}
                          alt={champion.name}
                          className="w-12 h-12 rounded-full mr-4"
                        />
                        <div>
                          <div className="font-medium text-white">{champion.name}</div>
                          <div className="text-sm text-gray-400">
                            {champion.games} games • {champion.winRate}% win rate
                          </div>
                        </div>
                        <div className="ml-auto text-sm text-gray-400">KDA: {champion.kda}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Champion Win Rates</CardTitle>
                  <CardDescription className="text-gray-400">
                    Win percentage for your most played champions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={topChampions} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                        <XAxis dataKey="name" stroke="#888" />
                        <YAxis domain={[0, 100]} stroke="#888" />
                        <RechartsTooltip
                          formatter={(value) => [`${value}%`, "Win Rate"]}
                          contentStyle={{ backgroundColor: "#333", border: "1px solid #555", borderRadius: "4px" }}
                          itemStyle={{ color: "#ddd" }}
                          labelStyle={{ color: "#fff" }}
                        />
                        <Bar dataKey="winRate" fill="#0070f3" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Champion Performance Metrics</CardTitle>
                  <CardDescription className="text-gray-400">Detailed stats for your top champions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-700">
                          <th className="text-left py-3 px-4 text-gray-300">Champion</th>
                          <th className="text-left py-3 px-4 text-gray-300">Games</th>
                          <th className="text-left py-3 px-4 text-gray-300">Win Rate</th>
                          <th className="text-left py-3 px-4 text-gray-300">KDA</th>
                          <th className="text-left py-3 px-4 text-gray-300">Performance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {topChampions.map((champion, index) => (
                          <tr key={index} className="border-b border-gray-700">
                            <td className="py-3 px-4">
                              <div className="flex items-center">
                                <img
                                  src={champion.image || "/placeholder.svg"}
                                  alt={champion.name}
                                  className="w-8 h-8 rounded-full mr-2"
                                />
                                <span className="text-gray-200">{champion.name}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-gray-300">{champion.games}</td>
                            <td className="py-3 px-4 text-gray-300">{champion.winRate}%</td>
                            <td className="py-3 px-4 text-gray-300">{champion.kda}</td>
                            <td className="py-3 px-4">
                              <div className="flex items-center">
                                <Progress value={champion.winRate} className="h-2 w-24 bg-gray-700" />
                                <span className="ml-2 text-gray-300">
                                  {champion.winRate > 60 ? "Excellent" : champion.winRate > 50 ? "Good" : "Average"}
                                </span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {/* Match history section */}
        {statType === "matches" && (
          <section className="mb-12">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Recent Matches</CardTitle>
                <CardDescription className="text-gray-400">Your latest game results</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentMatches.map((match, index) => (
                    <div
                      key={index}
                      className={`flex items-center p-4 rounded-lg ${match.result === "Victory" ? "bg-green-900/30" : "bg-red-900/30"}`}
                    >
                      <img
                        src={match.image || "/placeholder.svg"}
                        alt={match.champion}
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div>
                        <div className="font-medium text-white">{match.champion}</div>
                        <div
                          className={`text-sm ${match.result === "Victory" ? "text-green-400" : "text-red-400"} font-medium`}
                        >
                          {match.result}
                        </div>
                      </div>
                      <div className="ml-8">
                        <div className="font-medium text-gray-300">KDA</div>
                        <div className="text-sm text-gray-400">{match.kda}</div>
                      </div>
                      <div className="ml-8">
                        <div className="font-medium text-gray-300">CS</div>
                        <div className="text-sm text-gray-400">{match.cs}</div>
                      </div>
                      <div className="ml-8">
                        <div className="font-medium text-gray-300">Duration</div>
                        <div className="text-sm text-gray-400">{match.duration}</div>
                      </div>
                      <div className="ml-auto text-sm text-gray-400">{match.date}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="mt-8">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Match Statistics</CardTitle>
                  <CardDescription className="text-gray-400">
                    Performance metrics from your recent games
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-700 p-4 rounded-lg flex items-center">
                      <div className="bg-blue-900 p-3 rounded-full mr-4">
                        <Trophy className="h-6 w-6 text-blue-400" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Win Rate</div>
                        <div className="text-xl font-bold text-white">60%</div>
                      </div>
                    </div>
                    <div className="bg-gray-700 p-4 rounded-lg flex items-center">
                      <div className="bg-blue-900 p-3 rounded-full mr-4">
                        <Sword className="h-6 w-6 text-blue-400" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Avg. KDA</div>
                        <div className="text-xl font-bold text-white">8.4 / 4.6 / 12.0</div>
                      </div>
                    </div>
                    <div className="bg-gray-700 p-4 rounded-lg flex items-center">
                      <div className="bg-blue-900 p-3 rounded-full mr-4">
                        <Shield className="h-6 w-6 text-blue-400" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Avg. CS</div>
                        <div className="text-xl font-bold text-white">189.6</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-lg font-medium mb-4 text-white">Performance Trend</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={[
                            { game: 1, kda: 6.7 },
                            { game: 2, kda: 5.2 },
                            { game: 3, kda: 8.3 },
                            { game: 4, kda: 7.5 },
                            { game: 5, kda: 4.8 },
                          ]}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                          <XAxis
                            dataKey="game"
                            label={{ value: "Game Number", position: "insideBottomRight", offset: -10, fill: "#888" }}
                            stroke="#888"
                          />
                          <YAxis
                            label={{ value: "KDA Ratio", angle: -90, position: "insideLeft", fill: "#888" }}
                            stroke="#888"
                          />
                          <RechartsTooltip
                            formatter={(value) => [`${value}`, "KDA Ratio"]}
                            contentStyle={{ backgroundColor: "#333", border: "1px solid #555", borderRadius: "4px" }}
                            itemStyle={{ color: "#ddd" }}
                            labelStyle={{ color: "#fff" }}
                          />
                          <Line type="monotone" dataKey="kda" stroke="#0070f3" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {/* API Integration Guide */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-white">How to Integrate with Real League of Legends Data</h2>
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Riot Games API Integration Guide</CardTitle>
              <CardDescription className="text-gray-400">
                Steps to connect this page to actual League of Legends data
              </CardDescription>
            </CardHeader>
            <CardContent className="text-gray-300">
              <ol className="list-decimal list-inside space-y-2">
                <li>
                  Register for a Riot Games API key at{" "}
                  <a
                    href="https://developer.riotgames.com"
                    className="text-blue-400 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    developer.riotgames.com
                  </a>
                </li>
                <li>Set up a server-side API route to make requests to the Riot API (to protect your API key)</li>
                <li>
                  Use the following endpoints to fetch player data:
                  <ul className="list-disc list-inside ml-6 mt-2">
                    <li>
                      <code className="bg-gray-700 px-1 rounded">
                        GET /lol/summoner/v4/summoners/by-name/{"{summonerName}"}
                      </code>{" "}
                      - For basic summoner info
                    </li>
                    <li>
                      <code className="bg-gray-700 px-1 rounded">
                        GET /lol/league/v4/entries/by-summoner/{"{summonerId}"}
                      </code>{" "}
                      - For rank information
                    </li>
                    <li>
                      <code className="bg-gray-700 px-1 rounded">
                        GET /lol/match/v5/matches/by-puuid/{"{puuid}"}/ids
                      </code>{" "}
                      - For match history
                    </li>
                    <li>
                      <code className="bg-gray-700 px-1 rounded">GET /lol/match/v5/matches/{"{matchId}"}</code> - For
                      detailed match data
                    </li>
                  </ul>
                </li>
                <li>Create a server action or API route to fetch and process the data</li>
                <li>Replace the mock data in this application with the API responses</li>
                <li>Consider implementing caching to avoid hitting rate limits</li>
              </ol>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  )
}
