"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Home,
  FolderOpen,
  CheckSquare,
  Calendar,
  BarChart3,
  Users,
  Building2,
  User,
  Settings,
  LogOut,
  CheckCircle,
  UserCheck,
} from "lucide-react"

const menuItems = [
  {
    title: "Tổng quan",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Dự án",
    href: "/projects",
    icon: FolderOpen,
  },
  {
    title: "Công việc",
    href: "/tasks",
    icon: CheckSquare,
  },
  {
    title: "Lịch trình",
    href: "/calendar",
    icon: Calendar,
  },
  {
    title: "Thống kê",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Nhóm",
    href: "/team",
    icon: Users,
  },
  {
    title: "Vai trò",
    href: "/roles",
    icon: UserCheck,
  },
  {
    title: "Quản lý tổ chức",
    href: "/departments",
    icon: Building2,
  },
  {
    title: "Hồ sơ cá nhân",
    href: "/profile",
    icon: User,
  },
]

const quickStats = [
  {
    label: "Đang thực hiện",
    value: 12,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    label: "Hoàn thành",
    value: 28,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    label: "Mục tiêu",
    value: 5,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("taskflow_auth")
    localStorage.removeItem("taskflow_user")
    router.push("/login")
  }

  return (
    <div className="flex h-screen w-64 flex-col bg-white border-r border-gray-200">
      {/* Header */}
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-900">
            <CheckCircle className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">WorkPrise</h1>
            <p className="text-sm text-gray-500">Quản lý công việc</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.title}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Quick Stats */}
        <div className="mt-8">
          <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">THỐNG KÊ NHANH</h3>
          <div className="mt-3 space-y-2">
            {quickStats.map((stat) => (
              <div key={stat.label} className="flex items-center justify-between px-3 py-2">
                <div className="flex items-center gap-2">
                  <div className={cn("h-2 w-2 rounded-full", stat.bgColor)} />
                  <span className="text-sm text-gray-600">{stat.label}</span>
                </div>
                <span className={cn("text-sm font-semibold", stat.color)}>{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* User Profile */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder.svg?height=40&width=40" />
            <AvatarFallback className="bg-gray-100 text-gray-600 font-medium text-sm">NVA</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">Nguyễn Văn A</p>
            <p className="text-xs text-gray-500 truncate">Project Manager</p>
          </div>
        </div>

        <div className="space-y-1">
          <Link
            href="/settings"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              pathname === "/settings"
                ? "bg-gray-100 text-gray-900"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
            )}
          >
            <Settings className="h-4 w-4" />
            Cài đặt
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors w-full text-left"
          >
            <LogOut className="h-4 w-4" />
            Đăng xuất
          </button>
        </div>
      </div>
    </div>
  )
}
