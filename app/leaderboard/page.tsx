"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, TrendingDown, Calendar, MapPin, Filter, Loader2, AlertTriangle, ExternalLink } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { leaderboardAPI, type WorstDriver } from "@/lib/api"
import Link from "next/link"

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
        {/* Application Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-black">Donkey Driver</h1>
          <p className="text-gray-600 hidden md:block">Traffic Violation Reporting System</p>
        </div>

        {/* Page Title */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <TrendingDown className="h-10 w-10 text-black" />
            <h2 className="text-4xl font-bold text-black">Worst Drivers</h2>
          </div>
          <p className="text-gray-600 text-lg hidden md:block">Public accountability for repeat traffic offenders</p>
        </div>

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

        {/* Mobile Sort Options */}
        <div className="md:hidden mb-6">
          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              variant={sortBy === "violations" ? "default" : "outline"}
              onClick={() => setSortBy("violations")}
              className={`${
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
              className={`${
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
              className={`${
                sortBy === "recent"
                  ? "bg-yellow-400 text-black"
                  : "border-black text-black hover:bg-yellow-400 hover:text-black"
              } rounded-full`}
            >
              Most Recent
            </Button>
          </div>
        </div>

        {/* Desktop Filters */}
        <Card className="mb-8 border-2 border-yellow-400 hidden md:block rounded-2xl">
          <CardHeader className="bg-yellow-400 text-black p-4 rounded-t-2xl">
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Filter & Sort</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-black mb-2">Time Period</label>
                <Select value={timeFilter} onValueChange={setTimeFilter}>
                  <SelectTrigger className="border-black">
                    <SelectValue />
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
                <label className="block text-sm font-medium text-black mb-2">Location</label>
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger className="border-black">
                    <SelectValue />
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
                <label className="block text-sm font-medium text-black mb-2">Sort By</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="border-black">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="violations">Most Violations</SelectItem>
                    <SelectItem value="points">Donkey Points</SelectItem>
                    <SelectItem value="recent">Most Recent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top 3 Podium */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-center text-black mb-8">Hall of Shame - Top 3</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {worstDrivers.slice(0, 3).map((driver, index) => (
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
                      className="hover:underline cursor-pointer flex items-center justify-center space-x-2 text-black hover:text-gray-800"
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

        {/* Full Leaderboard */}
        <Card className="border-2 border-yellow-400 rounded-2xl">
          <CardHeader className="bg-black text-yellow-400 p-4 rounded-t-2xl">
            <CardTitle className="text-xl">Complete Rankings</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-yellow-400 text-black">
                  <tr>
                    <th className="px-4 py-3 text-left">Rank</th>
                    <th className="px-4 py-3 text-left">Number Plate</th>
                    <th className="px-4 py-3 text-center">Violations</th>
                    <th className="px-4 py-3 text-center">Donkey Points</th>
                    <th className="px-4 py-3 text-left">Location</th>
                    <th className="px-4 py-3 text-left">Last Violation</th>
                  </tr>
                </thead>
                <tbody>
                  {worstDrivers.map((driver, index) => (
                    <tr key={driver.id} className={`border-b hover:bg-yellow-50 ${index < 3 ? "bg-red-50" : ""}`}>
                      <td className="px-4 py-4">
                        <div className="flex items-center space-x-2">
                          {getRankIcon(driver.rank)}
                          <Badge className={getRankBadge(driver.rank)}>#{driver.rank}</Badge>
                        </div>
                      </td>
                      <td className="px-4 py-4 font-mono font-bold text-black">
                        <Link
                          href={`/driver/${driver.id}`}
                          className="hover:text-yellow-600 hover:underline cursor-pointer flex items-center space-x-2"
                        >
                          <span>{driver.id}</span>
                          <ExternalLink className="h-4 w-4 text-gray-500" />
                        </Link>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="text-2xl font-bold text-red-600">{driver.violations}</span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <Badge className="text-lg bg-black text-yellow-400 hover:bg-gray-800">
                          {driver.points}
                        </Badge>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span>{driver.location}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center space-x-1 text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span>{driver.lastViolation}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
