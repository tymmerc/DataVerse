"use client"

import { useAuth } from "@/components/auth/auth-provider"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Loader2, LogOut, Settings } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function UserProfileCard() {
  const { user, signOut } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignOut = async () => {
    setIsLoading(true)
    try {
      await signOut()
      router.push("/")
    } catch (error) {
      console.error("Error signing out:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) return null

  return (
    <Card className="bg-gray-800 border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-white">Your Profile</CardTitle>
        <CardDescription className="text-gray-400">Manage your account and connected services</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <Avatar className="h-24 w-24 mb-4">
          <AvatarImage src={user.image || ""} alt={user.name} />
          <AvatarFallback className="bg-blue-900 text-blue-100 text-xl">
            {user.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <h3 className="text-xl font-bold text-white mb-1">{user.name}</h3>
        <p className="text-gray-400 mb-4">{user.email}</p>

        <div className="w-full bg-gray-700/50 p-4 rounded-md space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-300">Spotify</span>
            <span className={user.spotifyConnected ? "text-green-400" : "text-gray-500"}>
              {user.spotifyConnected ? "Connected" : "Not connected"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">League of Legends</span>
            <span className={user.leagueConnected ? "text-blue-400" : "text-gray-500"}>
              {user.leagueConnected ? "Connected" : "Not connected"}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          className="border-gray-600 text-gray-300 hover:bg-gray-700"
          onClick={() => router.push("/account/settings")}
        >
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
        <Button
          variant="destructive"
          className="bg-red-900/80 hover:bg-red-900 text-white"
          onClick={handleSignOut}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing out...
            </>
          ) : (
            <>
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
