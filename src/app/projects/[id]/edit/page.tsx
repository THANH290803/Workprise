"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Save } from "lucide-react"

const sampleProjects = {
  "website-redesign": {
    id: "website-redesign",
    name: "Website Redesign",
    description: "Thiết kế lại giao diện website công ty với UI/UX hiện đại",
    status: "Đang thực hiện",
    priority: "Cao",
    startDate: "2023-12-01",
    endDate: "2024-02-15",
  },
  "mobile-app": {
    id: "mobile-app",
    name: "Mobile App Development",
    description: "Phát triển ứng dụng mobile cho iOS và Android",
    status: "Đang thực hiện",
    priority: "Cao",
    startDate: "2024-01-15",
    endDate: "2024-03-30",
  },
}

export default function EditProjectPage() {
  const router = useRouter()
  const params = useParams()
  const projectId = params.id as string
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "Chưa bắt đầu",
    priority: "Trung bình",
    startDate: "",
    endDate: "",
  })

  useEffect(() => {
    const project = sampleProjects[projectId as keyof typeof sampleProjects]
    if (project) {
      setFormData({
        name: project.name,
        description: project.description,
        status: project.status,
        priority: project.priority,
        startDate: project.startDate,
        endDate: project.endDate,
      })
    }
  }, [projectId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      router.push("/projects")
    } catch (error) {
      console.error("Error updating project:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 p-6">
        <div className="w-full">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="sm" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại
            </Button>
            {/* <div>
              <h1 className="text-3xl font-bold text-gray-900">Chỉnh sửa dự án</h1>
              <p className="text-gray-600 mt-1">Cập nhật thông tin dự án</p>
            </div> */}
          </div>

          <Card className="shadow-lg border-0 w-full">
            <CardHeader className="pb-6 bg-white rounded-t-lg">
              <CardTitle className="text-xl font-semibold">Thông tin dự án</CardTitle>
            </CardHeader>
            <CardContent className="p-8 bg-white rounded-b-lg">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid gap-8 lg:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium text-gray-900">
                      Tên dự án *
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="Nhập tên dự án..."
                      className="h-12 text-base"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status" className="text-sm font-medium text-gray-900">
                      Trạng thái
                    </Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}
                    >
                      <SelectTrigger className="h-12 text-base w-full" style={{height: '48px'}}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Chưa bắt đầu">Chưa bắt đầu</SelectItem>
                        <SelectItem value="Đang thực hiện">Đang thực hiện</SelectItem>
                        <SelectItem value="Hoàn thành">Hoàn thành</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium text-gray-900">
                    Mô tả dự án
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Mô tả chi tiết về dự án..."
                    rows={6}
                    className="text-base resize-none"
                  />
                </div>

                <div className="grid gap-8 lg:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="priority" className="text-sm font-medium text-gray-900">
                      Độ ưu tiên
                    </Label>
                    <Select
                      value={formData.priority}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, priority: value }))}
                    >
                      <SelectTrigger className="h-12 text-base w-full" style={{height: '48px'}}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Cao">Cao</SelectItem>
                        <SelectItem value="Trung bình">Trung bình</SelectItem>
                        <SelectItem value="Thấp">Thấp</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="startDate" className="text-sm font-medium text-gray-900">
                      Ngày bắt đầu
                    </Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData((prev) => ({ ...prev, startDate: e.target.value }))}
                      className="h-12 text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="endDate" className="text-sm font-medium text-gray-900">
                      Ngày kết thúc
                    </Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData((prev) => ({ ...prev, endDate: e.target.value }))}
                      className="h-12 text-base"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-8 border-t border-gray-200">
                  <Button type="submit" disabled={isSubmitting} className="px-12 py-3 text-base">
                    <Save className="h-4 w-4 mr-2" />
                    {isSubmitting ? "Đang lưu..." : "Cập nhật"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="px-12 py-3 text-base bg-transparent"
                    onClick={() => router.back()}
                  >
                    Hủy
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
