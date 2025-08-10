import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera, Shield, TrendingDown, Users, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      {/* Header */}
      <header className="bg-black text-yellow-400 p-4 shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-8 w-8" />
            <h1 className="text-2xl font-bold">Donkey Driver</h1>
          </div>
          <nav className="hidden md:flex space-x-4">
            <Link href="/leaderboard" className="hover:text-yellow-300 transition-colors">
              Worst Drivers
            </Link>
            <Link href="/police/login" className="hover:text-yellow-300 transition-colors">
              Police Login
            </Link>
            <Link href="/insurance/login" className="hover:text-yellow-300 transition-colors">
              Insurance Login
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-black mb-6">Report Reckless Drivers</h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Help make Sri Lankan roads safer by reporting traffic violations. Together, we can reduce accidents and
            encourage responsible driving.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/report">
              <Button
                size="lg"
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-4 text-lg"
              >
                <Camera className="mr-2 h-6 w-6" />
                Report Violation
              </Button>
            </Link>
            <Link href="/leaderboard">
              <Button
                variant="outline"
                size="lg"
                className="border-black text-black hover:bg-black hover:text-yellow-400 px-8 py-4 text-lg bg-transparent"
              >
                <TrendingDown className="mr-2 h-6 w-6" />
                View Worst Drivers
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-black text-yellow-400 py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-yellow-400 text-black border-0">
              <CardHeader className="text-center">
                <Camera className="h-12 w-12 mx-auto mb-4" />
                <CardTitle>Capture Evidence</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-black/80">
                  Use your phone camera to record traffic violations in real-time or upload existing footage.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-yellow-400 text-black border-0">
              <CardHeader className="text-center">
                <Shield className="h-12 w-12 mx-auto mb-4" />
                <CardTitle>Police Review</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-black/80">
                  Law enforcement reviews and validates reported violations for appropriate action.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-yellow-400 text-black border-0">
              <CardHeader className="text-center">
                <Users className="h-12 w-12 mx-auto mb-4" />
                <CardTitle>Public Accountability</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-black/80">
                  Track repeat offenders on our public leaderboard to promote safer driving habits.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-yellow-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-black mb-2">1,247</div>
              <div className="text-gray-600">Reports Submitted</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-black mb-2">892</div>
              <div className="text-gray-600">Violations Confirmed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-black mb-2">156</div>
              <div className="text-gray-600">Repeat Offenders</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-black mb-2">23%</div>
              <div className="text-gray-600">Accident Reduction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-yellow-400 py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <AlertTriangle className="h-6 w-6" />
            <span className="text-xl font-bold">Donkey Driver</span>
          </div>
          <p className="text-yellow-400/80">Making Sri Lankan roads safer, one report at a time.</p>
          <div className="mt-4 flex justify-center space-x-6">
            <Link href="/leaderboard" className="hover:text-yellow-300 transition-colors">
              Worst Drivers
            </Link>
            <Link href="/police/login" className="hover:text-yellow-300 transition-colors">
              Police Portal
            </Link>
            <Link href="/insurance/login" className="hover:text-yellow-300 transition-colors">
              Insurance Portal
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
