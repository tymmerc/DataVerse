"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"

// In a real application, this component would handle the Spotify OAuth flow
// For this demo, it's just a placeholder to show how it would work

export default function SpotifyAuthButton() {
  const [isLoading, setIsLoading] = useState(false)

  const handleAuth = () => {
    setIsLoading(true)

    // In a real application, you would redirect to the Spotify authorization page
    // const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
    // const redirectUri = encodeURIComponent(process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI || '');
    // const scopes = encodeURIComponent('user-read-private user-read-email user-top-read user-read-recently-played');
    // const spotifyAuthUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopes}`;
    // window.location.href = spotifyAuthUrl;

    // For this demo, we'll just simulate a delay and then stop loading
    setTimeout(() => {
      setIsLoading(false)
      alert("This is a demo. In a real application, you would be redirected to Spotify for authentication.")
    }, 2000)
  }

  return (
    <Button onClick={handleAuth} disabled={isLoading} className="bg-green-600 hover:bg-green-700">
      {isLoading ? "Connecting..." : "Connect Spotify Account"}
    </Button>
  )
}
