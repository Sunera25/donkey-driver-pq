"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building2, AlertTriangle, Flag, TrendingUp, Eye, Calendar, User, Car, LogOut, FileText } from "lucide-react"
import Link from "next/link"

// Mock data for insurance claims
const dashcamUploads = [
  {
    id: "CLM-2024-001",
    policyHolder: "John Doe",
    policyNumber: "POL-123456",
    vehicleNumber: "CAB-1234",
    uploadDate: "2024-01-08",
    claimAmount: "Rs. 150,000",
    status: "under-review",
    suspiciousScore: 85,
    description: "Rear-end collision at traffic light",
  },
  {
    id: "CLM-2024-002",
    policyHolder: "Jane Smith",
    policyNumber: "POL-789012",
    vehicleNumber: "WP-5678",
    uploadDate: "2024-01-07",
    claimAmount: "Rs. 75,000",
    status: "flagged",
    suspiciousScore: 92,
    description: "Side collision at intersection",
  },
  {
    id: "CLM-2024-003",
    policyHolder: "Mike Johnson",
    policyNumber: "POL-345678",
    vehicleNumber: "KY-9012",
    uploadDate: "2024-01-06",
    claimAmount: "Rs. 200,000",
    status: "approved",
    suspiciousScore: 15,
    description: "Vehicle damage from fallen tree",
  },
]

export default function InsuranceDashboard() {
  const [filter, setFilter] = useState("all")

  const getSuspiciousLevel = (score: number) => {
    if (score >= 80) return { level: "High", color: "bg-red-500", textColor: "text-red-600" }
    if (score >= 50) return { level: "Medium", color: "bg-orange-500", textColor: "text-orange-600" }
    return { level: "Low", color: "bg-green-500", textColor: "text-green-600" }
  }

  const handleFlagClaim = (claimId: string) => {
    alert(`Claim ${claimId} has been flagged for further investigation`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      {/* Header */}
      <header className="bg-black text-yellow-400 p-4 shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Building2 className="h-8 w-8" />
            <h1 className="text-2xl font-bold">Insurance Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm">Ceylinco General Insurance</span>
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
              <FileText className="h-8 w-8 mx-auto mb-2 text-blue-500" />
              <div className="text-2xl font-bold text-black">47</div>
              <div className="text-gray-600">Total Claims</div>
            </CardContent>
          </Card>
          <Card className="border-yellow-400">
            <CardContent className="p-4 text-center">
              <Flag className="h-8 w-8 mx-auto mb-2 text-red-500" />
              <div className="text-2xl font-bold text-black">12</div>
              <div className="text-gray-600">Flagged Claims</div>
            </CardContent>
          </Card>
          <Card className="border-yellow-400">
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 mx-auto mb-2 text-orange-500" />
              <div className="text-2xl font-bold text-black">25%</div>
              <div className="text-gray-600">Suspicious Rate</div>
            </CardContent>
          </Card>
          <Card className="border-yellow-400">
            <CardContent className="p-4 text-center">
              <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
              <div className="text-2xl font-bold text-black">Rs. 2.1M</div>
              <div className="text-gray-600">Potential Fraud</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="claims" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-yellow-400">
            <TabsTrigger value="claims" className="data-[state=active]:bg-black data-[state=active]:text-yellow-400">
              Dashcam Claims
            </TabsTrigger>
            <TabsTrigger value="flagged" className="data-[state=active]:bg-black data-[state=active]:text-yellow-400">
              Flagged Claims
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-black data-[state=active]:text-yellow-400">
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="claims" className="space-y-6">
            {/* Filters */}
            <Card className="border-yellow-400">
              <CardHeader className="bg-yellow-400 text-black">
                <CardTitle>Filter Claims</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Select value={filter} onValueChange={setFilter}>
                    <SelectTrigger className="border-black">
                      <SelectValue placeholder="Claim Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="under-review">Under Review</SelectItem>
                      <SelectItem value="flagged">Flagged</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="border-black">
                      <SelectValue placeholder="Suspicious Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="high">High Risk</SelectItem>
                      <SelectItem value="medium">Medium Risk</SelectItem>
                      <SelectItem value="low">Low Risk</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="border-black">
                      <SelectValue placeholder="Date Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                      <SelectItem value="year">This Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Claims List */}
            <div className="space-y-4">
              {dashcamUploads.map((claim) => {
                const suspicious = getSuspiciousLevel(claim.suspiciousScore)
                return (
                  <Card key={claim.id} className="border-2 border-yellow-400 hover:shadow-lg transition-shadow">
                    <CardHeader className="bg-black text-yellow-400">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="flex items-center space-x-2">
                            <span>{claim.id}</span>
                            <Badge variant="outline" className="border-yellow-400 text-yellow-400">
                              {claim.claimAmount}
                            </Badge>
                          </CardTitle>
                          <CardDescription className="text-yellow-400/80">{claim.description}</CardDescription>
                        </div>
                        <div className="flex space-x-2">
                          <Badge className={suspicious.color}>{suspicious.level} Risk</Badge>
                          <Badge variant="outline" className="border-yellow-400 text-yellow-400">
                            {claim.status}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">{claim.policyHolder}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <FileText className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">Policy: {claim.policyNumber}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Car className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">Vehicle: {claim.vehicleNumber}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">Uploaded: {claim.uploadDate}</span>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="bg-gray-100 p-4 rounded-lg">
                            <div className="flex items-center space-x-2 mb-2">
                              <Eye className="h-4 w-4" />
                              <span className="text-sm font-medium">Dashcam Footage</span>
                            </div>
                            <div className="bg-gray-200 h-32 rounded flex items-center justify-center">
                              <span className="text-gray-500">Video Preview</span>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium">Suspicious Score:</span>
                              <span className={`font-bold ${suspicious.textColor}`}>{claim.suspiciousScore}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${suspicious.color}`}
                                style={{ width: `${claim.suspiciousScore}%` }}
                              ></div>
                            </div>
                          </div>

                          <div className="flex space-x-2">
                            <Button onClick={() => handleFlagClaim(claim.id)} variant="destructive" className="flex-1">
                              <Flag className="h-4 w-4 mr-2" />
                              Flag as Suspicious
                            </Button>
                            <Button
                              variant="outline"
                              className="flex-1 border-black text-black hover:bg-black hover:text-yellow-400 bg-transparent"
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              Review Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="flagged">
            <Card className="border-yellow-400">
              <CardHeader className="bg-red-500 text-white">
                <CardTitle>Flagged Claims</CardTitle>
                <CardDescription className="text-red-100">Claims marked as potentially fraudulent</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-600">Flagged claims requiring investigation will appear here...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-yellow-400">
                <CardHeader className="bg-yellow-400 text-black">
                  <CardTitle>Fraud Detection Summary</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Total Claims Analyzed:</span>
                      <span className="font-bold">247</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Flagged as Suspicious:</span>
                      <span className="font-bold text-red-600">62</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Confirmed Fraud:</span>
                      <span className="font-bold text-red-600">18</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Money Saved:</span>
                      <span className="font-bold text-green-600">Rs. 4.2M</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-yellow-400">
                <CardHeader className="bg-yellow-400 text-black">
                  <CardTitle>Suspicious Patterns</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Staged Accidents</span>
                      <Badge variant="destructive">23 cases</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Exaggerated Damage</span>
                      <Badge variant="destructive">15 cases</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">False Witness Claims</span>
                      <Badge variant="destructive">8 cases</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Repeat Offenders</span>
                      <Badge variant="destructive">12 cases</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
