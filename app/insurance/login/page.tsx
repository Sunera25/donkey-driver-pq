"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle, ArrowLeft, Building2, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function InsuranceLoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)

    // Simulate login
    await new Promise((resolve) => setTimeout(resolve, 1500))

    router.push("/insurance/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      {/* Header */}
      <header className="bg-black text-yellow-400 p-4 shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 hover:text-yellow-300 transition-colors">
            <ArrowLeft className="h-6 w-6" />
            <AlertTriangle className="h-8 w-8" />
            <h1 className="text-2xl font-bold">Donkey Driver</h1>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Card className="border-2 border-yellow-400 shadow-xl">
            <CardHeader className="bg-black text-yellow-400 text-center">
              <div className="flex justify-center mb-4">
                <Building2 className="h-16 w-16" />
              </div>
              <CardTitle className="text-2xl">Insurance Portal</CardTitle>
              <CardDescription className="text-yellow-400/80">
                Access for insurance company representatives
              </CardDescription>
            </CardHeader>

            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="insurance-company">Insurance Company</Label>
                  <Select required>
                    <SelectTrigger className="border-black focus:border-yellow-400">
                      <SelectValue placeholder="Select your insurance company" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sri-lanka-insurance">Sri Lanka Insurance</SelectItem>
                      <SelectItem value="ceylinco-general">Ceylinco General</SelectItem>
                      <SelectItem value="allianz-insurance">Allianz Insurance</SelectItem>
                      <SelectItem value="aic-insurance">AIC Insurance</SelectItem>
                      <SelectItem value="janashakthi-insurance">Janashakthi Insurance</SelectItem>
                      <SelectItem value="cooperative-insurance">Cooperative Insurance</SelectItem>
                      <SelectItem value="union-assurance">Union Assurance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employee-id">Employee ID</Label>
                  <Input
                    id="employee-id"
                    type="text"
                    placeholder="Enter your employee ID"
                    className="border-black focus:border-yellow-400"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="border-black focus:border-yellow-400 pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3"
                >
                  {isLoading ? "Authenticating..." : "Access Dashboard"}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm text-gray-600">
                <p>Authorized insurance personnel only</p>
                <p className="mt-2">
                  <Link href="#" className="text-black hover:text-yellow-600 underline">
                    Need access? Contact IT support
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
