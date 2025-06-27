"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardOverview } from "@/components/dashboard-overview"

export default function DashboardPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    const checkAuth = () => {
      try {
        const authStatus = localStorage.getItem("taskflow_auth") === "true"
        setIsAuthenticated(authStatus)

        if (!authStatus) {
          router.replace("/login")
        }
      } catch (error) {
        console.error("Auth check error:", error)
        router.replace("/login")
      }
    }

    const timer = setTimeout(checkAuth, 100)
    return () => clearTimeout(timer)
  }, [router])

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <span>Đang tải...</span>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return <DashboardOverview />
}
