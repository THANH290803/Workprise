"use client"

import { KanbanBoard } from "@/components/kanban-board"
import { useRouter, useParams } from "next/navigation"

// Sample project data
const projects = {
  "website-redesign": { id: "website-redesign", name: "Website Redesign" },
  "mobile-app": { id: "mobile-app", name: "Mobile App Development" },
  "marketing-campaign": { id: "marketing-campaign", name: "Marketing Campaign Q1" },
  "database-migration": { id: "database-migration", name: "Database Migration" },
}

export default function ProjectKanbanPage() {
  const router = useRouter()
  const params = useParams()
  const projectId = params.id as string

  const project = projects[projectId as keyof typeof projects]

  const handleBackToProjects = () => {
    router.push("/projects")
  }

  if (!project) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Dự án không tồn tại</p>
      </div>
    )
  }

  return <KanbanBoard project={project} onBackToProjects={handleBackToProjects} />
}
