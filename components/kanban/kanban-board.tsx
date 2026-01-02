'use client'

import { useState } from 'react'
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { KanbanColumn } from './kanban-column'
import { LeadCard } from './lead-card'
import { toast } from 'sonner'

interface Lead {
  id: string
  name: string
  phone: string
  email?: string | null
  status: string
  tags: string[]
  notes?: string | null
  value?: number | null
  createdAt: string
}

interface KanbanBoardProps {
  leads: Lead[]
  onLeadUpdate: (leadId: string, status: string) => Promise<void>
  onLeadClick?: (lead: Lead) => void
}

const COLUMNS = [
  { id: 'NEW', title: 'Novo', color: 'bg-blue-500' },
  { id: 'CONTACTED', title: 'Contato', color: 'bg-yellow-500' },
  { id: 'QUALIFIED', title: 'Qualificado', color: 'bg-purple-500' },
  { id: 'PROPOSAL', title: 'Proposta', color: 'bg-orange-500' },
  { id: 'NEGOTIATION', title: 'Negociação', color: 'bg-pink-500' },
  { id: 'CLOSED_WON', title: 'Fechado', color: 'bg-green-500' },
  { id: 'CLOSED_LOST', title: 'Perdido', color: 'bg-red-500' },
]

export function KanbanBoard({ leads, onLeadUpdate, onLeadClick }: KanbanBoardProps) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const sensors = useSensors(useSensor(PointerSensor))

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) {
      setActiveId(null)
      return
    }

    const leadId = active.id as string
    const newStatus = over.id as string

    // Verificar se mudou de coluna
    const lead = leads.find(l => l.id === leadId)
    if (lead && lead.status !== newStatus) {
      try {
        await onLeadUpdate(leadId, newStatus)
        toast.success('Lead atualizado com sucesso')
      } catch (error) {
        toast.error('Erro ao atualizar lead')
      }
    }

    setActiveId(null)
  }

  const activeLead = activeId ? leads.find(l => l.id === activeId) : null

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 overflow-x-auto pb-4">
        {COLUMNS.map((column) => {
          const columnLeads = leads.filter((lead) => lead.status === column.id)

          return (
            <KanbanColumn
              key={column.id}
              id={column.id}
              title={column.title}
              leads={columnLeads}
              color={column.color}
              onLeadClick={onLeadClick}
            />
          )
        })}
      </div>

      <DragOverlay>
        {activeLead ? <LeadCard lead={activeLead} /> : null}
      </DragOverlay>
    </DndContext>
  )
}
