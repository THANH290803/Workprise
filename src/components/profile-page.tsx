"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  Edit3,
  Camera,
  Save,
  X,
  Shield,
  Award,
  Clock,
  Target,
} from "lucide-react"
import { useState } from "react"

const userStats = [
  {
    label: "Công việc hoàn thành",
    value: "142",
    icon: Target,
    color: "text-green-600",
  },
  {
    label: "Dự án tham gia",
    value: "8",
    icon: Briefcase,
    color: "text-blue-600",
  },
  {
    label: "Giờ làm việc",
    value: "1,240",
    icon: Clock,
    color: "text-purple-600",
  },
  {
    label: "Thành tích",
    value: "15",
    icon: Award,
    color: "text-orange-600",
  },
]

const recentActivities = [
  {
    action: "Hoàn thành công việc",
    task: "Thiết kế giao diện trang chủ",
    time: "2 giờ trước",
    project: "Website Redesign",
  },
  {
    action: "Bình luận",
    task: "Tối ưu database queries",
    time: "4 giờ trước",
    project: "Performance",
  },
  {
    action: "Tạo công việc mới",
    task: "Viết unit tests",
    time: "1 ngày trước",
    project: "Mobile App",
  },
  {
    action: "Cập nhật tiến độ",
    task: "Code review module thanh toán",
    time: "2 ngày trước",
    project: "Payment System",
  },
]

const skills = [
  "React",
  "TypeScript",
  "Node.js",
  "Python",
  "UI/UX Design",
  "Project Management",
  "Agile",
  "Scrum",
  "Git",
  "Docker",
]

export function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "Nguyễn Văn A",
    email: "nguyen.van.a@company.com",
    phone: "+84 123 456 789",
    location: "Hà Nội, Việt Nam",
    position: "Project Manager",
    department: "Phát triển sản phẩm",
    joinDate: "15/03/2022",
    bio: "Tôi là một Project Manager với hơn 5 năm kinh nghiệm trong việc quản lý các dự án công nghệ. Đam mê tối ưu hóa quy trình làm việc và xây dựng đội nhóm hiệu quả.",
  })

  const handleSave = () => {
    // Logic để lưu thông tin profile
    setIsEditing(false)
    // Có thể thêm toast notification ở đây
  }

  const handleCancel = () => {
    setIsEditing(false)
    // Reset lại dữ liệu nếu cần
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Hồ sơ cá nhân</h1>
          <p className="text-muted-foreground">Quản lý thông tin và cài đặt tài khoản của bạn</p>
        </div>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" />
                Hủy
              </Button>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Lưu thay đổi
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit3 className="h-4 w-4 mr-2" />
              Chỉnh sửa
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Info */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Thông tin cá nhân
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="/placeholder.svg?height=80&width=80" />
                    <AvatarFallback className="text-lg">NVA</AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button
                      size="sm"
                      variant="secondary"
                      className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-semibold">{profileData.name}</h3>
                  <p className="text-muted-foreground">{profileData.position}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      <Shield className="h-3 w-3 mr-1" />
                      {profileData.department}
                    </Badge>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Họ và tên</Label>
                  {isEditing ? (
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    />
                  ) : (
                    <div className="flex items-center gap-2 text-sm">
                      <User className="h-4 w-4 text-muted-foreground" />
                      {profileData.name}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    />
                  ) : (
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      {profileData.email}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Số điện thoại</Label>
                  {isEditing ? (
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    />
                  ) : (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      {profileData.phone}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Địa chỉ</Label>
                  {isEditing ? (
                    <Input
                      id="location"
                      value={profileData.location}
                      onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                    />
                  ) : (
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      {profileData.location}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position">Chức vụ</Label>
                  {isEditing ? (
                    <Input
                      id="position"
                      value={profileData.position}
                      onChange={(e) => setProfileData({ ...profileData, position: e.target.value })}
                    />
                  ) : (
                    <div className="flex items-center gap-2 text-sm">
                      <Briefcase className="h-4 w-4 text-muted-foreground" />
                      {profileData.position}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Ngày gia nhập</Label>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {profileData.joinDate}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Giới thiệu</Label>
                {isEditing ? (
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    rows={3}
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">{profileData.bio}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle>Kỹ năng</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
                {isEditing && (
                  <Button variant="outline" size="sm" className="h-6">
                    + Thêm kỹ năng
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats and Activities */}
        <div className="space-y-6">
          {/* Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Thống kê</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {userStats.map((stat) => (
                <div key={stat.label} className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-muted ${stat.color}`}>
                    <stat.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle>Hoạt động gần đây</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <div className="flex-1 space-y-1">
                      <p className="text-sm">
                        <span className="font-medium">{activity.action}</span>{" "}
                        <span className="text-muted-foreground">"{activity.task}"</span>
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{activity.project}</span>
                        <span>•</span>
                        <span>{activity.time}</span>
                      </div>
                    </div>
                  </div>
                  {index < recentActivities.length - 1 && <Separator className="my-2" />}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
