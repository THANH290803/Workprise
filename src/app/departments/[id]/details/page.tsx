"use client"

import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Edit, Mail, MapPin, Calendar, Users, DollarSign, Target } from "lucide-react"

const sampleDepartments = {
  "it-department": {
    id: "it-department",
    name: "Công nghệ thông tin",
    description: "Phòng ban chịu trách nhiệm phát triển và bảo trì hệ thống công nghệ thông tin của công ty",
    manager: "Nguyễn Văn A",
    budget: "2000000000",
    location: "Tầng 3, Tòa nhà A",
    establishedDate: "2020-01-01",
    goals: "Phát triển các sản phẩm công nghệ hiện đại, nâng cao hiệu quả làm việc",
    contactEmail: "it@company.com",
    status: "Hoạt động",
    memberCount: 15,
    projects: ["Website Redesign", "Mobile App Development", "Database Migration"],
    members: [
      { name: "Nguyễn Văn A", role: "Manager", avatar: "/placeholder.svg?height=40&width=40" },
      { name: "Trần Thị B", role: "Senior Developer", avatar: "/placeholder.svg?height=40&width=40" },
      { name: "Lê Văn C", role: "UI/UX Designer", avatar: "/placeholder.svg?height=40&width=40" },
    ],
  },
}

export default function DepartmentDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const departmentId = params.id as string
  const department = sampleDepartments[departmentId as keyof typeof sampleDepartments]

  if (!department) {
    return <div>Không tìm thấy phòng ban</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại
            </Button>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Chi tiết phòng ban</h1>
              <p className="text-gray-600 mt-2 text-lg">Thông tin chi tiết phòng ban</p>
            </div>
          </div>
          <Button onClick={() => router.push(`/departments/${departmentId}/edit`)} size="lg" className="px-8">
            <Edit className="h-4 w-4 mr-2" />
            Chỉnh sửa
          </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Overview Card */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-xl">{department.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Badge
                  variant={department.status === "Hoạt động" ? "default" : "secondary"}
                  className="text-sm px-4 py-2"
                >
                  {department.status}
                </Badge>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium">Số nhân viên</p>
                    <p className="text-gray-600">{department.memberCount} người</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <DollarSign className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium">Ngân sách</p>
                    <p className="text-gray-600">{Number(department.budget).toLocaleString("vi-VN")} VNĐ</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium">Vị trí</p>
                    <p className="text-gray-600">{department.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium">Ngày thành lập</p>
                    <p className="text-gray-600">{new Date(department.establishedDate).toLocaleDateString("vi-VN")}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium">Email liên hệ</p>
                    <p className="text-gray-600">{department.contactEmail}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-xl">Mô tả phòng ban</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{department.description}</p>
              </CardContent>
            </Card>

            {/* Goals */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Mục tiêu phòng ban
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{department.goals}</p>
              </CardContent>
            </Card>

            {/* Projects */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-xl">Dự án đang thực hiện</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {department.projects.map((project) => (
                    <div key={project} className="p-4 bg-gray-50 rounded-lg">
                      <p className="font-medium">{project}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Team Members */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-xl">Thành viên chính</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {department.members.map((member, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={member.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-gray-600">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
