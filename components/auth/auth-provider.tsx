"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type User = {
  id: string
  name: string
  email: string
  image?: string
  spotifyConnected: boolean
  spotifyToken?: string
  spotifyRefreshToken?: string
  spotifyTokenExpiry?: number
  leagueConnected: boolean
  leagueRegion?: string
  leagueSummonerName?: string
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, name: string) => Promise<void>
  signOut: () => Promise<void>
  connectSpotify: () => Promise<void>
  disconnectSpotify: () => Promise<void>
  connectLeague: (region: string, summonerName: string) => Promise<void>
  disconnectLeague: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        // In a real app, you would fetch the user from your backend
        // For demo purposes, we'll check localStorage
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser)

          // Check if Spotify was just connected (from URL parameter)
          const urlParams = new URLSearchParams(window.location.search)
          const spotifyConnected = urlParams.get("spotify_connected") === "true"

          if (spotifyConnected) {
            // Update user with Spotify connection
            const updatedUser = {
              ...parsedUser,
              spotifyConnected: true,
              spotifyToken: "Connected via OAuth",
            }
            setUser(updatedUser)
            localStorage.setItem("user", JSON.stringify(updatedUser))

            // Clean up URL
            window.history.replaceState({}, document.title, window.location.pathname)
          } else {
            setUser(parsedUser)
          }
        }
      } catch (error) {
        console.error("Authentication error:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const signIn = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // In a real app, you would call your backend API
      // For demo purposes, we'll simulate a successful login
      const mockUser: User = {
        id: "user_" + Math.random().toString(36).substr(2, 9),
        name: email.split("@")[0],
        email,
        spotifyConnected: false,
        leagueConnected: false,
      }

      setUser(mockUser)
      localStorage.setItem("user", JSON.stringify(mockUser))
    } catch (error) {
      console.error("Sign in error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signUp = async (email: string, password: string, name: string) => {
    setIsLoading(true)
    try {
      // In a real app, you would call your backend API
      // For demo purposes, we'll simulate a successful registration
      const mockUser: User = {
        id: "user_" + Math.random().toString(36).substr(2, 9),
        name,
        email,
        spotifyConnected: false,
        leagueConnected: false,
      }

      setUser(mockUser)
      localStorage.setItem("user", JSON.stringify(mockUser))
    } catch (error) {
      console.error("Sign up error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = async () => {
    setIsLoading(true)
    try {
      // In a real app, you would call your backend API
      // For demo purposes, we'll just clear localStorage
      localStorage.removeItem("user")
      setUser(null)
    } catch (error) {
      console.error("Sign out error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Modifier la fonction connectSpotify pour rediriger vers notre API
  const connectSpotify = async () => {
    if (!user) return

    try {
      // Redirect to our Spotify OAuth endpoint
      window.location.href = "/api/auth/spotify"
    } catch (error) {
      console.error("Connect Spotify error:", error)
      throw error
    }
  }

  const disconnectSpotify = async () => {
    if (!user) return

    try {
      // In a real app, you would call your backend API to revoke tokens
      // For demo purposes, we'll just update the user object
      const updatedUser = {
        ...user,
        spotifyConnected: false,
        spotifyToken: undefined,
        spotifyRefreshToken: undefined,
        spotifyTokenExpiry: undefined,
      }

      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))
    } catch (error) {
      console.error("Disconnect Spotify error:", error)
      throw error
    }
  }

  const connectLeague = async (region: string, summonerName: string) => {
    if (!user) return

    try {
      // In a real app, you would validate the summoner name with Riot API
      // For demo purposes, we'll simulate a successful connection
      const updatedUser = {
        ...user,
        leagueConnected: true,
        leagueRegion: region,
        leagueSummonerName: summonerName,
      }

      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))
    } catch (error) {
      console.error("Connect League error:", error)
      throw error
    }
  }

  const disconnectLeague = async () => {
    if (!user) return

    try {
      // In a real app, you would call your backend API
      // For demo purposes, we'll just update the user object
      const updatedUser = {
        ...user,
        leagueConnected: false,
        leagueRegion: undefined,
        leagueSummonerName: undefined,
      }

      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))
    } catch (error) {
      console.error("Disconnect League error:", error)
      throw error
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        signIn,
        signUp,
        signOut,
        connectSpotify,
        disconnectSpotify,
        connectLeague,
        disconnectLeague,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
