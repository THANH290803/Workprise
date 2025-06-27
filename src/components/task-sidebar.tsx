"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
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
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface TaskSidebarProps {
  currentPath: string
  onLogout?: () => void
  userInfo?: {
    name: string
    email: string
    role: string
    avatar?: string
  }
}

const navigationItems = [
  {
    icon: Home,
    label: "Tổng quan",
    href: "/dashboard",
  },
  {
    icon: FolderOpen,
    label: "Dự án",
    href: "/projects",
  },
  {
    icon: CheckSquare,
    label: "Công việc",
    href: "/tasks",
  },
  {
    icon: Calendar,
    label: "Lịch trình",
    href: "/calendar",
  },
  {
    icon: BarChart3,
    label: "Thống kê",
    href: "/analytics",
  },
  {
    icon: Users,
    label: "Nhóm",
    href: "/team",
  },
  {
    icon: Building2,
    label: "Quản lý tổ chức",
    href: "/departments",
  },
  {
    icon: User,
    label: "Hồ sơ cá nhân",
    href: "/profile",
  },
]

const quickStats = [
  {
    label: "Đang thực hiện",
    count: 12,
    color: "bg-blue-500",
    textColor: "text-blue-600",
  },
  {
    label: "Hoàn thành",
    count: 28,
    color: "bg-green-500",
    textColor: "text-green-600",
  },
  {
    label: "Mục tiêu",
    count: 5,
    color: "bg-orange-500",
    textColor: "text-orange-600",
  },
]

const TaskSidebar: React.FC<TaskSidebarProps> = ({
  currentPath,
  onLogout,
  userInfo = {
    name: "Nguyễn Văn A",
    email: "admin@taskflow.com",
    role: "Project Manager",
    avatar: "/placeholder.svg?height=32&width=32",
  },
}) => {
  const pathname = usePathname()

  const handleLogout = () => {
    if (onLogout) {
      onLogout()
    }
  }

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard"
    }
    if (href === "/projects") {
      return pathname.startsWith("/projects")
    }
    return pathname === href
  }

  return (
    <div className="flex w-64 flex-col bg-white border-r border-gray-200 h-screen overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-100">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900 text-white">
          <CheckSquare className="h-4 w-4" />
        </div>
        <div>
          <h1 className="text-base font-semibold text-gray-900">TaskFlow</h1>
          <p className="text-xs text-gray-500">Quản lý công việc</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <div className="space-y-1">
          {navigationItems.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  active ? "bg-gray-100 text-gray-900 shadow-sm" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                )}
              >
                <item.icon className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Quick Stats */}
      <div className="px-3 py-4 border-t border-gray-100">
        <div className="mb-3">
          <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide">THỐNG KÊ NHANH</h3>
        </div>
        <div className="space-y-2">
          {quickStats.map((stat) => (
            <div key={stat.label} className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2">
                <div className={cn("h-2 w-2 rounded-full", stat.color)} />
                <span className="text-sm text-gray-600">{stat.label}</span>
              </div>
              <span className={cn("text-sm font-semibold", stat.textColor)}>{stat.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* User Profile */}
      <div className="px-3 py-4 border-t border-gray-100">
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={userInfo.avatar || "/placeholder.svg"} alt={userInfo.name} />
            <AvatarFallback className="bg-gray-100 text-gray-600 text-xs font-medium">
              {userInfo.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{userInfo.name}</p>
            <p className="text-xs text-gray-500 truncate">{userInfo.role}</p>
          </div>
        </div>

        <div className="space-y-1">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-2 h-8 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          >
            <Settings className="h-4 w-4" />
            <span className="text-sm">Cài đặt</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="w-full justify-start gap-2 h-8 text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors duration-200"
          >
            <LogOut className="h-4 w-4" />
            <span className="text-sm font-medium">Đăng xuất</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TaskSidebar
export { TaskSidebar }
