"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Moon,
  Sun,
  CheckCircle2,
  AlertCircle,
  KanbanSquare,
  Users,
  BarChart3,
  Calendar,
} from "lucide-react"
import { useTheme } from "next-themes"

interface LoginPageProps {
  onLogin: (credentials: { email: string; password: string; rememberMe: boolean }) => void
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const { theme, setTheme } = useTheme()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setIsLoading(true)

    try {
      await onLogin({ email, password, rememberMe })
      setSuccess("Đăng nhập thành công! Đang chuyển hướng...")
    } catch (err: any) {
      setError(err?.response?.data?.message || "Email hoặc mật khẩu không chính xác")
    } finally {
      setIsLoading(false)
    }
  }

  const features = [
    {
      icon: KanbanSquare,
      title: "Kanban Board",
      description: "Quản lý công việc trực quan",
    },
    {
      icon: Users,
      title: "Quản lý nhóm",
      description: "Phối hợp làm việc hiệu quả",
    },
    {
      icon: BarChart3,
      title: "Thống kê chi tiết",
      description: "Báo cáo tiến độ real-time",
    },
    {
      icon: Calendar,
      title: "Lịch trình",
      description: "Theo dõi deadline dễ dàng",
    },
  ]

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative z-10 flex flex-col justify-center px-12 py-16">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg">
                <KanbanSquare className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">TaskFlow</h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">Quản lý công việc thông minh</p>
              </div>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Chào mừng trở lại!</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Đăng nhập để tiếp tục quản lý dự án và công việc của bạn một cách hiệu quả nhất.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="flex items-start gap-3 p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 transition-all duration-300 hover:bg-white/70 dark:hover:bg-gray-800/70"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <feature.icon className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{feature.title}</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Demo credentials */}
          <div className="mt-8 p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
            <p className="text-sm text-amber-800 dark:text-amber-200 font-medium mb-2">Demo Account:</p>
            <p className="text-xs text-amber-700 dark:text-amber-300">Email: admin@taskflow.com</p>
            <p className="text-xs text-amber-700 dark:text-amber-300">Password: 123456</p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 lg:px-8 bg-white dark:bg-gray-900">
        <div className="w-full max-w-md">
          {/* Theme Toggle */}
          <div className="flex justify-end mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>

          <Card className="border-0 shadow-2xl">
            <CardHeader className="space-y-1 pb-6">
              <div className="flex items-center justify-center mb-4 lg:hidden">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <KanbanSquare className="h-6 w-6" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-center">Đăng nhập</CardTitle>
              <CardDescription className="text-center">Nhập thông tin tài khoản để truy cập hệ thống</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@taskflow.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password">Mật khẩu</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    />
                    <Label htmlFor="remember" className="text-sm">
                      Ghi nhớ đăng nhập
                    </Label>
                  </div>
                  <Button variant="link" className="px-0 text-sm">
                    Quên mật khẩu?
                  </Button>
                </div>

                {/* Error/Success Messages */}
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {success && (
                  <Alert className="border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-900/20 dark:text-green-200">
                    <CheckCircle2 className="h-4 w-4" />
                    <AlertDescription>{success}</AlertDescription>
                  </Alert>
                )}

                {/* Login Button */}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Đang đăng nhập...
                    </div>
                  ) : (
                    "Đăng nhập"
                  )}
                </Button>
              </form>

              {/* Footer */}
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Chưa có tài khoản?{" "}
                  <Button variant="link" className="px-0">
                    Đăng ký ngay
                  </Button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
