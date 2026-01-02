'use client'

import { Bell, Crown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getInitials } from '@/lib/utils'
import Link from 'next/link'

interface HeaderProps {
  user: {
    name?: string | null
    email: string
    image?: string | null
  }
  isPremium: boolean
}

export function Header({ user, isPremium }: HeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-white/10 px-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Bem-vindo de volta, {user.name || user.email}
        </p>
      </div>

      <div className="flex items-center gap-4">
        {!isPremium && (
          <Link href="/dashboard/premium">
            <Button variant="default" size="sm" className="gap-2">
              <Crown className="h-4 w-4" />
              Upgrade Premium
            </Button>
          </Link>
        )}

        <button className="relative rounded-full p-2 hover:bg-white/10">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-neural text-sm font-semibold text-white">
          {user.image ? (
            <img
              src={user.image}
              alt={user.name || 'User'}
              className="h-full w-full rounded-full"
            />
          ) : (
            getInitials(user.name || user.email)
          )}
        </div>
      </div>
    </header>
  )
}
