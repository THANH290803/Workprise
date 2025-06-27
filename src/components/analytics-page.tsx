"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart3,
  TrendingUp,
  Calendar,
  Clock,
  Target,
  AlertTriangle,
  Download,
  Activity,
  DollarSign,
  Users,
  CheckCircle2,
  XCircle,
  Zap,
  Info,
} from "lucide-react"

// Enhanced project data with detailed progress tracking
const projectsData = [
  {
    id: "website-redesign",
    name: "Website Redesign",
    status: "Đang thực hiện",
    startDate: "2023-12-01",
    endDate: "2024-02-15",
    currentDate: "2024-01-15",
    budget: 50000000,
    spent: 32000000,
    progress: {
      planned: 75,
      actual: 68,
    },
    phases: [
      { name: "Research & Planning", planned: 100, actual: 100, startDate: "2023-12-01", endDate: "2023-12-15" },
      { name: "Design", planned: 100, actual: 95, startDate: "2023-12-16", endDate: "2024-01-10" },
      { name: "Development", planned: 60, actual: 45, startDate: "2024-01-11", endDate: "2024-02-05" },
      { name: "Testing & Launch", planned: 0, actual: 0, startDate: "2024-02-06", endDate: "2024-02-15" },
    ],
    tasks: {
      total: 24,
      completed: 16,
      inProgress: 5,
      blocked: 1,
      overdue: 2,
    },
    team: {
      assigned: 6,
      active: 5,
      utilization: 85,
    },
    milestones: [
      { name: "Design Approval", date: "2024-01-10", status: "completed" },
      { name: "MVP Development", date: "2024-01-25", status: "at-risk" },
      { name: "Beta Testing", date: "2024-02-08", status: "upcoming" },
      { name: "Go Live", date: "2024-02-15", status: "upcoming" },
    ],
    risks: [
      { level: "medium", description: "Design review delays", impact: "2 days" },
      { level: "low", description: "Third-party API integration", impact: "1 day" },
    ],
    burndownData: {
      totalTasks: 24,
      weeklyData: [
        {
          week: "Tuần 1",
          date: "01/12 - 07/12",
          plannedRemaining: 22,
          actualRemaining: 23,
          plannedCompleted: 2,
          actualCompleted: 1,
          velocity: 1,
        },
        {
          week: "Tuần 2",
          date: "08/12 - 14/12",
          plannedRemaining: 19,
          actualRemaining: 20,
          plannedCompleted: 5,
          actualCompleted: 4,
          velocity: 3,
        },
        {
          week: "Tuần 3",
          date: "15/12 - 21/12",
          plannedRemaining: 16,
          actualRemaining: 18,
          plannedCompleted: 8,
          actualCompleted: 6,
          velocity: 2,
        },
        {
          week: "Tuần 4",
          date: "22/12 - 28/12",
          plannedRemaining: 12,
          actualRemaining: 15,
          plannedCompleted: 12,
          actualCompleted: 9,
          velocity: 3,
        },
        {
          week: "Tuần 5",
          date: "29/12 - 04/01",
          plannedRemaining: 8,
          actualRemaining: 12,
          plannedCompleted: 16,
          actualCompleted: 12,
          velocity: 3,
        },
        {
          week: "Tuần 6",
          date: "05/01 - 11/01",
          plannedRemaining: 6,
          actualRemaining: 8,
          plannedCompleted: 18,
          actualCompleted: 16,
          velocity: 4,
        },
      ],
      projectedCompletion: "2024-02-20",
      originalCompletion: "2024-02-15",
      averageVelocity: 2.7,
      currentVelocity: 4,
    },
  },
  {
    id: "mobile-app",
    name: "Mobile App Development",
    status: "Đang thực hiện",
    startDate: "2024-01-15",
    endDate: "2024-03-30",
    currentDate: "2024-01-15",
    budget: 80000000,
    spent: 15000000,
    progress: {
      planned: 25,
      actual: 20,
    },
    phases: [
      { name: "Requirements Analysis", planned: 100, actual: 100, startDate: "2024-01-15", endDate: "2024-01-25" },
      { name: "UI/UX Design", planned: 80, actual: 70, startDate: "2024-01-26", endDate: "2024-02-15" },
      { name: "Development", planned: 0, actual: 0, startDate: "2024-02-16", endDate: "2024-03-20" },
      { name: "Testing & Deployment", planned: 0, actual: 0, startDate: "2024-03-21", endDate: "2024-03-30" },
    ],
    tasks: {
      total: 18,
      completed: 3,
      inProgress: 4,
      blocked: 0,
      overdue: 1,
    },
    team: {
      assigned: 4,
      active: 4,
      utilization: 90,
    },
    milestones: [
      { name: "Requirements Sign-off", date: "2024-01-25", status: "completed" },
      { name: "Design Prototype", date: "2024-02-10", status: "in-progress" },
      { name: "Alpha Release", date: "2024-03-05", status: "upcoming" },
      { name: "App Store Release", date: "2024-03-30", status: "upcoming" },
    ],
    risks: [
      { level: "high", description: "React Native version compatibility", impact: "5 days" },
      { level: "medium", description: "App store approval process", impact: "3 days" },
    ],
    burndownData: {
      totalTasks: 18,
      weeklyData: [
        {
          week: "Tuần 1",
          date: "15/01 - 21/01",
          plannedRemaining: 16,
          actualRemaining: 17,
          plannedCompleted: 2,
          actualCompleted: 1,
          velocity: 1,
        },
        {
          week: "Tuần 2",
          date: "22/01 - 28/01",
          plannedRemaining: 14,
          actualRemaining: 15,
          plannedCompleted: 4,
          actualCompleted: 3,
          velocity: 2,
        },
      ],
      projectedCompletion: "2024-04-05",
      originalCompletion: "2024-03-30",
      averageVelocity: 1.5,
      currentVelocity: 2,
    },
  },
  {
    id: "marketing-campaign",
    name: "Marketing Campaign Q1",
    status: "Gần hoàn thành",
    startDate: "2024-01-01",
    endDate: "2024-03-31",
    currentDate: "2024-01-15",
    budget: 30000000,
    spent: 25000000,
    progress: {
      planned: 85,
      actual: 90,
    },
    phases: [
      { name: "Strategy & Planning", planned: 100, actual: 100, startDate: "2024-01-01", endDate: "2024-01-10" },
      { name: "Content Creation", planned: 100, actual: 100, startDate: "2024-01-11", endDate: "2024-01-25" },
      { name: "Campaign Execution", planned: 80, actual: 85, startDate: "2024-01-26", endDate: "2024-03-15" },
      { name: "Analysis & Reporting", planned: 0, actual: 0, startDate: "2024-03-16", endDate: "2024-03-31" },
    ],
    tasks: {
      total: 12,
      completed: 10,
      inProgress: 2,
      blocked: 0,
      overdue: 0,
    },
    team: {
      assigned: 3,
      active: 3,
      utilization: 95,
    },
    milestones: [
      { name: "Campaign Strategy", date: "2024-01-10", status: "completed" },
      { name: "Content Library", date: "2024-01-25", status: "completed" },
      { name: "Campaign Launch", date: "2024-02-01", status: "completed" },
      { name: "Mid-campaign Review", date: "2024-02-15", status: "upcoming" },
    ],
    risks: [{ level: "low", description: "Seasonal market changes", impact: "1 day" }],
    burndownData: {
      totalTasks: 12,
      weeklyData: [
        {
          week: "Tuần 1",
          date: "01/01 - 07/01",
          plannedRemaining: 10,
          actualRemaining: 9,
          plannedCompleted: 2,
          actualCompleted: 3,
          velocity: 3,
        },
        {
          week: "Tuần 2",
          date: "08/01 - 14/01",
          plannedRemaining: 8,
          actualRemaining: 6,
          plannedCompleted: 4,
          actualCompleted: 6,
          velocity: 3,
        },
        {
          week: "Tuần 3",
          date: "15/01 - 21/01",
          plannedRemaining: 6,
          actualRemaining: 4,
          plannedCompleted: 6,
          actualCompleted: 8,
          velocity: 2,
        },
        {
          week: "Tuần 4",
          date: "22/01 - 28/01",
          plannedRemaining: 4,
          actualRemaining: 3,
          plannedCompleted: 8,
          actualCompleted: 9,
          velocity: 1,
        },
        {
          week: "Tuần 5",
          date: "29/01 - 04/02",
          plannedRemaining: 2,
          actualRemaining: 2,
          plannedCompleted: 10,
          actualCompleted: 10,
          velocity: 1,
        },
      ],
      projectedCompletion: "2024-03-25",
      originalCompletion: "2024-03-31",
      averageVelocity: 2.0,
      currentVelocity: 1,
    },
  },
]

const getRiskColor = (level: string) => {
  switch (level) {
    case "high":
      return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
    case "medium":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
    case "low":
      return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
  }
}

const getMilestoneColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
    case "in-progress":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
    case "at-risk":
      return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
    case "upcoming":
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
  }
}

const getProjectHealthScore = (project: any) => {
  const progressDiff = project.progress.actual - project.progress.planned
  const budgetUtilization = (project.spent / project.budget) * 100
  const taskCompletionRate = (project.tasks.completed / project.tasks.total) * 100

  let score = 100

  // Progress variance
  if (progressDiff < -10) score -= 30
  else if (progressDiff < -5) score -= 15
  else if (progressDiff > 5) score += 10

  // Budget control
  if (budgetUtilization > 90) score -= 20
  else if (budgetUtilization > 80) score -= 10

  // Task management
  if (project.tasks.blocked > 0) score -= 15
  if (project.tasks.overdue > 2) score -= 20
  else if (project.tasks.overdue > 0) score -= 10

  // Risk assessment
  const highRisks = project.risks.filter((r: any) => r.level === "high").length
  const mediumRisks = project.risks.filter((r: any) => r.level === "medium").length
  score -= highRisks * 15 + mediumRisks * 8

  return Math.max(0, Math.min(100, score))
}

const getHealthColor = (score: number) => {
  if (score >= 80) return "text-green-600"
  if (score >= 60) return "text-yellow-600"
  return "text-red-600"
}

export function AnalyticsPage() {
  const [selectedProject, setSelectedProject] = useState("all")
  const [timeRange, setTimeRange] = useState("30days")

  const filteredProjects =
    selectedProject === "all" ? projectsData : projectsData.filter((p) => p.id === selectedProject)

  // Calculate overall statistics
  const overallStats = {
    totalProjects: projectsData.length,
    onTrack: projectsData.filter((p) => p.progress.actual >= p.progress.planned - 5).length,
    atRisk: projectsData.filter((p) => p.progress.actual < p.progress.planned - 5).length,
    avgProgress: Math.round(projectsData.reduce((acc, p) => acc + p.progress.actual, 0) / projectsData.length),
    totalBudget: projectsData.reduce((acc, p) => acc + p.budget, 0),
    totalSpent: projectsData.reduce((acc, p) => acc + p.spent, 0),
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Thống kê tiến độ dự án</h2>
          <p className="text-muted-foreground">Theo dõi chi tiết tiến độ và hiệu suất các dự án</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedProject} onValueChange={setSelectedProject}>
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả dự án</SelectItem>
              {projectsData.map((project) => (
                <SelectItem key={project.id} value={project.id}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">7 ngày</SelectItem>
              <SelectItem value="30days">30 ngày</SelectItem>
              <SelectItem value="90days">90 ngày</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Xuất báo cáo
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Target className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{overallStats.totalProjects}</p>
                <p className="text-xs text-muted-foreground">Tổng dự án</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xs text-green-600">{overallStats.onTrack} đúng tiến độ</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Activity className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{overallStats.avgProgress}%</p>
                <p className="text-xs text-muted-foreground">Tiến độ trung bình</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600">+5% so với tháng trước</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <DollarSign className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">
                  {Math.round((overallStats.totalSpent / overallStats.totalBudget) * 100)}%
                </p>
                <p className="text-xs text-muted-foreground">Ngân sách sử dụng</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xs text-muted-foreground">
                    {(overallStats.totalSpent / 1000000).toFixed(0)}M /{" "}
                    {(overallStats.totalBudget / 1000000).toFixed(0)}M VNĐ
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-2xl font-bold">{overallStats.atRisk}</p>
                <p className="text-xs text-muted-foreground">Dự án có rủi ro</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xs text-red-600">Cần theo dõi sát</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="progress">Tiến độ chi tiết</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="resources">Tài nguyên</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Project Health Dashboard */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Tình trạng dự án
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredProjects.map((project) => {
                  const healthScore = getProjectHealthScore(project)
                  const getHealthStatus = (score: number) => {
                    if (score >= 80) return { label: "Tốt", color: "text-green-600" }
                    if (score >= 60) return { label: "Ổn định", color: "text-yellow-600" }
                    return { label: "Cần chú ý", color: "text-red-600" }
                  }
                  const healthStatus = getHealthStatus(healthScore)

                  return (
                    <div key={project.id} className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="space-y-1">
                        <p className="font-medium">{project.name}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Badge variant="secondary">{project.status}</Badge>
                          <span>•</span>
                          <span>{project.progress.actual}% hoàn thành</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-lg font-bold ${healthStatus.color}`}>{healthStatus.label}</p>
                        <p className="text-xs text-muted-foreground">Điểm: {healthScore}/100</p>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tiến độ so với kế hoạch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredProjects.map((project) => (
                  <div key={project.id} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{project.name}</span>
                      <div className="text-sm text-muted-foreground">
                        {project.progress.actual}% / {project.progress.planned}%
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Kế hoạch</span>
                        <span>{project.progress.planned}%</span>
                      </div>
                      <Progress value={project.progress.planned} className="h-2 bg-gray-200" />
                      <div className="flex justify-between text-xs">
                        <span>Thực tế</span>
                        <span
                          className={
                            project.progress.actual >= project.progress.planned ? "text-green-600" : "text-red-600"
                          }
                        >
                          {project.progress.actual}%
                        </span>
                      </div>
                      <Progress
                        value={project.progress.actual}
                        className={`h-2 ${project.progress.actual >= project.progress.planned ? "" : "bg-red-100"}`}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Burndown Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Biểu đồ Burndown - Theo dõi công việc còn lại
              </CardTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Info className="h-4 w-4" />
                <span>Biểu đồ hiển thị số lượng công việc còn lại theo thời gian so với kế hoạch ban đầu</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {filteredProjects.map((project) => (
                  <div key={project.id} className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-semibold">{project.name}</h4>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-blue-500 rounded"></div>
                          <span>Kế hoạch</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-red-500 rounded"></div>
                          <span>Thực tế</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-gray-300 rounded"></div>
                          <span>Dự báo</span>
                        </div>
                      </div>
                    </div>

                    {/* Burndown Chart */}
                    <div className="relative">
                      <div className="h-80 border-l-2 border-b-2 border-gray-300 relative">
                        {/* Y-axis labels */}
                        <div className="absolute -left-8 top-0 text-xs text-muted-foreground">
                          {project.burndownData.totalTasks}
                        </div>
                        <div className="absolute -left-4 top-1/2 text-xs text-muted-foreground">
                          {Math.round(project.burndownData.totalTasks / 2)}
                        </div>
                        <div className="absolute -left-2 bottom-0 text-xs text-muted-foreground">0</div>

                        {/* Grid lines */}
                        <div className="absolute inset-0 grid grid-rows-4 opacity-20">
                          {[...Array(4)].map((_, i) => (
                            <div key={i} className="border-t border-gray-300"></div>
                          ))}
                        </div>

                        {/* Chart content */}
                        <div className="h-full flex items-end justify-between px-4 pb-2">
                          {project.burndownData.weeklyData.map((week, index) => {
                            const maxTasks = project.burndownData.totalTasks
                            const plannedHeight = (week.plannedRemaining / maxTasks) * 100
                            const actualHeight = (week.actualRemaining / maxTasks) * 100

                            return (
                              <div key={index} className="flex flex-col items-center gap-2 flex-1 relative">
                                {/* Planned line point */}
                                <div
                                  className="absolute w-3 h-3 bg-blue-500 rounded-full border-2 border-white shadow-sm"
                                  style={{ bottom: `${plannedHeight}%` }}
                                  title={`Kế hoạch: ${week.plannedRemaining} tasks`}
                                />

                                {/* Actual line point */}
                                <div
                                  className="absolute w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow-sm"
                                  style={{ bottom: `${actualHeight}%` }}
                                  title={`Thực tế: ${week.actualRemaining} tasks`}
                                />

                                {/* Connect lines */}
                                {index > 0 && (
                                  <>
                                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                                      <line
                                        x1="0"
                                        y1={`${100 - (project.burndownData.weeklyData[index - 1].plannedRemaining / maxTasks) * 100}%`}
                                        x2="100%"
                                        y2={`${100 - plannedHeight}%`}
                                        stroke="#3b82f6"
                                        strokeWidth="2"
                                      />
                                      <line
                                        x1="0"
                                        y1={`${100 - (project.burndownData.weeklyData[index - 1].actualRemaining / maxTasks) * 100}%`}
                                        x2="100%"
                                        y2={`${100 - actualHeight}%`}
                                        stroke="#ef4444"
                                        strokeWidth="2"
                                      />
                                    </svg>
                                  </>
                                )}

                                {/* Week label */}
                                <div className="absolute -bottom-8 text-xs text-center text-muted-foreground w-16">
                                  <div className="font-medium">{week.week}</div>
                                  <div className="text-xs">{week.date}</div>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>

                      {/* X-axis label */}
                      <div className="text-center mt-12 text-sm text-muted-foreground">Thời gian (Tuần)</div>
                      <div className="absolute -left-16 top-1/2 -rotate-90 text-sm text-muted-foreground">
                        Công việc còn lại
                      </div>
                    </div>

                    {/* Project Statistics */}
                    <div className="grid gap-4 md:grid-cols-4 p-4 bg-muted/50 rounded-lg">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">{project.burndownData.totalTasks}</p>
                        <p className="text-sm text-muted-foreground">Tổng công việc</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">{project.tasks.completed}</p>
                        <p className="text-sm text-muted-foreground">Đã hoàn thành</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-orange-600">{project.burndownData.currentVelocity}</p>
                        <p className="text-sm text-muted-foreground">Velocity hiện tại</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-purple-600">{project.burndownData.averageVelocity}</p>
                        <p className="text-sm text-muted-foreground">Velocity trung bình</p>
                      </div>
                    </div>

                    {/* Completion Prediction */}
                    <div className="p-4 border rounded-lg">
                      <h5 className="font-semibold mb-2">Dự báo hoàn thành</h5>
                      <div className="grid gap-2 md:grid-cols-2">
                        <div className="flex justify-between">
                          <span>Kế hoạch ban đầu:</span>
                          <span className="font-medium">{project.burndownData.originalCompletion}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Dự báo hiện tại:</span>
                          <span
                            className={`font-medium ${
                              new Date(project.burndownData.projectedCompletion) >
                              new Date(project.burndownData.originalCompletion)
                                ? "text-red-600"
                                : "text-green-600"
                            }`}
                          >
                            {project.burndownData.projectedCompletion}
                          </span>
                        </div>
                      </div>
                      {new Date(project.burndownData.projectedCompletion) >
                        new Date(project.burndownData.originalCompletion) && (
                        <div className="mt-2 p-2 bg-red-50 text-red-800 rounded text-sm">
                          ⚠️ Dự án có thể bị trễ{" "}
                          {Math.ceil(
                            (new Date(project.burndownData.projectedCompletion).getTime() -
                              new Date(project.burndownData.originalCompletion).getTime()) /
                              (1000 * 60 * 60 * 24),
                          )}{" "}
                          ngày
                        </div>
                      )}
                    </div>

                    {/* Weekly Velocity Table */}
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2">Tuần</th>
                            <th className="text-center p-2">Kế hoạch hoàn thành</th>
                            <th className="text-center p-2">Thực tế hoàn thành</th>
                            <th className="text-center p-2">Velocity</th>
                            <th className="text-center p-2">Còn lại (KH)</th>
                            <th className="text-center p-2">Còn lại (TT)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {project.burndownData.weeklyData.map((week, index) => (
                            <tr key={index} className="border-b hover:bg-muted/50">
                              <td className="p-2 font-medium">{week.week}</td>
                              <td className="text-center p-2">{week.plannedCompleted}</td>
                              <td className="text-center p-2">{week.actualCompleted}</td>
                              <td className="text-center p-2">
                                <Badge
                                  variant={
                                    week.velocity >= 3 ? "default" : week.velocity >= 2 ? "secondary" : "destructive"
                                  }
                                >
                                  {week.velocity}
                                </Badge>
                              </td>
                              <td className="text-center p-2">{week.plannedRemaining}</td>
                              <td className="text-center p-2">
                                <span
                                  className={
                                    week.actualRemaining > week.plannedRemaining ? "text-red-600" : "text-green-600"
                                  }
                                >
                                  {week.actualRemaining}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          {/* Detailed Progress by Phase */}
          {filteredProjects.map((project) => (
            <Card key={project.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{project.name}</span>
                  <Badge variant="secondary">{project.status}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Ngân sách</p>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Đã sử dụng</span>
                        <span>{((project.spent / project.budget) * 100).toFixed(1)}%</span>
                      </div>
                      <Progress value={(project.spent / project.budget) * 100} className="h-2" />
                      <p className="text-xs text-muted-foreground">
                        {(project.spent / 1000000).toFixed(1)}M / {(project.budget / 1000000).toFixed(1)}M VNĐ
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Công việc</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex justify-between">
                        <span>Hoàn thành:</span>
                        <span className="font-medium text-green-600">{project.tasks.completed}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Đang làm:</span>
                        <span className="font-medium text-blue-600">{project.tasks.inProgress}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Bị chặn:</span>
                        <span className="font-medium text-red-600">{project.tasks.blocked}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Quá hạn:</span>
                        <span className="font-medium text-orange-600">{project.tasks.overdue}</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Nhóm</p>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Thành viên:</span>
                        <span className="font-medium">{project.team.assigned}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Đang hoạt động:</span>
                        <span className="font-medium">{project.team.active}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tỷ lệ sử dụng:</span>
                        <span className="font-medium">{project.team.utilization}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Tiến độ theo giai đoạn</h4>
                  {project.phases.map((phase, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{phase.name}</span>
                        <div className="text-sm text-muted-foreground">
                          {phase.actual}% / {phase.planned}%
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Progress value={phase.planned} className="h-2 bg-gray-200" />
                        <Progress
                          value={phase.actual}
                          className={`h-2 ${phase.actual >= phase.planned ? "" : "bg-red-100"}`}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{phase.startDate}</span>
                        <span>{phase.endDate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="timeline" className="space-y-6">
          {/* Milestones and Timeline */}
          {filteredProjects.map((project) => (
            <Card key={project.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  {project.name} - Timeline & Milestones
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="font-semibold mb-3">Milestones</h4>
                    <div className="space-y-3">
                      {project.milestones.map((milestone, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 rounded-lg border">
                          <div className="flex-shrink-0">
                            {milestone.status === "completed" ? (
                              <CheckCircle2 className="h-5 w-5 text-green-600" />
                            ) : milestone.status === "at-risk" ? (
                              <XCircle className="h-5 w-5 text-red-600" />
                            ) : (
                              <Clock className="h-5 w-5 text-gray-400" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{milestone.name}</p>
                            <p className="text-sm text-muted-foreground">{milestone.date}</p>
                          </div>
                          <Badge className={getMilestoneColor(milestone.status)}>{milestone.status}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Rủi ro & Vấn đề</h4>
                    <div className="space-y-3">
                      {project.risks.map((risk, index) => (
                        <div key={index} className="p-3 rounded-lg border">
                          <div className="flex items-start justify-between mb-2">
                            <Badge className={getRiskColor(risk.level)}>{risk.level}</Badge>
                            <span className="text-sm text-muted-foreground">Ảnh hưởng: {risk.impact}</span>
                          </div>
                          <p className="text-sm">{risk.description}</p>
                        </div>
                      ))}
                      {project.risks.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                          <CheckCircle2 className="h-8 w-8 mx-auto mb-2 text-green-600" />
                          <p>Không có rủi ro nào được xác định</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Gantt-style Timeline */}
                <div>
                  <h4 className="font-semibold mb-3">Timeline Giai đoạn</h4>
                  <div className="space-y-2">
                    {project.phases.map((phase, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="w-32 text-sm font-medium truncate">{phase.name}</div>
                        <div className="flex-1 relative h-8 bg-gray-100 rounded">
                          <div
                            className="absolute top-0 left-0 h-full bg-blue-200 rounded"
                            style={{ width: `${phase.planned}%` }}
                          />
                          <div
                            className={`absolute top-0 left-0 h-full rounded ${
                              phase.actual >= phase.planned ? "bg-green-500" : "bg-red-500"
                            }`}
                            style={{ width: `${Math.min(phase.actual, 100)}%` }}
                          />
                          <div className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                            {phase.actual}%
                          </div>
                        </div>
                        <div className="w-24 text-xs text-muted-foreground">{phase.startDate}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          {/* Resource Allocation */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Phân bổ nhân lực
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredProjects.map((project) => (
                  <div key={project.id} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{project.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {project.team.active}/{project.team.assigned} thành viên
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Tỷ lệ sử dụng</span>
                        <span>{project.team.utilization}%</span>
                      </div>
                      <Progress value={project.team.utilization} className="h-2" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Phân bổ ngân sách
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredProjects.map((project) => (
                  <div key={project.id} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{project.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {(project.spent / 1000000).toFixed(1)}M / {(project.budget / 1000000).toFixed(1)}M VNĐ
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Đã sử dụng</span>
                        <span>{((project.spent / project.budget) * 100).toFixed(1)}%</span>
                      </div>
                      <Progress value={(project.spent / project.budget) * 100} className="h-2" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Budget vs Progress Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Phân tích Ngân sách vs Tiến độ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {filteredProjects.map((project) => {
                  const budgetUsed = (project.spent / project.budget) * 100
                  const progressActual = project.progress.actual
                  const efficiency = progressActual / budgetUsed

                  return (
                    <div key={project.id} className="p-4 rounded-lg border">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-semibold">{project.name}</h4>
                        <Badge variant={efficiency >= 1 ? "default" : "destructive"}>
                          {efficiency >= 1 ? "Hiệu quả" : "Cần cải thiện"}
                        </Badge>
                      </div>
                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-blue-600">{budgetUsed.toFixed(1)}%</p>
                          <p className="text-sm text-muted-foreground">Ngân sách sử dụng</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-green-600">{progressActual}%</p>
                          <p className="text-sm text-muted-foreground">Tiến độ thực tế</p>
                        </div>
                        <div className="text-center">
                          <p className={`text-2xl font-bold ${efficiency >= 1 ? "text-green-600" : "text-red-600"}`}>
                            {efficiency.toFixed(2)}
                          </p>
                          <p className="text-sm text-muted-foreground">Chỉ số hiệu quả</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
