"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/components/auth/auth-provider"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Loader2, Music, Gamepad2, Check, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type ConnectCardProps = {
  type: "spotify" | "league"
}

const regions = [
  { value: "na1", label: "North America" },
  { value: "euw1", label: "EU West" },
  { value: "eun1", label: "EU Nordic & East" },
  { value: "kr", label: "Korea" },
  { value: "jp1", label: "Japan" },
  { value: "br1", label: "Brazil" },
  { value: "la1", label: "LAN" },
  { value: "la2", label: "LAS" },
  { value: "oc1", label: "Oceania" },
  { value: "tr1", label: "Turkey" },
  { value: "ru", label: "Russia" },
]

export function AccountConnectCard({ type }: ConnectCardProps) {
  const { user, connectSpotify, disconnectSpotify, connectLeague, disconnectLeague } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [summonerName, setSummonerName] = useState("")
  const [region, setRegion] = useState("na1")
  const [showLeagueForm, setShowLeagueForm] = useState(false)

  const isConnected = type === "spotify" ? user?.spotifyConnected : user?.leagueConnected

  const handleConnect = async () => {
    setIsLoading(true)
    try {
      if (type === "spotify") {
        await connectSpotify()
      } else if (type === "league") {
        setShowLeagueForm(true)
        setIsLoading(false)
        return
      }
    } catch (error) {
      console.error(`Error connecting to ${type}:`, error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDisconnect = async () => {
    setIsLoading(true)
    try {
      if (type === "spotify") {
        await disconnectSpotify()
      } else if (type === "league") {
        await disconnectLeague()
      }
    } catch (error) {
      console.error(`Error disconnecting from ${type}:`, error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLeagueSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      // Call our League authentication API
      const response = await fetch("/api/auth/league", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ region, summonerName }),
      })

      if (!response.ok) {
        throw new Error("Failed to verify summoner name")
      }

      const data = await response.json()

      if (data.success) {
        await connectLeague(region, summonerName)
        setShowLeagueForm(false)
      } else {
        throw new Error(data.error || "Failed to verify summoner name")
      }
    } catch (error) {
      console.error("Error connecting to League:", error)
      // You could add error handling UI here
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="bg-gray-800 border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${type === "spotify" ? "bg-green-900/50" : "bg-blue-900/50"}`}>
              {type === "spotify" ? (
                <Music className="h-5 w-5 text-green-400" />
              ) : (
                <Gamepad2 className="h-5 w-5 text-blue-400" />
              )}
            </div>
            <CardTitle className="text-white">{type === "spotify" ? "Spotify" : "League of Legends"} Account</CardTitle>
          </div>
          {isConnected ? (
            <Badge className="bg-green-900/50 text-green-200 hover:bg-green-900/70">Connected</Badge>
          ) : (
            <Badge className="bg-gray-700 text-gray-300 hover:bg-gray-600">Not Connected</Badge>
          )}
        </div>
        <CardDescription className="text-gray-400">
          {type === "spotify"
            ? "Connect your Spotify account to visualize your music data"
            : "Connect your League of Legends account to track your gaming stats"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {type === "league" && showLeagueForm && !isConnected ? (
          <form onSubmit={handleLeagueSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="region" className="text-gray-300">
                Region
              </Label>
              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-gray-200">
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600 text-gray-200">
                  {regions.map((region) => (
                    <SelectItem key={region.value} value={region.value}>
                      {region.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="summonerName" className="text-gray-300">
                Summoner Name
              </Label>
              <Input
                id="summonerName"
                value={summonerName}
                onChange={(e) => setSummonerName(e.target.value)}
                placeholder="Enter your summoner name"
                className="bg-gray-700 border-gray-600 text-gray-200 placeholder:text-gray-500"
                required
              />
            </div>
            <div className="flex gap-2 pt-2">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  "Connect Account"
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
                onClick={() => setShowLeagueForm(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-300">
              <div className={`p-1 rounded-full ${isConnected ? "bg-green-900/30" : "bg-red-900/30"}`}>
                {isConnected ? <Check className="h-4 w-4 text-green-400" /> : <X className="h-4 w-4 text-red-400" />}
              </div>
              <span>
                {isConnected
                  ? `Your ${type === "spotify" ? "Spotify" : "League of Legends"} account is connected`
                  : `No ${type === "spotify" ? "Spotify" : "League of Legends"} account connected`}
              </span>
            </div>

            {isConnected && type === "league" && (
              <div className="bg-gray-700/50 p-3 rounded-md">
                <p className="text-sm text-gray-300">
                  <span className="font-medium text-blue-400">Region:</span> {user?.leagueRegion?.toUpperCase()}
                </p>
                <p className="text-sm text-gray-300">
                  <span className="font-medium text-blue-400">Summoner Name:</span> {user?.leagueSummonerName}
                </p>
              </div>
            )}

            {isConnected && type === "spotify" && (
              <div className="bg-gray-700/50 p-3 rounded-md">
                <p className="text-sm text-gray-300">
                  <span className="font-medium text-green-400">Status:</span> Connected and syncing data
                </p>
                <p className="text-sm text-gray-300">
                  <span className="font-medium text-green-400">Last synced:</span> Just now
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter>
        {!showLeagueForm &&
          (isConnected ? (
            <Button
              onClick={handleDisconnect}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Disconnecting...
                </>
              ) : (
                "Disconnect Account"
              )}
            </Button>
          ) : (
            <Button
              onClick={handleConnect}
              className={
                type === "spotify"
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                "Connect Account"
              )}
            </Button>
          ))}
      </CardFooter>
    </Card>
  )
}
