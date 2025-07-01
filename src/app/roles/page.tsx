"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DeleteConfirmationDialog } from "@/components/delete-confirmation-dialog"
import { Plus, Search, MoreHorizontal, Eye, Edit, Trash2, UserCheck, Shield, Users, Settings } from "lucide-react"

// Mock data for roles
const mockRoles = [
  {
    id: "1",
    name: "Quản trị viên",
    description: "Có toàn quyền truy cập và quản lý hệ thống",
    status: "active",
    permissions: 22,
    users: 3,
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Quản lý dự án",
    description: "Quản lý dự án và phân công công việc cho nhóm",
    status: "active",
    permissions: 15,
    users: 8,
    createdAt: "2024-01-20",
  },
  {
    id: "3",
    name: "Nhân viên",
    description: "Thực hiện công việc được phân công",
    status: "active",
    permissions: 8,
    users: 25,
    createdAt: "2024-02-01",
  },
  {
    id: "4",
    name: "Khách hàng",
    description: "Xem thông tin dự án và tiến độ",
    status: "inactive",
    permissions: 3,
    users: 12,
    createdAt: "2024-02-10",
  },
  {
    id: "5",
    name: "Kế toán",
    description: "Quản lý tài chính và báo cáo",
    status: "active",
    permissions: 6,
    users: 2,
    createdAt: "2024-02-15",
  },
]

export default function RolesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [roles, setRoles] = useState(mockRoles)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [roleToDelete, setRoleToDelete] = useState<string | null>(null)

  const filteredRoles = roles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDeleteRole = (roleId: string) => {
    setRoles(roles.filter((role) => role.id !== roleId))
    setDeleteDialogOpen(false)
    setRoleToDelete(null)
  }

  const openDeleteDialog = (roleId: string) => {
    setRoleToDelete(roleId)
    setDeleteDialogOpen(true)
  }

  const totalRoles = roles.length
  const activeRoles = roles.filter((role) => role.status === "active").length
  const totalPermissions = Math.max(...roles.map((role) => role.permissions))
  const totalUsers = roles.reduce((sum, role) => sum + role.users, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full px-8 py-6">
        {/* Header */}
        <div className="flex items-center justify-end mb-8">
          <Link href="/roles/create">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Tạo vai trò mới
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tổng vai trò</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalRoles}</div>
              <p className="text-xs text-muted-foreground">+2 từ tháng trước</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vai trò hoạt động</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeRoles}</div>
              <p className="text-xs text-muted-foreground">
                {Math.round((activeRoles / totalRoles) * 100)}% tổng số vai trò
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tổng quyền hạn</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalPermissions}</div>
              <p className="text-xs text-muted-foreground">Quyền hạn tối đa</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Người dùng</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalUsers}</div>
              <p className="text-xs text-muted-foreground">Được phân quyền</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Danh sách vai trò</CardTitle>
            <CardDescription>Quản lý tất cả vai trò và quyền hạn trong hệ thống</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Tìm kiếm vai trò theo tên hoặc mô tả..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Roles Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tên vai trò</TableHead>
                    <TableHead>Mô tả</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Quyền hạn</TableHead>
                    <TableHead>Người dùng</TableHead>
                    <TableHead>Ngày tạo</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRoles.map((role) => (
                    <TableRow key={role.id}>
                      <TableCell className="font-medium">{role.name}</TableCell>
                      <TableCell className="max-w-xs truncate">{role.description}</TableCell>
                      <TableCell>
                        <Badge variant={role.status === "active" ? "default" : "secondary"}>
                          {role.status === "active" ? "Hoạt động" : "Không hoạt động"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{role.permissions} quyền</Badge>
                      </TableCell>
                      <TableCell>{role.users} người</TableCell>
                      <TableCell>{new Date(role.createdAt).toLocaleDateString("vi-VN")}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Mở menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/roles/${role.id}/details`}>
                                <Eye className="mr-2 h-4 w-4" />
                                Xem chi tiết
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/roles/${role.id}/edit`}>
                                <Edit className="mr-2 h-4 w-4" />
                                Chỉnh sửa
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600" onClick={() => openDeleteDialog(role.id)}>
                              <Trash2 className="mr-2 h-4 w-4" />
                              Xóa
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredRoles.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">Không tìm thấy vai trò nào phù hợp</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Delete Confirmation Dialog */}
        <DeleteConfirmationDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          onConfirm={() => roleToDelete && handleDeleteRole(roleToDelete)}
          title="Xóa vai trò"
          description="Bạn có chắc chắn muốn xóa vai trò này? Hành động này không thể hoàn tác và sẽ ảnh hưởng đến tất cả người dùng được phân quyền."
        />
      </div>
    </div>
  )
}
