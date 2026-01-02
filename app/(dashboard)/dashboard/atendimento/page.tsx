'use client'

import { useEffect, useState } from 'react'
import { Plus, Search, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { KanbanBoard } from '@/components/kanban/kanban-board'
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

export default function AtendimentoPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  const fetchLeads = async () => {
    try {
      const res = await fetch('/api/leads')
      const data = await res.json()
      setLeads(data)
    } catch (error) {
      toast.error('Erro ao carregar leads')
    } finally {
      setLoading(false)
    }
  }

  const handleLeadUpdate = async (leadId: string, status: string) => {
    try {
      const res = await fetch(`/api/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })

      if (!res.ok) throw new Error('Erro ao atualizar')

      const updatedLead = await res.json()

      setLeads((prev) =>
        prev.map((lead) => (lead.id === leadId ? updatedLead : lead))
      )
    } catch (error) {
      throw error
    }
  }

  const handleLeadClick = (lead: Lead) => {
    // TODO: Abrir modal com detalhes do lead
    console.log('Lead clicado:', lead)
  }

  useEffect(() => {
    fetchLeads()
  }, [])

  const filteredLeads = leads.filter((lead) =>
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.phone.includes(searchTerm) ||
    lead.email?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Atendimento</h2>
          <p className="text-muted-foreground">
            Gerencie seus leads e conversas
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filtros
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Novo Lead
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="flex gap-2">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar leads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 overflow-hidden">
        {filteredLeads.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full glass rounded-lg">
            <div className="mb-4 rounded-full bg-primary/20 p-4">
              <Plus className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">
              Nenhum lead encontrado
            </h3>
            <p className="mb-4 text-center text-sm text-muted-foreground max-w-md">
              Comece a atender seus clientes criando seu primeiro lead ou conecte uma instância do WhatsApp
            </p>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Criar Primeiro Lead
            </Button>
          </div>
        ) : (
          <KanbanBoard
            leads={filteredLeads}
            onLeadUpdate={handleLeadUpdate}
            onLeadClick={handleLeadClick}
          />
        )}
      </div>
    </div>
  )
}
