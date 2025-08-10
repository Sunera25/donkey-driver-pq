"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Camera, Home, TrendingDown, BookOpen, Settings } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function Navbar() {
  const [isCapturing, setIsCapturing] = useState(false)
  const cameraInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const handleCameraClick = () => {
    setIsCapturing(true)
    cameraInputRef.current?.click()
  }

  const handleCameraCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Store the captured media in sessionStorage to pass to upload page
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        sessionStorage.setItem("capturedMedia", result)
        sessionStorage.setItem("capturedMediaType", file.type.startsWith("video/") ? "video" : "photo")
        sessionStorage.setItem("capturedMediaName", file.name)
        router.push("/upload")
      }
      reader.readAsDataURL(file)
    }
    setIsCapturing(false)
  }

  return (
    <nav className="bg-black text-yellow-400 p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          {/* Left Side - Home and Worst Drivers */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2 hover:text-yellow-300 transition-colors">
              <Home className="h-6 w-6" />
              <span className="hidden sm:inline">Home</span>
            </Link>
            <Link href="/leaderboard" className="flex items-center space-x-2 hover:text-yellow-300 transition-colors">
              <TrendingDown className="h-6 w-6" />
              <span className="hidden sm:inline">Worst Drivers</span>
            </Link>
          </div>

          {/* Center - Logo and Camera */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <AlertTriangle className="h-8 w-8" />
              <h1 className="text-xl font-bold hidden sm:inline">Donkey Driver</h1>
            </Link>

            {/* Camera Button */}
            <Button
              onClick={handleCameraClick}
              disabled={isCapturing}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold p-3 rounded-full"
              size="lg"
            >
              <Camera className="h-6 w-6" />
            </Button>

            {/* Hidden camera input */}
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*,video/*"
              capture="environment"
              onChange={handleCameraCapture}
              className="hidden"
            />
          </div>

          {/* Right Side - Driving Rules and Settings */}
          <div className="flex items-center space-x-4">
            <Link href="/driving-rules" className="flex items-center space-x-2 hover:text-yellow-300 transition-colors">
              <BookOpen className="h-6 w-6" />
              <span className="hidden sm:inline">Driving Rules</span>
            </Link>
            <Button variant="ghost" className="flex items-center space-x-2 hover:text-yellow-300 text-yellow-400">
              <Settings className="h-6 w-6" />
              <span className="hidden sm:inline">Settings</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
