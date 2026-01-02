'use client'

import { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { InstanceCard } from '@/components/evolution/instance-card'
import { toast } from 'sonner'

interface Instance {
  id: string
  name: string
  instanceId: string
  phoneNumber?: string | null
  status: string
  createdAt: string
}

export default function EvolutionPage() {
  const [instances, setInstances] = useState<Instance[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newInstanceName, setNewInstanceName] = useState('')

  const fetchInstances = async () => {
    try {
      const res = await fetch('/api/evolution')
      const data = await res.json()
      setInstances(data)
    } catch (error) {
      toast.error('Erro ao carregar instâncias')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateInstance = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!newInstanceName.trim()) {
      toast.error('Digite um nome para a instância')
      return
    }

    setCreating(true)
    try {
      const res = await fetch('/api/evolution', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newInstanceName }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Erro ao criar instância')
      }

      toast.success('Instância criada com sucesso!')
      setNewInstanceName('')
      setShowCreateForm(false)
      fetchInstances()
    } catch (error: any) {
      toast.error(error.message || 'Erro ao criar instância')
    } finally {
      setCreating(false)
    }
  }

  useEffect(() => {
    fetchInstances()
  }, [])

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Evolution API</h2>
          <p className="text-muted-foreground">
            Gerencie suas instâncias do WhatsApp
          </p>
        </div>
        <Button onClick={() => setShowCreateForm(!showCreateForm)}>
          <Plus className="mr-2 h-4 w-4" />
          Nova Instância
        </Button>
      </div>

      {/* Formulário de Criar Instância */}
      {showCreateForm && (
        <Card className="glass border-primary/50">
          <CardHeader>
            <CardTitle>Criar Nova Instância</CardTitle>
            <CardDescription>
              Crie uma nova conexão com o WhatsApp
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateInstance} className="space-y-4">
              <div>
                <Label htmlFor="name">Nome da Instância</Label>
                <Input
                  id="name"
                  placeholder="Ex: Atendimento Principal"
                  value={newInstanceName}
                  onChange={(e) => setNewInstanceName(e.target.value)}
                  disabled={creating}
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" disabled={creating}>
                  {creating ? 'Criando...' : 'Criar Instância'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowCreateForm(false)}
                  disabled={creating}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Lista de Instâncias */}
      {instances.length === 0 ? (
        <Card className="glass">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="mb-4 rounded-full bg-primary/20 p-4">
              <Plus className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">
              Nenhuma instância criada
            </h3>
            <p className="mb-4 text-center text-sm text-muted-foreground">
              Crie sua primeira instância para começar a usar o WhatsApp
            </p>
            <Button onClick={() => setShowCreateForm(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Criar Primeira Instância
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {instances.map((instance) => (
            <InstanceCard
              key={instance.id}
              instance={{
                ...instance,
                createdAt: new Date(instance.createdAt),
              }}
              onDelete={fetchInstances}
              onRefresh={fetchInstances}
            />
          ))}
        </div>
      )}
    </div>
  )
}
