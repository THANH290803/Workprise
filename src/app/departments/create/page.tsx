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

export default function CreateDepartmentPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    manager: "",
    budget: "",
    location: "",
    establishedDate: "",
    goals: "",
    contactEmail: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      router.push("/departments")
    } catch (error) {
      console.error("Error creating department:", error)
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
            <h1 className="text-4xl font-bold text-gray-900">Tạo phòng ban mới</h1>
            <p className="text-gray-600 mt-2 text-lg">Điền thông tin để tạo phòng ban mới</p>
          </div>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader className="pb-8 bg-white rounded-t-lg">
            <CardTitle className="text-2xl font-semibold">Thông tin phòng ban</CardTitle>
          </CardHeader>
          <CardContent className="p-8 bg-white rounded-b-lg">
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid gap-8 lg:grid-cols-2">
                <div className="space-y-4">
                  <Label htmlFor="name" className="text-lg font-semibold text-gray-900">
                    Tên phòng ban *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Nhập tên phòng ban..."
                    className="h-14 text-lg border-2 focus:border-blue-500"
                    required
                  />
                </div>

                <div className="space-y-4">
                  <Label htmlFor="contactEmail" className="text-lg font-semibold text-gray-900">
                    Email liên hệ
                  </Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData((prev) => ({ ...prev, contactEmail: e.target.value }))}
                    placeholder="department@company.com"
                    className="h-14 text-lg border-2 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label htmlFor="description" className="text-lg font-semibold text-gray-900">
                  Mô tả phòng ban
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Mô tả chức năng và nhiệm vụ của phòng ban..."
                  rows={6}
                  className="text-lg resize-none border-2 focus:border-blue-500"
                />
              </div>

              <div className="grid gap-8 lg:grid-cols-3">
                <div className="space-y-4">
                  <Label htmlFor="manager" className="text-lg font-semibold text-gray-900">
                    Trưởng phòng
                  </Label>
                  <Select
                    value={formData.manager}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, manager: value }))}
                  >
                    <SelectTrigger className="h-14 text-lg border-2 focus:border-blue-500">
                      <SelectValue placeholder="Chọn trưởng phòng..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nguyen-van-a">Nguyễn Văn A</SelectItem>
                      <SelectItem value="tran-thi-b">Trần Thị B</SelectItem>
                      <SelectItem value="le-van-c">Lê Văn C</SelectItem>
                      <SelectItem value="pham-van-d">Phạm Văn D</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <Label htmlFor="location" className="text-lg font-semibold text-gray-900">
                    Vị trí văn phòng
                  </Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                    placeholder="Tầng 2, Tòa nhà A..."
                    className="h-14 text-lg border-2 focus:border-blue-500"
                  />
                </div>

                <div className="space-y-4">
                  <Label htmlFor="establishedDate" className="text-lg font-semibold text-gray-900">
                    Ngày thành lập
                  </Label>
                  <Input
                    id="establishedDate"
                    type="date"
                    value={formData.establishedDate}
                    onChange={(e) => setFormData((prev) => ({ ...prev, establishedDate: e.target.value }))}
                    className="h-14 text-lg border-2 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid gap-8 lg:grid-cols-2">
                <div className="space-y-4">
                  <Label htmlFor="budget" className="text-lg font-semibold text-gray-900">
                    Ngân sách (VNĐ)
                  </Label>
                  <Input
                    id="budget"
                    type="number"
                    value={formData.budget}
                    onChange={(e) => setFormData((prev) => ({ ...prev, budget: e.target.value }))}
                    placeholder="1000000000"
                    className="h-14 text-lg border-2 focus:border-blue-500"
                  />
                </div>

                <div className="space-y-4">
                  <Label htmlFor="goals" className="text-lg font-semibold text-gray-900">
                    Mục tiêu phòng ban
                  </Label>
                  <Textarea
                    id="goals"
                    value={formData.goals}
                    onChange={(e) => setFormData((prev) => ({ ...prev, goals: e.target.value }))}
                    placeholder="Mục tiêu và KPI của phòng ban..."
                    rows={4}
                    className="text-lg resize-none border-2 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex gap-6 pt-10 border-t-2 border-gray-200">
                <Button type="submit" disabled={isSubmitting} size="lg" className="px-12 py-4 text-lg font-semibold">
                  <Save className="h-5 w-5 mr-3" />
                  {isSubmitting ? "Đang lưu..." : "Tạo phòng ban"}
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
