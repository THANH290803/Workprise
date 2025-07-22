"use client"

import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Edit, Mail, Phone, MapPin, Building, User, Briefcase } from "lucide-react"

const sampleMembers = {
  "member-1": {
    id: "member-1",
    name: "Nguyễn Văn A",
    email: "nguyen.van.a@company.com",
    phone: "0123456789",
    role: "Project Manager",
    department: "IT",
    bio: "Có 5 năm kinh nghiệm quản lý dự án trong lĩnh vực công nghệ thông tin. Chuyên về phương pháp Agile và Scrum, đã dẫn dắt nhiều dự án thành công từ khởi tạo đến triển khai. Có khả năng giao tiếp tốt và kỹ năng lãnh đạo xuất sắc.",
    startDate: "2020-01-15",
    salary: "25000000",
    status: "Hoạt động",
    avatar: "/placeholder.svg?height=120&width=120",
    skills: ["Project Management", "Agile", "Scrum", "Leadership", "Risk Management", "Stakeholder Management"],
    projects: ["Website Redesign", "Mobile App Development", "Database Migration"],
    achievements: [
      {
        title: "Hoàn thành dự án Website Redesign",
        date: "2023-12-15",
        description: "Dẫn dắt thành công dự án thiết kế lại website công ty",
      },
      { title: "Chứng chỉ PMP", date: "2023-06-20", description: "Đạt được chứng chỉ Project Management Professional" },
      {
        title: "Nhân viên xuất sắc Q2 2023",
        date: "2023-07-01",
        description: "Được công nhận là nhân viên xuất sắc quý 2",
      },
    ],
  },
}

export default function TeamMemberDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const memberId = params.id as string
  const member = sampleMembers[memberId as keyof typeof sampleMembers]

  if (!member) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy thành viên</h1>
          <Button onClick={() => router.push("/team")}>Quay lại danh sách thành viên</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 p-8">
        <div className="w-full">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Quay lại
              </Button>
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
                  <AvatarFallback className="text-2xl bg-blue-500 text-white">
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
                  <CardTitle className="text-xl flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Thông tin liên hệ
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center gap-4">
                      <Mail className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium text-base">Email</p>
                        <p className="text-gray-600">{member.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Phone className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium text-base">Số điện thoại</p>
                        <p className="text-gray-600">{member.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Building className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium text-base">Phòng ban</p>
                        <p className="text-gray-600">{member.department}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <MapPin className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium text-base">Địa chỉ nhân viên</p>
                        <p className="text-gray-600">{new Date(member.startDate).toLocaleDateString("vi-VN")}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Bio */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-xl">Giới thiệu</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-gray-700 leading-relaxed text-base">{member.bio}</p>
                </CardContent>
              </Card>

              {/* Skills */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    Kỹ năng
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-3">
                    {member.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="px-4 py-2 text-sm">
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
                <CardContent className="p-6">
                  <div className="space-y-3">
                    {member.projects.map((project) => (
                      <div key={project} className="p-4 bg-gray-50 rounded-lg">
                        <p className="font-medium text-base">{project}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Achievements */}
              {/* <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-xl">Thành tích</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {member.achievements.map((achievement, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-base">{achievement.title}</h4>
                          <span className="text-sm text-gray-500">
                            {new Date(achievement.date).toLocaleDateString("vi-VN")}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm">{achievement.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
