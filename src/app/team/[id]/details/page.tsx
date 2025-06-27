"use client"

import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Edit, Mail, Phone, Calendar, Building } from "lucide-react"

const sampleMembers = {
  "member-1": {
    id: "member-1",
    name: "Nguyễn Văn A",
    email: "nguyen.van.a@company.com",
    phone: "0123456789",
    role: "Project Manager",
    department: "IT",
    bio: "Có 5 năm kinh nghiệm quản lý dự án trong lĩnh vực công nghệ thông tin",
    startDate: "2020-01-15",
    salary: "25000000",
    status: "Hoạt động",
    avatar: "/placeholder.svg?height=120&width=120",
    skills: ["Project Management", "Agile", "Scrum", "Leadership"],
    projects: ["Website Redesign", "Mobile App Development"],
  },
}

export default function TeamMemberDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const memberId = params.id as string
  const member = sampleMembers[memberId as keyof typeof sampleMembers]

  if (!member) {
    return <div>Không tìm thấy thành viên</div>
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
              <h1 className="text-4xl font-bold text-gray-900">Hồ sơ thành viên</h1>
              <p className="text-gray-600 mt-2 text-lg">Thông tin chi tiết thành viên</p>
            </div>
          </div>
          <Button onClick={() => router.push(`/team/${memberId}/edit`)} size="lg" className="px-8">
            <Edit className="h-4 w-4 mr-2" />
            Chỉnh sửa
          </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Profile Card */}
          <Card className="shadow-lg border-0">
            <CardContent className="p-8 text-center">
              <Avatar className="h-32 w-32 mx-auto mb-6">
                <AvatarImage src={member.avatar || "/placeholder.svg"} />
                <AvatarFallback className="text-2xl">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-bold mb-2">{member.name}</h2>
              <p className="text-lg text-gray-600 mb-4">{member.role}</p>
              <Badge variant={member.status === "Hoạt động" ? "default" : "secondary"} className="text-sm px-4 py-2">
                {member.status}
              </Badge>
            </CardContent>
          </Card>

          {/* Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact Information */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-xl">Thông tin liên hệ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <Mail className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-600">{member.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium">Số điện thoại</p>
                    <p className="text-gray-600">{member.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Building className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium">Phòng ban</p>
                    <p className="text-gray-600">{member.department}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Calendar className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium">Ngày bắt đầu</p>
                    <p className="text-gray-600">{new Date(member.startDate).toLocaleDateString("vi-VN")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bio */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-xl">Giới thiệu</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{member.bio}</p>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-xl">Kỹ năng</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {member.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="px-3 py-1">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Projects */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-xl">Dự án tham gia</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {member.projects.map((project) => (
                    <div key={project} className="p-3 bg-gray-50 rounded-lg">
                      <p className="font-medium">{project}</p>
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
