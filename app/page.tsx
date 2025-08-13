import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Camera,
  Shield,
  TrendingDown,
  Users,
  AlertTriangle,
  Upload,
} from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white pb-16 md:pb-0 overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-10 md:py-20 text-center max-w-full">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-black mb-6">
            Report Reckless Drivers
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Help make Sri Lankan roads safer by reporting traffic violations.
            Together, we can reduce accidents and encourage responsible driving.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Link href="/upload">
              <Button
                size="lg"
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-6 text-lg"
              >
                <Upload className="mr-2 h-6 w-6" />
                Report Violation
              </Button>
            </Link>
            <Link href="/leaderboard">
              <Button
                variant="outline"
                size="lg"
                className="border-black text-black hover:bg-black hover:text-yellow-400 px-8 py-6 text-lg bg-transparent"
              >
                <TrendingDown className="mr-2 h-6 w-6" />
                View Worst Drivers
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-black text-yellow-400 py-20 mx-0">
        <div className="container mx-auto px-4 md:px-8 max-w-full">
          <h3 className="text-3xl font-bold text-center mb-16">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-yellow-400 text-black border-0 rounded-2xl transform hover:scale-105 transition-transform">
              <CardHeader className="text-center p-8">
                <Camera className="h-16 w-16 mx-auto mb-6" />
                <CardTitle className="text-xl">Capture Evidence</CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <CardDescription className="text-black/80 text-base">
                  Use your phone camera to record traffic violations in
                  real-time or upload existing footage.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-yellow-400 text-black border-0 rounded-2xl transform hover:scale-105 transition-transform">
              <CardHeader className="text-center p-8">
                <Shield className="h-16 w-16 mx-auto mb-6" />
                <CardTitle className="text-xl">Police Review</CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <CardDescription className="text-black/80 text-base">
                  Law enforcement reviews and validates reported violations for
                  appropriate action.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-yellow-400 text-black border-0 rounded-2xl transform hover:scale-105 transition-transform">
              <CardHeader className="text-center p-8">
                <Users className="h-16 w-16 mx-auto mb-6" />
                <CardTitle className="text-xl">Public Accountability</CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <CardDescription className="text-black/80 text-base">
                  Track repeat offenders on our public leaderboard to promote
                  safer driving habits.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gradient-to-r from-yellow-50 via-yellow-100 to-yellow-50 mx-0">
        <div className="container mx-auto px-4 md:px-8 max-w-full">
          <h3 className="text-3xl font-bold text-center text-black mb-12">
            Our Impact
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl font-bold text-black mb-2">1,247</div>
              <div className="text-gray-600 font-medium">Reports Submitted</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl font-bold text-black mb-2">892</div>
              <div className="text-gray-600 font-medium">
                Violations Confirmed
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl font-bold text-black mb-2">156</div>
              <div className="text-gray-600 font-medium">Repeat Offenders</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl font-bold text-black mb-2">23%</div>
              <div className="text-gray-600 font-medium">
                Accident Reduction
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-yellow-400 py-10">
        <div className="container mx-auto px-4 text-center max-w-full">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <AlertTriangle className="h-6 w-6" />
            <span className="text-xl font-bold">Donkey Watch</span>
          </div>
          <p className="text-yellow-400/80">
            Making Sri Lankan roads safer, one report at a time.
          </p>
        </div>
      </footer>
    </div>
  );
}
