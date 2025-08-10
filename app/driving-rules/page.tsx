import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, AlertTriangle, Shield, Car, Users, Clock } from "lucide-react"
import { Navbar } from "@/components/navbar"

const trafficSigns = [
  {
    category: "Warning Signs",
    color: "bg-yellow-400",
    signs: [
      { name: "Sharp Turn", description: "Indicates a sharp turn ahead", points: "No penalty" },
      { name: "School Zone", description: "Reduce speed near schools", points: "Rs. 2,000 fine" },
      { name: "Pedestrian Crossing", description: "Pedestrians may cross", points: "Rs. 1,500 fine" },
      { name: "Road Work", description: "Construction zone ahead", points: "Rs. 1,000 fine" },
    ],
  },
  {
    category: "Regulatory Signs",
    color: "bg-red-500",
    signs: [
      { name: "Stop Sign", description: "Complete stop required", points: "Rs. 3,000 fine + 3 points" },
      { name: "No Entry", description: "Vehicles prohibited", points: "Rs. 5,000 fine + 5 points" },
      { name: "Speed Limit", description: "Maximum speed allowed", points: "Rs. 2,500 fine + 2 points" },
      { name: "No Parking", description: "Parking prohibited", points: "Rs. 1,500 fine" },
    ],
  },
  {
    category: "Information Signs",
    color: "bg-blue-500",
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
    penalty: "Rs. 2,500 fine + 2 demerit points",
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
    penalty: "Rs. 3,000 fine + 3 demerit points",
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
    penalty: "Rs. 2,000 fine + 2 demerit points",
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
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white pb-20 md:pb-0">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <BookOpen className="h-10 w-10 text-black" />
            <h2 className="text-4xl font-bold text-black">Sri Lankan Driving Rules</h2>
          </div>
          <p className="text-gray-600 text-lg">Know the rules, stay safe, avoid penalties</p>
        </div>

        {/* Key Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center border-yellow-400">
            <CardContent className="p-4">
              <Clock className="h-8 w-8 mx-auto mb-2 text-blue-500" />
              <div className="text-2xl font-bold text-black">24/7</div>
              <div className="text-gray-600">Rules Apply</div>
            </CardContent>
          </Card>
          <Card className="text-center border-yellow-400">
            <CardContent className="p-4">
              <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-red-500" />
              <div className="text-2xl font-bold text-black">15</div>
              <div className="text-gray-600">Demerit Points = License Suspension</div>
            </CardContent>
          </Card>
          <Card className="text-center border-yellow-400">
            <CardContent className="p-4">
              <Car className="h-8 w-8 mx-auto mb-2 text-green-500" />
              <div className="text-2xl font-bold text-black">50</div>
              <div className="text-gray-600">km/h City Speed Limit</div>
            </CardContent>
          </Card>
          <Card className="text-center border-yellow-400">
            <CardContent className="p-4">
              <Shield className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
              <div className="text-2xl font-bold text-black">Rs. 25K</div>
              <div className="text-gray-600">Max Fine Amount</div>
            </CardContent>
          </Card>
        </div>

        {/* Driving Rules */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-black mb-6">Essential Driving Rules</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {drivingRules.map((rule, index) => (
              <Card key={index} className="border-2 border-yellow-400">
                <CardHeader className="bg-black text-yellow-400 py-3">
                  <CardTitle className="flex items-center space-x-2">
                    {rule.icon}
                    <span>{rule.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <ul className="space-y-2 mb-4">
                    {rule.rules.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-yellow-500 mt-1">•</span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Badge variant="destructive" className="text-sm">
                    Penalty: {rule.penalty}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Traffic Signs */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-black mb-6">Traffic Signs & Penalties</h3>
          <div className="space-y-8">
            {trafficSigns.map((category, index) => (
              <Card key={index} className="border-2 border-yellow-400">
                <CardHeader className={`${category.color} text-white py-3`}>
                  <CardTitle className="text-xl">{category.category}</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {category.signs.map((sign, idx) => (
                      <div key={idx} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-black">{sign.name}</h4>
                          <div className="w-12 h-12 bg-gray-200 rounded border-2 border-gray-300 flex items-center justify-center">
                            <span className="text-xs text-gray-500">Sign</span>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{sign.description}</p>
                        <Badge
                          variant={sign.points.includes("No penalty") ? "secondary" : "destructive"}
                          className="text-xs"
                        >
                          {sign.points}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Important Reminders */}
        <Card className="border-2 border-red-500 bg-red-50">
          <CardHeader className="bg-red-500 text-white py-3">
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-6 w-6" />
              <span>Important Reminders</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-black mb-3">Demerit Point System</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• 15 points = License suspension</li>
                  <li>• Points reset after 2 years</li>
                  <li>• Serious offenses = immediate suspension</li>
                  <li>• Court appearance may be required</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-black mb-3">Emergency Contacts</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Police Emergency: 119</li>
                  <li>• Accident Hotline: 1969</li>
                  <li>• Traffic Police: 011-2691111</li>
                  <li>• Road Development Authority: 011-2587623</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
