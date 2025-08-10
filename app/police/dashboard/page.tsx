"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertTriangle,
  Shield,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  User,
  MapPin,
  Calendar,
  LogOut,
  Loader2,
} from "lucide-react"
import Link from "next/link"
import { violationAPI, type ViolationReport } from "@/lib/api"

export default function PoliceDashboard() {
  const [reports, setReports] = useState<ViolationReport[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState("all")
  const [validatingReports, setValidatingReports] = useState<Set<string>>(new Set())

  useEffect(() => {
    fetchReports()
  }, [])

  const fetchReports = async () => {
    try {
      setLoading(true)
      const data = await violationAPI.getReports()
      setReports(data.filter((report) => report.status === "pending"))
    } catch (err) {
      setError("Failed to fetch reports")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleValidateReport = async (reportId: string, isValid: boolean) => {
    try {
      setValidatingReports((prev) => new Set(prev).add(reportId))
      await violationAPI.validateReport(reportId, isValid)

      // Remove the report from the list
      setReports((prev) => prev.filter((report) => report.id !== reportId))

      alert(`Report ${reportId} marked as ${isValid ? "valid" : "invalid"}`)
    } catch (err) {
      alert("Failed to validate report")
      console.error(err)
    } finally {
      setValidatingReports((prev) => {
        const newSet = new Set(prev)
        newSet.delete(reportId)
        return newSet
      })
    }
  }

  const pendingReports = reports.filter(
    (report) => filter === "all" || report.type.toLowerCase().includes(filter.toLowerCase()),
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-8 w-8 animate-spin text-yellow-400" />
          <span className="text-xl">Loading dashboard...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-black mb-2">Error Loading Dashboard</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={fetchReports} className="bg-yellow-400 hover:bg-yellow-500 text-black">
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      {/* Header */}
      <header className="bg-black text-yellow-400 p-4 shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8" />
            <h1 className="text-2xl font-bold">Police Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm">Officer Badge: #12345</span>
            <Link href="/" className="hover:text-yellow-300 transition-colors">
              <LogOut className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-yellow-400">
            <CardContent className="p-4 text-center">
              <Clock className="h-8 w-8 mx-auto mb-2 text-orange-500" />
              <div className="text-2xl font-bold text-black">{pendingReports.length}</div>
              <div className="text-gray-600">Pending Reports</div>
            </CardContent>
          </Card>
          <Card className="border-yellow-400">
            <CardContent className="p-4 text-center">
              <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
              <div className="text-2xl font-bold text-black">156</div>
              <div className="text-gray-600">Validated Today</div>
            </CardContent>
          </Card>
          <Card className="border-yellow-400">
            <CardContent className="p-4 text-center">
              <XCircle className="h-8 w-8 mx-auto mb-2 text-red-500" />
              <div className="text-2xl font-bold text-black">12</div>
              <div className="text-gray-600">Rejected Today</div>
            </CardContent>
          </Card>
          <Card className="border-yellow-400">
            <CardContent className="p-4 text-center">
              <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
              <div className="text-2xl font-bold text-black">89%</div>
              <div className="text-gray-600">Validation Rate</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-yellow-400">
            <TabsTrigger value="pending" className="data-[state=active]:bg-black data-[state=active]:text-yellow-400">
              Pending Reports
            </TabsTrigger>
            <TabsTrigger value="validated" className="data-[state=active]:bg-black data-[state=active]:text-yellow-400">
              Validated
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-black data-[state=active]:text-yellow-400">
              History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-6">
            {/* Filters */}
            <Card className="border-yellow-400">
              <CardHeader className="bg-yellow-400 text-black p-4">
                <CardTitle>Filter Reports</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Select value={filter} onValueChange={setFilter}>
                    <SelectTrigger className="border-black">
                      <SelectValue placeholder="Violation Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="speeding">Speeding</SelectItem>
                      <SelectItem value="red-light">Red Light</SelectItem>
                      <SelectItem value="wrong-lane">Wrong Lane</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="border-black">
                      <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="colombo">Colombo</SelectItem>
                      <SelectItem value="kandy">Kandy</SelectItem>
                      <SelectItem value="galle">Galle</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="border-black">
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priority</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Reports List */}
            <div className="space-y-4">
              {pendingReports.map((report) => (
                <Card key={report.id} className="border-2 border-yellow-400 hover:shadow-lg transition-shadow">
                  <CardHeader className="bg-black text-yellow-400 p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center space-x-2">
                          <span>{report.id}</span>
                          <Badge variant="outline" className="border-yellow-400 text-yellow-400">
                            {report.type}
                          </Badge>
                        </CardTitle>
                        <CardDescription className="text-yellow-400/80">{report.description}</CardDescription>
                      </div>
                      <Badge className="bg-orange-500 text-white">
                        <Clock className="h-3 w-3 mr-1" />
                        Pending
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">{report.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">{report.timestamp}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">Reporter: {report.reporter}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-semibold">Vehicle: {report.vehicleNumber}</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="bg-gray-100 p-4 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <Eye className="h-4 w-4" />
                            <span className="text-sm font-medium">Evidence ({report.mediaType})</span>
                          </div>
                          <div className="bg-gray-200 h-32 rounded flex items-center justify-center">
                            <span className="text-gray-500">Media Preview</span>
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Button
                            onClick={() => handleValidateReport(report.id, true)}
                            disabled={validatingReports.has(report.id)}
                            className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                          >
                            {validatingReports.has(report.id) ? (
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            ) : (
                              <CheckCircle className="h-4 w-4 mr-2" />
                            )}
                            Validate
                          </Button>
                          <Button
                            onClick={() => handleValidateReport(report.id, false)}
                            disabled={validatingReports.has(report.id)}
                            variant="destructive"
                            className="flex-1"
                          >
                            {validatingReports.has(report.id) ? (
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            ) : (
                              <XCircle className="h-4 w-4 mr-2" />
                            )}
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="validated">
            <Card className="border-yellow-400">
              <CardHeader className="bg-green-500 text-white p-4">
                <CardTitle>Validated Reports</CardTitle>
                <CardDescription className="text-green-100">
                  Reports that have been processed and forwarded
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-600">Validated reports will appear here...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card className="border-yellow-400">
              <CardHeader className="bg-gray-500 text-white p-4">
                <CardTitle>Report History</CardTitle>
                <CardDescription className="text-gray-100">Complete history of all processed reports</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-600">Historical data will appear here...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
