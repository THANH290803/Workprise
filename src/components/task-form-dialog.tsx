"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, X } from "lucide-react"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import { cn } from "@/lib/utils"

const priorities = [
  { value: "Cao", label: "Cao", color: "text-red-600" },
  { value: "Trung bình", label: "Trung bình", color: "text-yellow-600" },
  { value: "Thấp", label: "Thấp", color: "text-green-600" },
]

const statuses = [
  { value: "todo", label: "Cần làm" },
  { value: "inprogress", label: "Đang thực hiện" },
  { value: "review", label: "Đang xem xét" },
  { value: "done", label: "Hoàn thành" },
]

const teamMembers = [
  { value: "nguyen-van-a", label: "Nguyễn Văn A", avatar: "/placeholder.svg?height=32&width=32" },
  { value: "tran-thi-b", label: "Trần Thị B", avatar: "/placeholder.svg?height=32&width=32" },
  { value: "le-van-c", label: "Lê Văn C", avatar: "/placeholder.svg?height=32&width=32" },
  { value: "pham-thi-d", label: "Phạm Thị D", avatar: "/placeholder.svg?height=32&width=32" },
  { value: "hoang-van-e", label: "Hoàng Văn E", avatar: "/placeholder.svg?height=32&width=32" },
  { value: "vu-thi-f", label: "Vũ Thị F", avatar: "/placeholder.svg?height=32&width=32" },
  { value: "do-van-g", label: "Đỗ Văn G", avatar: "/placeholder.svg?height=32&width=32" },
  { value: "bui-thi-h", label: "Bùi Thị H", avatar: "/placeholder.svg?height=32&width=32" },
]

const availableTags = [
  "Design",
  "UI/UX",
  "Frontend",
  "Backend",
  "DevOps",
  "Documentation",
  "Auth",
  "Performance",
  "Review",
  "Payment",
  "Branding",
  "Setup",
  "Mobile",
  "Marketing",
  "Content",
  "Strategy",
  "Research",
  "HTML/CSS",
  "Responsive",
]

interface TaskFormDialogProps {
  task?: any
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onSave: (taskData: any) => void
  mode: "create" | "edit"
  defaultProject?: string
}

export function TaskFormDialog({ task, isOpen, onOpenChange, onSave, mode, defaultProject }: TaskFormDialogProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Trung bình",
    status: "todo",
    assignee: "",
    duration: "",
    tags: [] as string[],
    project: defaultProject || "",
  })

  const [newTag, setNewTag] = useState("")
  const [calendarOpen, setCalendarOpen] = useState(false)

  useEffect(() => {
    if (task && mode === "edit") {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        priority: task.priority || "Trung bình",
        status: task.status || "todo",
        assignee: task.assignee?.name || "",
        dueDate: task.dueDate ? new Date(task.dueDate.split("/").reverse().join("-")) : null,
        tags: task.tags || [],
        project: defaultProject || "",
      })
    } else if (mode === "create") {
      setFormData({
        title: "",
        description: "",
        priority: "Trung bình",
        status: "todo",
        assignee: "",
        dueDate: null,
        tags: [],
        project: defaultProject || "",
      })
    }
  }, [task, mode, defaultProject])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const taskData = {
      ...formData,
      id: task?.id || Date.now().toString(),
      dueDate: formData.dueDate ? format(formData.dueDate, "dd/MM/yyyy") : "",
      assignee: {
        name: formData.assignee,
        avatar: teamMembers.find((m) => m.label === formData.assignee)?.avatar || "/placeholder.svg?height=32&width=32",
      },
      comments: task?.comments || 0,
      attachments: task?.attachments || 0,
    }

    onSave(taskData)
    onOpenChange(false)
  }

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }))
      setNewTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const handleTagSelect = (tag: string) => {
    if (!formData.tags.includes(tag)) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tag],
      }))
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "Tạo công việc mới" : "Chỉnh sửa công việc"}</DialogTitle>
          <DialogDescription>
            {mode === "create" ? "Điền thông tin để tạo công việc mới" : "Cập nhật thông tin công việc"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Tiêu đề *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Nhập tiêu đề công việc"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Mô tả</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Mô tả chi tiết công việc"
                rows={3}
              />
            </div>

            {/* Priority and Status */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Độ ưu tiên</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, priority: value }))}
                >
                  <SelectTrigger className="h-12 text-base w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {priorities.map((priority) => (
                      <SelectItem key={priority.value} value={priority.value}>
                        <span className={priority.color}>{priority.label}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Trạng thái</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}
                >
                  <SelectTrigger className="h-12 text-base w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Assignee and Due Date */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Người thực hiện</Label>
                <Select
                  value={formData.assignee}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, assignee: value }))}
                >
                  <SelectTrigger className="h-12 text-base w-full">
                    <SelectValue placeholder="Chọn người thực hiện" />
                  </SelectTrigger>
                  <SelectContent>
                    {teamMembers.map((member) => (
                      <SelectItem key={member.value} value={member.label}>
                        {member.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Khoảng thời gian hoàn thành</Label>
                <input
                  type="text"
                  placeholder="Khoảng thời gian hoàn thành"
                  className="w-full border rounded px-3 py-2 text-sm"
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, duration: e.target.value }))
                  }
                />
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <Label>Tags</Label>

              {/* Current Tags */}
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <X className="h-3 w-3 cursor-pointer hover:text-red-500" onClick={() => handleRemoveTag(tag)} />
                    </Badge>
                  ))}
                </div>
              )}

              {/* Add New Tag */}
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Thêm tag mới"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      handleAddTag()
                    }
                  }}
                />
                <Button type="button" onClick={handleAddTag} variant="outline">
                  Thêm
                </Button>
              </div>

              {/* Available Tags */}
              <div className="flex flex-wrap gap-1 mt-2">
                {availableTags
                  .filter((tag) => !formData.tags.includes(tag))
                  .map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                      onClick={() => handleTagSelect(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Hủy
            </Button>
            <Button type="submit">{mode === "create" ? "Tạo công việc" : "Cập nhật"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
