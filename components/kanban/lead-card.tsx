'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Phone, Mail, MessageSquare, MoreVertical } from 'lucide-react'
import { formatDate, formatCurrency } from '@/lib/utils'

interface LeadCardProps {
  lead: {
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
  onClick?: () => void
}

export function LeadCard({ lead, onClick }: LeadCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: lead.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div ref={setNodeRef} style={style}>
      <Card
        className="glass cursor-move hover:border-primary/50 transition-all"
        {...attributes}
        {...listeners}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1" onClick={onClick}>
              <h4 className="font-semibold truncate">{lead.name}</h4>
              <p className="text-xs text-muted-foreground mt-1">
                {formatDate(new Date(lead.createdAt))}
              </p>
            </div>
            <button className="rounded-full p-1 hover:bg-white/10">
              <MoreVertical className="h-4 w-4" />
            </button>
          </div>
        </CardHeader>
        <CardContent className="space-y-2" onClick={onClick}>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="h-4 w-4" />
            <span className="truncate">{lead.phone}</span>
          </div>

          {lead.email && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span className="truncate">{lead.email}</span>
            </div>
          )}

          {lead.value && (
            <div className="text-sm font-semibold text-green-500">
              {formatCurrency(lead.value)}
            </div>
          )}

          {lead.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {lead.tags.slice(0, 2).map((tag, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 text-xs rounded-full bg-primary/20 text-primary"
                >
                  {tag}
                </span>
              ))}
              {lead.tags.length > 2 && (
                <span className="px-2 py-0.5 text-xs rounded-full bg-white/10">
                  +{lead.tags.length - 2}
                </span>
              )}
            </div>
          )}

          <Button variant="outline" size="sm" className="w-full mt-2">
            <MessageSquare className="mr-2 h-4 w-4" />
            Conversar
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
