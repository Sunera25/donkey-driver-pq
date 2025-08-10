"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Camera, Upload, MapPin, Video, ImageIcon } from "lucide-react"
import { Navbar } from "@/components/navbar"

export default function UploadPage() {
  const [mediaFile, setMediaFile] = useState<File | null>(null)
  const [mediaPreview, setMediaPreview] = useState<string | null>(null)
  const [mediaType, setMediaType] = useState<"photo" | "video" | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  // Check for pre-captured media from navbar
  useEffect(() => {
    const capturedMedia = sessionStorage.getItem("capturedMedia")
    const capturedMediaType = sessionStorage.getItem("capturedMediaType")
    const capturedMediaName = sessionStorage.getItem("capturedMediaName")

    if (capturedMedia && capturedMediaType) {
      setMediaPreview(capturedMedia)
      setMediaType(capturedMediaType === "video" ? "video" : "photo")

      // Convert data URL back to File object
      fetch(capturedMedia)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], capturedMediaName || "captured-media", { type: capturedMediaType })
          setMediaFile(file)
        })

      // Clear session storage
      sessionStorage.removeItem("capturedMedia")
      sessionStorage.removeItem("capturedMediaType")
      sessionStorage.removeItem("capturedMediaName")
    }
  }, [])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setMediaFile(file)
      const url = URL.createObjectURL(file)
      setMediaPreview(url)
      setMediaType(file.type.startsWith("video/") ? "video" : "photo")
    }
  }

  const handleCameraCapture = () => {
    cameraInputRef.current?.click()
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsSubmitting(true)

    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    alert(
      "Report submitted successfully! You can track its status using the reference number: VR-" +
        Math.random().toString(36).substr(2, 9).toUpperCase(),
    )
    setIsSubmitting(false)

    // Reset form
    setMediaFile(null)
    setMediaPreview(null)
    setMediaType(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white pb-20 md:pb-0">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="border-2 border-yellow-400">
            <CardHeader className="bg-black text-yellow-400">
              <CardTitle className="flex items-center space-x-2">
                <Camera className="h-6 w-6" />
                <span>Upload Traffic Violation</span>
              </CardTitle>
              <CardDescription className="text-yellow-400/80">
                Help make roads safer by reporting reckless driving behavior
              </CardDescription>
            </CardHeader>

            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Media Capture Section */}
                <div className="space-y-4">
                  <Label className="text-lg font-semibold text-black">Evidence (Photo/Video)</Label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Button
                      type="button"
                      onClick={handleCameraCapture}
                      className="bg-yellow-400 hover:bg-yellow-500 text-black h-20 flex-col space-y-2"
                    >
                      <Camera className="h-8 w-8" />
                      <span>Take Photo/Video</span>
                    </Button>

                    <Button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      variant="outline"
                      className="border-black text-black hover:bg-black hover:text-yellow-400 h-20 flex-col space-y-2"
                    >
                      <Upload className="h-8 w-8" />
                      <span>Upload File</span>
                    </Button>
                  </div>

                  {/* Hidden file inputs */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <input
                    ref={cameraInputRef}
                    type="file"
                    accept="image/*,video/*"
                    capture="environment"
                    onChange={handleFileUpload}
                    className="hidden"
                  />

                  {/* Media Preview */}
                  {mediaPreview && (
                    <div className="border-2 border-yellow-400 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        {mediaType === "video" ? (
                          <Video className="h-5 w-5 text-black" />
                        ) : (
                          <ImageIcon className="h-5 w-5 text-black" />
                        )}
                        <span className="font-medium text-black">
                          {mediaType === "video" ? "Video" : "Photo"} Preview
                        </span>
                      </div>
                      {mediaType === "video" ? (
                        <video src={mediaPreview} controls className="w-full max-h-64 rounded-lg" />
                      ) : (
                        <img
                          src={mediaPreview || "/placeholder.svg"}
                          alt="Evidence preview"
                          className="w-full max-h-64 object-cover rounded-lg"
                        />
                      )}
                    </div>
                  )}
                </div>

                {/* Violation Details */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="violation-type">Violation Type</Label>
                    <Select required>
                      <SelectTrigger className="border-black focus:border-yellow-400">
                        <SelectValue placeholder="Select violation type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="speeding">Speeding</SelectItem>
                        <SelectItem value="red-light">Running Red Light</SelectItem>
                        <SelectItem value="wrong-lane">Wrong Lane Usage</SelectItem>
                        <SelectItem value="no-helmet">No Helmet</SelectItem>
                        <SelectItem value="phone-use">Phone Usage While Driving</SelectItem>
                        <SelectItem value="drunk-driving">Suspected Drunk Driving</SelectItem>
                        <SelectItem value="reckless">Reckless Driving</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="vehicle-number">Vehicle Number (if visible)</Label>
                    <Input
                      id="vehicle-number"
                      placeholder="e.g., ABC-1234"
                      className="border-black focus:border-yellow-400"
                    />
                  </div>

                  <div>
                    <Label htmlFor="location">Location</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="location"
                        placeholder="Enter location or address"
                        className="border-black focus:border-yellow-400"
                        required
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="border-black text-black hover:bg-black hover:text-yellow-400 bg-transparent"
                      >
                        <MapPin className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe what happened..."
                      className="border-black focus:border-yellow-400 min-h-[100px]"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="reporter-contact">Your Contact (Optional)</Label>
                    <Input
                      id="reporter-contact"
                      type="tel"
                      placeholder="Phone number for follow-up"
                      className="border-black focus:border-yellow-400"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting || !mediaFile}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 text-lg"
                >
                  {isSubmitting ? "Submitting Report..." : "Submit Report"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
