"use client"

import { Label } from "@/components/ui/label"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DeleteConfirmationDialog } from "@/components/delete-confirmation-dialog"
import {
  ArrowLeft,
  Edit,
  Trash2,
  Plus,
  Check,
  Shield,
  Users,
  Calendar,
  FolderOpen,
  CheckSquare,
  Building2,
  BarChart3,
  Settings,
} from "lucide-react"

// Permission categories with icons
const permissionCategories = {
  projects: {
    name: "Dự án",
    icon: FolderOpen,
    permissions: [
      { id: "projects.view", name: "Xem dự án", description: "Xem danh sách và chi tiết dự án" },
      { id: "projects.create", name: "Tạo dự án", description: "Tạo dự án mới" },
      { id: "projects.edit", name: "Chỉnh sửa dự án", description: "Chỉnh sửa thông tin dự án" },
      { id: "projects.delete", name: "Xóa dự án", description: "Xóa dự án khỏi hệ thống" },
    ],
  },
  tasks: {
    name: "Công việc",
    icon: CheckSquare,
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
    icon: Users,
    permissions: [
      { id: "team.view", name: "Xem thành viên", description: "Xem danh sách thành viên" },
      { id: "team.create", name: "Thêm thành viên", description: "Thêm thành viên mới" },
      { id: "team.edit", name: "Chỉnh sửa thành viên", description: "Chỉnh sửa thông tin thành viên" },
      { id: "team.delete", name: "Xóa thành viên", description: "Xóa thành viên khỏi nhóm" },
    ],
  },
  departments: {
    name: "Phòng ban",
    icon: Building2,
    permissions: [
      { id: "departments.view", name: "Xem phòng ban", description: "Xem danh sách phòng ban" },
      { id: "departments.create", name: "Tạo phòng ban", description: "Tạo phòng ban mới" },
      { id: "departments.edit", name: "Chỉnh sửa phòng ban", description: "Chỉnh sửa thông tin phòng ban" },
      { id: "departments.delete", name: "Xóa phòng ban", description: "Xóa phòng ban khỏi hệ thống" },
    ],
  },
  analytics: {
    name: "Thống kê",
    icon: BarChart3,
    permissions: [
      { id: "analytics.view", name: "Xem thống kê", description: "Xem báo cáo và thống kê" },
      { id: "analytics.export", name: "Xuất báo cáo", description: "Xuất báo cáo ra file" },
    ],
  },
  system: {
    name: "Hệ thống",
    icon: Settings,
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
    status: "active",
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
    users: [
      {
        id: "1",
        name: "Nguyễn Văn A",
        email: "admin@company.com",
        avatar: "/placeholder.svg?height=40&width=40",
        department: "IT",
        joinDate: "2024-01-15",
      },
      {
        id: "2",
        name: "Trần Thị B",
        email: "manager@company.com",
        avatar: "/placeholder.svg?height=40&width=40",
        department: "HR",
        joinDate: "2024-01-20",
      },
      {
        id: "3",
        name: "Lê Văn C",
        email: "tech@company.com",
        avatar: "/placeholder.svg?height=40&width=40",
        department: "IT",
        joinDate: "2024-02-01",
      },
    ],
    createdAt: "2024-01-15",
    updatedAt: "2024-03-01",
  },
  "2": {
    id: "2",
    name: "Quản lý dự án",
    description: "Quản lý dự án và phân công công việc cho nhóm",
    status: "active",
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
    users: [
      {
        id: "4",
        name: "Phạm Văn D",
        email: "pm1@company.com",
        avatar: "/placeholder.svg?height=40&width=40",
        department: "Projects",
        joinDate: "2024-01-25",
      },
      {
        id: "5",
        name: "Hoàng Thị E",
        email: "pm2@company.com",
        avatar: "/placeholder.svg?height=40&width=40",
        department: "Projects",
        joinDate: "2024-02-10",
      },
    ],
    createdAt: "2024-01-20",
    updatedAt: "2024-02-28",
  },
}

export default function RoleDetailsPage({ params }: { params: { id: string } }) {
  const { id } = params
  const [isLoading, setIsLoading] = useState(true)
  const [roleData, setRoleData] = useState<any>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  useEffect(() => {
    const loadRoleData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const data = mockRoleData[id as keyof typeof mockRoleData]
      setRoleData(data)
      setIsLoading(false)
    }

    loadRoleData()
  }, [id])


  const handleDeleteRole = () => {
    console.log("Deleting role:", params.id)
    setDeleteDialogOpen(false)
    // Redirect to roles page after deletion
    window.location.href = "/roles"
  }

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
                <CardContent>
                  <Skeleton className="h-32 w-full" />
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

  if (!roleData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Không tìm thấy vai trò</h1>
          <p className="text-gray-600 mb-4">Vai trò bạn đang tìm kiếm không tồn tại.</p>
          <Link href="/roles">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại danh sách
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full px-8 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/roles">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Quay lại
              </Button>
            </Link>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{roleData.name}</h1>
                <Badge variant={roleData.status === "active" ? "default" : "secondary"}>
                  {roleData.status === "active" ? "Hoạt động" : "Không hoạt động"}
                </Badge>
              </div>
              <p className="text-gray-600">{roleData.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href={`/roles/${roleData.id}/edit`}>
              <Button variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Chỉnh sửa
              </Button>
            </Link>
            <Button
              variant="outline"
              className="text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
              onClick={() => setDeleteDialogOpen(true)}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Xóa
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Role Information */}
            <Card>
              <CardHeader>
                <CardTitle>Thông tin vai trò</CardTitle>
                <CardDescription>Chi tiết về vai trò và thông tin cơ bản</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Tên vai trò</Label>
                    <p className="text-base font-medium mt-1">{roleData.name}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Trạng thái</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={roleData.status === "active" ? "default" : "secondary"}>
                        {roleData.status === "active" ? "Hoạt động" : "Không hoạt động"}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Ngày tạo</Label>
                    <p className="text-base mt-1">{new Date(roleData.createdAt).toLocaleDateString("vi-VN")}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Cập nhật lần cuối</Label>
                    <p className="text-base mt-1">{new Date(roleData.updatedAt).toLocaleDateString("vi-VN")}</p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Mô tả</Label>
                  <p className="text-base mt-1">{roleData.description}</p>
                </div>
              </CardContent>
            </Card>

            {/* Permissions */}
            <Card>
              <CardHeader>
                <CardTitle>Quyền hạn</CardTitle>
                <CardDescription>Danh sách các quyền hạn được phân cho vai trò này</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {Object.entries(permissionCategories).map(([categoryKey, category]) => {
                  const categoryPermissions = category.permissions.filter((p) => roleData.permissions.includes(p.id))
                  if (categoryPermissions.length === 0) return null

                  const IconComponent = category.icon

                  return (
                    <div key={categoryKey} className="space-y-3">
                      <div className="flex items-center gap-3">
                        <IconComponent className="h-5 w-5 text-gray-600" />
                        <h3 className="text-lg font-semibold">{category.name}</h3>
                        <Badge variant="outline">
                          {categoryPermissions.length}/{category.permissions.length} quyền
                        </Badge>
                      </div>
                      <div className="ml-8 grid grid-cols-1 md:grid-cols-2 gap-3">
                        {categoryPermissions.map((permission) => (
                          <div key={permission.id} className="flex items-start gap-3 p-3 rounded-lg border bg-green-50">
                            <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="font-medium text-green-900">{permission.name}</p>
                              <p className="text-sm text-green-700">{permission.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      {categoryKey !== "system" && <Separator />}
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            {/* Assigned Users */}
            <Card>
              <CardHeader>
                <CardTitle>Người dùng được phân quyền</CardTitle>
                <CardDescription>Danh sách người dùng có vai trò này</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Người dùng</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phòng ban</TableHead>
                        <TableHead>Ngày tham gia</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {roleData.users.map((user: any) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={user.avatar || "/placeholder.svg"} />
                                <AvatarFallback className="text-xs">
                                  {user.name
                                    .split(" ")
                                    .map((n: string) => n[0])
                                    .join("")
                                    .toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-medium">{user.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{user.department}</Badge>
                          </TableCell>
                          <TableCell>{new Date(user.joinDate).toLocaleDateString("vi-VN")}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Thống kê</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-blue-600" />
                      <span className="text-sm text-gray-600">Tổng quyền</span>
                    </div>
                    <span className="font-semibold">{roleData.permissions.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-gray-600">Người dùng</span>
                    </div>
                    <span className="font-semibold">{roleData.users.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-purple-600" />
                      <span className="text-sm text-gray-600">Ngày tạo</span>
                    </div>
                    <span className="font-semibold text-sm">
                      {new Date(roleData.createdAt).toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Thao tác nhanh</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href={`/roles/${roleData.id}/edit`} className="block">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Edit className="h-4 w-4 mr-2" />
                      Chỉnh sửa vai trò
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
                    onClick={() => setDeleteDialogOpen(true)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Xóa vai trò
                  </Button>
                  <Link href="/roles/create" className="block">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Plus className="h-4 w-4 mr-2" />
                      Tạo vai trò mới
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Delete Confirmation Dialog */}
        <DeleteConfirmationDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          onConfirm={handleDeleteRole}
          title="Xóa vai trò"
          description={`Bạn có chắc chắn muốn xóa vai trò "${roleData.name}"? Hành động này không thể hoàn tác và sẽ ảnh hưởng đến ${roleData.users.length} người dùng được phân quyền.`}
        />
      </div>
    </div>
  )
}
