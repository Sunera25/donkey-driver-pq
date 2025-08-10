import axios from "axios"

// Create axios instance with base configuration
const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com", // Using JSONPlaceholder as dummy API
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

// API Types
export interface ViolationReport {
  id: string
  type: string
  location: string
  timestamp: string
  reporter: string
  vehicleNumber: string
  status: "pending" | "validated" | "rejected"
  mediaType: "photo" | "video"
  description: string
}

export interface WorstDriver {
  id: string
  violations: number
  points: number
  location: string
  lastViolation: string
  rank: number
}

export interface InsuranceClaim {
  id: string
  policyHolder: string
  policyNumber: string
  vehicleNumber: string
  uploadDate: string
  claimAmount: string
  status: "under-review" | "flagged" | "approved"
  suspiciousScore: number
  description: string
}

// API Functions
export const violationAPI = {
  // Get all violation reports
  getReports: async (): Promise<ViolationReport[]> => {
    try {
      const response = await api.get("/posts")
      // Transform dummy data to match our structure
      return response.data.slice(0, 10).map((post: any, index: number) => ({
        id: `VR-${post.id.toString().padStart(3, "0")}`,
        type: ["Speeding", "Red Light Violation", "Wrong Lane", "No Helmet"][index % 4],
        location: ["Galle Road, Colombo", "Kandy Road Junction", "Negombo Main Street"][index % 3],
        timestamp:
          new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0] +
          " " +
          Math.floor(Math.random() * 24)
            .toString()
            .padStart(2, "0") +
          ":" +
          Math.floor(Math.random() * 60)
            .toString()
            .padStart(2, "0"),
        reporter: index % 3 === 0 ? "Anonymous" : `077-${Math.floor(Math.random() * 9000000) + 1000000}`,
        vehicleNumber: `${["CAB", "WP", "KY"][index % 3]}-${Math.floor(Math.random() * 9000) + 1000}`,
        status: ["pending", "validated", "rejected"][index % 3] as any,
        mediaType: index % 2 === 0 ? "video" : "photo",
        description: post.title,
      }))
    } catch (error) {
      console.error("Error fetching reports:", error)
      throw error
    }
  },

  // Submit new violation report
  submitReport: async (reportData: Partial<ViolationReport>): Promise<{ success: boolean; id: string }> => {
    try {
      const response = await api.post("/posts", {
        title: reportData.description,
        body: JSON.stringify(reportData),
        userId: 1,
      })
      return {
        success: true,
        id: `VR-${response.data.id.toString().padStart(3, "0")}`,
      }
    } catch (error) {
      console.error("Error submitting report:", error)
      throw error
    }
  },

  // Validate report (for police)
  validateReport: async (reportId: string, isValid: boolean): Promise<{ success: boolean }> => {
    try {
      await api.put(`/posts/${reportId.split("-")[1]}`, {
        status: isValid ? "validated" : "rejected",
      })
      return { success: true }
    } catch (error) {
      console.error("Error validating report:", error)
      throw error
    }
  },
}

export const leaderboardAPI = {
  // Get worst drivers leaderboard
  getWorstDrivers: async (): Promise<WorstDriver[]> => {
    try {
      const response = await api.get("/users")
      return response.data
        .slice(0, 8)
        .map((user: any, index: number) => ({
          id: `DD${(index + 1).toString().padStart(3, "0")}`,
          violations: Math.floor(Math.random() * 15) + 5,
          points: -(Math.floor(Math.random() * 30) + 15),
          location: ["Colombo", "Kandy", "Galle", "Negombo", "Matara"][index % 5],
          lastViolation: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          rank: index + 1,
        }))
        .sort((a, b) => b.violations - a.violations)
    } catch (error) {
      console.error("Error fetching worst drivers:", error)
      throw error
    }
  },
}

export const insuranceAPI = {
  // Get insurance claims
  getClaims: async (): Promise<InsuranceClaim[]> => {
    try {
      const response = await api.get("/posts")
      return response.data.slice(0, 10).map((post: any, index: number) => ({
        id: `CLM-2024-${(index + 1).toString().padStart(3, "0")}`,
        policyHolder: `Policy Holder ${index + 1}`,
        policyNumber: `POL-${Math.floor(Math.random() * 900000) + 100000}`,
        vehicleNumber: `${["CAB", "WP", "KY"][index % 3]}-${Math.floor(Math.random() * 9000) + 1000}`,
        uploadDate: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        claimAmount: `Rs. ${(Math.floor(Math.random() * 200) + 50) * 1000}`,
        status: ["under-review", "flagged", "approved"][index % 3] as any,
        suspiciousScore: Math.floor(Math.random() * 100),
        description: post.title,
      }))
    } catch (error) {
      console.error("Error fetching claims:", error)
      throw error
    }
  },

  // Flag claim as suspicious
  flagClaim: async (claimId: string): Promise<{ success: boolean }> => {
    try {
      await api.put(`/posts/${claimId.split("-")[2]}`, {
        status: "flagged",
      })
      return { success: true }
    } catch (error) {
      console.error("Error flagging claim:", error)
      throw error
    }
  },
}

export default api
