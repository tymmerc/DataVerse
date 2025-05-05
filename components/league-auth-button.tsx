"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"

// In a real application, this component would handle the Riot Games API authentication
// For this demo, it's just a placeholder to show how it would work

export default function LeagueAuthButton() {
  const [isLoading, setIsLoading] = useState(false)

  const handleAuth = () => {
    setIsLoading(true)

    // In a real application, you would need to implement a server-side flow
    // since Riot Games API doesn't support client-side authentication
    // You would typically:
    // 1. Have the user enter their Riot ID
    // 2. Make a server-side request to fetch their data using your API key

    // For this demo, we'll just simulate a delay and then stop loading
    setTimeout(() => {
      setIsLoading(false)
      alert("This is a demo. In a real application, you would enter your Riot ID to fetch your data.")
    }, 2000)
  }

  return (
    <Button onClick={handleAuth} disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
      {isLoading ? "Connecting..." : "Connect League Account"}
    </Button>
  )
}
