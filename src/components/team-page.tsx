"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, Search, Filter, MoreHorizontal, Edit, Eye, Trash2, Mail, Phone } from "lucide-react"

const sampleMembers = [
  {
    id: "member-1",
    name: "Nguyễn Văn A",
    email: "nguyen.van.a@company.com",
    phone: "0123456789",
    role: "Project Manager",
    department: "IT",
    status: "Hoạt động",
    avatar: "/placeholder.svg?height=80&width=80",
    joinDate: "2020-01-15",
    projects: 5,
  },
  {
    id: "member-2",
    name: "Trần Thị B",
    email: "tran.thi.b@company.com",
    phone: "0987654321",
    role: "UI/UX Designer",
    department: "Design",
    status: "Hoạt động",
    avatar: "/placeholder.svg?height=80&width=80",
    joinDate: "2021-03-10",
    projects: 3,
  },
  {
    id: "member-3",
    name: "Lê Văn C",
    email: "le.van.c@company.com",
    phone: "0369852147",
    role: "Senior Developer",
    department: "IT",
    status: "Nghỉ phép",
    avatar: "/placeholder.svg?height=80&width=80",
    joinDate: "2019-08-20",
    projects: 7,
  },
]

const statusColors = {
  "Hoạt động": "bg-green-100 text-green-800",
  "Nghỉ phép": "bg-yellow-100 text-yellow-800",
  "Không hoạt động": "bg-red-100 text-red-800",
}

export function TeamPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [members] = useState(sampleMembers)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.department.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleEdit = (memberId: string) => {
    console.log("Edit member:", memberId)
    setOpenDropdown(null)
    router.push(`/team/${memberId}/edit`)
  }

  const handleView = (memberId: string) => {
    console.log("View member:", memberId)
    setOpenDropdown(null)
    router.push(`/team/${memberId}/details`)
  }

  const handleDelete = (memberId: string) => {
    console.log("Delete member:", memberId)
    setOpenDropdown(null)
    if (confirm("Bạn có chắc chắn muốn xóa thành viên này không?")) {
      console.log("Confirmed delete member:", memberId)
    }
  }

  const toggleDropdown = (memberId: string) => {
    setOpenDropdown(openDropdown === memberId ? null : memberId)
  }

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-end items-start sm:items-center gap-4">
        <Button onClick={() => router.push("/team/create")} size="lg" className="px-6">
          <Plus className="h-4 w-4 mr-2" />
          Thêm thành viên
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Tìm kiếm thành viên..."
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

      {/* Members Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredMembers.map((member) => (
          <Card key={member.id} className="hover:shadow-lg transition-shadow relative">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={member.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-lg">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg truncate">{member.name}</CardTitle>
                    <p className="text-sm text-gray-600 truncate">{member.role}</p>
                    <Badge
                      className={`${statusColors[member.status as keyof typeof statusColors]} text-xs px-2 py-1 mt-1`}
                    >
                      {member.status}
                    </Badge>
                  </div>
                </div>

                {/* Custom Dropdown Menu */}
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-gray-100"
                    onClick={() => toggleDropdown(member.id)}
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>

                  {/* Dropdown Content */}
                  {openDropdown === member.id && (
                    <div className="absolute right-0 top-8 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                      <div className="py-1">
                        <button
                          onClick={() => handleView(member.id)}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Xem hồ sơ
                        </button>
                        <button
                          onClick={() => handleEdit(member.id)}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Chỉnh sửa
                        </button>
                        <hr className="my-1" />
                        <button
                          onClick={() => handleDelete(member.id)}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Xóa thành viên
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">{member.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">{member.phone}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Phòng ban:</span>
                <span className="font-medium">{member.department}</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Dự án tham gia:</span>
                <span className="font-medium">{member.projects} dự án</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Ngày tham gia:</span>
                <span className="font-medium">{new Date(member.joinDate).toLocaleDateString("vi-VN")}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Click outside to close dropdown */}
      {openDropdown && <div className="fixed inset-0 z-40" onClick={() => setOpenDropdown(null)} />}

      {filteredMembers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Không tìm thấy thành viên nào</p>
        </div>
      )}
    </div>
  )
}
