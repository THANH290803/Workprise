"use client"

import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Edit, Trash2, Calendar, Users, Target, TrendingUp } from "lucide-react"

// Sample project data
const sampleProjects = {
  "website-redesign": {
    id: "website-redesign",
    name: "Website Redesign",
    description: "Thiết kế lại giao diện website công ty với UI/UX hiện đại",
    status: "Đang thực hiện",
    priority: "Cao",
    progress: 75,
    startDate: "01/12/2023",
    endDate: "15/02/2024",
    budget: "50,000,000 VNĐ",
    team: [
      { name: "Nguyễn Văn A", avatar: "/placeholder.svg?height=32&width=32", role: "PM" },
      { name: "Trần Thị B", avatar: "/placeholder.svg?height=32&width=32", role: "Designer" },
      { name: "Phạm Thị D", avatar: "/placeholder.svg?height=32&width=32", role: "Developer" },
    ],
    stats: {
      totalTasks: 12,
      completedTasks: 9,
      inProgressTasks: 2,
      todoTasks: 1,
    },
    tags: ["Web", "UI/UX", "Frontend"],
  },
  "mobile-app": {
    id: "mobile-app",
    name: "Mobile App Development",
    description: "Phát triển ứng dụng mobile cho iOS và Android",
    status: "Đang thực hiện",
    priority: "Cao",
    progress: 45,
    startDate: "15/01/2024",
    endDate: "30/03/2024",
    budget: "80,000,000 VNĐ",
    team: [
      { name: "Lê Văn C", avatar: "/placeholder.svg?height=32&width=32", role: "PM" },
      { name: "Hoàng Văn E", avatar: "/placeholder.svg?height=32&width=32", role: "Developer" },
    ],
    stats: {
      totalTasks: 8,
      completedTasks: 1,
      inProgressTasks: 1,
      todoTasks: 6,
    },
    tags: ["Mobile", "React Native", "iOS", "Android"],
  },
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Hoàn thành":
      return "bg-green-100 text-green-800"
    case "Đang thực hiện":
      return "bg-blue-100 text-blue-800"
    case "Chưa bắt đầu":
      return "bg-gray-100 text-gray-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "Cao":
      return "bg-red-100 text-red-800"
    case "Trung bình":
      return "bg-yellow-100 text-yellow-800"
    case "Thấp":
      return "bg-green-100 text-green-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function ProjectDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const projectId = params.id as string

  const project = sampleProjects[projectId as keyof typeof sampleProjects]

  if (!project) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Dự án không tồn tại</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.push(`/projects/${projectId}/edit`)}>
            <Edit className="h-4 w-4 mr-2" />
            Chỉnh sửa
          </Button>
          <Button variant="destructive">
            <Trash2 className="h-4 w-4 mr-2" />
            Xóa
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Info */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin chung</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Mô tả</h3>
                <p className="text-gray-600">{project.description}</p>
              </div>

              <div className="flex items-center gap-4">
                <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                <Badge className={getPriorityColor(project.priority)}>{project.priority}</Badge>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Tiến độ</span>
                  <span>{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>Ngày bắt đầu</span>
                  </div>
                  <p className="font-medium">{project.startDate}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>Ngày kết thúc</span>
                  </div>
                  <p className="font-medium">{project.endDate}</p>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Ngân sách</p>
                <p className="font-medium">{project.budget}</p>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Tags</p>
                <div className="flex flex-wrap gap-1">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Team */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Nhóm dự án
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {project.team.map((member, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Thống kê công việc
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Tổng công việc</span>
                  <span className="font-medium">{project.stats.totalTasks}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-green-600">Hoàn thành</span>
                  <span className="font-medium text-green-600">{project.stats.completedTasks}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-blue-600">Đang thực hiện</span>
                  <span className="font-medium text-blue-600">{project.stats.inProgressTasks}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Cần làm</span>
                  <span className="font-medium text-gray-600">{project.stats.todoTasks}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Hiệu suất
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{project.progress}%</div>
                <p className="text-sm text-muted-foreground">Tiến độ hoàn thành</p>
              </div>
            </CardContent>
          </Card>

          <Button className="w-full" onClick={() => router.push(`/projects/${projectId}`)}>
            Xem Kanban Board
          </Button>
        </div>
      </div>
    </div>
  )
}
