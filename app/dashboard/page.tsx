"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/components/auth/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { UserProfileCard } from "@/components/account/user-profile-card"
import { AccountConnectCard } from "@/components/account/account-connect-card"
import { ArrowLeft, BarChart2, Music, Gamepad2 } from "lucide-react"

export default function DashboardPage() {
  const { user, isLoading, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isLoading, isAuthenticated, router])

  if (isLoading || !user) {
    return (
      <main className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4">
            <svg className="animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
          <p className="text-gray-400">Loading your dashboard...</p>
        </div>
      </main>
    )
  }

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
          <h1 className="text-3xl font-bold text-white">Your Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* User Profile Card */}
          <div className="lg:col-span-1">
            <UserProfileCard />
          </div>

          {/* Connected Services */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-white mb-4">Connected Services</h2>
            <AccountConnectCard type="spotify" />
            <AccountConnectCard type="league" />
          </div>
        </div>

        {/* Data Visualizations */}
        <h2 className="text-2xl font-bold text-white mb-6">Your Data Visualizations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="bg-gray-800 border-gray-700 hover:shadow-lg transition-all">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-full bg-green-900/50">
                  <Music className="h-5 w-5 text-green-400" />
                </div>
                <CardTitle className="text-white">Spotify Stats</CardTitle>
              </div>
              <CardDescription className="text-gray-400">Visualize your music listening habits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-700 rounded-md flex items-center justify-center mb-4">
                <BarChart2 className="h-12 w-12 text-gray-500" />
              </div>
              <p className="text-gray-300 text-sm">
                {user.spotifyConnected
                  ? "Your Spotify account is connected. View your personalized music stats."
                  : "Connect your Spotify account to view your music stats."}
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/spotify" className="w-full">
                <Button className="w-full bg-green-700 hover:bg-green-800 text-white" disabled={!user.spotifyConnected}>
                  View Spotify Stats
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="bg-gray-800 border-gray-700 hover:shadow-lg transition-all">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-full bg-blue-900/50">
                  <Gamepad2 className="h-5 w-5 text-blue-400" />
                </div>
                <CardTitle className="text-white">League of Legends Stats</CardTitle>
              </div>
              <CardDescription className="text-gray-400">Track your gaming performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-700 rounded-md flex items-center justify-center mb-4">
                <BarChart2 className="h-12 w-12 text-gray-500" />
              </div>
              <p className="text-gray-300 text-sm">
                {user.leagueConnected
                  ? "Your League of Legends account is connected. View your gaming stats."
                  : "Connect your League of Legends account to view your gaming stats."}
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/league" className="w-full">
                <Button className="w-full bg-blue-700 hover:bg-blue-800 text-white" disabled={!user.leagueConnected}>
                  View League Stats
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="bg-gray-800 border-gray-700 hover:shadow-lg transition-all">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-full bg-purple-900/50">
                  <BarChart2 className="h-5 w-5 text-purple-400" />
                </div>
                <CardTitle className="text-white">Combined Analytics</CardTitle>
              </div>
              <CardDescription className="text-gray-400">Cross-platform insights and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-700 rounded-md flex items-center justify-center mb-4">
                <BarChart2 className="h-12 w-12 text-gray-500" />
              </div>
              <p className="text-gray-300 text-sm">
                {user.spotifyConnected && user.leagueConnected
                  ? "Both accounts connected. View combined analytics."
                  : "Connect both accounts to view combined analytics."}
              </p>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-purple-700 hover:bg-purple-800 text-white"
                disabled={!user.spotifyConnected || !user.leagueConnected}
              >
                View Combined Analytics
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  )
}
