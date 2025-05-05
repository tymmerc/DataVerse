// This file contains mock data for Spotify
// In a real application, you would replace this with actual API calls

export interface Track {
  id: string
  name: string
  artist: string
  album: string
  albumCover: string
  playCount: number
  duration: number
}

export interface Artist {
  id: string
  name: string
  image: string
  playCount: number
  genres: string[]
}

export interface RecentlyPlayed {
  id: string
  name: string
  artist: string
  album: string
  albumCover: string
  playedAt: string
}

export interface Genre {
  name: string
  value: number
}

// Function to simulate fetching top tracks
export async function getTopTracks(timeRange = "short_term"): Promise<Track[]> {
  // In a real app, this would be an API call like:
  // const response = await fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=10`, {
  //   headers: {
  //     'Authorization': `Bearer ${accessToken}`
  //   }
  // });
  // const data = await response.json();
  // return data.items.map(item => ({
  //   id: item.id,
  //   name: item.name,
  //   artist: item.artists[0].name,
  //   album: item.album.name,
  //   albumCover: item.album.images[0].url,
  //   playCount: Math.floor(Math.random() * 100) + 1, // Spotify doesn't provide play counts
  //   duration: item.duration_ms
  // }));

  // Mock data
  return [
    {
      id: "1",
      name: "Blinding Lights",
      artist: "The Weeknd",
      album: "After Hours",
      albumCover: "/placeholder.svg?height=60&width=60",
      playCount: 87,
      duration: 200000,
    },
    {
      id: "2",
      name: "Save Your Tears",
      artist: "The Weeknd",
      album: "After Hours",
      albumCover: "/placeholder.svg?height=60&width=60",
      playCount: 76,
      duration: 215000,
    },
    {
      id: "3",
      name: "Levitating",
      artist: "Dua Lipa",
      album: "Future Nostalgia",
      albumCover: "/placeholder.svg?height=60&width=60",
      playCount: 65,
      duration: 203000,
    },
    {
      id: "4",
      name: "Stay",
      artist: "The Kid LAROI, Justin Bieber",
      album: "F*CK LOVE 3: OVER YOU",
      albumCover: "/placeholder.svg?height=60&width=60",
      playCount: 58,
      duration: 141000,
    },
    {
      id: "5",
      name: "Good 4 U",
      artist: "Olivia Rodrigo",
      album: "SOUR",
      albumCover: "/placeholder.svg?height=60&width=60",
      playCount: 52,
      duration: 178000,
    },
  ]
}

// Function to simulate fetching top artists
export async function getTopArtists(timeRange = "short_term"): Promise<Artist[]> {
  // Mock data
  return [
    {
      id: "1",
      name: "The Weeknd",
      image: "/placeholder.svg?height=60&width=60",
      playCount: 163,
      genres: ["pop", "r&b"],
    },
    {
      id: "2",
      name: "Dua Lipa",
      image: "/placeholder.svg?height=60&width=60",
      playCount: 142,
      genres: ["pop", "dance pop"],
    },
    {
      id: "3",
      name: "Taylor Swift",
      image: "/placeholder.svg?height=60&width=60",
      playCount: 128,
      genres: ["pop", "country pop"],
    },
    {
      id: "4",
      name: "Drake",
      image: "/placeholder.svg?height=60&width=60",
      playCount: 115,
      genres: ["rap", "hip hop"],
    },
    {
      id: "5",
      name: "Billie Eilish",
      image: "/placeholder.svg?height=60&width=60",
      playCount: 97,
      genres: ["pop", "electropop"],
    },
  ]
}

// Function to simulate fetching recently played tracks
export async function getRecentlyPlayed(): Promise<RecentlyPlayed[]> {
  // Mock data
  return [
    {
      id: "1",
      name: "As It Was",
      artist: "Harry Styles",
      album: "Harry's House",
      albumCover: "/placeholder.svg?height=60&width=60",
      playedAt: "Today, 10:23 AM",
    },
    {
      id: "2",
      name: "Running Up That Hill",
      artist: "Kate Bush",
      album: "Hounds of Love",
      albumCover: "/placeholder.svg?height=60&width=60",
      playedAt: "Today, 9:45 AM",
    },
    {
      id: "3",
      name: "Heat Waves",
      artist: "Glass Animals",
      album: "Dreamland",
      albumCover: "/placeholder.svg?height=60&width=60",
      playedAt: "Yesterday, 8:30 PM",
    },
    {
      id: "4",
      name: "Shivers",
      artist: "Ed Sheeran",
      album: "=",
      albumCover: "/placeholder.svg?height=60&width=60",
      playedAt: "Yesterday, 7:15 PM",
    },
    {
      id: "5",
      name: "Enemy",
      artist: "Imagine Dragons",
      album: "Mercury - Act 1",
      albumCover: "/placeholder.svg?height=60&width=60",
      playedAt: "Yesterday, 6:00 PM",
    },
  ]
}

// Function to simulate fetching genre data
export async function getGenreData(): Promise<Genre[]> {
  // Mock data
  return [
    { name: "Pop", value: 45 },
    { name: "Hip Hop", value: 25 },
    { name: "Rock", value: 15 },
    { name: "Electronic", value: 10 },
    { name: "Other", value: 5 },
  ]
}
