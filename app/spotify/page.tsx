"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Info, Clock, Calendar, Disc, Headphones, Radio, Sparkles, TrendingUp, Music } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts"

// Mock data for Spotify stats
// In a real application, this would come from the Spotify API
const topTracks = [
  {
    name: "Blinding Lights",
    artist: "The Weeknd",
    playCount: 87,
    albumCover: "/placeholder.svg?height=60&width=60",
    duration: "3:20",
    album: "After Hours",
  },
  {
    name: "Save Your Tears",
    artist: "The Weeknd",
    playCount: 76,
    albumCover: "/placeholder.svg?height=60&width=60",
    duration: "3:35",
    album: "After Hours",
  },
  {
    name: "Levitating",
    artist: "Dua Lipa",
    playCount: 65,
    albumCover: "/placeholder.svg?height=60&width=60",
    duration: "3:23",
    album: "Future Nostalgia",
  },
  {
    name: "Stay",
    artist: "The Kid LAROI, Justin Bieber",
    playCount: 58,
    albumCover: "/placeholder.svg?height=60&width=60",
    duration: "2:21",
    album: "F*CK LOVE 3: OVER YOU",
  },
  {
    name: "Good 4 U",
    artist: "Olivia Rodrigo",
    playCount: 52,
    albumCover: "/placeholder.svg?height=60&width=60",
    duration: "2:58",
    album: "SOUR",
  },
]

const topArtists = [
  {
    name: "The Weeknd",
    playCount: 163,
    image: "/placeholder.svg?height=60&width=60",
    genres: ["Pop", "R&B"],
    popularity: 95,
  },
  {
    name: "Dua Lipa",
    playCount: 142,
    image: "/placeholder.svg?height=60&width=60",
    genres: ["Pop", "Dance"],
    popularity: 92,
  },
  {
    name: "Taylor Swift",
    playCount: 128,
    image: "/placeholder.svg?height=60&width=60",
    genres: ["Pop", "Country Pop"],
    popularity: 97,
  },
  {
    name: "Drake",
    playCount: 115,
    image: "/placeholder.svg?height=60&width=60",
    genres: ["Hip Hop", "Rap"],
    popularity: 94,
  },
  {
    name: "Billie Eilish",
    playCount: 97,
    image: "/placeholder.svg?height=60&width=60",
    genres: ["Pop", "Alternative"],
    popularity: 90,
  },
]

const recentlyPlayed = [
  {
    name: "As It Was",
    artist: "Harry Styles",
    playedAt: "Today, 10:23 AM",
    albumCover: "/placeholder.svg?height=60&width=60",
    album: "Harry's House",
    duration: "2:47",
  },
  {
    name: "Running Up That Hill",
    artist: "Kate Bush",
    playedAt: "Today, 9:45 AM",
    albumCover: "/placeholder.svg?height=60&width=60",
    album: "Hounds of Love",
    duration: "4:58",
  },
  {
    name: "Heat Waves",
    artist: "Glass Animals",
    playedAt: "Yesterday, 8:30 PM",
    albumCover: "/placeholder.svg?height=60&width=60",
    album: "Dreamland",
    duration: "3:59",
  },
  {
    name: "Shivers",
    artist: "Ed Sheeran",
    playedAt: "Yesterday, 7:15 PM",
    albumCover: "/placeholder.svg?height=60&width=60",
    album: "=",
    duration: "3:27",
  },
  {
    name: "Enemy",
    artist: "Imagine Dragons",
    playedAt: "Yesterday, 6:00 PM",
    albumCover: "/placeholder.svg?height=60&width=60",
    album: "Mercury - Act 1",
    duration: "2:53",
  },
]

const genreData = [
  { name: "Pop", value: 45 },
  { name: "Hip Hop", value: 25 },
  { name: "Rock", value: 15 },
  { name: "Electronic", value: 10 },
  { name: "Other", value: 5 },
]

const listeningHistory = [
  { month: "Jan", hours: 45 },
  { month: "Feb", hours: 52 },
  { month: "Mar", hours: 48 },
  { month: "Apr", hours: 61 },
  { month: "May", hours: 57 },
  { month: "Jun", hours: 65 },
  { month: "Jul", hours: 72 },
]

const COLORS = ["#1DB954", "#1ED760", "#2EBD59", "#57B660", "#30A24C"]

export default function SpotifyPage() {
  const [timeRange, setTimeRange] = useState("short_term")
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 10
        return newProgress >= 100 ? 100 : newProgress
      })
    }, 150)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [])

  // In a real application, you would fetch data based on the selected time range
  // For this demo, we'll just use the same data for all time ranges

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-gray-200">
      {/* Loading overlay */}
      {loading && (
        <div className="fixed inset-0 bg-gray-950/90 z-50 flex flex-col items-center justify-center">
          <div className="w-16 h-16 mb-8">
            <svg className="animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
          <div className="text-xl font-medium mb-4">Loading your Spotify data...</div>
          <div className="w-64 mb-2">
            <Progress value={progress} className="h-2 bg-gray-700" indicatorColor="bg-green-500" />
          </div>
          <div className="text-sm text-gray-400">{progress}% complete</div>
        </div>
      )}

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
            <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center mr-3">
              <Music className="h-5 w-5 text-white" />
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

        {/* Hero stats section */}
        <div className="mb-12 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-8 border border-gray-700 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            <div className="flex flex-col items-center justify-center p-6 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700">
              <Headphones className="h-10 w-10 text-green-400 mb-4" />
              <div className="text-4xl font-bold text-white mb-2">287</div>
              <div className="text-gray-400">Hours Listened</div>
            </div>

            <div className="flex flex-col items-center justify-center p-6 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700">
              <Disc className="h-10 w-10 text-green-400 mb-4" />
              <div className="text-4xl font-bold text-white mb-2">1,245</div>
              <div className="text-gray-400">Tracks Played</div>
            </div>

            <div className="flex flex-col items-center justify-center p-6 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700">
              <Radio className="h-10 w-10 text-green-400 mb-4" />
              <div className="text-4xl font-bold text-white mb-2">132</div>
              <div className="text-gray-400">Artists Discovered</div>
            </div>
          </div>
        </div>

        {/* Time range selector */}
        <div className="mb-8">
          <Tabs defaultValue="short_term" onValueChange={setTimeRange} className="w-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">Listening Statistics</h2>
              <TabsList className="bg-gray-800 p-1">
                <TabsTrigger
                  value="short_term"
                  className="data-[state=active]:bg-green-700 data-[state=active]:text-white"
                >
                  Last 4 Weeks
                </TabsTrigger>
                <TabsTrigger
                  value="medium_term"
                  className="data-[state=active]:bg-green-700 data-[state=active]:text-white"
                >
                  Last 6 Months
                </TabsTrigger>
                <TabsTrigger
                  value="long_term"
                  className="data-[state=active]:bg-green-700 data-[state=active]:text-white"
                >
                  All Time
                </TabsTrigger>
              </TabsList>
            </div>
          </Tabs>
        </div>

        {/* Listening history chart */}
        <section className="mb-12">
          <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 shadow-xl overflow-hidden">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-green-400" />
                    Listening Trends
                  </CardTitle>
                  <CardDescription className="text-gray-400">Your monthly listening activity</CardDescription>
                </div>
                <Badge className="bg-green-900/50 text-green-200 hover:bg-green-900/70">
                  {timeRange === "short_term"
                    ? "Last 4 Weeks"
                    : timeRange === "medium_term"
                      ? "Last 6 Months"
                      : "All Time"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={listeningHistory} margin={{ top: 5, right: 30, left: 20, bottom: 25 }}>
                    <defs>
                      <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1DB954" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#1DB954" stopOpacity={0.2} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" vertical={false} />
                    <XAxis
                      dataKey="month"
                      stroke="#888"
                      tick={{ fill: "#888" }}
                      axisLine={{ stroke: "#555" }}
                      tickLine={{ stroke: "#555" }}
                    />
                    <YAxis
                      stroke="#888"
                      tick={{ fill: "#888" }}
                      axisLine={{ stroke: "#555" }}
                      tickLine={{ stroke: "#555" }}
                      label={{
                        value: "Hours",
                        angle: -90,
                        position: "insideLeft",
                        fill: "#888",
                        offset: -5,
                      }}
                    />
                    <RechartsTooltip
                      formatter={(value) => [`${value} hours`, "Listening Time"]}
                      contentStyle={{ backgroundColor: "#333", border: "1px solid #555", borderRadius: "4px" }}
                      itemStyle={{ color: "#ddd" }}
                      labelStyle={{ color: "#fff" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="hours"
                      stroke="#1DB954"
                      strokeWidth={3}
                      dot={{ stroke: "#1DB954", strokeWidth: 2, r: 4, fill: "#333" }}
                      activeDot={{ stroke: "#1DB954", strokeWidth: 2, r: 6, fill: "#1DB954" }}
                      fillOpacity={1}
                      fill="url(#colorHours)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Top tracks section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white flex items-center">
            <Sparkles className="h-5 w-5 mr-2 text-green-400" />
            Top Tracks
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 shadow-xl overflow-hidden">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Most Played Songs</CardTitle>
                    <CardDescription className="text-gray-400">
                      Your most listened to tracks{" "}
                      {timeRange === "short_term"
                        ? "in the last 4 weeks"
                        : timeRange === "medium_term"
                          ? "in the last 6 months"
                          : "of all time"}
                    </CardDescription>
                  </div>
                  <Badge className="bg-green-900/50 text-green-200 hover:bg-green-900/70">Top 5</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topTracks.map((track, index) => (
                    <div
                      key={index}
                      className="group flex items-center p-3 rounded-lg hover:bg-gray-800/50 transition-colors duration-300"
                    >
                      <div className="text-lg font-medium w-8 text-gray-400 group-hover:text-green-400 transition-colors duration-300">
                        {index + 1}
                      </div>
                      <div className="relative">
                        <img
                          src={track.albumCover || "/placeholder.svg"}
                          alt={`${track.name} album cover`}
                          className="w-12 h-12 rounded mr-4 group-hover:shadow-lg group-hover:shadow-green-900/20 transition-all duration-300"
                        />
                        <div className="absolute inset-0 bg-black/50 rounded opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                      <div className="flex-grow">
                        <div className="font-medium text-white group-hover:text-green-400 transition-colors duration-300">
                          {track.name}
                        </div>
                        <div className="text-sm text-gray-400 flex items-center">
                          <span>{track.artist}</span>
                          <span className="mx-2">•</span>
                          <span>{track.album}</span>
                        </div>
                      </div>
                      <div className="ml-4 flex flex-col items-end">
                        <div className="text-sm text-gray-400 flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {track.duration}
                        </div>
                        <div className="text-sm text-gray-500">{track.playCount} plays</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 shadow-xl overflow-hidden">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Play Count Visualization</CardTitle>
                    <CardDescription className="text-gray-400">
                      Number of times you've played each track
                    </CardDescription>
                  </div>
                  <Badge className="bg-green-900/50 text-green-200 hover:bg-green-900/70">Interactive</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={topTracks} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <defs>
                        <linearGradient id="colorPlayCount" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#1DB954" stopOpacity={0.8} />
                          <stop offset="100%" stopColor="#30A24C" stopOpacity={0.8} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" horizontal={false} />
                      <XAxis
                        type="number"
                        stroke="#888"
                        tick={{ fill: "#888" }}
                        axisLine={{ stroke: "#555" }}
                        tickLine={{ stroke: "#555" }}
                      />
                      <YAxis
                        dataKey="name"
                        type="category"
                        width={100}
                        stroke="#888"
                        tick={{ fill: "#888" }}
                        axisLine={{ stroke: "#555" }}
                        tickLine={{ stroke: "#555" }}
                      />
                      <RechartsTooltip
                        formatter={(value, name, props) => [`${value} plays`, "Play Count"]}
                        labelFormatter={(value) => `${topTracks[value].name} - ${topTracks[value].artist}`}
                        contentStyle={{ backgroundColor: "#333", border: "1px solid #555", borderRadius: "4px" }}
                        itemStyle={{ color: "#ddd" }}
                        labelStyle={{ color: "#fff" }}
                      />
                      <Bar
                        dataKey="playCount"
                        fill="url(#colorPlayCount)"
                        radius={[0, 4, 4, 0]}
                        barSize={20}
                        animationDuration={1500}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Top artists section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white flex items-center">
            <Sparkles className="h-5 w-5 mr-2 text-green-400" />
            Top Artists
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 shadow-xl overflow-hidden">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Most Listened Artists</CardTitle>
                    <CardDescription className="text-gray-400">
                      Your favorite artists{" "}
                      {timeRange === "short_term"
                        ? "in the last 4 weeks"
                        : timeRange === "medium_term"
                          ? "in the last 6 months"
                          : "of all time"}
                    </CardDescription>
                  </div>
                  <Badge className="bg-green-900/50 text-green-200 hover:bg-green-900/70">Top 5</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topArtists.map((artist, index) => (
                    <div
                      key={index}
                      className="group flex items-center p-3 rounded-lg hover:bg-gray-800/50 transition-colors duration-300"
                    >
                      <div className="text-lg font-medium w-8 text-gray-400 group-hover:text-green-400 transition-colors duration-300">
                        {index + 1}
                      </div>
                      <div className="relative">
                        <img
                          src={artist.image || "/placeholder.svg"}
                          alt={`${artist.name}`}
                          className="w-12 h-12 rounded-full mr-4 group-hover:shadow-lg group-hover:shadow-green-900/20 transition-all duration-300"
                        />
                        <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                      <div className="flex-grow">
                        <div className="font-medium text-white group-hover:text-green-400 transition-colors duration-300">
                          {artist.name}
                        </div>
                        <div className="text-sm text-gray-400 flex items-center">
                          <span>{artist.genres.join(", ")}</span>
                        </div>
                      </div>
                      <div className="ml-4 flex flex-col items-end">
                        <div className="text-sm text-gray-400 flex items-center">
                          <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"></span>
                          {artist.popularity}% popularity
                        </div>
                        <div className="text-sm text-gray-500">{artist.playCount} plays</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 shadow-xl overflow-hidden">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Genre Distribution</CardTitle>
                    <CardDescription className="text-gray-400">Breakdown of your music taste by genre</CardDescription>
                  </div>
                  <Badge className="bg-green-900/50 text-green-200 hover:bg-green-900/70">Interactive</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={genreData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        innerRadius={60}
                        fill="#8884d8"
                        dataKey="value"
                        paddingAngle={2}
                        animationDuration={1500}
                      >
                        {genreData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                            stroke="#333"
                            strokeWidth={2}
                          />
                        ))}
                      </Pie>
                      <Legend
                        verticalAlign="bottom"
                        height={36}
                        formatter={(value) => <span style={{ color: "#ddd" }}>{value}</span>}
                      />
                      <RechartsTooltip
                        formatter={(value) => [`${value}%`, "Percentage"]}
                        contentStyle={{ backgroundColor: "#333", border: "1px solid #555", borderRadius: "4px" }}
                        itemStyle={{ color: "#ddd" }}
                        labelStyle={{ color: "#fff" }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Recently played section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-green-400" />
            Recently Played
          </h2>
          <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 shadow-xl overflow-hidden">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white">Latest Tracks</CardTitle>
                  <CardDescription className="text-gray-400">Your most recently played songs</CardDescription>
                </div>
                <Badge className="bg-green-900/50 text-green-200 hover:bg-green-900/70">Live Updates</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentlyPlayed.map((track, index) => (
                  <div
                    key={index}
                    className="group flex items-center p-3 rounded-lg hover:bg-gray-800/50 transition-colors duration-300"
                  >
                    <div className="relative">
                      <img
                        src={track.albumCover || "/placeholder.svg"}
                        alt={`${track.name} album cover`}
                        className="w-12 h-12 rounded mr-4 group-hover:shadow-lg group-hover:shadow-green-900/20 transition-all duration-300"
                      />
                      <div className="absolute inset-0 bg-black/50 rounded opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-grow">
                      <div className="font-medium text-white group-hover:text-green-400 transition-colors duration-300">
                        {track.name}
                      </div>
                      <div className="text-sm text-gray-400 flex items-center">
                        <span>{track.artist}</span>
                        <span className="mx-2">•</span>
                        <span>{track.album}</span>
                      </div>
                    </div>
                    <div className="ml-4 flex flex-col items-end">
                      <div className="text-sm text-gray-400">{track.playedAt}</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {track.duration}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Footer with total stats */}
        <div className="py-6 border-t border-gray-800 text-center text-gray-500">
          <div className="container mx-auto">
            <p className="text-sm">
              {" "}
              • <span className="font-medium text-green-400">Total Tracks:</span> 1,254 •{" "}
              <span className="font-medium text-green-400">Unique Artists:</span> 187
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
