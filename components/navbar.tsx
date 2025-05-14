"use client"

import Link from "next/link"
import { useAuth } from "@/components/auth/auth-provider"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, Settings, BarChart2 } from "lucide-react"

export function Navbar() {
  const { user, isAuthenticated, signOut } = useAuth()

  return (
    <header className="border-b border-gray-800 bg-gray-900/90 backdrop-blur-sm sticky top-0 z-40 w-full">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-white">
          Data<span className="text-blue-400">Verse</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-gray-300 hover:text-white transition-colors">
            Home
          </Link>
          <Link href="/spotify" className="text-gray-300 hover:text-white transition-colors">
            Spotify
          </Link>
          <Link href="/league" className="text-gray-300 hover:text-white transition-colors">
            League of Legends
          </Link>
          <Link href="/about-me" className="text-gray-300 hover:text-white transition-colors">
            About me
          </Link>
        </nav>

        <div>
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user?.image || ""} alt={user?.name || ""} />
                    <AvatarFallback className="bg-blue-900 text-blue-100">
                      {user?.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-gray-800 border-gray-700 text-gray-200" align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer" asChild>
                  <Link href="/dashboard">
                    <BarChart2 className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer" asChild>
                  <Link href="/account/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem
                  className="hover:bg-gray-700 cursor-pointer text-red-400 hover:text-red-300"
                  onClick={() => signOut()}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
              <Link href="/login">
                <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}