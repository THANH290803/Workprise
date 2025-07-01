"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Eye,
  Trash2,
  Users,
  DollarSign,
  MapPin,
  Building2,
} from "lucide-react"

const sampleDepartments = [
  {
    id: "it-department",
    name: "Công nghệ thông tin",
    description: "Phòng ban chịu trách nhiệm phát triển và bảo trì hệ thống công nghệ thông tin",
    manager: "Nguyễn Văn A",
    memberCount: 15,
    budget: 2000000000,
    status: "Hoạt động",
    location: "Tầng 3, Tòa nhà A",
    projects: 8,
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "marketing-department",
    name: "Marketing",
    description: "Phòng ban marketing và truyền thông của công ty",
    manager: "Trần Thị B",
    memberCount: 8,
    budget: 1500000000,
    status: "Hoạt động",
    location: "Tầng 2, Tòa nhà B",
    projects: 5,
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "hr-department",
    name: "Nhân sự",
    description: "Phòng ban quản lý nhân sự và phát triển con người",
    manager: "Lê Văn C",
    memberCount: 6,
    budget: 800000000,
    status: "Hoạt động",
    location: "Tầng 1, Tòa nhà A",
    projects: 3,
    avatar: "/placeholder.svg?height=60&width=60",
  },
]

const statusColors = {
  "Hoạt động": "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
  "Tạm dừng": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
  "Không hoạt động": "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
}

export function DepartmentsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [departments] = useState(sampleDepartments)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const filteredDepartments = departments.filter(
    (dept) =>
      dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.manager.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleEdit = (deptId: string) => {
    console.log("Edit department:", deptId)
    setOpenDropdown(null)
    router.push(`/departments/${deptId}/edit`)
  }

  const handleView = (deptId: string) => {
    console.log("View department:", deptId)
    setOpenDropdown(null)
    router.push(`/departments/${deptId}/details`)
  }

  const handleDelete = (deptId: string) => {
    console.log("Delete department:", deptId)
    setOpenDropdown(null)
    if (confirm("Bạn có chắc chắn muốn xóa phòng ban này không?")) {
      console.log("Confirmed delete department:", deptId)
    }
  }

  const toggleDropdown = (deptId: string) => {
    setOpenDropdown(openDropdown === deptId ? null : deptId)
  }

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-end items-start sm:items-center gap-4">
        <Button onClick={() => router.push("/departments/create")} size="lg" className="px-6">
          <Plus className="h-4 w-4 mr-2" />
          Tạo phòng ban
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Tìm kiếm phòng ban..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12"
          />
        </div>
        <Button variant="outline" size="lg" className="px-6" style={{height: '48px'}}>
          <Filter className="h-4 w-4 mr-2" />
          Bộ lọc
        </Button>
      </div>

      {/* Departments Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredDepartments.map((dept) => (
          <Card key={dept.id} className="hover:shadow-lg transition-shadow relative">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <Avatar className="h-14 w-14">
                    <AvatarImage src={dept.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-lg bg-blue-100 text-blue-600">
                      <Building2 className="h-6 w-6" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg truncate">{dept.name}</CardTitle>
                    <p className="text-sm text-gray-600 truncate">Trưởng phòng: {dept.manager}</p>
                    <Badge
                      className={`${statusColors[dept.status as keyof typeof statusColors]} text-xs px-2 py-1 mt-1`}
                    >
                      {dept.status}
                    </Badge>
                  </div>
                </div>

                {/* Custom Dropdown Menu */}
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-gray-100"
                    onClick={() => toggleDropdown(dept.id)}
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>

                  {/* Dropdown Content */}
                  {openDropdown === dept.id && (
                    <div className="absolute right-0 top-8 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                      <div className="py-1">
                        <button
                          onClick={() => handleView(dept.id)}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Xem chi tiết
                        </button>
                        <button
                          onClick={() => handleEdit(dept.id)}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Chỉnh sửa
                        </button>
                        <hr className="my-1" />
                        <button
                          onClick={() => handleDelete(dept.id)}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Xóa
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600 line-clamp-2">{dept.description}</p>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">{dept.memberCount} nhân viên</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">{dept.budget.toLocaleString("vi-VN")} VNĐ</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">{dept.location}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm pt-2 border-t">
                <span className="text-gray-500">Dự án đang thực hiện:</span>
                <span className="font-medium text-blue-600">{dept.projects} dự án</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Click outside to close dropdown */}
      {openDropdown && <div className="fixed inset-0 z-40" onClick={() => setOpenDropdown(null)} />}

      {filteredDepartments.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">Không tìm thấy phòng ban nào</p>
          <p className="text-gray-400 text-sm mt-1">Thử thay đổi từ khóa tìm kiếm</p>
        </div>
      )}
    </div>
  )
}
