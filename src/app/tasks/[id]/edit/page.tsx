"use client"

import type React from "react"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Save, X, Plus, Calendar, Clock, Flag, FolderOpen, Tag } from "lucide-react"

// Sample data - in real app, this would come from API
const getTaskById = (id: string) => {
  const tasks = [
    {
      id: "TSK-001",
      title: "Thiết kế wireframe cho trang sản phẩm",
      description: "Tạo wireframe chi tiết cho trang hiển thị sản phẩm với đầy đủ các thành phần UI",
      project: "Website Redesign",
      projectId: "website-redesign",
      status: "Cần làm",
      priority: "Cao",
      assignee: {
        id: "user-1",
        name: "Nguyễn Văn A",
        avatar: "/placeholder.svg?height=32&width=32",
        email: "nguyen.van.a@company.com",
      },
      dueDate: "2024-01-15",
      estimatedHours: 8,
      tags: ["Design", "UI/UX", "Wireframe"],
    },
  ]

  return tasks.find((task) => task.id === id)
}

const projects = [
  { id: "website-redesign", name: "Website Redesign" },
  { id: "mobile-app", name: "Mobile App" },
  { id: "marketing-campaign", name: "Marketing Campaign" },
]

const users = [
  { id: "user-1", name: "Nguyễn Văn A", avatar: "/placeholder.svg?height=32&width=32" },
  { id: "user-2", name: "Trần Thị B", avatar: "/placeholder.svg?height=32&width=32" },
  { id: "user-3", name: "Lê Văn C", avatar: "/placeholder.svg?height=32&width=32" },
]

const statuses = ["Cần làm", "Đang thực hiện", "Đang xem xét", "Hoàn thành"]
const priorities = ["Thấp", "Trung bình", "Cao"]

export default function EditTaskPage() {
  const params = useParams()
  const router = useRouter()
  const taskId = params.id as string

  const task = getTaskById(taskId)

  const [formData, setFormData] = useState({
    title: task?.title || "",
    description: task?.description || "",
    projectId: task?.projectId || "",
    status: task?.status || "Cần làm",
    priority: task?.priority || "Trung bình",
    assigneeId: task?.assignee.id || "",
    dueDate: task?.dueDate || "",
    estimatedHours: task?.estimatedHours || 0,
    tags: task?.tags || [],
  })

  const [newTag, setNewTag] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  if (!task) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="flex-1 p-6">
          <div className="w-full">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
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
      </div>
    )
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }))
      setNewTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log("Updated task data:", formData)

      // In real app, call update API here
      router.push(`/tasks/${taskId}/details`)
    } catch (error) {
      console.error("Error updating task:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const selectedProject = projects.find((p) => p.id === formData.projectId)
  const selectedAssignee = users.find((u) => u.id === formData.assigneeId)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 p-6">
        <div className="w-full space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => router.push(`/tasks/${taskId}/details`)}
                className="border-slate-200 hover:bg-slate-50"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Quay lại
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Chỉnh sửa công việc</h1>
                <p className="text-slate-600 mt-1">Mã công việc: {task.id}</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Basic Information */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Flag className="h-5 w-5 text-blue-600" />
                      Thông tin cơ bản
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="title" className="text-base font-medium">
                        Tiêu đề công việc *
                      </Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => handleInputChange("title", e.target.value)}
                        placeholder="Nhập tiêu đề công việc..."
                        className="h-12 text-base"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-base font-medium">
                        Mô tả chi tiết
                      </Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        placeholder="Mô tả chi tiết về công việc..."
                        className="min-h-[120px] text-base resize-none"
                        rows={5}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-base font-medium">Dự án *</Label>
                        <Select
                          value={formData.projectId}
                          onValueChange={(value) => handleInputChange("projectId", value)}
                        >
                          <SelectTrigger className="h-12 text-base w-full" style={{height: '48px'}}>
                            <SelectValue placeholder="Chọn dự án" />
                          </SelectTrigger>
                          <SelectContent>
                            {projects.map((project) => (
                              <SelectItem key={project.id} value={project.id}>
                                <div className="flex items-center gap-2">
                                  <FolderOpen className="h-4 w-4 text-blue-600" />
                                  {project.name}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-base font-medium">Người thực hiện *</Label>
                        <Select
                          value={formData.assigneeId}
                          onValueChange={(value) => handleInputChange("assigneeId", value)}
                        >
                          <SelectTrigger className="h-12 text-base w-full" style={{height: '48px'}}>
                            <SelectValue placeholder="Chọn người thực hiện" />
                          </SelectTrigger>
                          <SelectContent>
                            {users.map((user) => (
                              <SelectItem key={user.id} value={user.id}>
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-6 w-6">
                                    <AvatarImage src={user.avatar || "/placeholder.svg"} />
                                    <AvatarFallback className="text-xs bg-blue-500 text-white">
                                      {user.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  {user.name}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Tags */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Tag className="h-5 w-5 text-blue-600" />
                      Tags
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-blue-100 text-blue-700 px-3 py-1">
                          {tag}
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(tag)}
                            className="ml-2 hover:text-red-600"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Thêm tag mới..."
                        className="h-12 text-base"
                        onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
                      />
                      <Button
                        type="button"
                        onClick={handleAddTag}
                        variant="outline"
                        className="h-12 px-4 bg-transparent"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Status & Priority */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">Trạng thái & Ưu tiên</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-base font-medium">Trạng thái</Label>
                      <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                        <SelectTrigger className="h-12 text-base w-full" style={{height: '48px'}}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {statuses.map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-base font-medium">Độ ưu tiên</Label>
                      <Select value={formData.priority} onValueChange={(value) => handleInputChange("priority", value)}>
                        <SelectTrigger className="h-12 text-base w-full" style={{height: '48px'}}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {priorities.map((priority) => (
                            <SelectItem key={priority} value={priority}>
                              <div className="flex items-center gap-2">
                                <Flag
                                  className={`h-4 w-4 ${
                                    priority === "Cao"
                                      ? "text-red-600"
                                      : priority === "Trung bình"
                                        ? "text-amber-600"
                                        : "text-emerald-600"
                                  }`}
                                />
                                {priority}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Time & Date */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">Thời gian</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="dueDate" className="text-base font-medium flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Hạn chót
                      </Label>
                      <Input
                        id="dueDate"
                        type="date"
                        value={formData.dueDate}
                        onChange={(e) => handleInputChange("dueDate", e.target.value)}
                        className="h-12 text-base"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="estimatedHours" className="text-base font-medium flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Thời gian ước tính (giờ)
                      </Label>
                      <Input
                        id="estimatedHours"
                        type="number"
                        min="0"
                        step="0.5"
                        value={formData.estimatedHours}
                        onChange={(e) => handleInputChange("estimatedHours", Number.parseFloat(e.target.value) || 0)}
                        className="h-12 text-base"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Current Selections Preview */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">Xem trước</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {selectedProject && (
                      <div className="flex items-center gap-2 text-sm">
                        <FolderOpen className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">{selectedProject.name}</span>
                      </div>
                    )}
                    {selectedAssignee && (
                      <div className="flex items-center gap-2 text-sm">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={selectedAssignee.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="text-xs bg-blue-500 text-white">
                            {selectedAssignee.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{selectedAssignee.name}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-4 pt-8 border-t border-slate-200">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push(`/tasks/${taskId}/details`)}
                className="px-8 py-3 text-base border-slate-200 hover:bg-slate-50"
              >
                Hủy bỏ
              </Button>
              <Button
                type="submit"
                disabled={isLoading || !formData.title.trim()}
                className="px-12 py-3 text-base bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Đang lưu...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Lưu thay đổi
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
