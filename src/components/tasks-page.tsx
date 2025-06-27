"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  CheckSquare,
  Clock,
  AlertTriangle,
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  Calendar,
  Flag,
  FolderOpen,
  Eye,
  Edit,
  Trash2,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Activity,
} from "lucide-react"

// Sample tasks data
const allTasks = [
  {
    id: "TSK-001",
    title: "Thiết kế wireframe cho trang sản phẩm",
    description: "Tạo wireframe chi tiết cho trang hiển thị sản phẩm với đầy đủ các thành phần UI",
    project: "Website Redesign",
    projectId: "website-redesign",
    status: "Cần làm",
    priority: "Cao",
    assignee: {
      name: "Nguyễn Văn A",
      avatar: "/placeholder.svg?height=32&width=32",
      email: "nguyen.van.a@company.com",
    },
    reporter: {
      name: "Trần Thị B",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    dueDate: "2024-01-15",
    createdDate: "2024-01-05",
    estimatedHours: 8,
    tags: ["Design", "UI/UX", "Wireframe"],
  },
  {
    id: "TSK-002",
    title: "Phát triển API authentication",
    description: "Tích hợp API đăng nhập và xác thực người dùng cho mobile app",
    project: "Mobile App",
    projectId: "mobile-app",
    status: "Đang thực hiện",
    priority: "Cao",
    assignee: {
      name: "Bùi Thị H",
      avatar: "/placeholder.svg?height=32&width=32",
      email: "bui.thi.h@company.com",
    },
    reporter: {
      name: "Lê Văn C",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    dueDate: "2024-01-25",
    createdDate: "2024-01-10",
    estimatedHours: 16,
    tags: ["Backend", "API", "Authentication"],
  },
  {
    id: "TSK-003",
    title: "Thiết kế banner quảng cáo",
    description: "Tạo banner cho chiến dịch marketing Q1 2024",
    project: "Marketing Campaign",
    projectId: "marketing-campaign",
    status: "Đang thực hiện",
    priority: "Trung bình",
    assignee: {
      name: "Vũ Thị F",
      avatar: "/placeholder.svg?height=32&width=32",
      email: "vu.thi.f@company.com",
    },
    reporter: {
      name: "Phạm Thị D",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    dueDate: "2024-01-20",
    createdDate: "2024-01-08",
    estimatedHours: 6,
    tags: ["Design", "Marketing", "Banner"],
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "Hoàn thành":
      return "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400"
    case "Đang thực hiện":
      return "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400"
    case "Đang xem xét":
      return "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400"
    case "Cần làm":
      return "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300"
    case "Quá hạn":
      return "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400"
    default:
      return "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300"
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "Cao":
      return "text-red-600 dark:text-red-400"
    case "Trung bình":
      return "text-amber-600 dark:text-amber-400"
    case "Thấp":
      return "text-emerald-600 dark:text-emerald-400"
    default:
      return "text-slate-600 dark:text-slate-400"
  }
}

const getPriorityIcon = (priority: string) => {
  switch (priority) {
    case "Cao":
      return <Flag className="h-3 w-3 text-red-600 dark:text-red-400 fill-current" />
    case "Trung bình":
      return <Flag className="h-3 w-3 text-amber-600 dark:text-amber-400 fill-current" />
    case "Thấp":
      return <Flag className="h-3 w-3 text-emerald-600 dark:text-emerald-400 fill-current" />
    default:
      return <Flag className="h-3 w-3 text-slate-600 dark:text-slate-400" />
  }
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString("vi-VN")
}

const isOverdue = (dueDate: string, status: string) => {
  if (status === "Hoàn thành") return false
  const today = new Date()
  const due = new Date(dueDate)
  return due < today
}

export function TasksPage() {
  const router = useRouter()
  const [tasks, setTasks] = useState(allTasks)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [projectFilter, setProjectFilter] = useState("all")
  const [sortBy, setSortBy] = useState("dueDate")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  // Get unique values for filters
  const uniqueStatuses = [...new Set(allTasks.map((task) => task.status))]
  const uniquePriorities = [...new Set(allTasks.map((task) => task.priority))]
  const uniqueProjects = [...new Set(allTasks.map((task) => task.project))]

  // Filter and search tasks
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.assignee.name.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || task.status === statusFilter
    const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter
    const matchesProject = projectFilter === "all" || task.project === projectFilter

    return matchesSearch && matchesStatus && matchesPriority && matchesProject
  })

  // Sort tasks
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    let aValue: any = a[sortBy as keyof typeof a]
    let bValue: any = b[sortBy as keyof typeof b]

    if (sortBy === "assignee") {
      aValue = a.assignee.name
      bValue = b.assignee.name
    }

    if (typeof aValue === "string") {
      aValue = aValue.toLowerCase()
      bValue = bValue.toLowerCase()
    }

    if (sortOrder === "asc") {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  // Pagination
  const totalPages = Math.ceil(sortedTasks.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedTasks = sortedTasks.slice(startIndex, startIndex + itemsPerPage)

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortOrder("asc")
    }
  }

  const clearFilters = () => {
    setSearchTerm("")
    setStatusFilter("all")
    setPriorityFilter("all")
    setProjectFilter("all")
    setCurrentPage(1)
  }

  const handleCreateTask = () => {
    router.push("/tasks/create")
  }

  const handleViewTask = (taskId: string) => {
    console.log("🔍 Navigating to view task:", taskId)
    setOpenDropdown(null)
    router.push(`/tasks/${taskId}/details`)
  }

  const handleEditTask = (taskId: string) => {
    console.log("✏️ Navigating to edit task:", taskId)
    setOpenDropdown(null)
    router.push(`/tasks/${taskId}/edit`)
  }

  const handleDeleteTask = (task: any) => {
    console.log("🗑️ Delete task:", task.id)
    setOpenDropdown(null)
    if (confirm(`Bạn có chắc chắn muốn xóa công việc "${task.title}" không?`)) {
      setTasks((prev) => prev.filter((t) => t.id !== task.id))
    }
  }

  const toggleDropdown = (taskId: string, event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    console.log("🎯 Toggle dropdown for task:", taskId)
    setOpenDropdown(openDropdown === taskId ? null : taskId)
  }

  // Stats
  const stats = {
    total: tasks.length,
    todo: tasks.filter((t) => t.status === "Cần làm").length,
    inProgress: tasks.filter((t) => t.status === "Đang thực hiện").length,
    review: tasks.filter((t) => t.status === "Đang xem xét").length,
    done: tasks.filter((t) => t.status === "Hoàn thành").length,
    overdue: tasks.filter((t) => isOverdue(t.dueDate, t.status)).length,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="space-y-8 p-8">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              Quản lý công việc
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">Xem và quản lý tất cả công việc từ mọi dự án</p>
          </div>
          <Button
            onClick={handleCreateTask}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 px-6 py-3 text-base font-semibold"
          >
            <Plus className="h-5 w-5 mr-2" />
            Tạo công việc mới
          </Button>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid gap-6 md:grid-cols-6">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold">{stats.total}</p>
                  <p className="text-blue-100 font-medium">Tổng cộng</p>
                </div>
                <div className="bg-white/20 p-3 rounded-full">
                  <CheckSquare className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-slate-500 to-slate-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold">{stats.todo}</p>
                  <p className="text-slate-100 font-medium">Cần làm</p>
                </div>
                <div className="bg-white/20 p-3 rounded-full">
                  <Clock className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold">{stats.inProgress}</p>
                  <p className="text-indigo-100 font-medium">Đang làm</p>
                </div>
                <div className="bg-white/20 p-3 rounded-full">
                  <Activity className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold">{stats.review}</p>
                  <p className="text-purple-100 font-medium">Xem xét</p>
                </div>
                <div className="bg-white/20 p-3 rounded-full">
                  <Eye className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold">{stats.done}</p>
                  <p className="text-emerald-100 font-medium">Hoàn thành</p>
                </div>
                <div className="bg-white/20 p-3 rounded-full">
                  <CheckSquare className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold">{stats.overdue}</p>
                  <p className="text-red-100 font-medium">Quá hạn</p>
                </div>
                <div className="bg-white/20 p-3 rounded-full">
                  <AlertTriangle className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Filters */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              <Filter className="h-5 w-5 text-blue-600" />
              Bộ lọc và tìm kiếm
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[300px]">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                  <Input
                    placeholder="Tìm kiếm công việc, mã số, người thực hiện..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12 text-base border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px] h-12 border-slate-200 focus:border-blue-500">
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả trạng thái</SelectItem>
                  {uniqueStatuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-[180px] h-12 border-slate-200 focus:border-blue-500">
                  <SelectValue placeholder="Độ ưu tiên" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả độ ưu tiên</SelectItem>
                  {uniquePriorities.map((priority) => (
                    <SelectItem key={priority} value={priority}>
                      {priority}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={projectFilter} onValueChange={setProjectFilter}>
                <SelectTrigger className="w-[200px] h-12 border-slate-200 focus:border-blue-500">
                  <SelectValue placeholder="Dự án" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả dự án</SelectItem>
                  {uniqueProjects.map((project) => (
                    <SelectItem key={project} value={project}>
                      {project}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={clearFilters} className="h-12 px-6 border-slate-200 hover:bg-slate-50">
                <Filter className="h-4 w-4 mr-2" />
                Xóa bộ lọc
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Tasks Table */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                Danh sách công việc ({filteredTasks.length} / {tasks.length})
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-xl border border-slate-200 overflow-hidden">
              <Table>
                <TableHeader className="bg-slate-50">
                  <TableRow className="hover:bg-slate-50">
                    <TableHead className="w-[120px] font-semibold">
                      <Button
                        variant="ghost"
                        onClick={() => handleSort("id")}
                        className="h-8 p-0 font-semibold text-slate-700"
                      >
                        Mã số
                        <ArrowUpDown className="ml-2 h-3 w-3" />
                      </Button>
                    </TableHead>
                    <TableHead className="font-semibold">
                      <Button
                        variant="ghost"
                        onClick={() => handleSort("title")}
                        className="h-8 p-0 font-semibold text-slate-700"
                      >
                        Tiêu đề
                        <ArrowUpDown className="ml-2 h-3 w-3" />
                      </Button>
                    </TableHead>
                    <TableHead className="font-semibold">
                      <Button
                        variant="ghost"
                        onClick={() => handleSort("project")}
                        className="h-8 p-0 font-semibold text-slate-700"
                      >
                        Dự án
                        <ArrowUpDown className="ml-2 h-3 w-3" />
                      </Button>
                    </TableHead>
                    <TableHead className="font-semibold">
                      <Button
                        variant="ghost"
                        onClick={() => handleSort("status")}
                        className="h-8 p-0 font-semibold text-slate-700"
                      >
                        Trạng thái
                        <ArrowUpDown className="ml-2 h-3 w-3" />
                      </Button>
                    </TableHead>
                    <TableHead className="font-semibold">
                      <Button
                        variant="ghost"
                        onClick={() => handleSort("priority")}
                        className="h-8 p-0 font-semibold text-slate-700"
                      >
                        Ưu tiên
                        <ArrowUpDown className="ml-2 h-3 w-3" />
                      </Button>
                    </TableHead>
                    <TableHead className="font-semibold">
                      <Button
                        variant="ghost"
                        onClick={() => handleSort("assignee")}
                        className="h-8 p-0 font-semibold text-slate-700"
                      >
                        Người thực hiện
                        <ArrowUpDown className="ml-2 h-3 w-3" />
                      </Button>
                    </TableHead>
                    <TableHead className="font-semibold">
                      <Button
                        variant="ghost"
                        onClick={() => handleSort("dueDate")}
                        className="h-8 p-0 font-semibold text-slate-700"
                      >
                        Hạn chót
                        <ArrowUpDown className="ml-2 h-3 w-3" />
                      </Button>
                    </TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedTasks.map((task, index) => (
                    <TableRow
                      key={task.id}
                      className="hover:bg-blue-50/50 transition-colors duration-150 border-b border-slate-100"
                    >
                      <TableCell className="font-mono text-sm font-medium text-blue-600">{task.id}</TableCell>
                      <TableCell className="max-w-[300px]">
                        <div className="space-y-2">
                          <p className="font-semibold text-slate-900 line-clamp-1">{task.title}</p>
                          <p className="text-sm text-slate-600 line-clamp-2">{task.description}</p>
                          <div className="flex flex-wrap gap-1">
                            {task.tags.slice(0, 2).map((tag) => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="text-xs bg-blue-100 text-blue-700 hover:bg-blue-200"
                              >
                                {tag}
                              </Badge>
                            ))}
                            {task.tags.length > 2 && (
                              <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-600">
                                +{task.tags.length - 2}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="bg-blue-100 p-1.5 rounded-md">
                            <FolderOpen className="h-4 w-4 text-blue-600" />
                          </div>
                          <span className="text-sm font-medium text-slate-700">{task.project}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getStatusColor(task.status)} border font-medium`}>{task.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getPriorityIcon(task.priority)}
                          <span className={`text-sm font-semibold ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8 border-2 border-white shadow-sm">
                            <AvatarImage src={task.assignee.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="text-xs font-semibold bg-gradient-to-br from-blue-500 to-indigo-500 text-white">
                              {task.assignee.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium text-slate-700">{task.assignee.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div
                            className={`p-1.5 rounded-md ${isOverdue(task.dueDate, task.status) ? "bg-red-100" : "bg-slate-100"}`}
                          >
                            <Calendar
                              className={`h-3 w-3 ${isOverdue(task.dueDate, task.status) ? "text-red-600" : "text-slate-600"}`}
                            />
                          </div>
                          <span
                            className={`text-sm font-medium ${
                              isOverdue(task.dueDate, task.status) ? "text-red-600" : "text-slate-700"
                            }`}
                          >
                            {formatDate(task.dueDate)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {/* Enhanced Custom Dropdown Menu */}
                        <div className="relative">
                          <Button
                            variant="ghost"
                            className="h-8 w-8 p-0 hover:bg-slate-100 rounded-full"
                            onClick={(e) => toggleDropdown(task.id, e)}
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Mở menu</span>
                          </Button>

                          {/* Dropdown Content */}
                          {openDropdown === task.id && (
                            <>
                              {/* Backdrop */}
                              <div
                                className="fixed inset-0 z-40"
                                onClick={() => setOpenDropdown(null)}
                                style={{ background: "transparent" }}
                              />

                              {/* Menu */}
                              <div
                                className="absolute right-0 top-10 w-48 bg-white border border-slate-200 rounded-lg shadow-xl overflow-hidden"
                                style={{ zIndex: 9999 }}
                              >
                                <div className="py-1">
                                  <button
                                    onClick={(e) => {
                                      e.preventDefault()
                                      e.stopPropagation()
                                      handleViewTask(task.id)
                                    }}
                                    className="flex items-center w-full px-4 py-3 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-150"
                                  >
                                    <Eye className="h-4 w-4 mr-3" />
                                    Xem chi tiết
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.preventDefault()
                                      e.stopPropagation()
                                      handleEditTask(task.id)
                                    }}
                                    className="flex items-center w-full px-4 py-3 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-150"
                                  >
                                    <Edit className="h-4 w-4 mr-3" />
                                    Chỉnh sửa
                                  </button>
                                  <hr className="my-1 border-slate-100" />
                                  <button
                                    onClick={(e) => {
                                      e.preventDefault()
                                      e.stopPropagation()
                                      handleDeleteTask(task)
                                    }}
                                    className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
                                  >
                                    <Trash2 className="h-4 w-4 mr-3" />
                                    Xóa
                                  </button>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Enhanced Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between space-x-2 py-6">
                <div className="text-sm text-slate-600 font-medium">
                  Hiển thị {startIndex + 1} - {Math.min(startIndex + itemsPerPage, sortedTasks.length)} của{" "}
                  {sortedTasks.length} kết quả
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="border-slate-200 hover:bg-slate-50"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Trước
                  </Button>
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 ${
                          currentPage === page
                            ? "bg-blue-600 hover:bg-blue-700 text-white"
                            : "border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        {page}
                      </Button>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="border-slate-200 hover:bg-slate-50"
                  >
                    Sau
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
