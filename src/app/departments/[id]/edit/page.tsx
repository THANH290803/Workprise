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

const sampleDepartments = {
  "it-department": {
    id: "it-department",
    name: "Công nghệ thông tin",
    description: "Phòng ban chịu trách nhiệm phát triển và bảo trì hệ thống công nghệ thông tin của công ty",
    manager: "nguyen-van-a",
    budget: "2000000000",
    location: "Tầng 3, Tòa nhà A",
    establishedDate: "2020-01-01",
    goals: "Phát triển các sản phẩm công nghệ hiện đại, nâng cao hiệu quả làm việc",
    contactEmail: "it@company.com",
  },
}

export default function EditDepartmentPage() {
  const router = useRouter()
  const params = useParams()
  const departmentId = params.id as string
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

  useEffect(() => {
    const department = sampleDepartments[departmentId as keyof typeof sampleDepartments]
    if (department) {
      setFormData({
        name: department.name,
        description: department.description,
        manager: department.manager,
        budget: department.budget,
        location: department.location,
        establishedDate: department.establishedDate,
        goals: department.goals,
        contactEmail: department.contactEmail,
      })
    }
  }, [departmentId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      router.push("/departments")
    } catch (error) {
      console.error("Error updating department:", error)
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
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Chỉnh sửa phòng ban</h1>
              <p className="text-gray-600 mt-1">Cập nhật thông tin phòng ban</p>
            </div>
          </div>

          <Card className="shadow-lg border-0 w-full">
            <CardHeader className="pb-6 bg-white rounded-t-lg">
              <CardTitle className="text-xl font-semibold">Thông tin phòng ban</CardTitle>
            </CardHeader>
            <CardContent className="p-8 bg-white rounded-b-lg">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid gap-8 lg:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium text-gray-900">
                      Tên phòng ban *
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="Nhập tên phòng ban..."
                      className="h-12 text-base"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactEmail" className="text-sm font-medium text-gray-900">
                      Email liên hệ
                    </Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={formData.contactEmail}
                      onChange={(e) => setFormData((prev) => ({ ...prev, contactEmail: e.target.value }))}
                      placeholder="department@company.com"
                      className="h-12 text-base"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium text-gray-900">
                    Mô tả phòng ban
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Mô tả chức năng và nhiệm vụ của phòng ban..."
                    rows={6}
                    className="text-base resize-none"
                  />
                </div>

                <div className="grid gap-8 lg:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="manager" className="text-sm font-medium text-gray-900">
                      Trưởng phòng
                    </Label>
                    <Select
                      value={formData.manager}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, manager: value }))}
                    >
                      <SelectTrigger className="h-12 text-base">
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

                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-sm font-medium text-gray-900">
                      Vị trí văn phòng
                    </Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                      placeholder="Tầng 2, Tòa nhà A..."
                      className="h-12 text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="establishedDate" className="text-sm font-medium text-gray-900">
                      Ngày thành lập
                    </Label>
                    <Input
                      id="establishedDate"
                      type="date"
                      value={formData.establishedDate}
                      onChange={(e) => setFormData((prev) => ({ ...prev, establishedDate: e.target.value }))}
                      className="h-12 text-base"
                    />
                  </div>
                </div>

                <div className="grid gap-8 lg:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="budget" className="text-sm font-medium text-gray-900">
                      Ngân sách (VNĐ)
                    </Label>
                    <Input
                      id="budget"
                      type="number"
                      value={formData.budget}
                      onChange={(e) => setFormData((prev) => ({ ...prev, budget: e.target.value }))}
                      placeholder="1000000000"
                      className="h-12 text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="goals" className="text-sm font-medium text-gray-900">
                      Mục tiêu phòng ban
                    </Label>
                    <Textarea
                      id="goals"
                      value={formData.goals}
                      onChange={(e) => setFormData((prev) => ({ ...prev, goals: e.target.value }))}
                      placeholder="Mục tiêu và KPI của phòng ban..."
                      rows={4}
                      className="text-base resize-none"
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
