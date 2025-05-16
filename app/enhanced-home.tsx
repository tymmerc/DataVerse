"use client"

import Link from "next/link"
import { Github, Mail, Linkedin, Music, Gamepad2, BarChart2, Clock, Users, Headphones } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatedGradientBackground } from "@/components/animated-gradient-background"
import { StatCard } from "@/components/stat-card"
import { FeatureCard } from "@/components/feature-card"

// Ajouter un import pour useAuth
import { useAuth } from "@/components/auth/auth-provider"

// Modifier le composant pour utiliser useAuth
export default function EnhancedHome() {
  const { user, isAuthenticated, connectSpotify } = useAuth()

  return (
    <AnimatedGradientBackground>
      <main className="min-h-screen text-gray-200">
        {/* Hero Section with animated gradient background */}
        <section className="container mx-auto px-4 py-20">
          <div className="flex flex-col items-center text-center">
            <div className="inline-block mb-6 relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 blur-xl opacity-20 animate-pulse"></div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 relative z-10">
                Tyméo MERCIER
              </h1>
            </div>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8 leading-relaxed">
              Data enthusiast and developer passionate about visualizing insights from gaming and music. Exploring the
              intersection of technology and creativity through code.
            </p>
            <div className="flex gap-4 mb-12">
              <a
                href="https://github.com/tymmerc"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="icon"
                  className="border-gray-700 text-gray-400 hover:text-white hover:border-gray-600 hover:bg-gray-800/50 transition-all"
                >
                  <Github className="h-5 w-5" />
                </Button>
              </a>

              <a
                href="https://www.linkedin.com/in/tyméo-mercier-aa9618265/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="icon"
                  className="border-gray-700 text-gray-400 hover:text-white hover:border-gray-600 hover:bg-gray-800/50 transition-all"
                >
                  <Linkedin className="h-5 w-5" />
                </Button>
              </a>
              {/* to do, not working */}
              <a href="mailto:tym.mercier@gmail.com?subject=Contact%20depuis%20Data%20Verse">

                <Button
                  variant="outline"
                  size="icon"
                  className="border-gray-700 text-gray-400 hover:text-white hover:border-gray-600 hover:bg-gray-800/50 transition-all"
                >
                  <Mail className="h-5 w-5" />
                </Button>
              </a>

            </div>

            {/* Ajouter un bouton de connexion Spotify si l'utilisateur est connecté mais n'a pas encore lié Spotify */}
            {isAuthenticated && !user?.spotifyConnected && (
              <Button onClick={connectSpotify} className="mb-8 bg-green-600 hover:bg-green-700 text-white">
                <Music className="mr-2 h-5 w-5" />
                Connect Spotify Account
              </Button>
            )}

            {/* Stats row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl mb-12">
              <StatCard
                title="Tracks Analyzed"
                value={1254}
                icon={Music}
                iconColor="text-green-400"
                valueColor="text-green-300"
              />
              <StatCard
                title="Games Tracked"
                value={387}
                icon={Gamepad2}
                iconColor="text-blue-400"
                valueColor="text-blue-300"
              />
              <StatCard
                title="Data Points"
                value={24689}
                icon={BarChart2}
                iconColor="text-purple-400"
                valueColor="text-purple-300"
              />
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="container mx-auto px-4 py-16 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/0 via-gray-900/80 to-gray-900/0 pointer-events-none"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">Data Projects</h2>
            <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
              Dive into interactive visualizations of your personal data from popular platforms
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Spotify Project Card */}
              <Card className="bg-gray-800/90 border-gray-700 shadow-lg hover:shadow-xl hover:translate-y-[-5px] transition-all duration-300 overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-green-900/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <CardHeader className="relative z-10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-full bg-green-900/50">
                      <Music className="h-5 w-5 text-green-400" />
                    </div>
                    <CardTitle className="text-white text-xl">Spotify Data Visualization</CardTitle>
                  </div>
                  <CardDescription className="text-gray-300">
                    Explore your music listening habits and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="relative rounded-md overflow-hidden mb-4 group-hover:shadow-md transition-all">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <img
                      src="/placeholder.svg?height=200&width=400"
                      alt="Spotify data visualization preview"
                      className="w-full h-48 object-cover transition-transform group-hover:scale-105 duration-500"
                    />
                    <div className="absolute bottom-3 left-3 flex gap-2">
                      <div className="bg-gray-900/80 text-green-400 text-xs px-2 py-1 rounded-full flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>1254 Tracks</span>
                      </div>
                      <div className="bg-gray-900/80 text-green-400 text-xs px-2 py-1 rounded-full flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        <span>187 Artists</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300">
                    Dive into your Spotify listening history, discover your top artists, tracks, and genres through
                    interactive visualizations.
                  </p>
                </CardContent>
                <CardFooter className="relative z-10">
                  <Link href="/spotify" className="w-full">
                    <Button className="w-full bg-green-700 hover:bg-green-800 text-white group-hover:shadow-md transition-all">
                      Explore Spotify Stats
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              {/* League of Legends Project Card */}
              <Card className="bg-gray-800/90 border-gray-700 shadow-lg hover:shadow-xl hover:translate-y-[-5px] transition-all duration-300 overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <CardHeader className="relative z-10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-full bg-blue-900/50">
                      <Gamepad2 className="h-5 w-5 text-blue-400" />
                    </div>
                    <CardTitle className="text-white text-xl">League of Legends Stats</CardTitle>
                  </div>
                  <CardDescription className="text-gray-300">
                    Analyze your gaming performance and progress
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="relative rounded-md overflow-hidden mb-4 group-hover:shadow-md transition-all">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <img
                      src="/placeholder.svg?height=200&width=400"
                      alt="League of Legends stats preview"
                      className="w-full h-48 object-cover transition-transform group-hover:scale-105 duration-500"
                    />
                    <div className="absolute bottom-3 left-3 flex gap-2">
                      <div className="bg-gray-900/80 text-blue-400 text-xs px-2 py-1 rounded-full flex items-center">
                        <Gamepad2 className="h-3 w-3 mr-1" />
                        <span>387 Games</span>
                      </div>
                      <div className="bg-gray-900/80 text-blue-400 text-xs px-2 py-1 rounded-full flex items-center">
                        <BarChart2 className="h-3 w-3 mr-1" />
                        <span>58% Win Rate</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300">
                    Track your League of Legends journey with detailed statistics on your champions, win rates, and
                    match history.
                  </p>
                </CardContent>
                <CardFooter className="relative z-10">
                  <Link href="/league" className="w-full">
                    <Button className="w-full bg-blue-700 hover:bg-blue-800 text-white group-hover:shadow-md transition-all">
                      View League of Legends Data
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">Key Features</h2>
          <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
            Discover what makes this data visualization platform unique
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <FeatureCard
              title="Interactive Charts"
              description="Explore your data through interactive charts and graphs that respond to your input."
              icon={BarChart2}
              iconColor="text-purple-400"
            />
            <FeatureCard
              title="Music Insights"
              description="Understand your music preferences with detailed analysis of your listening habits."
              icon={Headphones}
              iconColor="text-green-400"
            />
            <FeatureCard
              title="Gaming Analytics"
              description="Track your gaming performance over time and identify areas for improvement."
              icon={Gamepad2}
              iconColor="text-blue-400"
            />
          </div>
        </section>

        {/* About Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto bg-gray-800/30 p-8 rounded-xl border border-gray-700/50 backdrop-blur-sm">
            <h2 className="text-3xl font-bold mb-6 text-center text-white">About This Project</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                This website was built to showcase data visualization capabilities using modern web technologies. It
                demonstrates how to fetch, process, and display data from popular platforms like Spotify and League of
                Legends.
              </p>
              <p>
                The project uses Next.js for the framework, Tailwind CSS for styling, and various data visualization
                libraries to create an interactive and engaging user experience.
              </p>
              <p>
                Feel free to explore the different sections and discover insights about music preferences and gaming
                statistics!
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 border-t border-gray-800">
          <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 mb-4 md:mb-0">© {new Date().getFullYear()} John Doe. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors">
                Contact
              </a>
            </div>
          </div>
        </footer>
      </main>
    </AnimatedGradientBackground>
  )
}
