"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Camera, Home, TrendingDown, BookOpen, Settings } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"

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
    <>
      {/* Desktop Navbar - Top */}
      <nav className="hidden md:block bg-black text-yellow-400 p-4 shadow-lg sticky top-0 z-50 rounded-b-2xl mx-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            {/* Left Side - Home and Worst Drivers */}
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 hover:text-yellow-300 transition-colors">
                <Home className="h-6 w-6" />
                <span>Home</span>
              </Link>
              <Link href="/leaderboard" className="flex items-center space-x-2 hover:text-yellow-300 transition-colors">
                <TrendingDown className="h-6 w-6" />
                <span>Worst Drivers</span>
              </Link>
            </div>

            {/* Center - Logo and Camera */}
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-yellow-400 p-1">
                  <Image
                    src="/images/donkey-logo.jpeg"
                    alt="Donkey Driver Logo"
                    width={48}
                    height={48}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <h1 className="text-xl font-bold">Donkey Driver</h1>
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
              <Link
                href="/driving-rules"
                className="flex items-center space-x-2 hover:text-yellow-300 transition-colors"
              >
                <BookOpen className="h-6 w-6" />
                <span>Driving Rules</span>
              </Link>
              <Button variant="ghost" className="flex items-center space-x-2 hover:text-yellow-300 text-yellow-400">
                <Settings className="h-6 w-6" />
                <span>Settings</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar - Bottom */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-black text-yellow-400 shadow-lg z-50 border-t border-yellow-400 rounded-t-2xl mx-2 mb-2">
        <div className="p-3">
          {/* Mobile Header with Logo and Title */}
          <div className="flex items-center justify-center mb-3 pb-2 border-b border-yellow-400/30">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-yellow-400 p-0.5 mr-2">
              <Image
                src="/images/donkey-logo.jpeg"
                alt="Donkey Driver Logo"
                width={32}
                height={32}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <h1 className="text-lg font-bold">Donkey Driver</h1>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between max-w-sm mx-auto">
            {/* Left Side */}
            <div className="flex items-center space-x-3">
              <Link
                href="/"
                className="flex flex-col items-center space-y-1 hover:text-yellow-300 transition-colors p-2"
              >
                <Home className="h-5 w-5" />
                <span className="text-xs">Home</span>
              </Link>
              <Link
                href="/leaderboard"
                className="flex flex-col items-center space-y-1 hover:text-yellow-300 transition-colors p-2"
              >
                <TrendingDown className="h-5 w-5" />
                <span className="text-xs">Worst</span>
              </Link>
            </div>

            {/* Center - Camera */}
            <Button
              onClick={handleCameraClick}
              disabled={isCapturing}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold p-4 rounded-full shadow-lg"
              size="lg"
            >
              <Camera className="h-7 w-7" />
            </Button>

            {/* Right Side */}
            <div className="flex items-center space-x-3">
              <Link
                href="/driving-rules"
                className="flex flex-col items-center space-y-1 hover:text-yellow-300 transition-colors p-2"
              >
                <BookOpen className="h-5 w-5" />
                <span className="text-xs">Rules</span>
              </Link>
              <Button
                variant="ghost"
                className="flex flex-col items-center space-y-1 hover:text-yellow-300 text-yellow-400 p-2"
              >
                <Settings className="h-5 w-5" />
                <span className="text-xs">Settings</span>
              </Button>
            </div>
          </div>

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
      </nav>

      {/* Mobile bottom padding spacer */}
      <div className="md:hidden h-32"></div>
    </>
  )
}
