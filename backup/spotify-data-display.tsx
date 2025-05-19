"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Music, User, Clock, ListMusic, Loader2, LogOut, LogIn } from "lucide-react"
import { type SpotifyUserData, type SpotifyTimeRange, timeRanges } from "@/lib/spotify-mock"

export function SpotifyDataDisplay() {
  const [data, setData] = useState<SpotifyUserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [timeRange, setTimeRange] = useState<SpotifyTimeRange>(timeRanges[1]) // Default to medium_term
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isOwnerData, setIsOwnerData] = useState(true)

  const fetchData = async (selectedTimeRange: SpotifyTimeRange = timeRange) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/spotify/data?timeRange=${selectedTimeRange.value}`)

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      const spotifyData = await response.json()
      setData(spotifyData)

      // Check if this is the owner's data or the user's data
      setIsOwnerData(!spotifyData.profile?.id || spotifyData.profile.id === "youruserid")
      setIsAuthenticated(!isOwnerData)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch Spotify data")
      console.error("Error fetching Spotify data:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleTimeRangeChange = (value: string) => {
    const newTimeRange = timeRanges.find((range) => range.value === value) || timeRanges[1]
    setTimeRange(newTimeRange)
    fetchData(newTimeRange)
  }

  const handleLogin = async () => {
    try {
      const response = await fetch("/api/spotify/auth")
      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        setError("Failed to get authentication URL")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to initiate Spotify login")
      console.error("Error initiating Spotify login:", err)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/spotify/logout")
      setIsAuthenticated(false)
      setIsOwnerData(true)
      fetchData() // Fetch owner data after logout
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to logout")
      console.error("Error logging out:", err)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <span className="ml-2 text-lg text-gray-300">Loading Spotify data...</span>
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mb-8">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  if (!data) {
    return (
      <Alert className="mb-8 bg-gray-800 border-gray-700 text-gray-300">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>No Data</AlertTitle>
        <AlertDescription>No Spotify data available.</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* User Profile and Authentication */}
      <Card className="bg-gray-800 border-gray-700 mb-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-white">{isOwnerData ? "My Spotify Profile" : "Your Spotify Profile"}</CardTitle>
            <CardDescription className="text-gray-400">
              {isOwnerData ? "Viewing the owner's Spotify data" : "Viewing your personal Spotify data"}
            </CardDescription>
          </div>

          {isAuthenticated ? (
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Disconnect
            </Button>
          ) : (
            <Button onClick={handleLogin}>
              <LogIn className="h-4 w-4 mr-2" />
              Connect Your Spotify
            </Button>
          )}
        </CardHeader>

        <CardContent>
          {data.profile && (
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gray-700 overflow-hidden">
                {data.profile.images && data.profile.images.length > 0 ? (
                  <img
                    src={data.profile.images[0].url || "/placeholder.svg"}
                    alt={data.profile.display_name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-600">
                    <User className="h-8 w-8 text-gray-400" />
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-xl font-bold text-white">{data.profile.display_name}</h3>
                <div className="flex items-center gap-2 text-gray-400">
                  <span>{data.profile.followers.total} followers</span>
                  <span>•</span>
                  <Badge className="bg-green-900 text-green-100">
                    {data.profile.product === "premium" ? "Premium" : "Free"}
                  </Badge>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Time Range Selector */}
      <div className="mb-8">
        <Tabs value={timeRange.value} onValueChange={handleTimeRangeChange} className="w-full">
          <TabsList className="bg-gray-800 p-1">
            {timeRanges.map((range) => (
              <TabsTrigger
                key={range.value}
                value={range.value}
                className="data-[state=active]:bg-blue-700 data-[state=active]:text-white"
              >
                {range.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Top Tracks */}
        <Card className="bg-gray-800 border-gray-700 md:col-span-2">
          <CardHeader>
            <CardTitle className="text-white">Top Tracks</CardTitle>
            <CardDescription className="text-gray-400">
              Your most listened tracks {timeRange.label.toLowerCase()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {data.topTracks.length > 0 ? (
              <div className="space-y-4">
                {data.topTracks.slice(0, 10).map((track, index) => (
                  <div key={track.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/50">
                    <div className="text-gray-400 font-mono w-6 text-center">{index + 1}</div>
                    <div className="w-12 h-12 rounded bg-gray-700 overflow-hidden">
                      {track.album.images && track.album.images.length > 0 ? (
                        <img
                          src={track.album.images[0].url || "/placeholder.svg"}
                          alt={track.album.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-600">
                          <Music className="h-6 w-6 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-white truncate">{track.name}</h4>
                      <p className="text-sm text-gray-400 truncate">
                        {track.artists.map((artist) => artist.name).join(", ")}
                      </p>
                    </div>
                    <div className="text-gray-400 text-sm">
                      {Math.floor(track.duration_ms / 60000)}:
                      {((track.duration_ms % 60000) / 1000).toFixed(0).padStart(2, "0")}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-gray-400">No top tracks available</div>
            )}
          </CardContent>
        </Card>

        {/* Top Artists */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Top Artists</CardTitle>
            <CardDescription className="text-gray-400">
              Your most listened artists {timeRange.label.toLowerCase()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {data.topArtists.length > 0 ? (
              <div className="space-y-4">
                {data.topArtists.slice(0, 10).map((artist, index) => (
                  <div key={artist.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/50">
                    <div className="text-gray-400 font-mono w-6 text-center">{index + 1}</div>
                    <div className="w-12 h-12 rounded-full bg-gray-700 overflow-hidden">
                      {artist.images && artist.images.length > 0 ? (
                        <img
                          src={artist.images[0].url || "/placeholder.svg"}
                          alt={artist.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-600">
                          <User className="h-6 w-6 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-white truncate">{artist.name}</h4>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {artist.genres.slice(0, 2).map((genre, i) => (
                          <Badge key={i} className="bg-blue-900/50 text-blue-200">
                            {genre}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-gray-400">No top artists available</div>
            )}
          </CardContent>
        </Card>

        {/* Recently Played */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Recently Played</CardTitle>
            <CardDescription className="text-gray-400">Your recently played tracks</CardDescription>
          </CardHeader>
          <CardContent>
            {data.recentlyPlayed.length > 0 ? (
              <div className="space-y-4">
                {data.recentlyPlayed.slice(0, 5).map((track, index) => (
                  <div
                    key={`${track.id}-${index}`}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/50"
                  >
                    <div className="w-10 h-10 rounded bg-gray-700 overflow-hidden">
                      {track.album.images && track.album.images.length > 0 ? (
                        <img
                          src={track.album.images[0].url || "/placeholder.svg"}
                          alt={track.album.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-600">
                          <Music className="h-5 w-5 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-white truncate">{track.name}</h4>
                      <p className="text-xs text-gray-400 truncate">
                        {track.artists.map((artist) => artist.name).join(", ")}
                      </p>
                    </div>
                    <div className="text-gray-500">
                      <Clock className="h-4 w-4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-gray-400">No recently played tracks available</div>
            )}
          </CardContent>
        </Card>

        {/* Playlists */}
        <Card className="bg-gray-800 border-gray-700 md:col-span-2">
          <CardHeader>
            <CardTitle className="text-white">Your Playlists</CardTitle>
            <CardDescription className="text-gray-400">Playlists you've created or followed</CardDescription>
          </CardHeader>
          <CardContent>
            {data.playlists.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {data.playlists.slice(0, 6).map((playlist) => (
                  <div key={playlist.id} className="bg-gray-700/50 rounded-lg overflow-hidden">
                    <div className="h-32 bg-gray-700 relative">
                      {playlist.images && playlist.images.length > 0 ? (
                        <img
                          src={playlist.images[0].url || "/placeholder.svg"}
                          alt={playlist.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-600">
                          <ListMusic className="h-10 w-10 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <h4 className="font-medium text-white truncate">{playlist.name}</h4>
                      <p className="text-xs text-gray-400 mt-1">{playlist.tracks.total} tracks</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-gray-400">No playlists available</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
