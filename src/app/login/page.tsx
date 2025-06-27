"use client"

import { useState, useEffect } from "react"
import { LoginPage } from "@/components/login-page"
import { useRouter } from "next/navigation"

export default function LoginPageRoute() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if already logged in
    const checkAuth = () => {
      try {
        const isAuthenticated = localStorage.getItem("taskflow_auth") === "true"
        if (isAuthenticated) {
          router.replace("/dashboard")
          return
        }
      } catch (error) {
        console.error("Error checking auth:", error)
      }
      setIsLoading(false)
    }

    const timer = setTimeout(checkAuth, 100)
    return () => clearTimeout(timer)
  }, [router])

  const handleLogin = async (credentials: { email: string; password: string; rememberMe: boolean }) => {
    try {
      // In a real app, this would be an API call
      const userData = {
        name: "Nguyễn Văn A",
        email: credentials.email,
        role: "Project Manager",
      }

      // Save authentication state
      localStorage.setItem("taskflow_user", JSON.stringify(userData))
      localStorage.setItem("taskflow_auth", "true")

      // Force a small delay to ensure localStorage is written
      await new Promise((resolve) => setTimeout(resolve, 100))

      // Redirect to dashboard
      window.location.href = "/dashboard"
    } catch (error) {
      console.error("Login error:", error)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <span>Đang tải...</span>
        </div>
      </div>
    )
  }

  return <LoginPage onLogin={handleLogin} />
}
