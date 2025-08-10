"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ArrowLeft, Calendar, MapPin, Eye, Video, ImageIcon, AlertTriangle, Car, User, Loader2, Play, Send, Heart, MessageCircle } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { violationAPI, type ViolationReport } from "@/lib/api"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function DriverDetailsPage() {
  const params = useParams()
  const driverId = params.id as string
  const [violations, setViolations] = useState<ViolationReport[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedMedia, setSelectedMedia] = useState<{ type: string; url: string; title: string; violation: ViolationReport } | null>(null)
  const [newComment, setNewComment] = useState("")
  const [comments, setComments] = useState<{[key: string]: Array<{id: string; author: string; comment: string; timestamp: string; likes: number}>}>({})

  useEffect(() => {
    fetchDriverViolations()
    generateDummyComments()
  }, [driverId])

  const generateDummyComments = () => {
    // Generate dummy comments for each violation
    const dummyComments: {[key: string]: Array<{id: string; author: string; comment: string; timestamp: string; likes: number}>} = {}
    
    // Sample comments
    const sampleComments = [
      "This driver is really reckless! I see them speeding all the time.",
      "Finally caught on camera! They never stop at red lights.",
      "I reported this same car last week for the same violation.",
      "Good job catching this. Road safety is important!",
      "This happens at this intersection all the time.",
      "The video evidence is very clear. Well documented!",
      "I hope they get fined for this dangerous behavior.",
      "This is why we need more traffic cameras in the city.",
      "I've seen this car do this multiple times.",
      "Thank you for reporting this violation!"
    ]
    
    const authors = ["SafeDriver123", "ConcernedCitizen", "TrafficWatcher", "RoadSafety", "Anonymous", "CityResident", "DailyCommuter", "LocalReporter"]
    
    // Generate 3-5 comments per violation ID
    for (let i = 1; i <= 10; i++) {
      const violationId = `VIO-${String(i).padStart(3, '0')}`
      const numComments = Math.floor(Math.random() * 3) + 3 // 3-5 comments
      dummyComments[violationId] = []
      
      for (let j = 0; j < numComments; j++) {
        dummyComments[violationId].push({
          id: `comment-${i}-${j}`,
          author: authors[Math.floor(Math.random() * authors.length)],
          comment: sampleComments[Math.floor(Math.random() * sampleComments.length)],
          timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
          likes: Math.floor(Math.random() * 15)
        })
      }
    }
    
    setComments(dummyComments)
  }

  const fetchDriverViolations = async () => {
    try {
      setLoading(true)
      // Simulate fetching violations for specific driver
      const allReports = await violationAPI.getReports()
      // Filter reports for this specific driver (in real app, this would be a separate API call)
      const driverViolations = allReports.filter((report) => report.vehicleNumber.includes(driverId.slice(-4)))
      setViolations(driverViolations)
    } catch (err) {
      setError("Failed to fetch driver violations")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const getViolationTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "speeding":
        return "bg-red-500"
      case "red light violation":
        return "bg-orange-500"
      case "wrong lane":
        return "bg-yellow-500"
      case "no helmet":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "validated":
        return "bg-green-500 text-white"
      case "rejected":
        return "bg-red-500 text-white"
      case "pending":
        return "bg-orange-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const handleViewMedia = (violation: ViolationReport) => {
    // In a real app, this would be the actual media URL
    const mediaUrl = `/placeholder.svg?height=400&width=600&text=${violation.mediaType}_${violation.id}`
    setSelectedMedia({
      type: violation.mediaType,
      url: mediaUrl,
      title: `${violation.type} - ${violation.id}`,
      violation: violation
    })
  }

  const handleAddComment = () => {
    if (newComment.trim() && selectedMedia) {
      const violationId = selectedMedia.violation.id
      const newCommentObj = {
        id: `comment-${Date.now()}`,
        author: "You",
        comment: newComment.trim(),
        timestamp: new Date().toLocaleDateString(),
        likes: 0
      }
      
      setComments(prev => ({
        ...prev,
        [violationId]: [...(prev[violationId] || []), newCommentObj]
      }))
      
      setNewComment("")
    }
  }

  const handleLikeComment = (violationId: string, commentId: string) => {
    setComments(prev => ({
      ...prev,
      [violationId]: prev[violationId]?.map(comment => 
        comment.id === commentId 
          ? { ...comment, likes: comment.likes + 1 }
          : comment
      ) || []
    }))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white pb-20 md:pb-0">
        <Navbar />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-8 w-8 animate-spin text-yellow-400" />
            <span className="text-xl">Loading driver details...</span>
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
            <h2 className="text-2xl font-bold text-black mb-2">Error Loading Driver Details</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={fetchDriverViolations} className="bg-yellow-400 hover:bg-yellow-500 text-black">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const totalDonkeyPoints = violations.reduce((sum, v) => sum - Math.floor(Math.random() * 5 + 1), 0)

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white pb-20 md:pb-0">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/leaderboard">
            <Button
              variant="outline"
              className="border-black text-black hover:bg-black hover:text-yellow-400 bg-transparent"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Leaderboard
            </Button>
          </Link>
        </div>


        {/* Driver Summary - Mobile Optimized */}
        <Card className="mb-6 border-2 border-yellow-400 rounded-xl">
          <CardHeader className="bg-black text-yellow-400 p-4 rounded-t-xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-2 md:mb-0">
                <CardTitle className="text-xl md:text-3xl mb-1">{driverId}</CardTitle>
                <p className="text-yellow-400/80 text-sm hidden md:block">Complete violation history and details</p>
              </div>
              <div className="text-left md:text-right">
                <div className="text-2xl md:text-4xl font-bold">{violations.length}</div>
                <div className="text-yellow-400/80 text-sm">Total Violations</div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-3 md:p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
              <div className="text-center">
                <div className="text-lg md:text-2xl font-bold text-red-600">
                  {violations.filter((v) => v.status === "validated").length}
                </div>
                <div className="text-gray-600 text-xs md:text-sm">Validated</div>
              </div>
              <div className="text-center">
                <div className="text-lg md:text-2xl font-bold text-orange-600">
                  {violations.filter((v) => v.status === "pending").length}
                </div>
                <div className="text-gray-600 text-xs md:text-sm">Pending</div>
              </div>
              <div className="text-center">
                <div className="text-lg md:text-2xl font-bold text-gray-600">
                  {violations.filter((v) => v.status === "rejected").length}
                </div>
                <div className="text-gray-600 text-xs md:text-sm">Rejected</div>
              </div>
              <div className="text-center">
                <div className="text-lg md:text-2xl font-bold text-black">{Math.abs(totalDonkeyPoints)}</div>
                <div className="text-gray-600 text-xs md:text-sm">Donkey Points</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Violations List - Mobile Optimized */}
        <div className="space-y-4">
          <h3 className="text-xl md:text-2xl font-bold text-black">Violation History</h3>

          {violations.length === 0 ? (
            <Card className="border-2 border-yellow-400 rounded-xl">
              <CardContent className="p-6 text-center">
                <Car className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No Violations Found</h3>
                <p className="text-gray-500 text-sm">This driver has no recorded violations.</p>
              </CardContent>
            </Card>
          ) : (
            violations.map((violation) => (
              <Card
                key={violation.id}
                className="border-2 border-yellow-400 hover:shadow-lg transition-shadow rounded-xl"
              >
                <CardHeader className={`${getViolationTypeColor(violation.type)} text-white p-3 rounded-t-xl`}>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start space-y-2 md:space-y-0">
                    <div>
                      <CardTitle className="flex flex-col md:flex-row md:items-center md:space-x-2 space-y-1 md:space-y-0">
                        <span className="text-sm md:text-base">{violation.id}</span>
                        <Badge variant="outline" className="border-white text-white text-xs w-fit">
                          {violation.type}
                        </Badge>
                      </CardTitle>
                      <p className="text-white/80 mt-1 text-xs md:text-sm">{violation.description}</p>
                    </div>
                    <Badge className={`${getStatusColor(violation.status)} text-xs w-fit md:w-auto`}>
                      {violation.status.charAt(0).toUpperCase() + violation.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="p-3 md:p-6">
                  {/* Compact Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 mb-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-3 w-3 md:h-4 md:w-4 text-gray-500" />
                        <span className="text-xs md:text-sm">{violation.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-3 w-3 md:h-4 md:w-4 text-gray-500" />
                        <span className="text-xs md:text-sm">{violation.timestamp}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <User className="h-3 w-3 md:h-4 md:w-4 text-gray-500" />
                        <span className="text-xs md:text-sm">Reporter: {violation.reporter}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Car className="h-3 w-3 md:h-4 md:w-4 text-gray-500" />
                        <span className="text-xs md:text-sm font-semibold">Vehicle: {violation.vehicleNumber}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Video Gallery at Bottom */}
        {violations.length > 0 && (
          <div className="mt-8 space-y-4">
            <h3 className="text-xl md:text-2xl font-bold text-black">Violation Videos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {violations.map((violation) => (
                <Card
                  key={`video-${violation.id}`}
                  className="border-2 border-gray-200 hover:border-yellow-400 transition-colors rounded-xl overflow-hidden"
                >
                  {/* Video Thumbnail */}
                  <div className="relative bg-black h-32 md:h-40 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <button 
                          onClick={() => handleViewMedia(violation)}
                          className="relative z-10 bg-yellow-400 hover:bg-yellow-500 rounded-full p-2 md:p-3 transition-colors"
                        >
                          <Play className="h-4 w-4 md:h-6 md:w-6 text-black fill-black" />
                        </button>
                      </DialogTrigger>
                      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
                        <DialogHeader>
                          <DialogTitle className="flex items-center space-x-2">
                            <span>{violation.id} - {violation.type}</span>
                            <Badge className={getViolationTypeColor(violation.type) + " text-white"}>
                              {violation.type}
                            </Badge>
                          </DialogTitle>
                        </DialogHeader>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
                          {/* Video Section */}
                          <div className="lg:col-span-2">
                            <div className="flex justify-center mb-4">
                              {violation.mediaType === "video" ? (
                                <video 
                                  src={`/placeholder.svg?height=400&width=600&text=video_${violation.id}`} 
                                  controls 
                                  className="max-w-full h-64 md:h-80 rounded-lg bg-black" 
                                />
                              ) : (
                                <img
                                  src={`/placeholder.svg?height=400&width=600&text=image_${violation.id}`}
                                  alt="Violation evidence"
                                  className="max-w-full h-64 md:h-80 rounded-lg"
                                />
                              )}
                            </div>
                            {/* Video Details */}
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="flex items-center space-x-2">
                                  <MapPin className="h-4 w-4 text-gray-500" />
                                  <span>{violation.location}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Calendar className="h-4 w-4 text-gray-500" />
                                  <span>{violation.timestamp}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <User className="h-4 w-4 text-gray-500" />
                                  <span>Reporter: {violation.reporter}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Car className="h-4 w-4 text-gray-500" />
                                  <span>{violation.vehicleNumber}</span>
                                </div>
                              </div>
                              <p className="mt-3 text-gray-700">{violation.description}</p>
                            </div>
                          </div>

                          {/* Comments Section */}
                          <div className="lg:col-span-1 flex flex-col">
                            <div className="flex items-center space-x-2 mb-4">
                              <MessageCircle className="h-5 w-5" />
                              <h3 className="font-semibold">Comments ({comments[violation.id]?.length || 0})</h3>
                            </div>
                            
                            {/* Comments List */}
                            <div className="flex-1 overflow-y-auto max-h-80 space-y-3 mb-4">
                              {comments[violation.id]?.map((comment) => (
                                <div key={comment.id} className="bg-gray-50 p-3 rounded-lg">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="font-medium text-sm text-gray-800">{comment.author}</span>
                                    <span className="text-xs text-gray-500">{comment.timestamp}</span>
                                  </div>
                                  <p className="text-sm text-gray-700 mb-2">{comment.comment}</p>
                                  <button 
                                    onClick={() => handleLikeComment(violation.id, comment.id)}
                                    className="flex items-center space-x-1 text-xs text-gray-500 hover:text-red-500 transition-colors"
                                  >
                                    <Heart className="h-3 w-3" />
                                    <span>{comment.likes}</span>
                                  </button>
                                </div>
                              )) || (
                                <div className="text-center text-gray-500 py-8">
                                  <MessageCircle className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                                  <p>No comments yet</p>
                                </div>
                              )}
                            </div>

                            {/* Add Comment */}
                            <div className="border-t pt-4">
                              <div className="flex space-x-2">
                                <input
                                  type="text"
                                  placeholder="Add a comment..."
                                  value={newComment}
                                  onChange={(e) => setNewComment(e.target.value)}
                                  onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
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
                      </DialogContent>
                    </Dialog>
                    
                    {/* Violation Type Badge */}
                    <div className="absolute top-2 left-2 z-10">
                      <Badge className={`${getViolationTypeColor(violation.type)} text-white text-xs`}>
                        {violation.type}
                      </Badge>
                    </div>
                    
                    {/* Date in bottom-left */}
                    <div className="absolute bottom-2 left-2 z-10">
                      <span className="text-white text-xs bg-black/50 px-2 py-1 rounded">
                        {new Date(violation.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Video Info */}
                  <CardContent className="p-3">
                    <div className="text-center">
                      <CardTitle className="text-sm font-mono font-bold text-black mb-1">
                        {violation.id}
                      </CardTitle>
                      <p className="text-xs text-gray-600">{violation.location}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
