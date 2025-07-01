"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Plus, Search, Filter, MoreHorizontal, Edit, Eye, Trash2, Calendar, Users, Target } from "lucide-react"

const sampleProjects = [
  {
    id: "website-redesign",
    name: "Website Redesign",
    description: "Thiết kế lại website công ty với giao diện hiện đại và responsive",
    status: "Đang thực hiện",
    priority: "Cao",
    progress: 65,
    startDate: "2024-01-01",
    endDate: "2024-03-31",
    teamSize: 8,
    budget: 500000000,
    manager: {
      name: "Nguyễn Văn A",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    tags: ["Web", "Design", "Frontend"],
  },
  {
    id: "mobile-app",
    name: "Mobile App Development",
    description: "Phát triển ứng dụng mobile cho iOS và Android",
    status: "Đang thực hiện",
    priority: "Cao",
    progress: 40,
    startDate: "2024-02-01",
    endDate: "2024-06-30",
    teamSize: 6,
    budget: 800000000,
    manager: {
      name: "Trần Thị B",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    tags: ["Mobile", "React Native", "API"],
  },
  {
    id: "marketing-campaign",
    name: "Marketing Campaign Q1",
    description: "Chiến dịch marketing tổng thể cho quý 1 năm 2024",
    status: "Hoàn thành",
    priority: "Trung bình",
    progress: 100,
    startDate: "2024-01-01",
    endDate: "2024-03-31",
    teamSize: 4,
    budget: 300000000,
    manager: {
      name: "Lê Văn C",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    tags: ["Marketing", "Social Media", "Content"],
  },
]

const statusColors = {
  "Đang thực hiện": "bg-blue-100 text-blue-800",
  "Hoàn thành": "bg-green-100 text-green-800",
  "Tạm dừng": "bg-yellow-100 text-yellow-800",
  "Hủy bỏ": "bg-red-100 text-red-800",
}

const priorityColors = {
  Cao: "text-red-600",
  "Trung bình": "text-yellow-600",
  Thấp: "text-green-600",
}

export function ProjectList() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [projects] = useState(sampleProjects)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleEdit = (projectId: string) => {
    console.log("Edit project:", projectId)
    setOpenDropdown(null)
    router.push(`/projects/${projectId}/edit`)
  }

  const handleView = (projectId: string) => {
    console.log("View project:", projectId)
    setOpenDropdown(null)
    router.push(`/projects/${projectId}/details`)
  }

  const handleDelete = (projectId: string) => {
    console.log("Delete project:", projectId)
    setOpenDropdown(null)
    if (confirm("Bạn có chắc chắn muốn xóa dự án này không?")) {
      console.log("Confirmed delete project:", projectId)
    }
  }

  const toggleDropdown = (projectId: string) => {
    setOpenDropdown(openDropdown === projectId ? null : projectId)
  }

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-end items-start sm:items-center gap-4">
        <Button onClick={() => router.push("/projects/create")} size="lg" className="px-6">
          <Plus className="h-4 w-4 mr-2" />
          Tạo dự án mới
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Tìm kiếm dự án..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12"
          />
        </div>
        <Button variant="outline" size="lg" className="px-6 h-12">
          <Filter className="h-4 w-4 mr-2" />
          Bộ lọc
        </Button>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow relative">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg truncate">{project.name}</CardTitle>
                  <CardDescription className="line-clamp-2 mt-1">{project.description}</CardDescription>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge className={`${statusColors[project.status as keyof typeof statusColors]} text-xs px-2 py-1`}>
                      {project.status}
                    </Badge>
                    <span
                      className={`text-xs font-medium ${priorityColors[project.priority as keyof typeof priorityColors]}`}
                    >
                      {project.priority}
                    </span>
                  </div>
                </div>

                {/* Custom Dropdown Menu */}
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-gray-100"
                    onClick={() => toggleDropdown(project.id)}
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>

                  {/* Dropdown Content */}
                  {openDropdown === project.id && (
                    <div className="absolute right-0 top-8 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                      <div className="py-1">
                        <button
                          onClick={() => handleView(project.id)}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Xem chi tiết
                        </button>
                        <button
                          onClick={() => handleEdit(project.id)}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Chỉnh sửa
                        </button>
                        <hr className="my-1" />
                        <button
                          onClick={() => handleDelete(project.id)}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Xóa dự án
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Tiến độ</span>
                  <span className="font-medium">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>

              {/* Project Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">
                    {new Date(project.startDate).toLocaleDateString("vi-VN")} -{" "}
                    {new Date(project.endDate).toLocaleDateString("vi-VN")}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">{project.teamSize} thành viên</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Target className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">{project.budget.toLocaleString("vi-VN")} VNĐ</span>
                </div>
              </div>

              {/* Manager */}
              <div className="flex items-center gap-2 pt-2 border-t">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={project.manager.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-xs">
                    {project.manager.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-gray-600">PM: {project.manager.name}</span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Click outside to close dropdown */}
      {openDropdown && <div className="fixed inset-0 z-40" onClick={() => setOpenDropdown(null)} />}

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">Không tìm thấy dự án nào</p>
          <p className="text-gray-400 text-sm mt-1">Thử thay đổi từ khóa tìm kiếm</p>
        </div>
      )}
    </div>
  )
}
