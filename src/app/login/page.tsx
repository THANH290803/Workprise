"use client"

import { useState, useEffect } from "react"
import { LoginPage } from "@/components/login-page"
import { useRouter } from "next/navigation"
import api from "@/lib/api"

export default function LoginPageRoute() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      try {
        const isAuthenticated = localStorage.getItem("taskflow_auth") === "true"
        if (isAuthenticated) {
          router.replace("/dashboard")
          return
        }
      } catch (error) {
        console.error("Lỗi kiểm tra đăng nhập:", error)
      }
      setIsLoading(false)
    }

    const timer = setTimeout(checkAuth, 100)
    return () => clearTimeout(timer)
  }, [router])

  const handleLogin = async (credentials: { email: string; password: string; rememberMe: boolean }) => {
    try {
      const response = await api.post("/users/login", {
        email: credentials.email,
        password: credentials.password,
      })

      const { token, user } = response.data

      // Lưu vào localStorage
      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))
      localStorage.setItem("taskflow_auth", "true")

      // Đợi 1 chút cho chắc chắn localStorage được ghi
      await new Promise((resolve) => setTimeout(resolve, 100))

      // Điều hướng sang dashboard
      window.location.href = "/dashboard"
    } catch (error: any) {
      // Ném lỗi lại để hiển thị trong giao diện LoginPage
      throw error
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
