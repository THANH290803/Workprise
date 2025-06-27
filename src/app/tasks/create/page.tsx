"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Save } from "lucide-react"

export default function CreateTaskPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Chưa bắt đầu",
    priority: "Trung bình",
    assignee: "",
    project: "",
    dueDate: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      router.push("/tasks")
    } catch (error) {
      console.error("Error creating task:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại
          </Button>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Tạo công việc mới</h1>
            <p className="text-gray-600 mt-2 text-lg">Điền thông tin để tạo công việc mới</p>
          </div>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader className="pb-8 bg-white rounded-t-lg">
            <CardTitle className="text-2xl font-semibold">Thông tin công việc</CardTitle>
          </CardHeader>
          <CardContent className="p-8 bg-white rounded-b-lg">
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid gap-8 lg:grid-cols-2">
                <div className="space-y-4">
                  <Label htmlFor="title" className="text-lg font-semibold text-gray-900">
                    Tiêu đề công việc *
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="Nhập tiêu đề công việc..."
                    className="h-14 text-lg border-2 focus:border-blue-500"
                    required
                  />
                </div>

                <div className="space-y-4">
                  <Label htmlFor="project" className="text-lg font-semibold text-gray-900">
                    Dự án
                  </Label>
                  <Select
                    value={formData.project}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, project: value }))}
                  >
                    <SelectTrigger className="h-14 text-lg border-2 focus:border-blue-500">
                      <SelectValue placeholder="Chọn dự án..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="website-redesign">Website Redesign</SelectItem>
                      <SelectItem value="mobile-app">Mobile App Development</SelectItem>
                      <SelectItem value="marketing-campaign">Marketing Campaign Q1</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <Label htmlFor="description" className="text-lg font-semibold text-gray-900">
                  Mô tả công việc
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Mô tả chi tiết về công việc..."
                  rows={8}
                  className="text-lg resize-none border-2 focus:border-blue-500"
                />
              </div>

              <div className="grid gap-8 lg:grid-cols-4">
                <div className="space-y-4">
                  <Label htmlFor="assignee" className="text-lg font-semibold text-gray-900">
                    Người thực hiện
                  </Label>
                  <Select
                    value={formData.assignee}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, assignee: value }))}
                  >
                    <SelectTrigger className="h-14 text-lg border-2 focus:border-blue-500">
                      <SelectValue placeholder="Chọn người thực hiện..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nguyen-van-a">Nguyễn Văn A</SelectItem>
                      <SelectItem value="tran-thi-b">Trần Thị B</SelectItem>
                      <SelectItem value="le-van-c">Lê Văn C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <Label htmlFor="status" className="text-lg font-semibold text-gray-900">
                    Trạng thái
                  </Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}
                  >
                    <SelectTrigger className="h-14 text-lg border-2 focus:border-blue-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Chưa bắt đầu">Chưa bắt đầu</SelectItem>
                      <SelectItem value="Đang thực hiện">Đang thực hiện</SelectItem>
                      <SelectItem value="Hoàn thành">Hoàn thành</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <Label htmlFor="priority" className="text-lg font-semibold text-gray-900">
                    Độ ưu tiên
                  </Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, priority: value }))}
                  >
                    <SelectTrigger className="h-14 text-lg border-2 focus:border-blue-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cao">Cao</SelectItem>
                      <SelectItem value="Trung bình">Trung bình</SelectItem>
                      <SelectItem value="Thấp">Thấp</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <Label htmlFor="dueDate" className="text-lg font-semibold text-gray-900">
                    Hạn hoàn thành
                  </Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData((prev) => ({ ...prev, dueDate: e.target.value }))}
                    className="h-14 text-lg border-2 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex gap-6 pt-10 border-t-2 border-gray-200">
                <Button type="submit" disabled={isSubmitting} size="lg" className="px-12 py-4 text-lg font-semibold">
                  <Save className="h-5 w-5 mr-3" />
                  {isSubmitting ? "Đang lưu..." : "Tạo công việc"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="px-12 py-4 text-lg"
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
  )
}
