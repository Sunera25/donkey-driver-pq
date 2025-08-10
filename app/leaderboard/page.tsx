"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, TrendingDown, Calendar, MapPin, Filter, Loader2, AlertTriangle, ExternalLink, Play } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { leaderboardAPI, type WorstDriver } from "@/lib/api"
import Link from "next/link"

// Carousel Component for Top 3
function CarouselSection({ drivers, getRankIcon }: { drivers: WorstDriver[], getRankIcon: (rank: number) => JSX.Element }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (drivers.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % drivers.length)
      }, 3000) // Auto-slide every 3 seconds
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [drivers.length])

  const handleManualSlide = (index: number) => {
    setCurrentIndex(index)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      // Restart auto-sliding after manual interaction
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % drivers.length)
      }, 3000)
    }
  }

  if (drivers.length === 0) return null

  return (
    <div className="mb-8">
      <h3 className="text-2xl font-bold text-center text-black mb-8">Hall of Shame - Top 3</h3>
      
      {/* Mobile Carousel */}
      <div className="md:hidden relative">
        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {drivers.map((driver, index) => (
              <div key={driver.id} className="w-full flex-shrink-0 px-4">
                <Card className={`border-3 ${
                  driver.rank === 1
                    ? "border-yellow-500 bg-yellow-50"
                    : driver.rank === 2
                      ? "border-yellow-400 bg-yellow-25"
                      : "border-yellow-300 bg-white"
                } shadow-lg rounded-2xl`}>
                  <CardHeader className={`${
                    driver.rank === 1 ? "bg-yellow-500" : driver.rank === 2 ? "bg-yellow-400" : "bg-yellow-300"
                  } text-black text-center p-4 rounded-t-2xl`}>
                    <div className="flex justify-center mb-2">{getRankIcon(driver.rank)}</div>
                    <CardTitle className="text-2xl">
                      <Link
                        href={`/driver/${driver.id}`}
                        className="hover:underline cursor-pointer flex items-center justify-center space-x-2 text-black hover:text-gray-800 transition-colors"
                      >
                        <span>{driver.id}</span>
                        <ExternalLink className="h-5 w-5" />
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 text-center">
                    <div className="space-y-3">
                      <div className="text-3xl font-bold text-black">{driver.violations}</div>
                      <div className="text-gray-600">Violations</div>
                      <Badge className="text-lg px-3 py-1 bg-black text-yellow-400 hover:bg-gray-800">
                        {driver.points} Donkey Points
                      </Badge>
                      <div className="flex items-center justify-center space-x-1 text-sm text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>{driver.location}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
        
        {/* Carousel Indicators */}
        {drivers.length > 1 && (
          <div className="flex justify-center space-x-2 mt-4">
            {drivers.map((_, index) => (
              <button
                key={index}
                onClick={() => handleManualSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? "bg-yellow-500" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Desktop Grid */}
      <div className="hidden md:grid grid-cols-3 gap-6 max-w-4xl mx-auto">
        {drivers.map((driver, index) => (
          <Card
            key={driver.id}
            className={`border-3 ${
              index === 0
                ? "border-yellow-500 transform scale-105 bg-yellow-50"
                : index === 1
                  ? "border-yellow-400 bg-yellow-25"
                  : "border-yellow-300 bg-white"
            } shadow-lg rounded-2xl`}
          >
            <CardHeader
              className={`${
                index === 0 ? "bg-yellow-500" : index === 1 ? "bg-yellow-400" : "bg-yellow-300"
              } text-black text-center p-4 rounded-t-2xl`}
            >
              <div className="flex justify-center mb-2">{getRankIcon(driver.rank)}</div>
              <CardTitle className="text-2xl">
                <Link
                  href={`/driver/${driver.id}`}
                  className="hover:underline cursor-pointer flex items-center justify-center space-x-2 text-black hover:text-gray-800 transition-colors"
                >
                  <span>{driver.id}</span>
                  <ExternalLink className="h-5 w-5" />
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 text-center">
              <div className="space-y-3">
                <div className="text-3xl font-bold text-black">{driver.violations}</div>
                <div className="text-gray-600">Violations</div>
                <Badge className="text-lg px-3 py-1 bg-black text-yellow-400 hover:bg-gray-800">
                  {driver.points} Donkey Points
                </Badge>
                <div className="flex items-center justify-center space-x-1 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{driver.location}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default function LeaderboardPage() {
  const [worstDrivers, setWorstDrivers] = useState<WorstDriver[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [timeFilter, setTimeFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")
  const [sortBy, setSortBy] = useState("violations")

  useEffect(() => {
    fetchWorstDrivers()
  }, [])

  const fetchWorstDrivers = async () => {
    try {
      setLoading(true)
      const data = await leaderboardAPI.getWorstDrivers()
      setWorstDrivers(data)
    } catch (err) {
      setError("Failed to fetch leaderboard data")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-6 w-6 text-yellow-500" />
    if (rank === 2) return <Trophy className="h-6 w-6 text-gray-400" />
    if (rank === 3) return <Trophy className="h-6 w-6 text-amber-600" />
    return <span className="text-2xl font-bold text-black">#{rank}</span>
  }

  const getRankBadge = (rank: number) => {
    if (rank === 1) return "bg-yellow-500 text-black"
    if (rank === 2) return "bg-yellow-400 text-black"
    if (rank === 3) return "bg-yellow-300 text-black"
    return "bg-black text-yellow-400"
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white pb-20 md:pb-0">
        <Navbar />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-8 w-8 animate-spin text-yellow-400" />
            <span className="text-xl">Loading leaderboard...</span>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white pb-20 md:pb-0">
        <Navbar />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-black mb-2">Error Loading Leaderboard</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={fetchWorstDrivers} className="bg-yellow-400 hover:bg-yellow-500 text-black">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white pb-20 md:pb-0">
      <Navbar />

      <div className="container mx-auto px-4 py-8">

        {/* Stats Summary - Moved to top and made smaller */}
        <div className="mb-8 grid grid-cols-2 md:grid-cols-4 gap-3">
          <Card className="text-center border-yellow-400 rounded-xl">
            <CardContent className="p-3">
              <div className="text-xl font-bold text-black">{worstDrivers.length}</div>
              <div className="text-gray-600 text-sm">Total Offenders</div>
            </CardContent>
          </Card>
          <Card className="text-center border-yellow-400 rounded-xl">
            <CardContent className="p-3">
              <div className="text-xl font-bold text-black">
                {worstDrivers.reduce((sum, driver) => sum + driver.violations, 0)}
              </div>
              <div className="text-gray-600 text-sm">Total Violations</div>
            </CardContent>
          </Card>
          <Card className="text-center border-yellow-400 rounded-xl">
            <CardContent className="p-3">
              <div className="text-xl font-bold text-black">
                {worstDrivers.reduce((sum, driver) => sum + driver.points, 0)}
              </div>
              <div className="text-gray-600 text-sm">Total Donkey Points</div>
            </CardContent>
          </Card>
          <Card className="text-center border-yellow-400 rounded-xl">
            <CardContent className="p-3">
              <div className="text-xl font-bold text-black">23%</div>
              <div className="text-gray-600 text-sm">Repeat Rate</div>
            </CardContent>
          </Card>
        </div>


        {/* Top 3 Carousel */}
        <CarouselSection drivers={worstDrivers.slice(0, 3)} getRankIcon={getRankIcon} />

        {/* Full Leaderboard - Card Grid */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-center text-black mb-6">Complete Rankings</h3>
          
          {/* Compact Filters */}
          <div className="mb-6">
            {/* Mobile Sort Options */}
            <div className="md:hidden mb-4">
              <div className="flex flex-wrap gap-2 justify-center">
                <Button
                  variant={sortBy === "violations" ? "default" : "outline"}
                  onClick={() => setSortBy("violations")}
                  className={`text-xs px-3 py-1 ${
                    sortBy === "violations"
                      ? "bg-yellow-400 text-black"
                      : "border-black text-black hover:bg-yellow-400 hover:text-black"
                  } rounded-full`}
                >
                  Most Violations
                </Button>
                <Button
                  variant={sortBy === "points" ? "default" : "outline"}
                  onClick={() => setSortBy("points")}
                  className={`text-xs px-3 py-1 ${
                    sortBy === "points"
                      ? "bg-yellow-400 text-black"
                      : "border-black text-black hover:bg-yellow-400 hover:text-black"
                  } rounded-full`}
                >
                  Donkey Points
                </Button>
                <Button
                  variant={sortBy === "recent" ? "default" : "outline"}
                  onClick={() => setSortBy("recent")}
                  className={`text-xs px-3 py-1 ${
                    sortBy === "recent"
                      ? "bg-yellow-400 text-black"
                      : "border-black text-black hover:bg-yellow-400 hover:text-black"
                  } rounded-full`}
                >
                  Most Recent
                </Button>
              </div>
            </div>

            {/* Desktop Compact Filters */}
            <div className="hidden md:block">
              <div className="flex justify-center space-x-4 text-sm">
                <div>
                  <Select value={timeFilter} onValueChange={setTimeFilter}>
                    <SelectTrigger className="w-32 h-8 text-xs border-gray-300">
                      <SelectValue placeholder="Time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="year">This Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Select value={locationFilter} onValueChange={setLocationFilter}>
                    <SelectTrigger className="w-32 h-8 text-xs border-gray-300">
                      <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="colombo">Colombo</SelectItem>
                      <SelectItem value="kandy">Kandy</SelectItem>
                      <SelectItem value="galle">Galle</SelectItem>
                      <SelectItem value="negombo">Negombo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-32 h-8 text-xs border-gray-300">
                      <SelectValue placeholder="Sort" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="violations">Most Violations</SelectItem>
                      <SelectItem value="points">Donkey Points</SelectItem>
                      <SelectItem value="recent">Most Recent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {worstDrivers.map((driver, index) => (
              <Card
                key={driver.id}
                className={`border-2 ${
                  index < 3 ? "border-yellow-400 bg-yellow-50" : "border-gray-200 bg-white"
                } shadow-md rounded-xl hover:shadow-lg transition-shadow`}
              >
                {/* Video Section */}
                <div className="relative bg-black rounded-t-xl h-40 flex items-center justify-center">
                  {/* Placeholder for video thumbnail - you can replace this with actual video */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 rounded-t-xl"></div>
                  <button className="relative z-10 bg-yellow-400 hover:bg-yellow-500 rounded-full p-3 transition-colors">
                    <Play className="h-6 w-6 text-black fill-black" />
                  </button>
                  
                  {/* Rank Badge in top-left */}
                  <div className="absolute top-3 left-3 z-10">
                    <Badge className={getRankBadge(driver.rank)} >#{driver.rank}</Badge>
                  </div>
                  
                  {/* External Link in top-right */}
                  <Link
                    href={`/driver/${driver.id}`}
                    className="absolute top-3 right-3 z-10 bg-white/20 rounded-full p-2 hover:bg-white/30 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4 text-white" />
                  </Link>
                  
                  {/* Donkey Points in bottom-right */}
                  <div className="absolute bottom-3 right-3 z-10">
                    <Badge className="bg-yellow-400 text-black text-xs px-2 py-1">
                      {driver.points} pts
                    </Badge>
                  </div>
                </div>

                {/* Number Plate */}
                <CardContent className="p-3">
                  <div className="text-center">
                    <CardTitle className="text-sm font-mono font-bold text-black">
                      <Link
                        href={`/driver/${driver.id}`}
                        className="hover:underline cursor-pointer hover:text-yellow-600 transition-colors"
                      >
                        {driver.id}
                      </Link>
                    </CardTitle>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
