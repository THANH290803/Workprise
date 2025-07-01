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
    description:
      "Thiết kế lại giao diện website công ty với UI/UX hiện đại, tập trung vào trải nghiệm người dùng và tối ưu hóa hiệu suất. Dự án bao gồm nghiên cứu người dùng, thiết kế wireframe, phát triển prototype và tri���n khai hệ thống mới.",
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
      { name: "Lê Văn E", avatar: "/placeholder.svg?height=32&width=32", role: "QA" },
    ],
    stats: {
      totalTasks: 12,
      completedTasks: 9,
      inProgressTasks: 2,
      todoTasks: 1,
    },
    tags: ["Web", "UI/UX", "Frontend", "React", "TypeScript"],
    milestones: [
      { name: "Nghiên cứu & Phân tích", status: "completed", date: "15/12/2023" },
      { name: "Thiết kế UI/UX", status: "completed", date: "05/01/2024" },
      { name: "Phát triển Frontend", status: "in-progress", date: "25/01/2024" },
      { name: "Testing & QA", status: "pending", date: "10/02/2024" },
      { name: "Deployment", status: "pending", date: "15/02/2024" },
    ],
  },
  "mobile-app": {
    id: "mobile-app",
    name: "Mobile App Development",
    description:
      "Phát triển ứng dụng mobile cho iOS và Android với tính năng quản lý công việc và theo dõi tiến độ dự án.",
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
    milestones: [
      { name: "Thiết kế App", status: "completed", date: "25/01/2024" },
      { name: "Phát triển Core Features", status: "in-progress", date: "15/02/2024" },
      { name: "Testing", status: "pending", date: "10/03/2024" },
      { name: "App Store Submission", status: "pending", date: "30/03/2024" },
    ],
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

const getMilestoneStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800"
    case "in-progress":
      return "bg-blue-100 text-blue-800"
    case "pending":
      return "bg-gray-100 text-gray-800"
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Dự án không tồn tại</h1>
          <Button onClick={() => router.push("/projects")}>Quay lại danh sách dự án</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 p-8">
        <div className="w-full">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Quay lại
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
                <p className="text-gray-600 mt-1">Chi tiết dự án và thông tin tiến độ</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => router.push(`/projects/${projectId}/edit`)}
                size="lg"
                className="px-6"
              >
                <Edit className="h-4 w-4 mr-2" />
                Chỉnh sửa
              </Button>
              <Button variant="destructive" size="lg" className="px-6">
                <Trash2 className="h-4 w-4 mr-2" />
                Xóa
              </Button>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Info */}
            <div className="lg:col-span-2 space-y-8">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-xl">Thông tin chung</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h3 className="font-medium mb-3 text-base">Mô tả</h3>
                    <p className="text-gray-600 leading-relaxed">{project.description}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                    <Badge className={getPriorityColor(project.priority)}>{project.priority}</Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-base">
                      <span className="font-medium">Tiến độ</span>
                      <span className="font-semibold">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-3" />
                  </div>

                  <div className="grid grid-cols-2 gap-6 text-base">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Ngày bắt đầu</span>
                      </div>
                      <p className="font-medium">{project.startDate}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Ngày kết thúc</span>
                      </div>
                      <p className="font-medium">{project.endDate}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-base text-muted-foreground">Ngân sách</p>
                    <p className="font-medium text-lg">{project.budget}</p>
                  </div>

                  <div className="space-y-3">
                    <p className="text-base text-muted-foreground">Tags</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="px-3 py-1">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Milestones */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Cột mốc dự án
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {project.milestones.map((milestone, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              milestone.status === "completed"
                                ? "bg-green-500"
                                : milestone.status === "in-progress"
                                  ? "bg-blue-500"
                                  : "bg-gray-300"
                            }`}
                          />
                          <span className="font-medium">{milestone.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className={getMilestoneStatusColor(milestone.status)} variant="secondary">
                            {milestone.status === "completed"
                              ? "Hoàn thành"
                              : milestone.status === "in-progress"
                                ? "Đang thực hiện"
                                : "Chờ thực hiện"}
                          </Badge>
                          <span className="text-sm text-gray-600">{milestone.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Team */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Nhóm dự án
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.team.map((member, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <Avatar className="h-12 w-12">
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

            {/* Stats Sidebar */}
            <div className="space-y-8">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Thống kê công việc
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-base">Tổng công việc</span>
                      <span className="font-semibold text-lg">{project.stats.totalTasks}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-base text-green-600">Hoàn thành</span>
                      <span className="font-semibold text-lg text-green-600">{project.stats.completedTasks}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-base text-blue-600">Đang thực hiện</span>
                      <span className="font-semibold text-lg text-blue-600">{project.stats.inProgressTasks}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-base text-gray-600">Cần làm</span>
                      <span className="font-semibold text-lg text-gray-600">{project.stats.todoTasks}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Hiệu suất
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="text-center space-y-2">
                    <div className="text-3xl font-bold text-green-600">{project.progress}%</div>
                    <p className="text-base text-muted-foreground">Tiến độ hoàn thành</p>
                  </div>
                </CardContent>
              </Card>

              <Button className="w-full" size="lg" onClick={() => router.push(`/projects/${projectId}`)}>
                Xem Kanban Board
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
