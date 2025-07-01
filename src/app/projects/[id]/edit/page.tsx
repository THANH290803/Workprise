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
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
// import { ScrollArea } from "@/components/ui/scroll-area"
import { Check, UserPlus, Users } from "lucide-react"

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
    userIds: [] as number[],
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
        userIds: [],
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

  const mockUsers = [
      { id: 1, name: "Nguyễn Văn A" },
      { id: 2, name: "Trần Thị B" },
      { id: 3, name: "Lê Văn C" },
    ]
  
    const [users] = useState(mockUsers)
    const [searchTerm, setSearchTerm] = useState("")

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
                      <SelectTrigger className="h-12 text-base w-full" style={{ height: '48px' }}>
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

                <div className="grid gap-8 lg:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="priority" className="text-sm font-medium text-gray-900">
                      Độ ưu tiên
                    </Label>
                    <Select
                      value={formData.priority}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, priority: value }))}
                    >
                      <SelectTrigger className="h-12 text-base w-full" style={{ height: '48px' }}>
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
                    <Label className="text-sm font-medium text-gray-900">Người tham gia</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-between h-12 text-base">
                          {formData.userIds.length === 0 && "Chọn thành viên"}
                          {formData.userIds.length === 1 &&
                            users.find((u) => u.id === formData.userIds[0])?.name}
                          {formData.userIds.length === 2 &&
                            users
                              .filter((u) => formData.userIds.includes(u.id))
                              .map((u) => u.name)
                              .join(", ")}
                          {formData.userIds.length > 2 && (() => {
                            const selectedUsers = users.filter((u) => formData.userIds.includes(u.id))
                            const firstTwoNames = selectedUsers.slice(0, 2).map((u) => u.name).join(", ")
                            const extraCount = formData.userIds.length - 2
                            return `${firstTwoNames}, +${extraCount} người đã chọn`
                          })()}
                          <Users className="w-4 h-4 ml-2" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[635px] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Tìm kiếm người dùng..."
                            value={searchTerm}
                            onValueChange={setSearchTerm}
                            className="h-10"
                          />
                          <CommandList className="max-h-60 overflow-y-auto">
                            <CommandItem
                              onSelect={() => {
                                const allUserIds = users.map((u) => u.id)
                                const isAllSelected = formData.userIds.length === users.length
                                setFormData((prev) => ({
                                  ...prev,
                                  userIds: isAllSelected ? [] : allUserIds,
                                }))
                              }}
                              className="font-semibold text-blue-600"
                            >
                              <UserPlus className="w-4 h-4 mr-2" />
                              {formData.userIds.length === users.length
                                ? "Bỏ chọn tất cả"
                                : "Chọn tất cả"}
                            </CommandItem>

                            {users
                              .filter((user) =>
                                user.name.toLowerCase().includes(searchTerm.toLowerCase())
                              )
                              .map((user) => (
                                <CommandItem
                                  key={user.id}
                                  onSelect={() => {
                                    setFormData((prev) => ({
                                      ...prev,
                                      userIds: prev.userIds.includes(user.id)
                                        ? prev.userIds.filter((id) => id !== user.id)
                                        : [...prev.userIds, user.id],
                                    }))
                                  }}
                                  className="flex items-center justify-between"
                                >
                                  <span>{user.name}</span>
                                  {formData.userIds.includes(user.id) && (
                                    <Check className="w-4 h-4 text-green-500" />
                                  )}
                                </CommandItem>
                              ))}
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="grid gap-8 lg:grid-cols-2">
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
