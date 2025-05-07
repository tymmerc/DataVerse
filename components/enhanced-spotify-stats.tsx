"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Info, Music, Clock, Users, Radio } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { StatCard } from "@/components/stat-card"

// Mock data for Spotify stats
// In a real application, this would come from the Spotify API
const topTracks = [
  { name: "Blinding Lights", artist: "The Weeknd", playCount: 87, albumCover: "/placeholder.svg?height=60&width=60" },
  { name: "Save Your Tears", artist: "The Weeknd", playCount: 76, albumCover: "/placeholder.svg?height=60&width=60" },
  { name: "Levitating", artist: "Dua Lipa", playCount: 65, albumCover: "/placeholder.svg?height=60&width=60" },
  {
    name: "Stay",
    artist: "The Kid LAROI, Justin Bieber",
    playCount: 58,
    albumCover: "/placeholder.svg?height=60&width=60",
  },
  { name: "Good 4 U", artist: "Olivia Rodrigo", playCount: 52, albumCover: "/placeholder.svg?height=60&width=60" },
]

const topArtists = [
  { name: "The Weeknd", playCount: 163, image: "/placeholder.svg?height=60&width=60" },
  { name: "Dua Lipa", playCount: 142, image: "/placeholder.svg?height=60&width=60" },
  { name: "Taylor Swift", playCount: 128, image: "/placeholder.svg?height=60&width=60" },
  { name: "Drake", playCount: 115, image: "/placeholder.svg?height=60&width=60" },
  { name: "Billie Eilish", playCount: 97, image: "/placeholder.svg?height=60&width=60" },
]

const recentlyPlayed = [
  {
    name: "As It Was",
    artist: "Harry Styles",
    playedAt: "Today, 10:23 AM",
    albumCover: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Running Up That Hill",
    artist: "Kate Bush",
    playedAt: "Today, 9:45 AM",
    albumCover: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Heat Waves",
    artist: "Glass Animals",
    playedAt: "Yesterday, 8:30 PM",
    albumCover: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Shivers",
    artist: "Ed Sheeran",
    playedAt: "Yesterday, 7:15 PM",
    albumCover: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Enemy",
    artist: "Imagine Dragons",
    playedAt: "Yesterday, 6:00 PM",
    albumCover: "/placeholder.svg?height=60&width=60",
  },
]

const genreData = [
  { name: "Pop", value: 45 },
  { name: "Hip Hop", value: 25 },
  { name: "Rock", value: 15 },
  { name: "Electronic", value: 10 },
  { name: "Other", value: 5 },
]

const listeningTrends = [
  { day: "Mon", hours: 1.2 },
  { day: "Tue", hours: 2.1 },
  { day: "Wed", hours: 1.8 },
  { day: "Thu", hours: 2.3 },
  { day: "Fri", hours: 3.5 },
  { day: "Sat", hours: 4.2 },
  { day: "Sun", hours: 3.1 },
]

const COLORS = ["#1DB954", "#1ED760", "#2EBD59", "#57B660", "#30A24C"]

export default function EnhancedSpotifyStats() {
  const [timeRange, setTimeRange] = useState("short_term")
  const [isLoading, setIsLoading] = useState(true)

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [timeRange])

  // In a real application, you would fetch data based on the selected time range
  // For this demo, we'll just use the same data for all time ranges

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
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-green-900/50 mr-3">
              <Music className="h-5 w-5 text-green-400" />
            </div>
            <h1 className="text-3xl font-bold text-white">Your Spotify Stats</h1>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="ml-2 text-gray-300 hover:text-white hover:bg-gray-800">
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-gray-800 border-gray-700 text-gray-200">
                <p className="max-w-xs">
                  This page shows mock Spotify data. In a real application, this would be fetched from the Spotify API.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Stats Overview */}
        <section className="mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Tracks"
              value={1254}
              icon={Music}
              iconColor="text-green-400"
              valueColor="text-green-300"
            />
            <StatCard
              title="Listening Time"
              value={247}
              suffix=" hours"
              icon={Clock}
              iconColor="text-purple-400"
              valueColor="text-purple-300"
            />
            <StatCard
              title="Artists Discovered"
              value={187}
              icon={Users}
              iconColor="text-blue-400"
              valueColor="text-blue-300"
            />
            <StatCard
              title="Genres Explored"
              value={32}
              icon={Radio}
              iconColor="text-pink-400"
              valueColor="text-pink-300"
            />
          </div>
        </section>

        {/* Time range selector */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">Listening History</h2>
            <Tabs
              defaultValue="short_term"
              onValueChange={(value) => {
                setTimeRange(value)
                setIsLoading(true)
              }}
              className="w-auto"
            >
              <TabsList className="bg-gray-800">
                <TabsTrigger value="short_term" className="data-[state=active]:bg-gray-700">
                  Last 4 Weeks
                </TabsTrigger>
                <TabsTrigger value="medium_term" className="data-[state=active]:bg-gray-700">
                  Last 6 Months
                </TabsTrigger>
                <TabsTrigger value="long_term" className="data-[state=active]:bg-gray-700">
                  All Time
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="bg-gray-800/50 p-4 rounded-lg mb-6 border border-gray-700/50">
            <p className="text-gray-300">
              <span className="font-medium text-green-400">Time Period:</span>{" "}
              {timeRange === "short_term" ? "Last 4 weeks" : timeRange === "medium_term" ? "Last 6 months" : "All time"}{" "}
              • <span className="font-medium text-green-400">Total Tracks:</span> 1,254 •{" "}
              <span className="font-medium text-green-400">Unique Artists:</span> 187
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
