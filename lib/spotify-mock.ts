// Spotify API client for real data

// Environment variables
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
const SPOTIFY_REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI
const NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

// Types for Spotify API responses
export interface SpotifyTokenResponse {
  access_token: string
  token_type: string
  expires_in: number
  refresh_token?: string
  scope: string
}

export interface SpotifyUserProfile {
  country: string
  display_name: string
  email: string
  explicit_content: {
    filter_enabled: boolean
    filter_locked: boolean
  }
  external_urls: {
    spotify: string
  }
  followers: {
    href: string | null
    total: number
  }
  href: string
  id: string
  images: Array<{
    url: string
    height: number
    width: number
  }>
  product: string
  type: string
  uri: string
}

export interface SpotifyTrack {
  album: {
    album_type: string
    artists: Array<{
      external_urls: {
        spotify: string
      }
      href: string
      id: string
      name: string
      type: string
      uri: string
    }>
    available_markets: string[]
    external_urls: {
      spotify: string
    }
    href: string
    id: string
    images: Array<{
      height: number
      url: string
      width: number
    }>
    name: string
    release_date: string
    release_date_precision: string
    total_tracks: number
    type: string
    uri: string
  }
  artists: Array<{
    external_urls: {
      spotify: string
    }
    href: string
    id: string
    name: string
    type: string
    uri: string
  }>
  available_markets: string[]
  disc_number: number
  duration_ms: number
  explicit: boolean
  external_ids: {
    isrc: string
  }
  external_urls: {
    spotify: string
  }
  href: string
  id: string
  is_local: boolean
  name: string
  popularity: number
  preview_url: string
  track_number: number
  type: string
  uri: string
}

export interface SpotifyArtist {
  external_urls: {
    spotify: string
  }
  followers: {
    href: string | null
    total: number
  }
  genres: string[]
  href: string
  id: string
  images: Array<{
    url: string
    height: number
    width: number
  }>
  name: string
  popularity: number
  type: string
  uri: string
}

export interface SpotifyPlaylist {
  collaborative: boolean
  description: string
  external_urls: {
    spotify: string
  }
  href: string
  id: string
  images: Array<{
    url: string
    height: number
    width: number
  }>
  name: string
  owner: {
    external_urls: {
      spotify: string
    }
    followers: {
      href: string
      total: number
    }
    href: string
    id: string
    type: string
    uri: string
    display_name: string
  }
  public: boolean
  snapshot_id: string
  tracks: {
    href: string
    total: number
  }
  type: string
  uri: string
}

export interface SpotifyPagingObject<T> {
  href: string
  items: T[]
  limit: number
  next: string | null
  offset: number
  previous: string | null
  total: number
}

export interface SpotifyTimeRange {
  name: string
  value: "short_term" | "medium_term" | "long_term"
  label: string
}

export interface SpotifyUserData {
  profile: SpotifyUserProfile | null
  topTracks: SpotifyTrack[]
  topArtists: SpotifyArtist[]
  recentlyPlayed: SpotifyTrack[]
  playlists: SpotifyPlaylist[]
  timeRange: SpotifyTimeRange
}

// Default time ranges for Spotify stats
export const timeRanges: SpotifyTimeRange[] = [
  { name: "Last 4 Weeks", value: "short_term", label: "Last Month" },
  { name: "Last 6 Months", value: "medium_term", label: "Last 6 Months" },
  { name: "All Time", value: "long_term", label: "All Time" },
]

// Get Spotify authorization URL
export function getSpotifyAuthUrl(): string {
  const scopes = [
    "user-read-private",
    "user-read-email",
    "user-top-read",
    "user-read-recently-played",
    "playlist-read-private",
    "playlist-read-collaborative",
  ]

  const params = new URLSearchParams({
    client_id: SPOTIFY_CLIENT_ID || "",
    response_type: "code",
    redirect_uri: SPOTIFY_REDIRECT_URI || `${NEXT_PUBLIC_APP_URL}/api/spotify/callback`,
    scope: scopes.join(" "),
    show_dialog: "true",
  })

  return `https://accounts.spotify.com/authorize?${params.toString()}`
}

// Exchange authorization code for access token
export async function getSpotifyToken(code: string): Promise<SpotifyTokenResponse> {
  const params = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: SPOTIFY_REDIRECT_URI || `${NEXT_PUBLIC_APP_URL}/api/spotify/callback`,
  })

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString("base64")}`,
    },
    body: params.toString(),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(`Failed to get Spotify token: ${errorData.error_description || response.statusText}`)
  }

  return response.json()
}

// Refresh access token
export async function refreshSpotifyToken(refreshToken: string): Promise<SpotifyTokenResponse> {
  const params = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  })

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString("base64")}`,
    },
    body: params.toString(),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(`Failed to refresh Spotify token: ${errorData.error_description || response.statusText}`)
  }

  return response.json()
}

// Get user profile
export async function getSpotifyUserProfile(accessToken: string): Promise<SpotifyUserProfile> {
  const response = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(`Failed to get user profile: ${errorData.error?.message || response.statusText}`)
  }

  return response.json()
}

// Get user's top tracks
export async function getSpotifyTopTracks(
  accessToken: string,
  timeRange = "medium_term",
  limit = 10,
): Promise<SpotifyPagingObject<SpotifyTrack>> {
  const response = await fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(`Failed to get top tracks: ${errorData.error?.message || response.statusText}`)
  }

  return response.json()
}

// Get user's top artists
export async function getSpotifyTopArtists(
  accessToken: string,
  timeRange = "medium_term",
  limit = 10,
): Promise<SpotifyPagingObject<SpotifyArtist>> {
  const response = await fetch(`https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}&limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(`Failed to get top artists: ${errorData.error?.message || response.statusText}`)
  }

  return response.json()
}

// Get user's recently played tracks
export async function getSpotifyRecentlyPlayed(
  accessToken: string,
  limit = 10,
): Promise<{ items: Array<{ track: SpotifyTrack; played_at: string }> }> {
  const response = await fetch(`https://api.spotify.com/v1/me/player/recently-played?limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(`Failed to get recently played: ${errorData.error?.message || response.statusText}`)
  }

  return response.json()
}

// Get user's playlists
export async function getSpotifyPlaylists(
  accessToken: string,
  limit = 10,
): Promise<SpotifyPagingObject<SpotifyPlaylist>> {
  const response = await fetch(`https://api.spotify.com/v1/me/playlists?limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(`Failed to get playlists: ${errorData.error?.message || response.statusText}`)
  }

  return response.json()
}

// Get all user data in one call
export async function getSpotifyUserData(
  accessToken: string,
  timeRange: SpotifyTimeRange = timeRanges[1], // Default to medium_term
): Promise<SpotifyUserData> {
  try {
    // Fetch all data in parallel
    const [profile, topTracksData, topArtistsData, recentlyPlayedData, playlistsData] = await Promise.all([
      getSpotifyUserProfile(accessToken),
      getSpotifyTopTracks(accessToken, timeRange.value, 50),
      getSpotifyTopArtists(accessToken, timeRange.value, 50),
      getSpotifyRecentlyPlayed(accessToken, 50),
      getSpotifyPlaylists(accessToken, 50),
    ])

    // Extract tracks from recently played items
    const recentlyPlayed = recentlyPlayedData.items.map((item) => item.track)

    return {
      profile,
      topTracks: topTracksData.items,
      topArtists: topArtistsData.items,
      recentlyPlayed,
      playlists: playlistsData.items,
      timeRange,
    }
  } catch (error) {
    console.error("Error fetching Spotify user data:", error)
    throw error
  }
}

// Update the getMySpotifyData function to provide better fallback data
export async function getMySpotifyData(): Promise<SpotifyUserData> {
  try {
    console.log("Getting owner Spotify data")
    console.log("Environment variables available:", {
      clientId: !!process.env.SPOTIFY_CLIENT_ID,
      clientSecret: !!process.env.SPOTIFY_CLIENT_SECRET,
      redirectUri: !!process.env.SPOTIFY_REDIRECT_URI,
    })

    // Check if we have the required environment variables
    if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET) {
      console.log("Missing required environment variables, returning fallback data")
      return getFallbackData()
    }

    // Try to get a token using client credentials flow
    try {
      const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString("base64")}`,
        },
        body: new URLSearchParams({
          grant_type: "client_credentials",
        }).toString(),
      })

      if (!tokenResponse.ok) {
        const errorText = await tokenResponse.text()
        console.error("Failed to get token:", tokenResponse.status, errorText)
        return getFallbackData()
      }

      const tokenData = await tokenResponse.json()
      const accessToken = tokenData.access_token

      console.log("Successfully obtained client credentials token")

      // For now, return fallback data since client credentials can't access user data
      // In a real implementation, you would use a stored refresh token for your account
      return getFallbackData()
    } catch (error) {
      console.error("Error getting client credentials token:", error)
      return getFallbackData()
    }
  } catch (error) {
    console.error("Error in getMySpotifyData:", error)
    return getFallbackData()
  }
}

// Helper function to provide fallback data
function getFallbackData(): SpotifyUserData {
  return {
    profile: {
      country: "US",
      display_name: "Demo User",
      email: "demo@example.com",
      explicit_content: {
        filter_enabled: false,
        filter_locked: false,
      },
      external_urls: {
        spotify: "https://open.spotify.com/user/demo",
      },
      followers: {
        href: null,
        total: 42,
      },
      href: "https://api.spotify.com/v1/users/demo",
      id: "demo",
      images: [
        {
          url: "/placeholder.svg?height=300&width=300",
          height: 300,
          width: 300,
        },
      ],
      product: "premium",
      type: "user",
      uri: "spotify:user:demo",
    },
    topTracks: [
      {
        album: {
          album_type: "album",
          artists: [
            {
              external_urls: {
                spotify: "https://open.spotify.com/artist/demo",
              },
              href: "https://api.spotify.com/v1/artists/demo",
              id: "demo1",
              name: "Artist 1",
              type: "artist",
              uri: "spotify:artist:demo1",
            },
          ],
          available_markets: ["US"],
          external_urls: {
            spotify: "https://open.spotify.com/album/demo",
          },
          href: "https://api.spotify.com/v1/albums/demo",
          id: "album1",
          images: [
            {
              height: 300,
              url: "/placeholder.svg?height=300&width=300",
              width: 300,
            },
          ],
          name: "Album 1",
          release_date: "2023-01-01",
          release_date_precision: "day",
          total_tracks: 12,
          type: "album",
          uri: "spotify:album:demo",
        },
        artists: [
          {
            external_urls: {
              spotify: "https://open.spotify.com/artist/demo",
            },
            href: "https://api.spotify.com/v1/artists/demo",
            id: "artist1",
            name: "Artist 1",
            type: "artist",
            uri: "spotify:artist:demo",
          },
        ],
        available_markets: ["US"],
        disc_number: 1,
        duration_ms: 180000,
        explicit: false,
        external_ids: {
          isrc: "DEMO123",
        },
        external_urls: {
          spotify: "https://open.spotify.com/track/demo",
        },
        href: "https://api.spotify.com/v1/tracks/demo",
        id: "track1",
        is_local: false,
        name: "Track 1",
        popularity: 80,
        preview_url: "https://example.com/preview.mp3",
        track_number: 1,
        type: "track",
        uri: "spotify:track:demo",
      },
      // Add more sample tracks as needed
    ],
    topArtists: [
      {
        external_urls: {
          spotify: "https://open.spotify.com/artist/demo",
        },
        followers: {
          href: null,
          total: 1000000,
        },
        genres: ["pop", "rock"],
        href: "https://api.spotify.com/v1/artists/demo",
        id: "artist1",
        images: [
          {
            url: "/placeholder.svg?height=300&width=300",
            height: 300,
            width: 300,
          },
        ],
        name: "Artist 1",
        popularity: 90,
        type: "artist",
        uri: "spotify:artist:demo",
      },
      // Add more sample artists as needed
    ],
    recentlyPlayed: [
      // Use the same track format as topTracks
    ],
    playlists: [
      {
        collaborative: false,
        description: "Sample playlist description",
        external_urls: {
          spotify: "https://open.spotify.com/playlist/demo",
        },
        href: "https://api.spotify.com/v1/playlists/demo",
        id: "playlist1",
        images: [
          {
            url: "/placeholder.svg?height=300&width=300",
            height: 300,
            width: 300,
          },
        ],
        name: "Playlist 1",
        owner: {
          external_urls: {
            spotify: "https://open.spotify.com/user/demo",
          },
          followers: {
            href: String,
            total: 42,
          },
          href: "https://api.spotify.com/v1/users/demo",
          id: "demo",
          type: "user",
          uri: "spotify:user:demo",
          display_name: "Demo User",
        },
        public: true,
        snapshot_id: "demo123",
        tracks: {
          href: "https://api.spotify.com/v1/playlists/demo/tracks",
          total: 25,
        },
        type: "playlist",
        uri: "spotify:playlist:demo",
      },
      // Add more sample playlists as needed
    ],
    timeRange: timeRanges[1],
  }
}
