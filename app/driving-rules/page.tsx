import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, AlertTriangle, Shield, Car, Users, Clock } from "lucide-react"
import { Navbar } from "@/components/navbar"

const trafficSigns = [
  {
    category: "Warning Signs",
    color: "bg-gradient-to-r from-gray-900 to-gray-800",
    signs: [
      { name: "Sharp Turn", description: "Indicates a sharp turn ahead", points: "No penalty" },
      { name: "School Zone", description: "Reduce speed near schools", points: "Rs. 2,000 fine" },
      { name: "Pedestrian Crossing", description: "Pedestrians may cross", points: "Rs. 1,500 fine" },
      { name: "Road Work", description: "Construction zone ahead", points: "Rs. 1,000 fine" },
    ],
  },
  {
    category: "Regulatory Signs",
    color: "bg-gradient-to-r from-gray-900 to-gray-800",
    signs: [
      { name: "Stop Sign", description: "Complete stop required", points: "Rs. 3,000 fine" },
      { name: "No Entry", description: "Vehicles prohibited", points: "Rs. 5,000 fine" },
      { name: "Speed Limit", description: "Maximum speed allowed", points: "Rs. 2,500 fine" },
      { name: "No Parking", description: "Parking prohibited", points: "Rs. 1,500 fine" },
    ],
  },
  {
    category: "Information Signs",
    color: "bg-gradient-to-r from-gray-900 to-gray-800",
    signs: [
      { name: "Hospital", description: "Medical facility nearby", points: "No penalty" },
      { name: "Fuel Station", description: "Petrol station ahead", points: "No penalty" },
      { name: "Rest Area", description: "Rest stop available", points: "No penalty" },
      { name: "Tourist Information", description: "Information center", points: "No penalty" },
    ],
  },
]

const drivingRules = [
  {
    title: "Speed Limits",
    icon: <Car className="h-6 w-6" />,
    rules: [
      "Urban areas: 50 km/h maximum",
      "Highways: 100 km/h maximum",
      "School zones: 30 km/h maximum",
      "Residential areas: 40 km/h maximum",
    ],
    penalty: "Rs. 2,500 fine",
  },
  {
    title: "Traffic Lights",
    icon: <AlertTriangle className="h-6 w-6" />,
    rules: [
      "Red: Complete stop required",
      "Yellow: Prepare to stop if safe",
      "Green: Proceed with caution",
      "Flashing red: Treat as stop sign",
    ],
    penalty: "Rs. 3,000 fine",
  },
  {
    title: "Lane Discipline",
    icon: <Shield className="h-6 w-6" />,
    rules: [
      "Keep left except when overtaking",
      "Use indicators when changing lanes",
      "Maintain safe following distance",
      "No zigzag driving",
    ],
    penalty: "Rs. 2,000 fine",
  },
  {
    title: "Safety Equipment",
    icon: <Users className="h-6 w-6" />,
    rules: [
      "Helmets mandatory for motorcycles",
      "Seat belts required for all passengers",
      "Child seats for children under 12",
      "Valid driving license required",
    ],
    penalty: "Rs. 1,500 - Rs. 5,000 fine",
  },
]

export default function DrivingRulesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20 md:pb-0">
      <Navbar />

      <div className="container mx-auto px-4 py-6 md:py-12 max-w-7xl">
        {/* Page Title */}
        <div className="text-center mb-10 md:mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-yellow-100 rounded-full mb-4">
            <BookOpen className="h-8 w-8 text-yellow-600" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">Sri Lankan Driving Rules</h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">Master the rules, drive safely, and avoid penalties</p>
        </div>

        {/* Key Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
          <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-white rounded-2xl overflow-hidden">
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-100 rounded-full mb-4 group-hover:scale-110 transition-transform">
                <Clock className="h-7 w-7 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">24/7</div>
              <div className="text-sm text-gray-600">Rules Apply</div>
            </CardContent>
          </Card>
          <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-white rounded-2xl overflow-hidden">
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mb-4 group-hover:scale-110 transition-transform">
                <AlertTriangle className="h-7 w-7 text-red-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">100</div>
              <div className="text-sm text-gray-600">km/h Highway Limit</div>
            </CardContent>
          </Card>
          <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-white rounded-2xl overflow-hidden">
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-green-100 rounded-full mb-4 group-hover:scale-110 transition-transform">
                <Car className="h-7 w-7 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">50</div>
              <div className="text-sm text-gray-600">km/h City Limit</div>
            </CardContent>
          </Card>
          <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-white rounded-2xl overflow-hidden">
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-yellow-100 rounded-full mb-4 group-hover:scale-110 transition-transform">
                <Shield className="h-7 w-7 text-yellow-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">Rs. 25K</div>
              <div className="text-sm text-gray-600">Max Fine</div>
            </CardContent>
          </Card>
        </div>

        {/* Driving Rules */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Essential Driving Rules</h2>
            <p className="text-gray-600">Follow these rules to ensure road safety</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {drivingRules.map((rule, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-gray-900 to-gray-800 p-5">
                  <CardTitle className="flex items-center space-x-3 text-white">
                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur">
                      {rule.icon}
                    </div>
                    <span className="text-lg font-semibold">{rule.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <ul className="space-y-3 mb-5">
                    {rule.rules.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-500 mb-1">Penalty</p>
                    <p className="font-semibold text-red-600">{rule.penalty}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Traffic Signs */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Traffic Signs & Penalties</h2>
            <p className="text-gray-600">Recognize these signs to avoid violations</p>
          </div>
          <div className="space-y-6">
            {trafficSigns.map((category, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 border-0 bg-white rounded-2xl overflow-hidden">
                <CardHeader className={`${category.color} p-5`}>
                  <CardTitle className="text-xl font-semibold text-white">{category.category}</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {category.signs.map((sign, idx) => (
                      <div key={idx} className="group bg-gray-50 hover:bg-white rounded-xl p-5 transition-all hover:shadow-md">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-semibold text-gray-900 text-lg">{sign.name}</h4>
                          <div className="w-14 h-14 bg-white rounded-lg border-2 border-gray-200 flex items-center justify-center group-hover:border-yellow-400 transition-colors">
                            <span className="text-xs text-gray-400 font-medium">SIGN</span>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-3 leading-relaxed">{sign.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">Penalty:</span>
                          <span className={`text-sm font-semibold ${sign.points.includes("No penalty") ? "text-green-600" : "text-red-600"}`}>
                            {sign.points}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Important Reminders */}
        <Card className="border-0 bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-3xl overflow-hidden shadow-xl">
          <CardHeader className="p-6 pb-4">
            <CardTitle className="flex items-center space-x-3 text-2xl">
              <div className="p-3 bg-white/20 rounded-full backdrop-blur">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <span>Important Reminders</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 pt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/10 backdrop-blur rounded-xl p-5">
                <h4 className="font-semibold text-lg mb-4 flex items-center">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
                  Important Safety Tips
                </h4>
                <ul className="space-y-3 text-white/90">
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-400">→</span>
                    <span>Always wear seat belts and helmets</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-400">→</span>
                    <span>Never drive under influence</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-400">→</span>
                    <span>Maintain safe following distance</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-400">→</span>
                    <span>Respect all traffic signals</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-5">
                <h4 className="font-semibold text-lg mb-4 flex items-center">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
                  Emergency Contacts
                </h4>
                <ul className="space-y-3 text-white/90">
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-400">→</span>
                    <span>Police Emergency: <strong>119</strong></span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-400">→</span>
                    <span>Accident Hotline: <strong>1969</strong></span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-400">→</span>
                    <span>Traffic Police: <strong>011-2691111</strong></span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-400">→</span>
                    <span>Road Authority: <strong>011-2587623</strong></span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
