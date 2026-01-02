'use client'

import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { LeadCard } from './lead-card'

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

interface KanbanColumnProps {
  id: string
  title: string
  leads: Lead[]
  color: string
  onLeadClick?: (lead: Lead) => void
}

export function KanbanColumn({ id, title, leads, color, onLeadClick }: KanbanColumnProps) {
  const { setNodeRef } = useDroppable({ id })

  return (
    <div className="flex flex-col h-full min-w-[320px]">
      <div className={`flex items-center justify-between p-4 rounded-t-lg border-b border-white/10`}>
        <div className="flex items-center gap-2">
          <div className={`h-3 w-3 rounded-full ${color}`} />
          <h3 className="font-semibold">{title}</h3>
          <span className="text-sm text-muted-foreground">({leads.length})</span>
        </div>
      </div>

      <div
        ref={setNodeRef}
        className="flex-1 p-4 space-y-3 overflow-y-auto glass rounded-b-lg"
        style={{ minHeight: '500px' }}
      >
        <SortableContext
          items={leads.map(l => l.id)}
          strategy={verticalListSortingStrategy}
        >
          {leads.map((lead) => (
            <LeadCard
              key={lead.id}
              lead={lead}
              onClick={() => onLeadClick?.(lead)}
            />
          ))}
        </SortableContext>

        {leads.length === 0 && (
          <div className="flex items-center justify-center h-32 text-sm text-muted-foreground">
            Nenhum lead nesta coluna
          </div>
        )}
      </div>
    </div>
  )
}
