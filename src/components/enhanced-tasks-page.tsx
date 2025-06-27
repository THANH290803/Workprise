"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  CheckSquare,
  Clock,
  AlertTriangle,
  Target,
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
} from "lucide-react"
import { TaskFormDialog } from "./task-form-dialog"
import { DeleteConfirmationDialog } from "./delete-confirmation-dialog"

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
  // Add more tasks as needed...
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "Hoàn thành":
      return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
    case "Đang thực hiện":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
    case "Đang xem xét":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400"
    case "Cần làm":
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    case "Quá hạn":
      return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "Cao":
      return "text-red-600 dark:text-red-400"
    case "Trung bình":
      return "text-yellow-600 dark:text-yellow-400"
    case "Thấp":
      return "text-green-600 dark:text-green-400"
    default:
      return "text-gray-600 dark:text-gray-400"
  }
}

const getPriorityIcon = (priority: string) => {
  switch (priority) {
    case "Cao":
      return <Flag className="h-3 w-3 text-red-600 dark:text-red-400" />
    case "Trung bình":
      return <Flag className="h-3 w-3 text-yellow-600 dark:text-yellow-400" />
    case "Thấp":
      return <Flag className="h-3 w-3 text-green-600 dark:text-green-400" />
    default:
      return <Flag className="h-3 w-3 text-gray-600 dark:text-gray-400" />
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

export function EnhancedTasksPage() {
  const [tasks, setTasks] = useState(allTasks)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [projectFilter, setProjectFilter] = useState("all")
  const [sortBy, setSortBy] = useState("dueDate")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  // Dialog states
  const [taskFormOpen, setTaskFormOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<any>(null)
  const [formMode, setFormMode] = useState<"create" | "edit">("create")
  const [isDeleting, setIsDeleting] = useState(false)

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
    setSelectedTask(null)
    setFormMode("create")
    setTaskFormOpen(true)
  }

  const handleEditTask = (task: any) => {
    setSelectedTask(task)
    setFormMode("edit")
    setTaskFormOpen(true)
  }

  const handleDeleteTask = (task: any) => {
    setSelectedTask(task)
    setDeleteDialogOpen(true)
  }

  const handleSaveTask = (taskData: any) => {
    if (formMode === "create") {
      setTasks((prev) => [...prev, taskData])
    } else {
      setTasks((prev) => prev.map((task) => (task.id === taskData.id ? taskData : task)))
    }
  }

  const confirmDelete = async () => {
    if (!selectedTask) return

    setIsDeleting(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setTasks((prev) => prev.filter((task) => task.id !== selectedTask.id))
      setDeleteDialogOpen(false)
      setSelectedTask(null)
    } catch (error) {
      console.error("Error deleting task:", error)
    } finally {
      setIsDeleting(false)
    }
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Quản lý công việc</h2>
          <p className="text-muted-foreground">Xem và quản lý tất cả công việc từ mọi dự án</p>
        </div>
        <Button onClick={handleCreateTask}>
          <Plus className="h-4 w-4 mr-2" />
          Tạo công việc mới
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckSquare className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-xs text-muted-foreground">Tổng cộng</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-600" />
              <div>
                <p className="text-2xl font-bold">{stats.todo}</p>
                <p className="text-xs text-muted-foreground">Cần làm</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{stats.inProgress}</p>
                <p className="text-xs text-muted-foreground">Đang làm</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{stats.review}</p>
                <p className="text-xs text-muted-foreground">Xem xét</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckSquare className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{stats.done}</p>
                <p className="text-xs text-muted-foreground">Hoàn thành</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <div>
                <p className="text-2xl font-bold">{stats.overdue}</p>
                <p className="text-xs text-muted-foreground">Quá hạn</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Bộ lọc và tìm kiếm</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm công việc, mã số, người thực hiện..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
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
              <SelectTrigger className="w-[150px]">
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
              <SelectTrigger className="w-[180px]">
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
            <Button variant="outline" onClick={clearFilters}>
              <Filter className="h-4 w-4 mr-2" />
              Xóa bộ lọc
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tasks Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>
              Danh sách công việc ({filteredTasks.length} / {tasks.length})
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">
                    <Button variant="ghost" onClick={() => handleSort("id")} className="h-8 p-0 font-semibold">
                      Mã số
                      <ArrowUpDown className="ml-2 h-3 w-3" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort("title")} className="h-8 p-0 font-semibold">
                      Tiêu đề
                      <ArrowUpDown className="ml-2 h-3 w-3" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort("project")} className="h-8 p-0 font-semibold">
                      Dự án
                      <ArrowUpDown className="ml-2 h-3 w-3" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort("status")} className="h-8 p-0 font-semibold">
                      Trạng thái
                      <ArrowUpDown className="ml-2 h-3 w-3" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort("priority")} className="h-8 p-0 font-semibold">
                      Ưu tiên
                      <ArrowUpDown className="ml-2 h-3 w-3" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort("assignee")} className="h-8 p-0 font-semibold">
                      Người thực hiện
                      <ArrowUpDown className="ml-2 h-3 w-3" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort("dueDate")} className="h-8 p-0 font-semibold">
                      Hạn chót
                      <ArrowUpDown className="ml-2 h-3 w-3" />
                    </Button>
                  </TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedTasks.map((task) => (
                  <TableRow key={task.id} className="hover:bg-muted/50">
                    <TableCell className="font-mono text-sm">{task.id}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium">{task.title}</p>
                        <p className="text-sm text-muted-foreground line-clamp-1">{task.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {task.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {task.tags.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{task.tags.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <FolderOpen className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{task.project}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {getPriorityIcon(task.priority)}
                        <span className={`text-sm font-medium ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={task.assignee.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="text-xs">
                            {task.assignee.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{task.assignee.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span
                          className={`text-sm ${
                            isOverdue(task.dueDate, task.status) ? "text-red-600 font-medium" : ""
                          }`}
                        >
                          {formatDate(task.dueDate)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            Xem chi tiết
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditTask(task)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Chỉnh sửa
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteTask(task)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Xóa
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between space-x-2 py-4">
              <div className="text-sm text-muted-foreground">
                Hiển thị {startIndex + 1} - {Math.min(startIndex + itemsPerPage, sortedTasks.length)} của{" "}
                {sortedTasks.length} kết quả
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
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
                      className="w-8 h-8 p-0"
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
                >
                  Sau
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Task Form Dialog */}
      <TaskFormDialog
        task={selectedTask}
        isOpen={taskFormOpen}
        onOpenChange={setTaskFormOpen}
        onSave={handleSaveTask}
        mode={formMode}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        isOpen={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={confirmDelete}
        title="Xóa công việc"
        description="Bạn có chắc chắn muốn xóa công việc này không?"
        itemName={selectedTask?.title}
        isDeleting={isDeleting}
      />
    </div>
  )
}
