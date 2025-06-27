"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  AlertTriangle,
  Users,
  FolderOpen,
  Target,
  Eye,
} from "lucide-react"

// Sample calendar events data
const calendarEvents = [
  {
    id: "1",
    title: "Deadline: Thiết kế wireframe",
    type: "deadline",
    date: "2024-01-15",
    time: "17:00",
    project: "Website Redesign",
    assignee: "Nguyễn Văn A",
    priority: "Cao",
    status: "Cần làm",
  },
  {
    id: "2",
    title: "Meeting: Sprint Planning",
    type: "meeting",
    date: "2024-01-16",
    time: "09:00",
    project: "Mobile App",
    attendees: ["Lê Văn C", "Bùi Thị H", "Hoàng Văn E"],
    duration: "2h",
  },
  {
    id: "3",
    title: "Milestone: Design System Complete",
    type: "milestone",
    date: "2024-01-18",
    project: "Website Redesign",
    progress: 90,
  },
  {
    id: "4",
    title: "Deadline: Marketing Banner",
    type: "deadline",
    date: "2024-01-20",
    time: "15:00",
    project: "Marketing Campaign",
    assignee: "Vũ Thị F",
    priority: "Trung bình",
    status: "Đang thực hiện",
  },
  {
    id: "5",
    title: "Review: API Authentication",
    type: "review",
    date: "2024-01-22",
    time: "14:00",
    project: "Mobile App",
    reviewer: "Lê Văn C",
    assignee: "Bùi Thị H",
  },
  {
    id: "6",
    title: "Launch: Marketing Campaign Q1",
    type: "milestone",
    date: "2024-01-25",
    project: "Marketing Campaign",
    progress: 75,
  },
]

const getEventTypeColor = (type: string) => {
  switch (type) {
    case "deadline":
      return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
    case "meeting":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
    case "milestone":
      return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
    case "review":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
  }
}

const getEventIcon = (type: string) => {
  switch (type) {
    case "deadline":
      return <AlertTriangle className="h-4 w-4" />
    case "meeting":
      return <Users className="h-4 w-4" />
    case "milestone":
      return <Target className="h-4 w-4" />
    case "review":
      return <Eye className="h-4 w-4" />
    default:
      return <Calendar className="h-4 w-4" />
  }
}

export function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState("month")
  const [selectedProject, setSelectedProject] = useState("all")

  const today = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  // Get days in month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

  // Generate calendar days
  const calendarDays = []

  // Previous month days
  const prevMonth = new Date(currentYear, currentMonth - 1, 0).getDate()
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    calendarDays.push({
      day: prevMonth - i,
      isCurrentMonth: false,
      date: new Date(currentYear, currentMonth - 1, prevMonth - i),
    })
  }

  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push({
      day,
      isCurrentMonth: true,
      date: new Date(currentYear, currentMonth, day),
    })
  }

  // Next month days to fill the grid
  const remainingDays = 42 - calendarDays.length
  for (let day = 1; day <= remainingDays; day++) {
    calendarDays.push({
      day,
      isCurrentMonth: false,
      date: new Date(currentYear, currentMonth + 1, day),
    })
  }

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)
    if (direction === "prev") {
      newDate.setMonth(currentMonth - 1)
    } else {
      newDate.setMonth(currentMonth + 1)
    }
    setCurrentDate(newDate)
  }

  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split("T")[0]
    return calendarEvents.filter((event) => event.date === dateString)
  }

  const isToday = (date: Date) => {
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  const upcomingEvents = calendarEvents
    .filter((event) => new Date(event.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5)

  const monthNames = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ]

  const dayNames = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Lịch trình</h2>
          <p className="text-muted-foreground">Xem lịch trình và deadline của các dự án</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Thêm sự kiện
        </Button>
      </div>

      {/* Calendar Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h3 className="text-lg font-semibold min-w-[150px] text-center">
              {monthNames[currentMonth]} {currentYear}
            </h3>
            <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
            Hôm nay
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedProject} onValueChange={setSelectedProject}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Chọn dự án" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả dự án</SelectItem>
              <SelectItem value="website-redesign">Website Redesign</SelectItem>
              <SelectItem value="mobile-app">Mobile App</SelectItem>
              <SelectItem value="marketing-campaign">Marketing Campaign</SelectItem>
            </SelectContent>
          </Select>
          <Select value={viewMode} onValueChange={setViewMode}>
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Tháng</SelectItem>
              <SelectItem value="week">Tuần</SelectItem>
              <SelectItem value="day">Ngày</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Calendar */}
        <div className="lg:col-span-3">
          <Card>
            <CardContent className="p-6">
              {/* Calendar Header */}
              <div className="grid grid-cols-7 gap-1 mb-4">
                {dayNames.map((day) => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((calendarDay, index) => {
                  const dayEvents = getEventsForDate(calendarDay.date)
                  const isCurrentDay = isToday(calendarDay.date)

                  return (
                    <div
                      key={index}
                      className={`min-h-[100px] p-2 border rounded-lg transition-colors hover:bg-muted/50 ${
                        !calendarDay.isCurrentMonth ? "opacity-40" : ""
                      } ${isCurrentDay ? "bg-primary/10 border-primary" : "border-border"}`}
                    >
                      <div className={`text-sm font-medium mb-1 ${isCurrentDay ? "text-primary" : ""}`}>
                        {calendarDay.day}
                      </div>
                      <div className="space-y-1">
                        {dayEvents.slice(0, 2).map((event) => (
                          <div
                            key={event.id}
                            className={`text-xs p-1 rounded text-center cursor-pointer hover:opacity-80 ${getEventTypeColor(
                              event.type,
                            )}`}
                          >
                            {event.title.length > 15 ? `${event.title.substring(0, 15)}...` : event.title}
                          </div>
                        ))}
                        {dayEvents.length > 2 && (
                          <div className="text-xs text-muted-foreground text-center">+{dayEvents.length - 2} khác</div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Legend */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Chú thích</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <span className="text-sm">Deadline</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-600" />
                <span className="text-sm">Họp</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-green-600" />
                <span className="text-sm">Milestone</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-purple-600" />
                <span className="text-sm">Review</span>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Sự kiện sắp tới</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="space-y-2 p-3 rounded-lg border">
                  <div className="flex items-start gap-2">
                    {getEventIcon(event.type)}
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{event.title}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(event.date).toLocaleDateString("vi-VN")}</span>
                        {event.time && (
                          <>
                            <Clock className="h-3 w-3" />
                            <span>{event.time}</span>
                          </>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <FolderOpen className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{event.project}</span>
                      </div>
                      {event.assignee && (
                        <div className="flex items-center gap-1">
                          <Avatar className="h-4 w-4">
                            <AvatarFallback className="text-xs">
                              {event.assignee
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-muted-foreground">{event.assignee}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <Badge className={getEventTypeColor(event.type)}>{event.type}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
