"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Camera,
  Upload,
  MapPin,
  Video,
  ImageIcon,
  Loader2,
  AlertCircle,
  X,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { violationAPI } from "@/lib/api";

interface MediaItem {
  id: string;
  file: File;
  preview: string;
  type: "photo" | "video";
}

export default function UploadPage() {
  const [mediaFiles, setMediaFiles] = useState<MediaItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    violationType: "",
    vehicleNumber: "",
    location: "",
    description: "",
    reporterContact: "",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Maximum file size for videos (30MB in bytes)
  const MAX_VIDEO_SIZE = 30 * 1024 * 1024; // 30MB
  const MAX_FILES = 5; // maximum no of files allowed

  // Check for pre-captured media from navbar
  useEffect(() => {
    const capturedMedia = sessionStorage.getItem("capturedMedia");
    const capturedMediaType = sessionStorage.getItem("capturedMediaType");
    const capturedMediaName = sessionStorage.getItem("capturedMediaName");

    if (capturedMedia && capturedMediaType) {
      // Convert data URL back to File object
      fetch(capturedMedia)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], capturedMediaName || "captured-media", {
            type: capturedMediaType,
          });

          // Validate file size for videos
          if (file.type.startsWith("video/") && file.size > MAX_VIDEO_SIZE) {
            setFileError(
              `Video file is too large. Maximum size allowed is 30MB. Your file is ${(
                file.size /
                (1024 * 1024)
              ).toFixed(1)}MB.`
            );
          } else {
            const mediaItem: MediaItem = {
              id: Date.now().toString(),
              file,
              preview: capturedMedia,
              type: file.type.startsWith("video/") ? "video" : "photo",
            };
            setMediaFiles([mediaItem]);
            setFileError(null);
          }
        });

      // Clear session storage
      sessionStorage.removeItem("capturedMedia");
      sessionStorage.removeItem("capturedMediaType");
      sessionStorage.removeItem("capturedMediaName");
    }
  }, []);

  const validateFileSize = (file: File): boolean => {
    if (file.type.startsWith("video/") && file.size > MAX_VIDEO_SIZE) {
      const fileSizeMB = (file.size / (1024 * 1024)).toFixed(1);
      setFileError(
        `Video file is too large. Maximum size allowed is 30MB. Your file is ${fileSizeMB}MB.`
      );
      return false;
    }
    setFileError(null);
    return true;
  };

  const addMediaFiles = (files: FileList) => {
    const newMediaItems: MediaItem[] = [];

    Array.from(files).forEach((file) => {
      // Check file count limit
      if (mediaFiles.length + newMediaItems.length >= MAX_FILES) {
        setFileError(`Maximum ${MAX_FILES} files allowed.`);
        return;
      }

      // Validate file size
      if (!validateFileSize(file)) {
        return;
      }

      const mediaItem: MediaItem = {
        id: `${Date.now()}-${Math.random()}`,
        file,
        preview: URL.createObjectURL(file),
        type: file.type.startsWith("video/") ? "video" : "photo",
      };

      newMediaItems.push(mediaItem);
    });

    if (newMediaItems.length > 0) {
      setMediaFiles((prev) => [...prev, ...newMediaItems]);
      setFileError(null);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      addMediaFiles(files);
      event.target.value = "";
    }
  };

  const handleCameraCapture = () => {
    cameraInputRef.current?.click();
  };

  const removeMediaItem = (id: string) => {
    setMediaFiles((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      // Revoke object URL to prevent memory leaks
      const itemToRemove = prev.find((item) => item.id === id);
      if (itemToRemove) {
        URL.revokeObjectURL(itemToRemove.preview);
      }
      return updated;
    });

    // Clear error if removing files resolves the issue
    if (fileError && mediaFiles.length <= MAX_FILES) {
      setFileError(null);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Double-check file size before submission
    const invalidFiles = mediaFiles.filter(
      (item) =>
        item.file.type.startsWith("video/") && item.file.size > MAX_VIDEO_SIZE
    );

    if (invalidFiles.length > 0) {
      setFileError(
        `${invalidFiles.length} video file(s) are too large. Please remove them or select files smaller than 30MB.`
      );
      return;
    }

    setIsSubmitting(true);

    try {
      // Get the violation type label from the selected value
      const violationTypeLabel = (() => {
        switch (formData.violationType) {
          case "speeding":
            return "Speeding";
          case "red-light":
            return "Running Red Light";
          case "wrong-lane":
            return "Wrong Lane Usage";
          case "no-helmet":
            return "No Helmet";
          case "phone-use":
            return "Phone Usage While Driving";
          case "drunk-driving":
            return "Suspected Drunk Driving";
          case "reckless":
            return "Reckless Driving";
          case "other":
            return "Other Violation";
          default:
            return formData.violationType;
        }
      })();

      // Combine violation type with description for the backend API
      const combinedDescription = `${violationTypeLabel}: ${formData.description}`;

      const reportData = {
        type: formData.violationType,
        vehicleNumber: formData.vehicleNumber,
        location: formData.location,
        description: combinedDescription, // Use the combined description
        reporter: formData.reporterContact || "Anonymous",
        mediaType: mediaFiles.length > 0 ? mediaFiles[0].type : "photo",
        timestamp: new Date().toISOString(),
        status: "pending" as const,
      };

      // First submit to our internal API
      const result = await violationAPI.submitReport(reportData);

      // If we have a video file, also submit to the external video analysis API
      const videoFiles = mediaFiles.filter((item) => item.type === "video");

      for (const videoItem of videoFiles) {
        try {
          // Create FormData for multipart/form-data request
          const formData = new FormData();
          formData.append("video_file", videoItem.file);
          formData.append("user_description", combinedDescription);

          // Make the request to the external API
          const response = await fetch(
            "https://bot.ovindu.com/analyze-video/",
            {
              method: "POST",
              body: formData,
              // No need to set Content-Type header as it's automatically set with boundary for FormData
            }
          );

          if (!response.ok) {
            console.error("Video analysis API error:", await response.text());
          } else {
            console.log("Video analysis submitted successfully");
          }
        } catch (apiError) {
          console.error("Error submitting to video analysis API:", apiError);
          // Continue with the flow even if the external API fails
        }
      }

      alert(
        `Report submitted successfully! You can track its status using the reference number: ${result.id}`
      );

      // Reset form
      mediaFiles.forEach((item) => URL.revokeObjectURL(item.preview));
      setMediaFiles([]);
      setFileError(null);
      setFormData({
        violationType: "",
        vehicleNumber: "",
        location: "",
        description: "",
        reporterContact: "",
      });
    } catch (error) {
      alert("Failed to submit report. Please try again.");
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white pb-28 md:pb-0">
      <Navbar />

      <div className="container mx-auto px-2 md:px-4  md:py-2 mt-6 md:mt-0">
        <div className="max-w-2xl mx-auto">
          <Card className="border-2 border-yellow-400 shadow-md">
            <CardHeader className="bg-black text-yellow-400 p-5 md:p-4 rounded-t-md">
              <CardTitle className="flex items-center space-x-2 text-lg md:text-xl">
                <Camera className="h-5 w-5 md:h-6 md:w-6" />
                <span>Upload Traffic Violation</span>
              </CardTitle>
              <CardDescription className="text-yellow-400/80 text-sm md:text-base">
                Help make roads safer by reporting reckless driving behavior
              </CardDescription>
            </CardHeader>

            <CardContent className="p-3 md:p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Media Capture Section */}
                <div className="space-y-3 md:space-y-4">
                  <Label className="text-base md:text-lg font-semibold text-black">
                    Evidence (Photo/Video) - {mediaFiles.length}/{MAX_FILES}
                  </Label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                    <Button
                      type="button"
                      onClick={handleCameraCapture}
                      disabled={mediaFiles.length >= MAX_FILES}
                      className="bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 text-black h-16 md:h-20 flex-col space-y-1 md:space-y-2 rounded-xl touch-manipulation disabled:opacity-50"
                    >
                      <Camera className="h-6 w-6 md:h-8 md:w-8" />
                      <span className="text-sm md:text-base">
                        Take Photo/Video
                      </span>
                    </Button>

                    <Button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={mediaFiles.length >= MAX_FILES}
                      variant="outline"
                      className="border-black text-black hover:bg-black hover:text-yellow-400 active:bg-black/90 h-16 md:h-20 flex-col space-y-1 md:space-y-2 rounded-xl touch-manipulation disabled:opacity-50"
                    >
                      <Upload className="h-6 w-6 md:h-8 md:w-8" />
                      <span className="text-sm md:text-base">Upload Files</span>
                    </Button>
                  </div>

                  <div className="text-sm text-gray-600">
                    Maximum video file size: 30MB • Maximum {MAX_FILES} files
                  </div>

                  {/* Hidden file inputs */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,video/*"
                    multiple
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

                  {/* File Error Display */}
                  {fileError && (
                    <div className="border-2 border-red-400 bg-red-50 rounded-lg p-3 md:p-4">
                      <div className="flex items-start space-x-2">
                        <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <div className="text-red-700 text-sm md:text-base">
                          {fileError}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Media Preview */}
                  {mediaFiles.length > 0 && (
                    <div className="space-y-3">
                      <div className="text-sm font-medium text-black">
                        Uploaded Files ({mediaFiles.length})
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {mediaFiles.map((mediaItem) => (
                          <div
                            key={mediaItem.id}
                            className="border-2 border-yellow-400 rounded-lg p-3 relative"
                          >
                            {/* Remove button */}
                            <Button
                              type="button"
                              onClick={() => removeMediaItem(mediaItem.id)}
                              className="absolute top-1 right-1 z-10 h-8 w-8 p-0 bg-red-500 hover:bg-red-600 text-white rounded-full"
                              size="sm"
                            >
                              <X className="h-4 w-4" />
                            </Button>

                            <div className="flex items-center justify-between mb-2 pr-8">
                              <div className="flex items-center space-x-2">
                                {mediaItem.type === "video" ? (
                                  <Video className="h-4 w-4 text-black" />
                                ) : (
                                  <ImageIcon className="h-4 w-4 text-black" />
                                )}
                                <span className="font-medium text-black text-sm">
                                  {mediaItem.type === "video"
                                    ? "Video"
                                    : "Photo"}
                                </span>
                              </div>
                              <span className="text-xs text-gray-500">
                                {formatFileSize(mediaItem.file.size)}
                              </span>
                            </div>

                            {mediaItem.type === "video" ? (
                              <video
                                src={mediaItem.preview}
                                controls
                                className="w-full max-h-32 md:max-h-40 rounded-lg"
                              />
                            ) : (
                              <img
                                src={mediaItem.preview}
                                alt="Evidence preview"
                                className="w-full max-h-32 md:max-h-40 object-cover rounded-lg"
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Violation Details */}
                <div className="space-y-4 md:space-y-5">
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="violation-type"
                      className="text-sm md:text-base"
                    >
                      Violation Type
                    </Label>
                    <Select
                      value={formData.violationType}
                      onValueChange={(value) =>
                        handleInputChange("violationType", value)
                      }
                      required
                    >
                      <SelectTrigger className="w-full border-black focus:border-yellow-400 h-10 md:h-11 rounded-lg">
                        <SelectValue placeholder="Select violation type" />
                      </SelectTrigger>
                      <SelectContent className="w-full text-sm md:text-base">
                        <SelectItem value="speeding">Speeding</SelectItem>
                        <SelectItem value="red-light">
                          Running Red Light
                        </SelectItem>
                        <SelectItem value="wrong-lane">
                          Wrong Lane Usage
                        </SelectItem>
                        <SelectItem value="no-helmet">No Helmet</SelectItem>
                        <SelectItem value="phone-use">
                          Phone Usage While Driving
                        </SelectItem>
                        <SelectItem value="drunk-driving">
                          Suspected Drunk Driving
                        </SelectItem>
                        <SelectItem value="reckless">
                          Reckless Driving
                        </SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <Label
                      htmlFor="vehicle-number"
                      className="text-sm md:text-base"
                    >
                      Vehicle Number (if visible)
                    </Label>
                    <Input
                      id="vehicle-number"
                      value={formData.vehicleNumber}
                      onChange={(e) =>
                        handleInputChange("vehicleNumber", e.target.value)
                      }
                      placeholder="e.g., ABC-1234"
                      className="border-black focus:border-yellow-400 h-10 md:h-11 rounded-lg"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="location" className="text-sm md:text-base">
                      Location
                    </Label>
                    <div className="flex space-x-2">
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) =>
                          handleInputChange("location", e.target.value)
                        }
                        placeholder="Enter location or address"
                        className="border-black focus:border-yellow-400 h-10 md:h-11 rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label
                      htmlFor="description"
                      className="text-sm md:text-base"
                    >
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) =>
                        handleInputChange("description", e.target.value)
                      }
                      placeholder="Describe what happened..."
                      className="border-black focus:border-yellow-400 min-h-[80px] md:min-h-[100px] rounded-lg text-sm md:text-base"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label
                      htmlFor="reporter-contact"
                      className="text-sm md:text-base"
                    >
                      Your Contact (Optional)
                    </Label>
                    <Input
                      id="reporter-contact"
                      type="tel"
                      value={formData.reporterContact}
                      onChange={(e) =>
                        handleInputChange("reporterContact", e.target.value)
                      }
                      placeholder="Phone number for follow-up"
                      className="border-black focus:border-yellow-400 h-10 md:h-11 rounded-lg"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={
                    isSubmitting ||
                    mediaFiles.length === 0 ||
                    !formData.violationType ||
                    fileError !== null
                  }
                  className="w-full bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 text-black font-semibold py-2.5 md:py-3 text-base md:text-lg rounded-xl mt-2 md:mt-4 h-12 md:h-14 touch-manipulation transition-colors duration-200"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <span>Submit Report ({mediaFiles.length} files)</span>
                  )}
                </Button>

                {/* Bottom spacer for mobile to prevent button being hidden by navbar */}
                <div className="md:hidden"></div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
