"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, AlertTriangle, Users, TrendingUp, Calendar, Target, Activity } from "lucide-react"

const statsCards = [
  {
    title: "Tổng công việc",
    value: "45",
    change: "+12%",
    changeType: "increase" as const,
    icon: CheckCircle,
    color: "text-blue-600",
  },
  {
    title: "Đang thực hiện",
    value: "12",
    change: "+3",
    changeType: "increase" as const,
    icon: Clock,
    color: "text-orange-600",
  },
  {
    title: "Hoàn thành",
    value: "28",
    change: "+8",
    changeType: "increase" as const,
    icon: Target,
    color: "text-green-600",
  },
  {
    title: "Quá hạn",
    value: "5",
    change: "-2",
    changeType: "decrease" as const,
    icon: AlertTriangle,
    color: "text-red-600",
  },
]

const projectProgress = [
  {
    name: "Website Redesign",
    progress: 75,
    status: "Đang thực hiện",
    dueDate: "15/01/2024",
    team: 4,
  },
  {
    name: "Mobile App",
    progress: 45,
    status: "Đang thực hiện",
    dueDate: "28/01/2024",
    team: 6,
  },
  {
    name: "Marketing Campaign",
    progress: 90,
    status: "Gần hoàn thành",
    dueDate: "10/01/2024",
    team: 3,
  },
  {
    name: "Database Migration",
    progress: 30,
    status: "Bắt đầu",
    dueDate: "05/02/2024",
    team: 2,
  },
]

const recentTasks = [
  {
    title: "Thiết kế giao diện trang chủ",
    project: "Website Redesign",
    assignee: "Nguyễn Văn B",
    priority: "Cao",
    status: "Hoàn thành",
    time: "2 giờ trước",
  },
  {
    title: "Tối ưu database queries",
    project: "Performance",
    assignee: "Trần Thị C",
    priority: "Trung bình",
    status: "Đang thực hiện",
    time: "4 giờ trước",
  },
  {
    title: "Viết unit tests",
    project: "Mobile App",
    assignee: "Lê Văn D",
    priority: "Thấp",
    status: "Chờ xử lý",
    time: "1 ngày trước",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "Hoàn thành":
      return "bg-green-100 text-green-800"
    case "Đang thực hiện":
      return "bg-blue-100 text-blue-800"
    case "Chờ xử lý":
      return "bg-yellow-100 text-yellow-800"
    case "Gần hoàn thành":
      return "bg-purple-100 text-purple-800"
    case "Bắt đầu":
      return "bg-gray-100 text-gray-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "Cao":
      return "bg-red-100 text-red-800"
    case "Trung bình":
      return "bg-yellow-100 text-yellow-800"
    case "Thấp":
      return "bg-green-100 text-green-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp
                  className={`mr-1 h-3 w-3 ${stat.changeType === "increase" ? "text-green-600" : "text-red-600"}`}
                />
                <span className={stat.changeType === "increase" ? "text-green-600" : "text-red-600"}>
                  {stat.change}
                </span>
                <span className="ml-1">so với tháng trước</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Project Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Tiến độ dự án
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {projectProgress.map((project) => (
              <div key={project.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{project.name}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{project.dueDate}</span>
                      <Users className="h-3 w-3 ml-2" />
                      <span>{project.team} thành viên</span>
                    </div>
                  </div>
                  <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Tiến độ</span>
                    <span>{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Hoạt động gần đây
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentTasks.map((task, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">{task.title}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{task.project}</span>
                    <span>•</span>
                    <span>{task.assignee}</span>
                    <span>•</span>
                    <span>{task.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(task.status)} variant="secondary">
                      {task.status}
                    </Badge>
                    <Badge className={getPriorityColor(task.priority)} variant="secondary">
                      {task.priority}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Weekly Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Biểu đồ hoạt động tuần
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-7 gap-2 text-center text-xs text-muted-foreground">
              <div>T2</div>
              <div>T3</div>
              <div>T4</div>
              <div>T5</div>
              <div>T6</div>
              <div>T7</div>
              <div>CN</div>
            </div>
            <div className="grid grid-cols-7 gap-2 h-32">
              {[8, 12, 6, 15, 10, 4, 2].map((value, index) => (
                <div key={index} className="flex flex-col justify-end">
                  <div
                    className="bg-primary rounded-t-sm transition-all hover:bg-primary/80"
                    style={{ height: `${(value / 15) * 100}%` }}
                  />
                  <div className="text-xs text-center mt-1 text-muted-foreground">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
