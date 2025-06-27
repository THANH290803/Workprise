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

export default function CreateTeamMemberPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    department: "",
    bio: "",
    startDate: "",
    salary: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      router.push("/team")
    } catch (error) {
      console.error("Error creating team member:", error)
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
            <h1 className="text-4xl font-bold text-gray-900">Thêm thành viên mới</h1>
            <p className="text-gray-600 mt-2 text-lg">Điền thông tin để thêm thành viên vào nhóm</p>
          </div>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader className="pb-8 bg-white rounded-t-lg">
            <CardTitle className="text-2xl font-semibold">Thông tin thành viên</CardTitle>
          </CardHeader>
          <CardContent className="p-8 bg-white rounded-b-lg">
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid gap-8 lg:grid-cols-2">
                <div className="space-y-4">
                  <Label htmlFor="name" className="text-lg font-semibold text-gray-900">
                    Họ và tên *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Nhập họ và tên..."
                    className="h-14 text-lg border-2 focus:border-blue-500"
                    required
                  />
                </div>

                <div className="space-y-4">
                  <Label htmlFor="email" className="text-lg font-semibold text-gray-900">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="Nhập địa chỉ email..."
                    className="h-14 text-lg border-2 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-8 lg:grid-cols-3">
                <div className="space-y-4">
                  <Label htmlFor="phone" className="text-lg font-semibold text-gray-900">
                    Số điện thoại
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    placeholder="Nhập số điện thoại..."
                    className="h-14 text-lg border-2 focus:border-blue-500"
                  />
                </div>

                <div className="space-y-4">
                  <Label htmlFor="startDate" className="text-lg font-semibold text-gray-900">
                    Ngày bắt đầu làm việc
                  </Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData((prev) => ({ ...prev, startDate: e.target.value }))}
                    className="h-14 text-lg border-2 focus:border-blue-500"
                  />
                </div>

                <div className="space-y-4">
                  <Label htmlFor="salary" className="text-lg font-semibold text-gray-900">
                    Mức lương (VNĐ)
                  </Label>
                  <Input
                    id="salary"
                    type="number"
                    value={formData.salary}
                    onChange={(e) => setFormData((prev) => ({ ...prev, salary: e.target.value }))}
                    placeholder="15000000"
                    className="h-14 text-lg border-2 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid gap-8 lg:grid-cols-2">
                <div className="space-y-4">
                  <Label htmlFor="role" className="text-lg font-semibold text-gray-900">
                    Chức vụ *
                  </Label>
                  <Select
                    value={formData.role}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, role: value }))}
                  >
                    <SelectTrigger className="h-14 text-lg border-2 focus:border-blue-500">
                      <SelectValue placeholder="Chọn chức vụ..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Project Manager">Project Manager</SelectItem>
                      <SelectItem value="Senior Developer">Senior Developer</SelectItem>
                      <SelectItem value="Developer">Developer</SelectItem>
                      <SelectItem value="Junior Developer">Junior Developer</SelectItem>
                      <SelectItem value="UI/UX Designer">UI/UX Designer</SelectItem>
                      <SelectItem value="QA Tester">QA Tester</SelectItem>
                      <SelectItem value="Business Analyst">Business Analyst</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <Label htmlFor="department" className="text-lg font-semibold text-gray-900">
                    Phòng ban
                  </Label>
                  <Select
                    value={formData.department}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, department: value }))}
                  >
                    <SelectTrigger className="h-14 text-lg border-2 focus:border-blue-500">
                      <SelectValue placeholder="Chọn phòng ban..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="IT">Công nghệ thông tin</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Sales">Kinh doanh</SelectItem>
                      <SelectItem value="HR">Nhân sự</SelectItem>
                      <SelectItem value="Finance">Tài chính</SelectItem>
                      <SelectItem value="Operations">Vận hành</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <Label htmlFor="bio" className="text-lg font-semibold text-gray-900">
                  Giới thiệu
                </Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))}
                  placeholder="Giới thiệu ngắn về thành viên, kinh nghiệm làm việc, kỹ năng..."
                  rows={6}
                  className="text-lg resize-none border-2 focus:border-blue-500"
                />
              </div>

              <div className="flex gap-6 pt-10 border-t-2 border-gray-200">
                <Button type="submit" disabled={isSubmitting} size="lg" className="px-12 py-4 text-lg font-semibold">
                  <Save className="h-5 w-5 mr-3" />
                  {isSubmitting ? "Đang lưu..." : "Thêm thành viên"}
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
