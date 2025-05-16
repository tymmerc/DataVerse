"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Search, Trophy, Swords, Shield, Activity, Loader2 } from "lucide-react"
import type { SummonerData, LeagueEntry, MatchSummary, ChampionMastery } from "@/lib/league-mock"

interface LeagueDataDisplayProps {
  defaultSummonerName?: string
}

export function LeagueDataDisplay({ defaultSummonerName = "" }: LeagueDataDisplayProps) {
  const [summonerName, setSummonerName] = useState(defaultSummonerName)
  const [searchInput, setSearchInput] = useState(defaultSummonerName)
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(!!defaultSummonerName)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<{
    summoner: SummonerData | null
    leagueEntries: LeagueEntry[]
    recentMatches: MatchSummary[]
    championMasteries: ChampionMastery[]
  }>({
    summoner: null,
    leagueEntries: [],
    recentMatches: [],
    championMasteries: [],
  })

  const fetchData = async (name: string) => {
    if (!name) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/league?summonerName=${encodeURIComponent(name)}`)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Error ${response.status}: Failed to fetch data`)
      }

      const data = await response.json()
      setData(data)
      setSummonerName(name)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
      console.error("Error fetching data:", err)
    } finally {
      setLoading(false)
      setInitialLoading(false)
    }
  }

  useEffect(() => {
    if (defaultSummonerName) {
      fetchData(defaultSummonerName)
    } else {
      setInitialLoading(false)
    }
  }, [defaultSummonerName])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchData(searchInput)
  }

  const getWinRate = (wins: number, losses: number) => {
    const total = wins + losses
    return total > 0 ? Math.round((wins / total) * 100) : 0
  }

  const getKDA = (match: MatchSummary) => {
    const participant = match.info.participants.find(
      (p) => p.summonerName?.toLowerCase() === summonerName.toLowerCase(),
    )

    if (!participant) return { kills: 0, deaths: 0, assists: 0, kda: "0.00" }

    const { kills, deaths, assists } = participant
    const kda = deaths === 0 ? "Perfect" : ((kills + assists) / deaths).toFixed(2)

    return { kills, deaths, assists, kda }
  }

  const getRankColor = (tier: string) => {
    const tierColors: Record<string, string> = {
      IRON: "bg-gray-500",
      BRONZE: "bg-amber-700",
      SILVER: "bg-gray-400",
      GOLD: "bg-yellow-500",
      PLATINUM: "bg-emerald-500",
      DIAMOND: "bg-blue-500",
      MASTER: "bg-purple-600",
      GRANDMASTER: "bg-red-600",
      CHALLENGER: "bg-cyan-500",
    }

    return tierColors[tier] || "bg-gray-500"
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="bg-gray-800 border-gray-700 mb-8">
        <CardHeader>
          <CardTitle className="text-white">League of Legends Stats</CardTitle>
          <CardDescription className="text-gray-400">Search for a summoner to view their stats</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              placeholder="Enter summoner name..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
              disabled={loading}
            />
            <Button type="submit" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Search className="h-4 w-4 mr-2" />}
              {loading ? "Searching..." : "Search"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {initialLoading && (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          <span className="ml-2 text-lg text-gray-300">Loading your stats...</span>
        </div>
      )}

      {error && (
        <Alert variant="destructive" className="mb-8">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {!initialLoading && !error && data.summoner && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Summoner Profile Card */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Summoner Profile</CardTitle>
              <CardDescription className="text-gray-400">{data.summoner.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gray-700 overflow-hidden">
                  <img
                    src={`https://ddragon.leagueoflegends.com/cdn/13.10.1/img/profileicon/${data.summoner.profileIconId}.png`}
                    alt="Profile Icon"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{data.summoner.name}</h3>
                  <p className="text-gray-400">Level {data.summoner.summonerLevel}</p>
                </div>
              </div>

              {data.leagueEntries.length > 0 ? (
                <div className="space-y-4">
                  {data.leagueEntries.map((entry, index) => (
                    <div key={index} className="bg-gray-700 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <Badge className={`${getRankColor(entry.tier)} mr-2`}>
                            {entry.tier} {entry.rank}
                          </Badge>
                          <span className="text-gray-300">{entry.queueType.replace("_", " ")}</span>
                        </div>
                        <span className="text-blue-400 font-bold">{entry.leaguePoints} LP</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-400 mb-2">
                        <span>Wins: {entry.wins}</span>
                        <span>Losses: {entry.losses}</span>
                        <span>Win Rate: {getWinRate(entry.wins, entry.losses)}%</span>
                      </div>
                      <Progress value={getWinRate(entry.wins, entry.losses)} className="h-2 bg-gray-600" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-gray-400">No ranked data available</div>
              )}
            </CardContent>
          </Card>

          {/* Recent Matches Card */}
          <Card className="bg-gray-800 border-gray-700 md:col-span-2">
            <CardHeader>
              <CardTitle className="text-white">Recent Matches</CardTitle>
              <CardDescription className="text-gray-400">Last 5 games played</CardDescription>
            </CardHeader>
            <CardContent>
              {data.recentMatches.length > 0 ? (
                <div className="space-y-4">
                  {data.recentMatches.map((match, index) => {
                    const participant = match.info.participants.find(
                      (p) => p.summonerName?.toLowerCase() === summonerName.toLowerCase(),
                    )

                    if (!participant) return null

                    const { kills, deaths, assists, kda } = getKDA(match)
                    const isWin = participant.win

                    return (
                      <div key={index} className={`p-4 rounded-lg ${isWin ? "bg-green-900/30" : "bg-red-900/30"}`}>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gray-700 overflow-hidden">
                              <img
                                src={`https://ddragon.leagueoflegends.com/cdn/13.10.1/img/champion/${participant.championName}.png`}
                                alt={participant.championName}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="font-medium text-white">{participant.championName}</h4>
                              <p className="text-sm text-gray-400">
                                {match.info.gameMode} - {Math.floor(match.info.gameDuration / 60)}m
                              </p>
                            </div>
                          </div>
                          <Badge className={isWin ? "bg-green-600" : "bg-red-600"}>
                            {isWin ? "Victory" : "Defeat"}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mt-4">
                          <div className="flex flex-col items-center">
                            <div className="flex items-center text-gray-300">
                              <Swords className="h-4 w-4 mr-1" />
                              <span>KDA</span>
                            </div>
                            <p className="text-white font-medium">
                              {kills}/{deaths}/{assists}
                            </p>
                            <p className="text-sm text-gray-400">{kda} KDA</p>
                          </div>

                          <div className="flex flex-col items-center">
                            <div className="flex items-center text-gray-300">
                              <Shield className="h-4 w-4 mr-1" />
                              <span>CS</span>
                            </div>
                            <p className="text-white font-medium">
                              {participant.totalMinionsKilled + (participant.neutralMinionsKilled || 0)}
                            </p>
                            <p className="text-sm text-gray-400">
                              {(
                                (participant.totalMinionsKilled + (participant.neutralMinionsKilled || 0)) /
                                (match.info.gameDuration / 60)
                              ).toFixed(1)}{" "}
                              CS/min
                            </p>
                          </div>

                          <div className="flex flex-col items-center">
                            <div className="flex items-center text-gray-300">
                              <Activity className="h-4 w-4 mr-1" />
                              <span>Damage</span>
                            </div>
                            <p className="text-white font-medium">
                              {(participant.totalDamageDealtToChampions / 1000).toFixed(1)}k
                            </p>
                            <p className="text-sm text-gray-400">{participant.visionScore} Vision</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-4 text-gray-400">No recent matches found</div>
              )}
            </CardContent>
          </Card>

          {/* Champion Masteries Card */}
          <Card className="bg-gray-800 border-gray-700 md:col-span-3">
            <CardHeader>
              <CardTitle className="text-white">Champion Masteries</CardTitle>
              <CardDescription className="text-gray-400">Top champions by mastery points</CardDescription>
            </CardHeader>
            <CardContent>
              {data.championMasteries.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {data.championMasteries.slice(0, 6).map((mastery, index) => {
                    // Get champion name from ID (in a real app, you'd use Data Dragon API)
                    const championName = `Champion ${mastery.championId}`

                    return (
                      <div key={index} className="bg-gray-700 rounded-lg p-4 flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center">
                          <Trophy
                            className={`h-6 w-6 ${
                              mastery.championLevel >= 7
                                ? "text-purple-400"
                                : mastery.championLevel >= 6
                                  ? "text-red-400"
                                  : mastery.championLevel >= 5
                                    ? "text-blue-400"
                                    : "text-gray-400"
                            }`}
                          />
                        </div>
                        <div>
                          <h4 className="font-medium text-white">{championName}</h4>
                          <div className="flex items-center">
                            <Badge className="bg-blue-900 mr-2">Level {mastery.championLevel}</Badge>
                            <span className="text-sm text-gray-400">
                              {(mastery.championPoints / 1000).toFixed(1)}k points
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-4 text-gray-400">No champion mastery data available</div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {!initialLoading && !error && !data.summoner && summonerName && (
        <Alert className="mb-8 bg-gray-800 border-gray-700 text-gray-300">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No Data Found</AlertTitle>
          <AlertDescription>
            No data found for summoner "{summonerName}". Please check the spelling and try again.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
