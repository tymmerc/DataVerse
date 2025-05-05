"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/components/auth/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { AccountConnectCard } from "@/components/account/account-connect-card"

export default function AccountSettingsPage() {
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
          <p className="text-gray-400">Loading your settings...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-950 text-gray-200">
      <div className="container mx-auto px-4 py-8">
        {/* Header with back button */}
        <div className="flex items-center mb-8">
          <Link href="/dashboard">
            <Button variant="ghost" className="mr-4 text-gray-300 hover:text-white hover:bg-gray-800">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-white">Account Settings</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Account Information */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-800 border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-white">Account Information</CardTitle>
                <CardDescription className="text-gray-400">Your personal account details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-400">Name</p>
                    <p className="text-gray-200">{user.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="text-gray-200">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Account ID</p>
                    <p className="text-gray-200">{user.id}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Connected Services */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-white mb-4">Connected Services</h2>
            <AccountConnectCard type="spotify" />
            <AccountConnectCard type="league" />
          </div>
        </div>
      </div>
    </main>
  )
}
