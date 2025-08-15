"use client";

import { useState, useEffect } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  PieChart,
  Settings,
  Filter,
  Calendar,
  MapPin,
  AlertTriangle,
  Car,
  Clock,
  Download,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { violationAPI } from "@/lib/api";

// Dummy data for statistics
const dummyViolationStats = {
  totalViolations: 1248,
  pendingReview: 156,
  validated: 876,
  rejected: 216,
  byType: [
    { type: "Speeding", count: 432 },
    { type: "Red Light", count: 287 },
    { type: "Wrong Lane", count: 198 },
    { type: "No Helmet", count: 176 },
    { type: "Phone Use", count: 89 },
    { type: "Drunk Driving", count: 42 },
    { type: "Other", count: 24 },
  ],
  byLocation: [
    { location: "Colombo", count: 523 },
    { location: "Kandy", count: 312 },
    { location: "Galle", count: 187 },
    { location: "Negombo", count: 142 },
    { location: "Matara", count: 84 },
  ],
  byMonth: [
    { month: "Jan", count: 87 },
    { month: "Feb", count: 92 },
    { month: "Mar", count: 105 },
    { month: "Apr", count: 121 },
    { month: "May", count: 134 },
    { month: "Jun", count: 142 },
    { month: "Jul", count: 156 },
    { month: "Aug", count: 148 },
    { month: "Sep", count: 132 },
    { month: "Oct", count: 118 },
    { month: "Nov", count: 0 },
    { month: "Dec", count: 0 },
  ],
  byTime: [
    { time: "Morning (6-12)", count: 312 },
    { time: "Afternoon (12-18)", count: 487 },
    { time: "Evening (18-22)", count: 356 },
    { time: "Night (22-6)", count: 93 },
  ],
};

export default function StatsPage() {
  // Separate filters for each visualization section
  const [filters, setFilters] = useState({
    byType: {
      dateRange: "all-time",
      location: "all",
    },
    byLocation: {
      dateRange: "all-time",
      location: "all",
      violationType: "all",
    },
    byTime: {
      dateRange: "all-time",
      timeOfDay: "all",
      location: "all",
      violationType: "all",
    },
  });
  const [showTypeFilters, setShowTypeFilters] = useState(false);
  const [showLocationFilters, setShowLocationFilters] = useState(false);
  const [showTimeFilters, setShowTimeFilters] = useState(false);
  const [stats, setStats] = useState(dummyViolationStats);

  // Apply filters (in a real app, this would fetch filtered data from API)
  const applyFilters = () => {
    // Simulate filtered data - in a real app, this would call an API with filter params
    console.log("Applying filters for Type:", filters.byType);
    console.log("Applying filters for Location:", filters.byLocation);
    console.log("Applying filters for Time:", filters.byTime);
    // For demo, we'll just use the same data
    setStats({ ...dummyViolationStats });
    // Close all filter panels after applying
    setShowTypeFilters(false);
    setShowLocationFilters(false);
    setShowTimeFilters(false);
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      byType: {
        dateRange: "all-time",
        location: "all",
      },
      byLocation: {
        dateRange: "all-time",
        location: "all",
        violationType: "all",
      },
      byTime: {
        dateRange: "all-time",
        timeOfDay: "all",
        location: "all",
        violationType: "all",
      },
    });
    setStats({ ...dummyViolationStats });
  };

  // Handle filter changes
  const handleFilterChange = (
    section: string,
    field: string,
    value: string
  ) => {
    setFilters((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value,
      },
    }));
  };

  // Calculate percentages for pie chart
  const calculatePercentage = (count: number) => {
    return Math.round((count / stats.totalViolations) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white pb-28 md:pb-0">
      <Navbar />

      <div className="container mx-auto px-6 md:px-30 py-2 mt-6 md:mt-6">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-10">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-black flex items-center">
              <BarChart className="h-6 w-6 md:h-7 md:w-7 mr-2 text-yellow-500" />
              Violation Statistics
            </h1>
            <p className="text-gray-600 mt-1">
              Analyze traffic violation patterns and trends
            </p>
          </div>

          {/* No longer needed - each section has its own filter toggle */}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* Stats Dashboard */}
          <div className="md:col-span-3 space-y-4 md:space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              <Card className="border-2 border-yellow-400 shadow-md">
                <CardContent className="p-4">
                  <div className="text-sm text-gray-500 mb-1">
                    Total Reports
                  </div>
                  <div className="text-2xl md:text-3xl font-bold">
                    {stats.totalViolations.toLocaleString()}
                  </div>
                </CardContent>
              </Card>
              <Card className="border-2 border-yellow-400 shadow-md">
                <CardContent className="p-4">
                  <div className="text-sm text-gray-500 mb-1">Pending</div>
                  <div className="text-2xl md:text-3xl font-bold text-orange-500">
                    {stats.pendingReview.toLocaleString()}
                  </div>
                </CardContent>
              </Card>
              <Card className="border-2 border-yellow-400 shadow-md">
                <CardContent className="p-4">
                  <div className="text-sm text-gray-500 mb-1">Validated</div>
                  <div className="text-2xl md:text-3xl font-bold text-green-500">
                    {stats.validated.toLocaleString()}
                  </div>
                </CardContent>
              </Card>
              <Card className="border-2 border-yellow-400 shadow-md">
                <CardContent className="p-4">
                  <div className="text-sm text-gray-500 mb-1">Rejected</div>
                  <div className="text-2xl md:text-3xl font-bold text-red-500">
                    {stats.rejected.toLocaleString()}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {/* Violations by Type */}
              <Card className="border-2 border-yellow-400 shadow-md">
                <CardHeader className="p-4 pb-0">
                  <CardTitle className="text-lg flex justify-between items-center">
                    <span>Violations by Type</span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 border-black text-black hover:bg-black hover:text-yellow-400"
                      onClick={() => setShowTypeFilters(!showTypeFilters)}
                    >
                      <Filter className="h-4 w-4 mr-1" />
                      Filter
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  {/* Type Filters */}
                  {showTypeFilters && (
                    <div className="mb-4 p-3 bg-yellow-50 rounded-md border border-yellow-200">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {/* Date Range Filter */}
                        <div>
                          <Label
                            htmlFor="type-date-range"
                            className="text-xs font-medium"
                          >
                            <Calendar className="h-3 w-3 inline mr-1" />
                            Date Range
                          </Label>
                          <Select
                            value={filters.byType.dateRange}
                            onValueChange={(value) =>
                              handleFilterChange("byType", "dateRange", value)
                            }
                          >
                            <SelectTrigger className="w-full h-8 text-xs border-black focus:border-yellow-400">
                              <SelectValue placeholder="Select date range" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="today">Today</SelectItem>
                              <SelectItem value="this-week">
                                This Week
                              </SelectItem>
                              <SelectItem value="this-month">
                                This Month
                              </SelectItem>
                              <SelectItem value="last-3-months">
                                Last 3 Months
                              </SelectItem>
                              <SelectItem value="last-6-months">
                                Last 6 Months
                              </SelectItem>
                              <SelectItem value="this-year">
                                This Year
                              </SelectItem>
                              <SelectItem value="all-time">All Time</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Location Filter */}
                        <div>
                          <Label
                            htmlFor="type-location"
                            className="text-xs font-medium"
                          >
                            <MapPin className="h-3 w-3 inline mr-1" />
                            Location
                          </Label>
                          <Select
                            value={filters.byType.location}
                            onValueChange={(value) =>
                              handleFilterChange("byType", "location", value)
                            }
                          >
                            <SelectTrigger className="w-full h-8 text-xs border-black focus:border-yellow-400">
                              <SelectValue placeholder="Select location" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Locations</SelectItem>
                              <SelectItem value="colombo">Colombo</SelectItem>
                              <SelectItem value="kandy">Kandy</SelectItem>
                              <SelectItem value="galle">Galle</SelectItem>
                              <SelectItem value="negombo">Negombo</SelectItem>
                              <SelectItem value="matara">Matara</SelectItem>
                              <SelectItem value="jaffna">Jaffna</SelectItem>
                              <SelectItem value="batticaloa">
                                Batticaloa
                              </SelectItem>
                              <SelectItem value="anuradhapura">
                                Anuradhapura
                              </SelectItem>
                              <SelectItem value="trincomalee">
                                Trincomalee
                              </SelectItem>
                              <SelectItem value="kurunegala">
                                Kurunegala
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="flex space-x-2 mt-3">
                        <Button
                          onClick={applyFilters}
                          size="sm"
                          className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black text-xs h-7"
                        >
                          Apply
                        </Button>
                        <Button
                          onClick={resetFilters}
                          variant="outline"
                          size="sm"
                          className="flex-1 border-black text-black hover:bg-black hover:text-yellow-400 text-xs h-7"
                        >
                          Reset
                        </Button>
                      </div>
                    </div>
                  )}
                  <div className="space-y-3">
                    {stats.byType.map((item) => (
                      <div key={item.type}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{item.type}</span>
                          <span className="font-medium">
                            {item.count} ({calculatePercentage(item.count)}%)
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-yellow-400 h-2.5 rounded-full"
                            style={{
                              width: `${calculatePercentage(item.count)}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Violations by Location */}
              <Card className="border-2 border-yellow-400 shadow-md">
                <CardHeader className="p-4 pb-0">
                  <CardTitle className="text-lg flex justify-between items-center">
                    <span>Violations by Location</span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 border-black text-black hover:bg-black hover:text-yellow-400"
                      onClick={() =>
                        setShowLocationFilters(!showLocationFilters)
                      }
                    >
                      <Filter className="h-4 w-4 mr-1" />
                      Filter
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  {/* Location Filters */}
                  {showLocationFilters && (
                    <div className="mb-4 p-3 bg-yellow-50 rounded-md border border-yellow-200">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {/* Date Range Filter */}
                        <div>
                          <Label
                            htmlFor="location-date-range"
                            className="text-xs font-medium"
                          >
                            <Calendar className="h-3 w-3 inline mr-1" />
                            Date Range
                          </Label>
                          <Select
                            value={filters.byLocation.dateRange}
                            onValueChange={(value) =>
                              handleFilterChange(
                                "byLocation",
                                "dateRange",
                                value
                              )
                            }
                          >
                            <SelectTrigger className="w-full h-8 text-xs border-black focus:border-yellow-400">
                              <SelectValue placeholder="Select date range" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="today">Today</SelectItem>
                              <SelectItem value="this-week">
                                This Week
                              </SelectItem>
                              <SelectItem value="this-month">
                                This Month
                              </SelectItem>
                              <SelectItem value="last-3-months">
                                Last 3 Months
                              </SelectItem>
                              <SelectItem value="last-6-months">
                                Last 6 Months
                              </SelectItem>
                              <SelectItem value="this-year">
                                This Year
                              </SelectItem>
                              <SelectItem value="all-time">All Time</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Location Filter */}
                        <div>
                          <Label
                            htmlFor="location"
                            className="text-xs font-medium"
                          >
                            <MapPin className="h-3 w-3 inline mr-1" />
                            Location
                          </Label>
                          <Select
                            value={filters.byLocation.location}
                            onValueChange={(value) =>
                              handleFilterChange(
                                "byLocation",
                                "location",
                                value
                              )
                            }
                          >
                            <SelectTrigger className="w-full h-8 text-xs border-black focus:border-yellow-400">
                              <SelectValue placeholder="Select location" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Locations</SelectItem>
                              <SelectItem value="colombo">Colombo</SelectItem>
                              <SelectItem value="kandy">Kandy</SelectItem>
                              <SelectItem value="galle">Galle</SelectItem>
                              <SelectItem value="negombo">Negombo</SelectItem>
                              <SelectItem value="matara">Matara</SelectItem>
                              <SelectItem value="jaffna">Jaffna</SelectItem>
                              <SelectItem value="batticaloa">
                                Batticaloa
                              </SelectItem>
                              <SelectItem value="anuradhapura">
                                Anuradhapura
                              </SelectItem>
                              <SelectItem value="trincomalee">
                                Trincomalee
                              </SelectItem>
                              <SelectItem value="kurunegala">
                                Kurunegala
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Violation Type Filter */}
                        <div>
                          <Label
                            htmlFor="location-violation-type"
                            className="text-xs font-medium"
                          >
                            <AlertTriangle className="h-3 w-3 inline mr-1" />
                            Violation Type
                          </Label>
                          <Select
                            value={filters.byLocation.violationType}
                            onValueChange={(value) =>
                              handleFilterChange(
                                "byLocation",
                                "violationType",
                                value
                              )
                            }
                          >
                            <SelectTrigger className="w-full h-8 text-xs border-black focus:border-yellow-400">
                              <SelectValue placeholder="Select violation type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Types</SelectItem>
                              <SelectItem value="speeding">Speeding</SelectItem>
                              <SelectItem value="red-light">
                                Red Light
                              </SelectItem>
                              <SelectItem value="wrong-lane">
                                Wrong Lane
                              </SelectItem>
                              <SelectItem value="no-helmet">
                                No Helmet
                              </SelectItem>
                              <SelectItem value="phone-use">
                                Phone Use
                              </SelectItem>
                              <SelectItem value="drunk-driving">
                                Drunk Driving
                              </SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="flex space-x-2 mt-3">
                        <Button
                          onClick={applyFilters}
                          size="sm"
                          className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black text-xs h-7"
                        >
                          Apply
                        </Button>
                        <Button
                          onClick={resetFilters}
                          variant="outline"
                          size="sm"
                          className="flex-1 border-black text-black hover:bg-black hover:text-yellow-400 text-xs h-7"
                        >
                          Reset
                        </Button>
                      </div>
                    </div>
                  )}
                  <div className="h-64 flex items-center justify-center">
                    {/* Pie Chart Visualization (simplified) */}
                    <div className="relative w-48 h-48">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-lg font-bold">
                          {stats.totalViolations}
                        </div>
                      </div>
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        {/* This is a simplified pie chart representation */}
                        {/* In a real app, you would use a charting library like Chart.js or Recharts */}
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="transparent"
                          stroke="#FCD34D"
                          strokeWidth="20"
                          strokeDasharray={`${
                            (stats.byLocation[0].count /
                              stats.totalViolations) *
                            251.2
                          } 251.2`}
                          transform="rotate(-90 50 50)"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="transparent"
                          stroke="#FB923C"
                          strokeWidth="20"
                          strokeDasharray={`${
                            (stats.byLocation[1].count /
                              stats.totalViolations) *
                            251.2
                          } 251.2`}
                          strokeDashoffset={`${
                            -1 *
                            (stats.byLocation[0].count /
                              stats.totalViolations) *
                            251.2
                          }`}
                          transform="rotate(-90 50 50)"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="transparent"
                          stroke="#4ADE80"
                          strokeWidth="20"
                          strokeDasharray={`${
                            (stats.byLocation[2].count /
                              stats.totalViolations) *
                            251.2
                          } 251.2`}
                          strokeDashoffset={`${
                            -1 *
                            ((stats.byLocation[0].count +
                              stats.byLocation[1].count) /
                              stats.totalViolations) *
                            251.2
                          }`}
                          transform="rotate(-90 50 50)"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="transparent"
                          stroke="#3B82F6"
                          strokeWidth="20"
                          strokeDasharray={`${
                            (stats.byLocation[3].count /
                              stats.totalViolations) *
                            251.2
                          } 251.2`}
                          strokeDashoffset={`${
                            -1 *
                            ((stats.byLocation[0].count +
                              stats.byLocation[1].count +
                              stats.byLocation[2].count) /
                              stats.totalViolations) *
                            251.2
                          }`}
                          transform="rotate(-90 50 50)"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="transparent"
                          stroke="#EC4899"
                          strokeWidth="20"
                          strokeDasharray={`${
                            (stats.byLocation[4].count /
                              stats.totalViolations) *
                            251.2
                          } 251.2`}
                          strokeDashoffset={`${
                            -1 *
                            ((stats.byLocation[0].count +
                              stats.byLocation[1].count +
                              stats.byLocation[2].count +
                              stats.byLocation[3].count) /
                              stats.totalViolations) *
                            251.2
                          }`}
                          transform="rotate(-90 50 50)"
                        />
                      </svg>
                    </div>
                    <div className="ml-4 space-y-2">
                      {stats.byLocation.map((item, index) => {
                        const colors = [
                          "bg-yellow-400",
                          "bg-orange-400",
                          "bg-green-400",
                          "bg-blue-500",
                          "bg-pink-500",
                        ];
                        return (
                          <div
                            key={item.location}
                            className="flex items-center"
                          >
                            <div
                              className={`w-3 h-3 ${colors[index]} rounded-full mr-2`}
                            ></div>
                            <span className="text-sm">
                              {item.location} ({item.count})
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {/* Monthly Trend */}
              <Card className="border-2 border-yellow-400 shadow-md">
                <CardHeader className="p-4 pb-0">
                  <CardTitle className="text-lg">Monthly Trend</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="h-64 flex items-end justify-between space-x-1">
                    {stats.byMonth.map((item) => {
                      const heightPercentage =
                        (item.count /
                          Math.max(...stats.byMonth.map((m) => m.count))) *
                        100;
                      return (
                        <div
                          key={item.month}
                          className="flex flex-col items-center flex-1"
                        >
                          <div
                            className="w-full bg-yellow-400 rounded-t-sm"
                            style={{ height: `${heightPercentage}%` }}
                          ></div>
                          <div className="text-xs mt-1">{item.month}</div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Time of Day */}
              <Card className="border-2 border-yellow-400 shadow-md">
                <CardHeader className="p-4 pb-0">
                  <CardTitle className="text-lg flex justify-between items-center">
                    <span>Time of Day</span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 border-black text-black hover:bg-black hover:text-yellow-400"
                      onClick={() => setShowTimeFilters(!showTimeFilters)}
                    >
                      <Filter className="h-4 w-4 mr-1" />
                      Filter
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  {/* Time Filters */}
                  {showTimeFilters && (
                    <div className="mb-4 p-3 bg-yellow-50 rounded-md border border-yellow-200">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-3">
                          {/* Date Range Filter */}
                          <div>
                            <Label
                              htmlFor="time-date-range"
                              className="text-xs font-medium"
                            >
                              <Calendar className="h-3 w-3 inline mr-1" />
                              Date Range
                            </Label>
                            <Select
                              value={filters.byTime.dateRange}
                              onValueChange={(value) =>
                                handleFilterChange("byTime", "dateRange", value)
                              }
                            >
                              <SelectTrigger className="w-full h-8 text-xs border-black focus:border-yellow-400">
                                <SelectValue placeholder="Select date range" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="today">Today</SelectItem>
                                <SelectItem value="this-week">
                                  This Week
                                </SelectItem>
                                <SelectItem value="this-month">
                                  This Month
                                </SelectItem>
                                <SelectItem value="last-3-months">
                                  Last 3 Months
                                </SelectItem>
                                <SelectItem value="last-6-months">
                                  Last 6 Months
                                </SelectItem>
                                <SelectItem value="this-year">
                                  This Year
                                </SelectItem>
                                <SelectItem value="all-time">
                                  All Time
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        {/* Location Filter */}
                        <div>
                          <Label
                            htmlFor="time-location"
                            className="text-xs font-medium"
                          >
                            <MapPin className="h-3 w-3 inline mr-1" />
                            Location
                          </Label>
                          <Select
                            value={filters.byTime.location}
                            onValueChange={(value) =>
                              handleFilterChange("byTime", "location", value)
                            }
                          >
                            <SelectTrigger className="w-full h-8 text-xs border-black focus:border-yellow-400">
                              <SelectValue placeholder="Select location" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Locations</SelectItem>
                              <SelectItem value="colombo">Colombo</SelectItem>
                              <SelectItem value="kandy">Kandy</SelectItem>
                              <SelectItem value="galle">Galle</SelectItem>
                              <SelectItem value="negombo">Negombo</SelectItem>
                              <SelectItem value="matara">Matara</SelectItem>
                              <SelectItem value="jaffna">Jaffna</SelectItem>
                              <SelectItem value="batticaloa">
                                Batticaloa
                              </SelectItem>
                              <SelectItem value="anuradhapura">
                                Anuradhapura
                              </SelectItem>
                              <SelectItem value="trincomalee">
                                Trincomalee
                              </SelectItem>
                              <SelectItem value="kurunegala">
                                Kurunegala
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Violation Type Filter */}
                        <div>
                          <Label
                            htmlFor="time-violation-type"
                            className="text-xs font-medium"
                          >
                            <AlertTriangle className="h-3 w-3 inline mr-1" />
                            Violation Type
                          </Label>
                          <Select
                            value={filters.byTime.violationType}
                            onValueChange={(value) =>
                              handleFilterChange(
                                "byTime",
                                "violationType",
                                value
                              )
                            }
                          >
                            <SelectTrigger className="w-full h-8 text-xs border-black focus:border-yellow-400">
                              <SelectValue placeholder="Select violation type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Types</SelectItem>
                              <SelectItem value="speeding">Speeding</SelectItem>
                              <SelectItem value="red-light">
                                Red Light
                              </SelectItem>
                              <SelectItem value="wrong-lane">
                                Wrong Lane
                              </SelectItem>
                              <SelectItem value="no-helmet">
                                No Helmet
                              </SelectItem>
                              <SelectItem value="phone-use">
                                Phone Use
                              </SelectItem>
                              <SelectItem value="drunk-driving">
                                Drunk Driving
                              </SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="flex space-x-2 mt-3">
                        <Button
                          onClick={applyFilters}
                          size="sm"
                          className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black text-xs h-7"
                        >
                          Apply
                        </Button>
                        <Button
                          onClick={resetFilters}
                          variant="outline"
                          size="sm"
                          className="flex-1 border-black text-black hover:bg-black hover:text-yellow-400 text-xs h-7"
                        >
                          Reset
                        </Button>
                      </div>
                    </div>
                  )}
                  <div className="space-y-4">
                    {stats.byTime.map((item) => (
                      <div key={item.time}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {item.time}
                          </span>
                          <span className="font-medium">
                            {item.count} ({calculatePercentage(item.count)}%)
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-yellow-400 h-2.5 rounded-full"
                            style={{
                              width: `${calculatePercentage(item.count)}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Violations Table */}
            <Card className="border-2 border-yellow-400 shadow-md">
              <CardHeader className="p-4 pb-0">
                <CardTitle className="text-lg">Recent Violations</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-yellow-400">
                        <th className="text-left py-2 font-medium">ID</th>
                        <th className="text-left py-2 font-medium">Type</th>
                        <th className="text-left py-2 font-medium">Location</th>
                        <th className="text-left py-2 font-medium">Date</th>
                        <th className="text-left py-2 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Dummy data for table */}
                      {[
                        {
                          id: "VR-124",
                          type: "Speeding",
                          location: "Colombo",
                          date: "2023-10-15",
                          status: "validated",
                        },
                        {
                          id: "VR-123",
                          type: "Red Light",
                          location: "Kandy",
                          date: "2023-10-14",
                          status: "pending",
                        },
                        {
                          id: "VR-122",
                          type: "No Helmet",
                          location: "Galle",
                          date: "2023-10-13",
                          status: "validated",
                        },
                        {
                          id: "VR-121",
                          type: "Wrong Lane",
                          location: "Negombo",
                          date: "2023-10-12",
                          status: "rejected",
                        },
                        {
                          id: "VR-120",
                          type: "Phone Use",
                          location: "Colombo",
                          date: "2023-10-11",
                          status: "validated",
                        },
                      ].map((violation) => (
                        <tr
                          key={violation.id}
                          className="border-b border-gray-200 hover:bg-yellow-50"
                        >
                          <td className="py-3">{violation.id}</td>
                          <td className="py-3">{violation.type}</td>
                          <td className="py-3">{violation.location}</td>
                          <td className="py-3">{violation.date}</td>
                          <td className="py-3">
                            <span
                              className={`inline-block px-2 py-1 rounded-full text-xs ${
                                violation.status === "validated"
                                  ? "bg-green-100 text-green-800"
                                  : violation.status === "pending"
                                  ? "bg-orange-100 text-orange-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {violation.status.charAt(0).toUpperCase() +
                                violation.status.slice(1)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
