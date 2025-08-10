"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Trophy, TrendingDown, Calendar, MapPin, Filter } from "lucide-react"
import { Navbar } from "@/components/navbar"

// Mock data for worst drivers
const worstDrivers = [
  { id: "DD001", violations: 15, points: -45, location: "Colombo", lastViolation: "2024-01-08", rank: 1 },
  { id: "DD002", violations: 12, points: -36, location: "Kandy", lastViolation: "2024-01-07", rank: 2 },
  { id: "DD003", violations: 11, points: -33, location: "Galle", lastViolation: "2024-01-06", rank: 3 },
  { id: "DD004", violations: 9, points: -27, location: "Colombo", lastViolation: "2024-01-05", rank: 4 },
  { id: "DD005", violations: 8, points: -24, location: "Negombo", lastViolation: "2024-01-04", rank: 5 },
  { id: "DD006", violations: 7, points: -21, location: "Matara", lastViolation: "2024-01-03", rank: 6 },
  { id: "DD007", violations: 6, points: -18, location: "Kandy", lastViolation: "2024-01-02", rank: 7 },
  { id: "DD008", violations: 5, points: -15, location: "Colombo", lastViolation: "2024-01-01", rank: 8 },
]

export default function LeaderboardPage() {
  const [timeFilter, setTimeFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")
  const [sortBy, setSortBy] = useState("violations")

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-6 w-6 text-yellow-500" />
    if (rank === 2) return <Trophy className="h-6 w-6 text-gray-400" />
    if (rank === 3) return <Trophy className="h-6 w-6 text-amber-600" />
    return <span className="text-2xl font-bold text-black">#{rank}</span>
  }

  const getRankBadge = (rank: number) => {
    if (rank === 1) return "bg-red-500 text-white"
    if (rank === 2) return "bg-orange-500 text-white"
    if (rank === 3) return "bg-yellow-500 text-black"
    return "bg-gray-500 text-white"
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white pb-20 md:pb-0">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <TrendingDown className="h-10 w-10 text-black" />
            <h2 className="text-4xl font-bold text-black">Worst Drivers</h2>
          </div>
          <p className="text-gray-600 text-lg">Public accountability for repeat traffic offenders</p>
        </div>

        {/* Filters */}
        <Card className="mb-8 border-2 border-yellow-400">
          <CardHeader className="bg-yellow-400 text-black py-3">
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
                    <SelectItem value="points">Negative Points</SelectItem>
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
                className={`border-4 ${index === 0 ? "border-red-500 transform scale-105" : index === 1 ? "border-orange-500" : "border-yellow-500"} shadow-xl`}
              >
                <CardHeader
                  className={`${index === 0 ? "bg-red-500" : index === 1 ? "bg-orange-500" : "bg-yellow-500"} text-white text-center`}
                >
                  <div className="flex justify-center mb-2">{getRankIcon(driver.rank)}</div>
                  <CardTitle className="text-2xl">{driver.id}</CardTitle>
                </CardHeader>
                <CardContent className="p-6 text-center">
                  <div className="space-y-3">
                    <div className="text-3xl font-bold text-black">{driver.violations}</div>
                    <div className="text-gray-600">Violations</div>
                    <Badge variant="destructive" className="text-lg px-3 py-1">
                      {driver.points} Points
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
        <Card className="border-2 border-yellow-400">
          <CardHeader className="bg-black text-yellow-400 py-3">
            <CardTitle className="text-xl">Complete Rankings</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-yellow-400 text-black">
                  <tr>
                    <th className="px-4 py-3 text-left">Rank</th>
                    <th className="px-4 py-3 text-left">Driver ID</th>
                    <th className="px-4 py-3 text-center">Violations</th>
                    <th className="px-4 py-3 text-center">Points</th>
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
                      <td className="px-4 py-4 font-mono font-bold text-black">{driver.id}</td>
                      <td className="px-4 py-4 text-center">
                        <span className="text-2xl font-bold text-red-600">{driver.violations}</span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <Badge variant="destructive" className="text-lg">
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

        {/* Stats Summary */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="text-center border-yellow-400">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-black">156</div>
              <div className="text-gray-600">Total Offenders</div>
            </CardContent>
          </Card>
          <Card className="text-center border-yellow-400">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-black">892</div>
              <div className="text-gray-600">Total Violations</div>
            </CardContent>
          </Card>
          <Card className="text-center border-yellow-400">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-black">-2,847</div>
              <div className="text-gray-600">Total Points Lost</div>
            </CardContent>
          </Card>
          <Card className="text-center border-yellow-400">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-black">23%</div>
              <div className="text-gray-600">Repeat Rate</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
