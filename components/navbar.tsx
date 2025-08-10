"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Camera, Home, TrendingDown, BookOpen, Settings } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function Navbar() {
  const [isCapturing, setIsCapturing] = useState(false);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleCameraClick = () => {
    setIsCapturing(true);
    cameraInputRef.current?.click();
  };

  const handleCameraCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Store the captured media in sessionStorage to pass to upload page
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        sessionStorage.setItem("capturedMedia", result);
        sessionStorage.setItem(
          "capturedMediaType",
          file.type.startsWith("video/") ? "video" : "photo"
        );
        sessionStorage.setItem("capturedMediaName", file.name);
        router.push("/upload");
      };
      reader.readAsDataURL(file);
    }
    setIsCapturing(false);
  };

  return (
    <>
      {/* Desktop Navbar - Top */}
      <nav className="hidden md:block bg-black text-yellow-400 p-4 shadow-lg sticky top-0 z-50 rounded-b-2xl mx-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            {/* Left Side - Home and Worst Drivers */}
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="flex items-center space-x-2 hover:text-yellow-300 transition-colors"
              >
                <Home className="h-6 w-6" />
                <span>Home</span>
              </Link>
              <Link
                href="/leaderboard"
                className="flex items-center space-x-2 hover:text-yellow-300 transition-colors"
              >
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
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold p-4 rounded-full"
                size="lg"
              >
                <Camera className="h-8 w-8" />
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
              <Button
                variant="ghost"
                className="flex items-center space-x-2 hover:text-yellow-300 text-yellow-400"
              >
                <Settings className="h-6 w-6" />
                <span>Settings</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>
      {/* Mobile Header - Fixed at Top */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-black text-yellow-400 shadow-lg z-50 border-b border-yellow-400 w-full py-1">
        <div className="flex items-center justify-center p-4 gap-x-4">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-yellow-400 p-0.5 mr-2">
            <Image
              src="/images/donkey-logo.jpeg"
              alt="Donkey Driver Logo"
              width={32}
              height={32}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <h1 className="text-lg font-bold">Donkey Watch</h1>
        </div>
      </div>
      {/* Mobile Navbar - Fixed at Bottom */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-black text-yellow-400 shadow-lg z-50 border-t border-yellow-400 w-full">
        <div className="p-3">
          <div className="flex items-center justify-between w-full relative">
            {/* Home */}
            <Link href="/" className="flex flex-col items-center w-16">
              <Home className="h-6 w-6" />
              <span className="text-xs mt-1">Home</span>
            </Link>

            {/* Worst */}
            <Link
              href="/leaderboard"
              className="flex flex-col items-center w-16"
            >
              <TrendingDown className="h-6 w-6" />
              <span className="text-xs mt-1">Worst</span>
            </Link>

            {/* Spacer for Camera */}
            <div className="w-16" />

            {/* Rules */}
            <Link
              href="/driving-rules"
              className="flex flex-col items-center w-16"
            >
              <BookOpen className="h-6 w-6" />
              <span className="text-xs mt-1">Rules</span>
            </Link>

            {/* Settings */}
            <Button
              variant="ghost"
              className="flex flex-col items-center w-16 text-yellow-400"
            >
              <Settings className="h-6 w-6" />
              <span className="text-xs mt-1">Settings</span>
            </Button>

            {/* Floating Camera */}
            <div className="absolute left-1/2 -translate-x-1/2 -top-10">
              <Button
                onClick={handleCameraClick}
                disabled={isCapturing}
                className="bg-yellow-400 hover:bg-yellow-500 active:scale-95 
                     transition-transform duration-200 text-black font-semibold 
                     p-6 rounded-full shadow-lg hover:shadow-xl"
                style={{ width: "80px", height: "80px" }}
              >
                <Camera className="h-10 w-10" />
              </Button>
            </div>
          </div>
        </div>
      </nav>
      {/* Spacer for main content so it doesn't hide behind header/footer */}
      <div className="md:hidden h-16"></div> {/* Top spacer */}
    </>
  );
}
