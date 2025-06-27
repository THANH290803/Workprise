"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Bell, Search, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"

interface User {
  name: string
  email: string
  role: string
}

interface AppWrapperProps {
  children: React.ReactNode
}

export function AppWrapper({ children }: AppWrapperProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const checkAuth = () => {
      try {
        const authStatus = localStorage.getItem("taskflow_auth") === "true"
        const userData = localStorage.getItem("taskflow_user")

        setIsAuthenticated(authStatus)

        if (authStatus && userData) {
          setUser(JSON.parse(userData))
        }

        // Redirect logic
        if (!authStatus && pathname !== "/login") {
          router.replace("/login")
        } else if (authStatus && pathname === "/login") {
          router.replace("/dashboard")
        }
      } catch (error) {
        console.error("Auth check error:", error)
        setIsAuthenticated(false)
        router.replace("/login")
      }
    }

    checkAuth()
  }, [router, pathname])

  const getPageTitle = () => {
    const pathSegments = pathname.split("/").filter(Boolean)

    if (pathSegments[0] === "projects") {
      if (pathSegments[1] === "create") {
        return "Tạo dự án mới"
      }
      if (pathSegments.length > 1 && pathSegments[2] === "edit") {
        return "Chỉnh sửa dự án"
      }
      if (pathSegments.length > 1 && pathSegments[2] === "details") {
        return "Chi tiết dự án"
      }
      if (pathSegments.length > 1) {
        const projectNames = {
          "website-redesign": "Website Redesign",
          "mobile-app": "Mobile App Development",
          "marketing-campaign": "Marketing Campaign Q1",
          "database-migration": "Database Migration",
        }
        return projectNames[pathSegments[1] as keyof typeof projectNames] || "Dự án"
      }
      return "Danh sách dự án"
    }

    switch (pathSegments[0]) {
      case "dashboard":
        return "Tổng quan dự án"
      case "tasks":
        return "Quản lý công việc"
      case "calendar":
        return "Lịch trình"
      case "analytics":
        return "Thống kê"
      case "team":
        return "Quản lý nhóm"
      case "departments":
        return "Quản lý phòng ban"
      case "profile":
        return "Hồ sơ cá nhân"
      case "settings":
        return "Cài đặt"
      default:
        return "TaskFlow"
    }
  }

  const getPageDescription = () => {
    const pathSegments = pathname.split("/").filter(Boolean)

    if (pathSegments[0] === "projects") {
      if (pathSegments[1] === "create") {
        return "Điền thông tin để tạo dự án mới"
      }
      if (pathSegments.length > 1 && pathSegments[2] === "edit") {
        return "Cập nhật thông tin dự án"
      }
      if (pathSegments.length > 1 && pathSegments[2] === "details") {
        return "Xem chi tiết thông tin dự án"
      }
      if (pathSegments.length > 1) {
        return "Quản lý công việc theo phương pháp Kanban"
      }
      return "Quản lý và theo dõi tất cả dự án của bạn"
    }

    switch (pathSegments[0]) {
      case "dashboard":
        return "Theo dõi tiến độ và hiệu suất làm việc của nhóm"
      case "tasks":
        return "Xem và quản lý tất cả công việc từ mọi dự án"
      case "calendar":
        return "Xem lịch trình và deadline của các dự án"
      case "analytics":
        return "Báo cáo và phân tích hiệu suất làm việc"
      case "team":
        return "Quản lý thành viên và phân quyền"
      case "departments":
        return "Quản lý các phòng ban trong tổ chức"
      case "profile":
        return "Quản lý thông tin và cài đặt tài khoản của bạn"
      case "settings":
        return "Cấu hình hệ thống và tùy chọn cá nhân"
      default:
        return ""
    }
  }

  const getBreadcrumbItems = () => {
    const pathSegments = pathname.split("/").filter(Boolean)
    const items = []

    if (pathSegments[0] === "projects") {
      items.push(
        <BreadcrumbItem key="projects" className="hidden md:block">
          <BreadcrumbLink href="/projects">Dự án</BreadcrumbLink>
        </BreadcrumbItem>,
      )

      if (pathSegments[1] === "create") {
        items.push(
          <BreadcrumbSeparator key="sep1" className="hidden md:block" />,
          <BreadcrumbItem key="create">
            <BreadcrumbPage>Tạo mới</BreadcrumbPage>
          </BreadcrumbItem>,
        )
      } else if (pathSegments.length > 1) {
        const projectNames = {
          "website-redesign": "Website Redesign",
          "mobile-app": "Mobile App Development",
          "marketing-campaign": "Marketing Campaign Q1",
          "database-migration": "Database Migration",
        }
        const projectName = projectNames[pathSegments[1] as keyof typeof projectNames] || "Dự án"

        items.push(
          <BreadcrumbSeparator key="sep1" className="hidden md:block" />,
          <BreadcrumbItem key="project" className="hidden md:block">
            <BreadcrumbLink href={`/projects/${pathSegments[1]}`}>{projectName}</BreadcrumbLink>
          </BreadcrumbItem>,
        )

        if (pathSegments[2] === "edit") {
          items.push(
            <BreadcrumbSeparator key="sep2" className="hidden md:block" />,
            <BreadcrumbItem key="edit">
              <BreadcrumbPage>Chỉnh sửa</BreadcrumbPage>
            </BreadcrumbItem>,
          )
        } else if (pathSegments[2] === "details") {
          items.push(
            <BreadcrumbSeparator key="sep2" className="hidden md:block" />,
            <BreadcrumbItem key="details">
              <BreadcrumbPage>Chi tiết</BreadcrumbPage>
            </BreadcrumbItem>,
          )
        }
      }
    } else {
      items.push(
        <BreadcrumbItem key="current">
          <BreadcrumbPage>{getPageTitle()}</BreadcrumbPage>
        </BreadcrumbItem>,
      )
    }

    return items
  }

  // Show loading while checking authentication
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

  // Show login page without sidebar
  if (pathname === "/login" || !isAuthenticated) {
    return <>{children}</>
  }

  // Show main app layout for authenticated users
  return (
    <div className="flex h-screen bg-gray-50">
      <AppSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white">
          <div className="flex items-center gap-2 px-4 flex-1">
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>{getBreadcrumbItems()}</BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="flex items-center gap-2 px-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Tìm kiếm..." className="pl-8 w-64" />
            </div>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Tạo mới
            </Button>
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto">
          <div className="space-y-4 p-4 md:p-6 lg:p-8">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h1 className="text-2xl font-bold tracking-tight">{getPageTitle()}</h1>
                <p className="text-muted-foreground">{getPageDescription()}</p>
              </div>
            </div>

            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
