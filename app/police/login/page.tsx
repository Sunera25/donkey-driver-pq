"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield, Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"

export default function PoliceLoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)

    // Simulate login
    await new Promise((resolve) => setTimeout(resolve, 1500))

    router.push("/police/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Card className="border-2 border-yellow-400 shadow-xl">
            <CardHeader className="bg-black text-yellow-400 text-center">
              <div className="flex justify-center mb-4">
                <Shield className="h-16 w-16" />
              </div>
              <CardTitle className="text-2xl">Police Portal</CardTitle>
              <CardDescription className="text-yellow-400/80">
                Secure access for law enforcement officers
              </CardDescription>
            </CardHeader>

            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="badge-number">Badge Number</Label>
                  <Input
                    id="badge-number"
                    type="text"
                    placeholder="Enter your badge number"
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

                <div className="space-y-2">
                  <Label htmlFor="station">Police Station</Label>
                  <Input
                    id="station"
                    type="text"
                    placeholder="Your assigned station"
                    className="border-black focus:border-yellow-400"
                    required
                  />
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
                <p>Authorized personnel only</p>
                <p className="mt-2">
                  <a href="#" className="text-black hover:text-yellow-600 underline">
                    Forgot credentials?
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
