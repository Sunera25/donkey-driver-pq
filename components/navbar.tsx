"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Camera, Home, TrendingDown, BookOpen, BarChart } from "lucide-react";
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
      <nav className="hidden md:block bg-black text-yellow-400 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-10 py-1">
          <div className="flex items-center justify-between h-16">
            {/* Left Side - Logo */}
            <Link href="/" className="flex items-center space-x-6">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 rounded-full overflow-hidden bg-yellow-400 p-0.5 scale-150 z-10">
                  <Image
                    src="/images/donkey-logo.jpeg"
                    alt="Donkey Driver Logo"
                    width={60}
                    height={60}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              <h1 className="text-2xl font-bold">Donkey Driver</h1>
            </Link>

            {/* Center - Navigation Links */}
            <div className="flex items-center space-x-8">
              <Link
                href="/"
                className="flex items-center space-x-2 hover:text-yellow-300 transition-colors font-medium"
              >
                <Home className="h-5 w-5" />
                <span>Home</span>
              </Link>
              <Link
                href="/leaderboard"
                className="flex items-center space-x-2 hover:text-yellow-300 transition-colors font-medium"
              >
                <TrendingDown className="h-5 w-5" />
                <span>Worst Drivers</span>
              </Link>
              <Link
                href="/driving-rules"
                className="flex items-center space-x-2 hover:text-yellow-300 transition-colors font-medium"
              >
                <BookOpen className="h-5 w-5" />
                <span>Driving Rules</span>
              </Link>
              <Link
                href="/stats"
                className="flex items-center space-x-2 hover:text-yellow-300 transition-colors font-medium"
              >
                <BarChart className="h-5 w-5" />
                <span>Stats</span>
              </Link>
            </div>

            {/* Right Side - Camera and Settings */}
            <div className="flex items-center space-x-4">
              <Button
                onClick={handleCameraClick}
                disabled={isCapturing}
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-full transition-all hover:scale-105"
                size="icon"
              >
                <Camera style={{ width: "24px", height: "24px" }} />
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
          </div>
        </div>
      </nav>
      {/* Mobile Header - Fixed at Top */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-black text-yellow-400 shadow-lg z-50 border-b border-yellow-400 w-full">
        <div className="flex items-center justify-center py-4">
          <div className="flex items-center gap-6">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 rounded-full overflow-hidden bg-yellow-400 p-0.5 scale-150 z-10">
                <Image
                  src="/images/donkey-logo.jpeg"
                  alt="Donkey Driver Logo"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
            <h1 className="text-xl font-bold">Donkey Driver</h1>
          </div>
        </div>
      </div>
      {/* Mobile Navbar - Fixed at Bottom */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-black text-yellow-400 shadow-lg z-50 border-t border-yellow-400 w-full">
        <div className="px-2 pb-2 pt-3">
          <div className="flex items-center justify-around w-full relative">
            {/* Home */}
            <Link href="/" className="flex flex-col items-center flex-1 py-2">
              <Home className="h-5 w-5" />
              <span className="text-xs mt-1 font-medium">Home</span>
            </Link>

            {/* Worst */}
            <Link
              href="/leaderboard"
              className="flex flex-col items-center flex-1 py-2"
            >
              <TrendingDown className="h-5 w-5" />
              <span className="text-xs mt-1 font-medium">Worst</span>
            </Link>

            {/* Spacer for Camera */}
            <div className="flex-1" />

            {/* Rules */}
            <Link
              href="/driving-rules"
              className="flex flex-col items-center flex-1 py-2"
            >
              <BookOpen className="h-5 w-5" />
              <span className="text-xs mt-1 font-medium">Rules</span>
            </Link>

            {/* Stats */}
            <Link
              href="/stats"
              className="flex flex-col items-center flex-1 py-2"
            >
              <BarChart className="h-5 w-5" />
              <span className="text-xs mt-1 font-medium">Stats</span>
            </Link>

            {/* Floating Camera - Centered */}
            <div className="absolute left-1/2 -translate-x-1/2 -top-8">
              <Button
                onClick={handleCameraClick}
                disabled={isCapturing}
                className="bg-yellow-400 hover:bg-yellow-500 active:scale-95 
                     transition-all duration-200 text-black font-semibold 
                     rounded-full shadow-xl hover:shadow-2xl border-4 border-black"
                style={{ width: "72px", height: "72px" }}
              >
                <Camera style={{ width: "36px", height: "36px" }} />
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
