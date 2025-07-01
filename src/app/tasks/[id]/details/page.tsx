"use client"

import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Calendar,
  Clock,
  Flag,
  FolderOpen,
  Edit,
  Trash2,
  ClipboardList,
  MessageSquare,
  Paperclip,
  CheckSquare,
} from "lucide-react"

// Sample task data - in real app, this would come from API
const getTaskById = (id: string) => {
  const tasks = [
    {
      id: "TSK-001",
      title: "Thiết kế wireframe cho trang sản phẩm",
      description:
        "Tạo wireframe chi tiết cho trang hiển thị sản phẩm với đầy đủ các thành phần UI. Wireframe cần bao gồm layout responsive, các component chính như header, navigation, product grid, filters, và footer. Đảm bảo UX flow hợp lý và dễ sử dụng.",
      project: "Website Redesign",
      projectId: "website-redesign",
      status: "Cần làm",
      priority: "Cao",
      assignee: {
        name: "Nguyễn Văn A",
        avatar: "/placeholder.svg?height=64&width=64",
        email: "nguyen.van.a@company.com",
        role: "UI/UX Designer",
      },
      reporter: {
        name: "Trần Thị B",
        avatar: "/placeholder.svg?height=32&width=32",
        email: "tran.thi.b@company.com",
      },
      dueDate: "2024-01-15",
      createdDate: "2024-01-05",
      updatedDate: "2024-01-08",
      estimatedHours: 8,
      actualHours: 0,
      tags: ["Design", "UI/UX", "Wireframe"],
      attachments: [
        { name: "wireframe-v1.fig", size: "2.4 MB", type: "figma" },
        { name: "requirements.pdf", size: "1.2 MB", type: "pdf" },
      ],
      comments: [
        {
          id: 1,
          author: "Trần Thị B",
          content: "Cần focus vào mobile-first design approach",
          createdAt: "2024-01-06",
        },
        {
          id: 2,
          author: "Nguyễn Văn A",
          content: "Đã tham khảo các best practices từ Material Design",
          createdAt: "2024-01-07",
        },
      ],
      subtasks: [
        { id: 1, title: "Research competitor websites", completed: true },
        { id: 2, title: "Create user flow diagram", completed: false },
        { id: 3, title: "Design mobile wireframes", completed: false },
        { id: 4, title: "Design desktop wireframes", completed: false },
      ],
    },
  ]

  return tasks.find((task) => task.id === id)
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Hoàn thành":
      return "bg-emerald-100 text-emerald-700 border-emerald-200"
    case "Đang thực hiện":
      return "bg-blue-100 text-blue-700 border-blue-200"
    case "Đang xem xét":
      return "bg-purple-100 text-purple-700 border-purple-200"
    case "Cần làm":
      return "bg-slate-100 text-slate-700 border-slate-200"
    case "Quá hạn":
      return "bg-red-100 text-red-700 border-red-200"
    default:
      return "bg-slate-100 text-slate-700 border-slate-200"
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "Cao":
      return "text-red-600"
    case "Trung bình":
      return "text-amber-600"
    case "Thấp":
      return "text-emerald-600"
    default:
      return "text-slate-600"
  }
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default function TaskDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const taskId = params.id as string

  const task = getTaskById(taskId)

  if (!task) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-full max-w-md">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <h1 className="text-2xl font-bold text-slate-900 mb-4">Không tìm thấy công việc</h1>
              <p className="text-slate-600 mb-6">Công việc với ID "{taskId}" không tồn tại.</p>
              <Button onClick={() => router.push("/tasks")} className="bg-blue-600 hover:bg-blue-700">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Quay lại danh sách
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const handleEdit = () => {
    router.push(`/tasks/${taskId}/edit`)
  }

  const handleDelete = () => {
    if (confirm(`Bạn có chắc chắn muốn xóa công việc "${task.title}" không?`)) {
      // In real app, call delete API here
      router.push("/tasks")
    }
  }

  const completedSubtasks = task.subtasks.filter((st) => st.completed).length
  const progressPercentage = (completedSubtasks / task.subtasks.length) * 100

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 p-8">
        <div className="w-full">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => router.push("/tasks")}
                className="border-slate-200 hover:bg-slate-50"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Quay lại
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <Button onClick={handleEdit} className="bg-blue-600 hover:bg-blue-700 px-6" size="lg">
                <Edit className="h-4 w-4 mr-2" />
                Chỉnh sửa
              </Button>
              <Button variant="destructive" onClick={handleDelete} size="lg" className="px-6">
                <Trash2 className="h-4 w-4 mr-2" />
                Xóa
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Title */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <ClipboardList className="h-5 w-5 text-blue-600" />
                    Chủ đề công việc
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-slate-700 leading-relaxed text-base">
                    <h1 className="text-3xl font-bold text-slate-900">{task.title}</h1>
                    <p className="text-slate-600 mt-1">Mã công việc: {task.id}</p>
                  </p>
                </CardContent>
              </Card>

              {/* Description */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <MessageSquare className="h-5 w-5 text-blue-600" />
                    Mô tả công việc
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-slate-700 leading-relaxed text-base">{task.description}</p>
                </CardContent>
              </Card>

              {/* Subtasks */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-xl">
                    <div className="flex items-center gap-2">
                      <CheckSquare className="h-5 w-5 text-blue-600" />
                      Công việc con ({completedSubtasks}/{task.subtasks.length})
                    </div>
                    <div className="text-base text-slate-600">{Math.round(progressPercentage)}% hoàn thành</div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {task.subtasks.map((subtask) => (
                      <div key={subtask.id} className="flex items-center gap-4 p-4 rounded-lg bg-slate-50">
                        <div
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center ${subtask.completed ? "bg-emerald-500 border-emerald-500" : "border-slate-300"
                            }`}
                        >
                          {subtask.completed && <CheckSquare className="h-3 w-3 text-white" />}
                        </div>
                        <span
                          className={`flex-1 text-base ${subtask.completed ? "text-slate-500 line-through" : "text-slate-700"}`}
                        >
                          {subtask.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Comments */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <MessageSquare className="h-5 w-5 text-blue-600" />
                    Bình luận ({task.comments.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {task.comments.map((comment) => (
                      <div key={comment.id} className="flex gap-4 p-4 rounded-lg bg-slate-50">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-blue-500 text-white text-sm">
                            {comment.author
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-medium text-slate-900 text-base">{comment.author}</span>
                            <span className="text-sm text-slate-500">{formatDate(comment.createdAt)}</span>
                          </div>
                          <p className="text-slate-700 text-base">{comment.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Status & Priority */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl">Thông tin cơ bản</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <label className="text-base font-medium text-slate-600">Trạng thái</label>
                    <div className="mt-2">
                      <Badge className={`${getStatusColor(task.status)} border font-medium text-sm px-3 py-1`}>
                        {task.status}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <label className="text-base font-medium text-slate-600">Độ ưu tiên</label>
                    <div className="mt-2 flex items-center gap-2">
                      <Flag className={`h-5 w-5 ${getPriorityColor(task.priority)} fill-current`} />
                      <span className={`font-medium text-base ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <label className="text-base font-medium text-slate-600">Dự án</label>
                    <div className="mt-2 flex items-center gap-2">
                      <FolderOpen className="h-5 w-5 text-blue-600" />
                      <span className="font-medium text-slate-900 text-base">{task.project}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Assignee & Reporter */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl">Người liên quan</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <label className="text-base font-medium text-slate-600">Người thực hiện</label>
                    <div className="mt-3 flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={task.assignee.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-blue-500 text-white">
                          {task.assignee.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-slate-900 text-base">{task.assignee.name}</p>
                        <p className="text-sm text-slate-600">{task.assignee.role}</p>
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <label className="text-base font-medium text-slate-600">Người báo cáo</label>
                    <div className="mt-3 flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={task.reporter.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-slate-500 text-white text-sm">
                          {task.reporter.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-slate-900 text-base">{task.reporter.name}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Dates & Time */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl">Thời gian</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-center gap-4">
                    <Calendar className="h-5 w-5 text-slate-600" />
                    <div>
                      <p className="text-base font-medium text-slate-600">Hạn chót</p>
                      <p className="font-medium text-slate-900 text-base">{formatDate(task.dueDate)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Clock className="h-5 w-5 text-slate-600" />
                    <div>
                      <p className="text-base font-medium text-slate-600">Thời gian ước tính</p>
                      <p className="font-medium text-slate-900 text-base">{task.estimatedHours} giờ</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="text-sm text-slate-500 space-y-2">
                    <p>Tạo: {formatDate(task.createdDate)}</p>
                    <p>Cập nhật: {formatDate(task.updatedDate)}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Tags */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl">Tags</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-2">
                    {task.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-blue-100 text-blue-700 px-3 py-1">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Attachments */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Paperclip className="h-5 w-5" />
                    File đính kèm ({task.attachments.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    {task.attachments.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 cursor-pointer"
                      >
                        <Paperclip className="h-5 w-5 text-slate-600" />
                        <div className="flex-1">
                          <p className="text-base font-medium text-slate-900">{file.name}</p>
                          <p className="text-sm text-slate-500">{file.size}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
