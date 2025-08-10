"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ArrowLeft, Calendar, MapPin, Eye, Video, ImageIcon, AlertTriangle, Car, User, Loader2 } from "lucide-react"
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
  const [selectedMedia, setSelectedMedia] = useState<{ type: string; url: string; title: string } | null>(null)

  useEffect(() => {
    fetchDriverViolations()
  }, [driverId])

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
    })
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

        {/* Driver Summary */}
        <Card className="mb-8 border-2 border-yellow-400 rounded-2xl">
          <CardHeader className="bg-black text-yellow-400 p-6 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-3xl mb-2">Number Plate: {driverId}</CardTitle>
                <p className="text-yellow-400/80">Complete violation history and details</p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold">{violations.length}</div>
                <div className="text-yellow-400/80">Total Violations</div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {violations.filter((v) => v.status === "validated").length}
                </div>
                <div className="text-gray-600">Validated</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {violations.filter((v) => v.status === "pending").length}
                </div>
                <div className="text-gray-600">Pending</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-600">
                  {violations.filter((v) => v.status === "rejected").length}
                </div>
                <div className="text-gray-600">Rejected</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-black">{totalDonkeyPoints}</div>
                <div className="text-gray-600">Donkey Points</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Violations List */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-black">Violation History</h3>

          {violations.length === 0 ? (
            <Card className="border-2 border-yellow-400 rounded-2xl">
              <CardContent className="p-8 text-center">
                <Car className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No Violations Found</h3>
                <p className="text-gray-500">This driver has no recorded violations.</p>
              </CardContent>
            </Card>
          ) : (
            violations.map((violation) => (
              <Card
                key={violation.id}
                className="border-2 border-yellow-400 hover:shadow-lg transition-shadow rounded-2xl"
              >
                <CardHeader className={`${getViolationTypeColor(violation.type)} text-white p-4 rounded-t-2xl`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <span>{violation.id}</span>
                        <Badge variant="outline" className="border-white text-white">
                          {violation.type}
                        </Badge>
                      </CardTitle>
                      <p className="text-white/80 mt-1">{violation.description}</p>
                    </div>
                    <Badge className={getStatusColor(violation.status)}>
                      {violation.status.charAt(0).toUpperCase() + violation.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">{violation.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">{violation.timestamp}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">Reporter: {violation.reporter}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Car className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-semibold">Vehicle: {violation.vehicleNumber}</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="bg-gray-100 p-4 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          {violation.mediaType === "video" ? (
                            <Video className="h-4 w-4" />
                          ) : (
                            <ImageIcon className="h-4 w-4" />
                          )}
                          <span className="text-sm font-medium">Evidence ({violation.mediaType})</span>
                        </div>
                        <div className="bg-gray-200 h-32 rounded flex items-center justify-center mb-3">
                          <span className="text-gray-500">Media Preview</span>
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              onClick={() => handleViewMedia(violation)}
                              variant="outline"
                              className="w-full border-black text-black hover:bg-black hover:text-yellow-400"
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View {violation.mediaType === "video" ? "Video" : "Photo"}
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl">
                            <DialogHeader>
                              <DialogTitle>{selectedMedia?.title}</DialogTitle>
                            </DialogHeader>
                            <div className="flex justify-center">
                              {selectedMedia?.type === "video" ? (
                                <video src={selectedMedia.url} controls className="max-w-full max-h-96 rounded-lg" />
                              ) : (
                                <img
                                  src={selectedMedia?.url || "/placeholder.svg"}
                                  alt="Violation evidence"
                                  className="max-w-full max-h-96 rounded-lg"
                                />
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
