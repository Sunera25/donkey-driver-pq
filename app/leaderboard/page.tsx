"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Trophy, TrendingDown, Calendar, MapPin, Filter, Loader2, AlertTriangle, Car, Play, MessageCircle, Send, Heart, Maximize2 } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { leaderboardAPI, type WorstDriver } from "@/lib/api"
import Link from "next/link"

// Carousel Component for Top 3
function CarouselSection({ drivers, getRankIcon, onVideoSelect }: { drivers: WorstDriver[], getRankIcon: (rank: number) => JSX.Element, onVideoSelect: (driver: WorstDriver) => void }) {
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
                    ? "border-yellow-500"
                    : driver.rank === 2
                      ? "border-yellow-400"
                      : "border-yellow-300"
                } shadow-lg rounded-2xl overflow-hidden`}>
                  {/* Video Section */}
                  <div className="relative bg-black h-48 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>
                    <button className="relative z-10 bg-yellow-400 hover:bg-yellow-500 rounded-full p-4 transition-colors">
                      <Play className="h-8 w-8 text-black fill-black" />
                    </button>
                    
                    {/* Rank Badge in top-left */}
                    <div className="absolute top-3 left-3 z-10">
                      <div className="flex items-center">{getRankIcon(driver.rank)}</div>
                    </div>
                    
                    {/* Donkey Points in top-right */}
                    <div className="absolute top-3 right-3 z-10">
                      <Badge className="bg-yellow-400 text-black px-3 py-1 text-sm font-bold">
                        {Math.abs(driver.points)} pts
                      </Badge>
                    </div>
                    
                    {/* Location in bottom-right */}
                    <div className="absolute bottom-3 right-3 z-10">
                      <div className="bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>{driver.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-mono font-bold text-sm text-black">{driver.id}</h3>
                      <div className="flex items-center space-x-2">
                        <Link
                          href={`/driver/${driver.id}`}
                          className="bg-gray-200 hover:bg-gray-300 rounded-full p-2 transition-colors"
                        >
                          <Car className="h-5 w-5 text-black" />
                        </Link>
                        <button
                          onClick={() => onVideoSelect(driver)}
                          className="bg-gray-200 hover:bg-gray-300 rounded-full p-2 transition-colors"
                        >
                          <Maximize2 className="h-5 w-5 text-black" />
                        </button>
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
                ? "border-yellow-500 transform scale-105"
                : index === 1
                  ? "border-yellow-400"
                  : "border-yellow-300"
            } shadow-lg rounded-2xl overflow-hidden`}
          >
            {/* Video Section */}
            <div className="relative bg-black h-48 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>
              <button className="relative z-10 bg-yellow-400 hover:bg-yellow-500 rounded-full p-4 transition-colors">
                <Play className="h-8 w-8 text-black fill-black" />
              </button>
              
              {/* Rank Badge in top-left */}
              <div className="absolute top-3 left-3 z-10">
                <div className="flex items-center">{getRankIcon(driver.rank)}</div>
              </div>
              
              {/* Donkey Points in top-right */}
              <div className="absolute top-3 right-3 z-10">
                <Badge className="bg-yellow-400 text-black px-3 py-1 text-sm font-bold">
                  {Math.abs(driver.points)} pts
                </Badge>
              </div>
              
              {/* Location in bottom-right */}
              <div className="absolute bottom-3 right-3 z-10">
                <div className="bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
                  <MapPin className="h-3 w-3" />
                  <span>{driver.location}</span>
                </div>
              </div>
            </div>
            
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-mono font-bold text-sm text-black">{driver.id}</h3>
                <div className="flex items-center space-x-2">
                  <Link
                    href={`/driver/${driver.id}`}
                    className="bg-gray-200 hover:bg-gray-300 rounded-full p-2 transition-colors"
                  >
                    <Car className="h-5 w-5 text-black" />
                  </Link>
                  <button
                    onClick={() => onVideoSelect(driver)}
                    className="bg-gray-200 hover:bg-gray-300 rounded-full p-2 transition-colors"
                  >
                    <Maximize2 className="h-5 w-5 text-black" />
                  </button>
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
  const [selectedVideo, setSelectedVideo] = useState<WorstDriver | null>(null)
  const [comments, setComments] = useState<{[key: string]: Array<{id: string; author: string; comment: string; timestamp: string; likes: number}>}>({})
  const [newComment, setNewComment] = useState("")

  useEffect(() => {
    fetchWorstDrivers()
  }, [])

  useEffect(() => {
    if (worstDrivers.length > 0) {
      generateDummyComments()
    }
  }, [worstDrivers])

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

  const generateDummyComments = () => {
    const dummyComments: {[key: string]: Array<{id: string; author: string; comment: string; timestamp: string; likes: number}>} = {}
    
    const sampleComments = [
      "This driver is absolutely reckless!",
      "I see this car speeding every day on my commute.",
      "Finally someone caught them on camera!",
      "They almost hit me last week at this same spot.",
      "This intersection needs better enforcement.",
      "Unbelievable! No regard for safety.",
      "I've reported this driver multiple times.",
      "They park illegally too!",
      "Worst driver in the city for sure.",
      "Hope they get their license revoked."
    ]
    
    const authors = ["RoadSafety101", "ConcernedCitizen", "DailyCommuter", "SafeDriver", "TrafficWatcher", "LocalResident", "CarefulDriver", "AnonymousReporter"]
    
    // Generate 2-4 comments per driver
    worstDrivers.forEach((driver) => {
      const numComments = Math.floor(Math.random() * 3) + 2
      dummyComments[driver.id] = []
      
      for (let i = 0; i < numComments; i++) {
        dummyComments[driver.id].push({
          id: `comment-${driver.id}-${i}`,
          author: authors[Math.floor(Math.random() * authors.length)],
          comment: sampleComments[Math.floor(Math.random() * sampleComments.length)],
          timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
          likes: Math.floor(Math.random() * 20)
        })
      }
    })
    
    setComments(dummyComments)
  }

  const handleAddComment = () => {
    if (newComment.trim() && selectedVideo) {
      const newCommentObj = {
        id: `comment-${Date.now()}`,
        author: "You",
        comment: newComment.trim(),
        timestamp: new Date().toLocaleDateString(),
        likes: 0
      }
      
      setComments(prev => ({
        ...prev,
        [selectedVideo.id]: [...(prev[selectedVideo.id] || []), newCommentObj]
      }))
      
      setNewComment("")
    }
  }

  const handleLikeComment = (driverId: string, commentId: string) => {
    setComments(prev => ({
      ...prev,
      [driverId]: prev[driverId]?.map(comment => 
        comment.id === commentId 
          ? { ...comment, likes: comment.likes + 1 }
          : comment
      ) || []
    }))
  }

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <span className="text-2xl">🫏</span>
    if (rank === 2) return <span className="text-2xl">💩</span>
    if (rank === 3) return <span className="text-2xl">🐴</span>
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
        {/* Stats Summary - Moved to Stats page */}
        {/* <div className="mb-8 grid grid-cols-2 md:grid-cols-4 gap-3">
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
        </div> */}

        {/* Top 3 Carousel */}
        <CarouselSection
          drivers={worstDrivers.slice(0, 3)}
          getRankIcon={getRankIcon}
          onVideoSelect={setSelectedVideo}
        />

        {/* Full Leaderboard - Card Grid */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-center text-black mb-6">
            Complete Rankings
          </h3>

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
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                      <SelectItem value="year">This Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Select
                    value={locationFilter}
                    onValueChange={setLocationFilter}
                  >
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
                      <SelectItem value="violations">
                        Most Violations
                      </SelectItem>
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
                  index < 3
                    ? "border-yellow-400 bg-yellow-50"
                    : "border-gray-200 bg-white"
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
                    <Badge className={getRankBadge(driver.rank)}>
                      #{driver.rank}
                    </Badge>
                  </div>

                  {/* Donkey Points in top-right */}
                  <div className="absolute top-3 right-3 z-10">
                    <Badge className="bg-yellow-400 text-black px-2 py-1 text-xs font-bold">
                      {Math.abs(driver.points)} pts
                    </Badge>
                  </div>

                  {/* Location in bottom-right */}
                  <div className="absolute bottom-3 right-3 z-10">
                    <div className="bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
                      <MapPin className="h-3 w-3" />
                      <span>{driver.location}</span>
                    </div>
                  </div>
                </div>

                {/* Stats below video */}
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-mono font-bold text-xs text-black">
                      {driver.id}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <Link
                        href={`/driver/${driver.id}`}
                        className="bg-gray-200 hover:bg-gray-300 rounded-full p-1.5 transition-colors"
                      >
                        <Car className="h-4 w-4 text-black" />
                      </Link>
                      <button
                        onClick={() => setSelectedVideo(driver)}
                        className="bg-gray-200 hover:bg-gray-300 rounded-full p-1.5 transition-colors"
                      >
                        <Maximize2 className="h-4 w-4 text-black" />
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Video Dialog */}
      <Dialog
        open={!!selectedVideo}
        onOpenChange={(open) => !open && setSelectedVideo(null)}
      >
        <DialogContent className="max-w-5xl h-[90vh] md:max-h-[90vh] overflow-hidden p-0 flex flex-col">
          {selectedVideo && (
            <>
              <DialogHeader className="p-4 md:p-6 md:pb-4 border-b">
                <DialogTitle className="flex flex-col md:flex-row md:items-center md:justify-between pr-8 gap-2">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono font-bold">
                        {selectedVideo.id}
                      </span>
                      <Badge className="bg-yellow-500 text-black">
                        #{selectedVideo.rank}
                      </Badge>
                      <Badge className="bg-black text-yellow-400">
                        {Math.abs(selectedVideo.points)} pts
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{selectedVideo.location}</span>
                    </div>
                  </div>
                </DialogTitle>
              </DialogHeader>

              <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 p-4 md:p-6 overflow-hidden">
                {/* Video Section */}
                <div className="lg:col-span-2 h-48 md:h-auto">
                  <div className="bg-black rounded-lg h-full md:h-96 flex items-center justify-center">
                    <button className="bg-yellow-400 hover:bg-yellow-500 rounded-full p-6 transition-colors">
                      <Play className="h-12 w-12 text-black fill-black" />
                    </button>
                  </div>
                </div>

                {/* Scrollable Section - Violation Details and Comments */}
                <div className="lg:col-span-1 flex flex-col h-full min-h-0">
                  <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar min-h-0">
                    {/* Video Info */}
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-lg">
                          Violation Details
                        </h3>
                        <Badge className="bg-red-500 text-white">
                          {selectedVideo.violations} Violations
                        </Badge>
                      </div>
                      <p className="text-gray-600">
                        This driver has been reported multiple times for traffic
                        violations including speeding, red light violations, and
                        reckless driving. Latest incident captured on{" "}
                        {new Date().toLocaleDateString()}.
                      </p>
                    </div>

                    {/* Comments Section */}
                    <div className="mb-4">
                      <div className="flex items-center space-x-2 mb-4">
                        <MessageCircle className="h-5 w-5" />
                        <h3 className="font-semibold">
                          Comments ({comments[selectedVideo.id]?.length || 0})
                        </h3>
                      </div>

                      {/* Comments List */}
                      <div className="space-y-3">
                        {comments[selectedVideo.id]?.map((comment) => (
                          <div
                            key={comment.id}
                            className="bg-gray-50 p-3 rounded-lg"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium text-sm text-gray-800">
                                {comment.author}
                              </span>
                              <span className="text-xs text-gray-500">
                                {comment.timestamp}
                              </span>
                            </div>
                            <p className="text-sm text-gray-700 mb-2">
                              {comment.comment}
                            </p>
                            <button
                              onClick={() =>
                                handleLikeComment(selectedVideo.id, comment.id)
                              }
                              className="flex items-center space-x-1 text-xs text-gray-500 hover:text-red-500 transition-colors"
                            >
                              <Heart className="h-3 w-3" />
                              <span>{comment.likes}</span>
                            </button>
                          </div>
                        )) || (
                          <div className="text-center text-gray-500 py-8">
                            <MessageCircle className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                            <p>No comments yet. Be the first!</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Add Comment - Fixed at bottom */}
                  <div className="border-t pt-3 md:pt-4 bg-white mt-auto">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" && handleAddComment()
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      />
                      <Button
                        onClick={handleAddComment}
                        size="sm"
                        className="bg-yellow-400 hover:bg-yellow-500 text-black px-3"
                        disabled={!newComment.trim()}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
