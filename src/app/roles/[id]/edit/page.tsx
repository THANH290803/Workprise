"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft, Save, Check, X } from "lucide-react"

// Permission categories and permissions (same as create page)
const permissionCategories = {
  projects: {
    name: "Dự án",
    permissions: [
      { id: "projects.view", name: "Xem dự án", description: "Xem danh sách và chi tiết dự án" },
      { id: "projects.create", name: "Tạo dự án", description: "Tạo dự án mới" },
      { id: "projects.edit", name: "Chỉnh sửa dự án", description: "Chỉnh sửa thông tin dự án" },
      { id: "projects.delete", name: "Xóa dự án", description: "Xóa dự án khỏi hệ thống" },
    ],
  },
  tasks: {
    name: "Công việc",
    permissions: [
      { id: "tasks.view", name: "Xem công việc", description: "Xem danh sách và chi tiết công việc" },
      { id: "tasks.create", name: "Tạo công việc", description: "Tạo công việc mới" },
      { id: "tasks.edit", name: "Chỉnh sửa công việc", description: "Chỉnh sửa thông tin công việc" },
      { id: "tasks.delete", name: "Xóa công việc", description: "Xóa công việc khỏi hệ thống" },
      { id: "tasks.assign", name: "Phân công", description: "Phân công công việc cho thành viên" },
    ],
  },
  team: {
    name: "Nhóm",
    permissions: [
      { id: "team.view", name: "Xem thành viên", description: "Xem danh sách thành viên" },
      { id: "team.create", name: "Thêm thành viên", description: "Thêm thành viên mới" },
      { id: "team.edit", name: "Chỉnh sửa thành viên", description: "Chỉnh sửa thông tin thành viên" },
      { id: "team.delete", name: "Xóa thành viên", description: "Xóa thành viên khỏi nhóm" },
    ],
  },
  departments: {
    name: "Phòng ban",
    permissions: [
      { id: "departments.view", name: "Xem phòng ban", description: "Xem danh sách phòng ban" },
      { id: "departments.create", name: "Tạo phòng ban", description: "Tạo phòng ban mới" },
      { id: "departments.edit", name: "Chỉnh sửa phòng ban", description: "Chỉnh sửa thông tin phòng ban" },
      { id: "departments.delete", name: "Xóa phòng ban", description: "Xóa phòng ban khỏi hệ thống" },
    ],
  },
  analytics: {
    name: "Thống kê",
    permissions: [
      { id: "analytics.view", name: "Xem thống kê", description: "Xem báo cáo và thống kê" },
      { id: "analytics.export", name: "Xuất báo cáo", description: "Xuất báo cáo ra file" },
    ],
  },
  system: {
    name: "Hệ thống",
    permissions: [
      { id: "system.settings", name: "Cài đặt hệ thống", description: "Quản lý cài đặt hệ thống" },
      { id: "system.users", name: "Quản lý người dùng", description: "Quản lý tài khoản người dùng" },
      { id: "system.roles", name: "Quản lý vai trò", description: "Quản lý vai trò và phân quyền" },
    ],
  },
}

// Mock role data
const mockRoleData = {
  "1": {
    id: "1",
    name: "Quản trị viên",
    description: "Có toàn quyền truy cập và quản lý hệ thống",
    status: true,
    permissions: [
      "projects.view",
      "projects.create",
      "projects.edit",
      "projects.delete",
      "tasks.view",
      "tasks.create",
      "tasks.edit",
      "tasks.delete",
      "tasks.assign",
      "team.view",
      "team.create",
      "team.edit",
      "team.delete",
      "departments.view",
      "departments.create",
      "departments.edit",
      "departments.delete",
      "analytics.view",
      "analytics.export",
      "system.settings",
      "system.users",
      "system.roles",
    ],
  },
  "2": {
    id: "2",
    name: "Quản lý dự án",
    description: "Quản lý dự án và phân công công việc cho nhóm",
    status: true,
    permissions: [
      "projects.view",
      "projects.create",
      "projects.edit",
      "tasks.view",
      "tasks.create",
      "tasks.edit",
      "tasks.assign",
      "team.view",
      "team.edit",
      "analytics.view",
    ],
  },
}

export default function EditRolePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: true,
  })
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // Simulate loading role data
    const loadRoleData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const roleData = mockRoleData[params.id as keyof typeof mockRoleData]
      if (roleData) {
        setFormData({
          name: roleData.name,
          description: roleData.description,
          status: roleData.status,
        })
        setSelectedPermissions(roleData.permissions)
      }
      setIsLoading(false)
    }

    loadRoleData()
  }, [params.id])

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    if (checked) {
      setSelectedPermissions((prev) => [...prev, permissionId])
    } else {
      setSelectedPermissions((prev) => prev.filter((id) => id !== permissionId))
    }
  }

  const handleCategoryToggle = (categoryKey: string, checked: boolean) => {
    const categoryPermissions = permissionCategories[categoryKey as keyof typeof permissionCategories].permissions.map(
      (p) => p.id,
    )

    if (checked) {
      setSelectedPermissions((prev) => [...new Set([...prev, ...categoryPermissions])])
    } else {
      setSelectedPermissions((prev) => prev.filter((id) => !categoryPermissions.includes(id)))
    }
  }

  const isCategorySelected = (categoryKey: string) => {
    const categoryPermissions = permissionCategories[categoryKey as keyof typeof permissionCategories].permissions.map(
      (p) => p.id,
    )
    return categoryPermissions.every((id) => selectedPermissions.includes(id))
  }

  const isCategoryPartiallySelected = (categoryKey: string) => {
    const categoryPermissions = permissionCategories[categoryKey as keyof typeof permissionCategories].permissions.map(
      (p) => p.id,
    )
    const selectedInCategory = categoryPermissions.filter((id) => selectedPermissions.includes(id))
    return selectedInCategory.length > 0 && selectedInCategory.length < categoryPermissions.length
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("Updating role:", {
      id: params.id,
      ...formData,
      permissions: selectedPermissions,
    })

    router.push("/roles")
  }

  const totalPermissions = Object.values(permissionCategories).reduce(
    (total, category) => total + category.permissions.length,
    0,
  )

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="w-full px-8 py-6">
          <div className="flex items-center gap-4 mb-8">
            <Skeleton className="h-10 w-24" />
            <div>
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-4 w-64" />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-8">
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-4 w-48" />
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                  </div>
                  <Skeleton className="h-24 w-full" />
                </CardContent>
              </Card>
            </div>
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-24" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-16 w-full" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full px-8 py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/roles">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin cơ bản</CardTitle>
                  <CardDescription>Cập nhật thông tin cơ bản cho vai trò</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Tên vai trò *</Label>
                      <Input
                        id="name"
                        placeholder="Nhập tên vai trò"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                        className="h-12 text-base"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Trạng thái</Label>
                      <div className="flex items-center space-x-2 h-12">
                        <Switch
                          id="status"
                          checked={formData.status}
                          onCheckedChange={(checked) => handleInputChange("status", checked)}
                        />
                        <Label htmlFor="status" className="text-base">
                          {formData.status ? "Hoạt động" : "Không hoạt động"}
                        </Label>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Mô tả</Label>
                    <Textarea
                      id="description"
                      placeholder="Nhập mô tả cho vai trò"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      rows={4}
                      className="text-base resize-none"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Permissions */}
              <Card>
                <CardHeader>
                  <CardTitle>Phân quyền</CardTitle>
                  <CardDescription>Cập nhật các quyền hạn cho vai trò này</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {Object.entries(permissionCategories).map(([categoryKey, category]) => (
                    <div key={categoryKey} className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id={`category-${categoryKey}`}
                          checked={isCategorySelected(categoryKey)}
                          onCheckedChange={(checked) => handleCategoryToggle(categoryKey, checked as boolean)}
                          className={
                            isCategoryPartiallySelected(categoryKey) ? "data-[state=checked]:bg-orange-500" : ""
                          }
                        />
                        <Label htmlFor={`category-${categoryKey}`} className="text-lg font-semibold">
                          {category.name}
                        </Label>
                        <Badge variant="outline">
                          {category.permissions.filter((p) => selectedPermissions.includes(p.id)).length}/
                          {category.permissions.length}
                        </Badge>
                      </div>
                      <div className="ml-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {category.permissions.map((permission) => (
                          <div
                            key={permission.id}
                            className="flex items-start space-x-3 p-3 rounded-lg border bg-gray-50"
                          >
                            <Checkbox
                              id={permission.id}
                              checked={selectedPermissions.includes(permission.id)}
                              onCheckedChange={(checked) => handlePermissionChange(permission.id, checked as boolean)}
                            />
                            <div className="flex-1">
                              <Label htmlFor={permission.id} className="font-medium cursor-pointer">
                                {permission.name}
                              </Label>
                              <p className="text-sm text-gray-600 mt-1">{permission.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      {categoryKey !== "system" && <Separator />}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <Link href="/roles">
                  <Button variant="outline" type="button">
                    Hủy
                  </Button>
                </Link>
                <Button type="submit" disabled={isSubmitting || !formData.name.trim()}>
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Đang cập nhật...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Cập nhật vai trò
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="text-lg">Tóm tắt vai trò</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Tên vai trò</Label>
                  <p className="text-base font-medium">{formData.name || "Chưa nhập"}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Trạng thái</Label>
                  <div className="flex items-center gap-2 mt-1">
                    {formData.status ? (
                      <>
                        <Check className="h-4 w-4 text-green-600" />
                        <span className="text-green-600">Hoạt động</span>
                      </>
                    ) : (
                      <>
                        <X className="h-4 w-4 text-red-600" />
                        <span className="text-red-600">Không hoạt động</span>
                      </>
                    )}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Quyền hạn</Label>
                  <p className="text-base font-medium">
                    {selectedPermissions.length}/{totalPermissions} quyền
                  </p>
                </div>
                <Separator />
                <div>
                  <Label className="text-sm font-medium text-gray-600 mb-2 block">Quyền đã chọn</Label>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {selectedPermissions.length === 0 ? (
                      <p className="text-sm text-gray-500">Chưa chọn quyền nào</p>
                    ) : (
                      Object.entries(permissionCategories).map(([categoryKey, category]) => {
                        const categoryPermissions = category.permissions.filter((p) =>
                          selectedPermissions.includes(p.id),
                        )
                        if (categoryPermissions.length === 0) return null

                        return (
                          <div key={categoryKey}>
                            <p className="text-sm font-medium text-gray-700">{category.name}</p>
                            <div className="ml-2 space-y-1">
                              {categoryPermissions.map((permission) => (
                                <p key={permission.id} className="text-xs text-gray-600">
                                  • {permission.name}
                                </p>
                              ))}
                            </div>
                          </div>
                        )
                      })
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
