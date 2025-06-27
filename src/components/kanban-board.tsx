"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Plus,
  MoreHorizontal,
  Calendar,
  MessageSquare,
  Paperclip,
  Flag,
  ArrowLeft,
  Edit,
  Trash2,
  ArrowRight,
} from "lucide-react"
import { TaskFormDialog } from "@/components/task-form-dialog"
import { DeleteConfirmationDialog } from "@/components/delete-confirmation-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"
import { useRouter } from "next/navigation"

const columns = [
  {
    id: "todo",
    title: "Cần làm",
    color: "bg-gray-100",
  },
  {
    id: "inprogress",
    title: "Đang thực hiện",
    color: "bg-blue-100",
  },
  {
    id: "review",
    title: "Đang xem xét",
    color: "bg-yellow-100",
  },
  {
    id: "done",
    title: "Hoàn thành",
    color: "bg-green-100",
  },
]

// Tasks organized by project
const projectTasks = {
  "website-redesign": {
    todo: [
      {
        id: "1",
        title: "Thiết kế wireframe cho trang sản phẩm",
        description: "Tạo wireframe chi tiết cho trang hiển thị sản phẩm",
        priority: "Cao",
        assignee: { name: "Nguyễn Văn A", avatar: "/placeholder.svg?height=32&width=32" },
        dueDate: "15/01/2024",
        comments: 3,
        attachments: 2,
        tags: ["Design", "UI/UX"],
        status: "todo",
      },
      {
        id: "2",
        title: "Tối ưu hóa responsive design",
        description: "Đảm bảo website hiển thị tốt trên mobile",
        priority: "Trung bình",
        assignee: { name: "Trần Thị B", avatar: "/placeholder.svg?height=32&width=32" },
        dueDate: "18/01/2024",
        comments: 1,
        attachments: 0,
        tags: ["Design", "Responsive"],
        status: "todo",
      },
    ],
    inprogress: [
      {
        id: "3",
        title: "Phát triển trang chủ mới",
        description: "Code HTML/CSS cho trang chủ theo design mới",
        priority: "Cao",
        assignee: { name: "Phạm Thị D", avatar: "/placeholder.svg?height=32&width=32" },
        dueDate: "16/01/2024",
        comments: 5,
        attachments: 3,
        tags: ["Frontend", "HTML/CSS"],
        status: "inprogress",
      },
    ],
    review: [
      {
        id: "4",
        title: "Review design system",
        description: "Kiểm tra tính nhất quán của design system",
        priority: "Cao",
        assignee: { name: "Vũ Thị F", avatar: "/placeholder.svg?height=32&width=32" },
        dueDate: "14/01/2024",
        comments: 8,
        attachments: 1,
        tags: ["Review", "Design"],
        status: "review",
      },
    ],
    done: [
      {
        id: "5",
        title: "Thiết kế logo và branding",
        description: "Hoàn thành thiết kế nhận diện thương hiệu",
        priority: "Trung bình",
        assignee: { name: "Đỗ Văn G", avatar: "/placeholder.svg?height=32&width=32" },
        dueDate: "10/01/2024",
        comments: 4,
        attachments: 5,
        tags: ["Design", "Branding"],
        status: "done",
      },
    ],
  },
  "mobile-app": {
    todo: [
      {
        id: "6",
        title: "Thiết kế UI cho màn hình đăng nhập",
        description: "Tạo giao diện đăng nhập cho mobile app",
        priority: "Cao",
        assignee: { name: "Lê Văn C", avatar: "/placeholder.svg?height=32&width=32" },
        dueDate: "20/01/2024",
        comments: 0,
        attachments: 1,
        tags: ["Mobile", "UI/UX"],
        status: "todo",
      },
      {
        id: "7",
        title: "Setup React Native project",
        description: "Khởi tạo và cấu hình dự án React Native",
        priority: "Cao",
        assignee: { name: "Hoàng Văn E", avatar: "/placeholder.svg?height=32&width=32" },
        dueDate: "22/01/2024",
        comments: 2,
        attachments: 0,
        tags: ["Mobile", "Setup"],
        status: "todo",
      },
    ],
    inprogress: [
      {
        id: "8",
        title: "Phát triển API authentication",
        description: "Tích hợp API đăng nhập cho mobile app",
        priority: "Cao",
        assignee: { name: "Bùi Thị H", avatar: "/placeholder.svg?height=32&width=32" },
        dueDate: "25/01/2024",
        comments: 3,
        attachments: 2,
        tags: ["Mobile", "Backend"],
        status: "inprogress",
      },
    ],
    review: [],
    done: [
      {
        id: "9",
        title: "Nghiên cứu công nghệ",
        description: "Research React Native và các thư viện cần thiết",
        priority: "Thấp",
        assignee: { name: "Nguyễn Văn A", avatar: "/placeholder.svg?height=32&width=32" },
        dueDate: "05/01/2024",
        comments: 1,
        attachments: 3,
        tags: ["Research", "Mobile"],
        status: "done",
      },
    ],
  },
  "marketing-campaign": {
    todo: [
      {
        id: "10",
        title: "Viết content cho social media",
        description: "Tạo nội dung cho Facebook, Instagram",
        priority: "Trung bình",
        assignee: { name: "Trần Thị B", avatar: "/placeholder.svg?height=32&width=32" },
        dueDate: "28/01/2024",
        comments: 1,
        attachments: 0,
        tags: ["Marketing", "Content"],
        status: "todo",
      },
    ],
    inprogress: [
      {
        id: "11",
        title: "Thiết kế banner quảng cáo",
        description: "Tạo banner cho chiến dịch marketing",
        priority: "Cao",
        assignee: { name: "Vũ Thị F", avatar: "/placeholder.svg?height=32&width=32" },
        dueDate: "20/01/2024",
        comments: 4,
        attachments: 2,
        tags: ["Marketing", "Design"],
        status: "inprogress",
      },
    ],
    review: [
      {
        id: "12",
        title: "Review chiến lược marketing",
        description: "Đánh giá và điều chỉnh chiến lược",
        priority: "Cao",
        assignee: { name: "Phạm Thị D", avatar: "/placeholder.svg?height=32&width=32" },
        dueDate: "15/01/2024",
        comments: 6,
        attachments: 1,
        tags: ["Marketing", "Strategy"],
        status: "review",
      },
    ],
    done: [
      {
        id: "13",
        title: "Phân tích đối thủ cạnh tranh",
        description: "Research và phân tích competitor",
        priority: "Trung bình",
        assignee: { name: "Lê Văn C", avatar: "/placeholder.svg?height=32&width=32" },
        dueDate: "08/01/2024",
        comments: 2,
        attachments: 4,
        tags: ["Marketing", "Research"],
        status: "done",
      },
    ],
  },
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "Cao":
      return "text-red-600"
    case "Trung bình":
      return "text-yellow-600"
    case "Thấp":
      return "text-green-600"
    default:
      return "text-gray-600"
  }
}

const getTagColor = (tag: string) => {
  const colors = {
    Design: "bg-purple-100 text-purple-800",
    "UI/UX": "bg-pink-100 text-pink-800",
    Frontend: "bg-blue-100 text-blue-800",
    Backend: "bg-green-100 text-green-800",
    DevOps: "bg-orange-100 text-orange-800",
    Documentation: "bg-gray-100 text-gray-800",
    Auth: "bg-indigo-100 text-indigo-800",
    Performance: "bg-yellow-100 text-yellow-800",
    Review: "bg-red-100 text-red-800",
    Payment: "bg-emerald-100 text-emerald-800",
    Branding: "bg-violet-100 text-violet-800",
    Setup: "bg-cyan-100 text-cyan-800",
    Mobile: "bg-teal-100 text-teal-800",
    Marketing: "bg-rose-100 text-rose-800",
    Content: "bg-amber-100 text-amber-800",
    Strategy: "bg-slate-100 text-slate-800",
    Research: "bg-lime-100 text-lime-800",
    "HTML/CSS": "bg-sky-100 text-sky-800",
    Responsive: "bg-fuchsia-100 text-fuchsia-800",
  }
  return colors[tag as keyof typeof colors] || "bg-gray-100 text-gray-800"
}

interface KanbanBoardProps {
  project?: {
    id: string
    name: string
  }
  onBackToProjects?: () => void
}

export function KanbanBoard({ project, onBackToProjects }: KanbanBoardProps) {
  const router = useRouter()
  const [taskFormOpen, setTaskFormOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<any>(null)
  const [formMode, setFormMode] = useState<"create" | "edit">("create")
  const [selectedColumn, setSelectedColumn] = useState<string>("")
  const [tasks, setTasks] = useState(projectTasks)

  if (!project) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Vui lòng chọn một dự án để xem Kanban Board</p>
      </div>
    )
  }

  const currentTasks = tasks[project.id as keyof typeof tasks] || {
    todo: [],
    inprogress: [],
    review: [],
    done: [],
  }

  // Calculate counts for each column
  const columnsWithCounts = columns.map((column) => ({
    ...column,
    count: currentTasks[column.id as keyof typeof currentTasks]?.length || 0,
  }))

  const handleCreateTask = (columnId?: string) => {
    setSelectedTask(null)
    setFormMode("create")
    setSelectedColumn(columnId || "todo")
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

  const handleMoveTask = (task: any, newStatus: string) => {
    setTasks((prevTasks) => {
      const projectId = project.id as keyof typeof prevTasks
      const projectTasks = { ...prevTasks[projectId] }

      // Remove task from current status
      const currentStatus = task.status
      projectTasks[currentStatus as keyof typeof projectTasks] = projectTasks[
        currentStatus as keyof typeof projectTasks
      ].filter((t: any) => t.id !== task.id)

      // Add task to new status
      const updatedTask = { ...task, status: newStatus }
      projectTasks[newStatus as keyof typeof projectTasks] = [
        ...projectTasks[newStatus as keyof typeof projectTasks],
        updatedTask,
      ]

      return {
        ...prevTasks,
        [projectId]: projectTasks,
      }
    })
  }

  const handleSaveTask = (taskData: any) => {
    console.log("Saving task:", taskData)
    setTaskFormOpen(false)
  }

  const handleConfirmDelete = () => {
    console.log("Deleting task:", selectedTask)
    setDeleteDialogOpen(false)
    setSelectedTask(null)
  }

  const handleBackToProjects = () => {
    if (onBackToProjects) {
      onBackToProjects()
    } else {
      router.push("/projects")
    }
  }

  const getAvailableStatuses = (currentStatus: string) => {
    return columns.filter((col) => col.id !== currentStatus)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={handleBackToProjects}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại dự án
          </Button>
          <div>
            <h2 className="text-2xl font-bold">{project.name}</h2>
            <p className="text-muted-foreground">Kanban Board</p>
          </div>
        </div>
        <Button onClick={() => handleCreateTask()}>
          <Plus className="h-4 w-4 mr-2" />
          Thêm công việc
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {columnsWithCounts.map((column) => (
          <div key={column.id} className="space-y-4">
            <div className={`rounded-lg p-3 ${column.color}`}>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm">{column.title}</h3>
                <Badge variant="secondary" className="text-xs">
                  {column.count}
                </Badge>
              </div>
            </div>

            <div className="space-y-3">
              {currentTasks[column.id as keyof typeof currentTasks]?.map((task) => (
                <Card key={task.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <h4 className="font-medium text-sm leading-tight">{task.title}</h4>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <MoreHorizontal className="h-3 w-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEditTask(task)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Chỉnh sửa
                            </DropdownMenuItem>

                            <DropdownMenuSub>
                              <DropdownMenuSubTrigger>
                                <ArrowRight className="h-4 w-4 mr-2" />
                                Chuyển trạng thái
                              </DropdownMenuSubTrigger>
                              <DropdownMenuSubContent>
                                {getAvailableStatuses(task.status).map((status) => (
                                  <DropdownMenuItem key={status.id} onClick={() => handleMoveTask(task, status.id)}>
                                    {status.title}
                                  </DropdownMenuItem>
                                ))}
                              </DropdownMenuSubContent>
                            </DropdownMenuSub>

                            <DropdownMenuItem onClick={() => handleDeleteTask(task)} className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Xóa
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <p className="text-xs text-muted-foreground line-clamp-2">{task.description}</p>

                      <div className="flex flex-wrap gap-1">
                        {task.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className={`text-xs ${getTagColor(tag)}`}>
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Flag className={`h-3 w-3 ${getPriorityColor(task.priority)}`} />
                          <span className={`text-xs ${getPriorityColor(task.priority)}`}>{task.priority}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{task.dueDate}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={task.assignee.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="text-xs">
                            {task.assignee.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          {task.comments > 0 && (
                            <div className="flex items-center gap-1">
                              <MessageSquare className="h-3 w-3" />
                              <span>{task.comments}</span>
                            </div>
                          )}
                          {task.attachments > 0 && (
                            <div className="flex items-center gap-1">
                              <Paperclip className="h-3 w-3" />
                              <span>{task.attachments}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Button
                variant="ghost"
                className="w-full justify-start text-muted-foreground"
                onClick={() => handleCreateTask(column.id)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Thêm công việc
              </Button>
            </div>
          </div>
        ))}
      </div>
      {/* Task Form Dialog */}
      <TaskFormDialog
        task={selectedTask}
        isOpen={taskFormOpen}
        onOpenChange={setTaskFormOpen}
        onSave={handleSaveTask}
        mode={formMode}
        defaultProject={project.name}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        isOpen={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        itemName={selectedTask?.title || ""}
        itemType="công việc"
      />
    </div>
  )
}
