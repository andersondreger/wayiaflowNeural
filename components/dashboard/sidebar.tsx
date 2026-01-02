'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Bot,
  LayoutDashboard,
  MessageSquare,
  Users,
  BarChart3,
  Workflow,
  Crown,
  Settings,
  LogOut
} from 'lucide-react'
import { signOut } from 'next-auth/react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface SidebarProps {
  isPremium: boolean
}

export function Sidebar({ isPremium }: SidebarProps) {
  const pathname = usePathname()

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Atendimento', href: '/dashboard/atendimento', icon: MessageSquare },
    { name: 'Evolution API', href: '/dashboard/evolution', icon: Bot },
    { name: 'Leads', href: '/dashboard/leads', icon: Users },
    { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3, premium: true },
    { name: 'Workflows', href: '/dashboard/workflows', icon: Workflow, premium: true },
    { name: 'Configurações', href: '/dashboard/settings', icon: Settings },
  ]

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' })
  }

  return (
    <div className="flex h-full w-64 flex-col glass border-r border-white/10">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b border-white/10 px-6">
        <Bot className="h-8 w-8 text-primary" />
        <span className="text-xl font-bold text-neural">WayIA</span>
      </div>

      {/* Premium Badge */}
      {isPremium && (
        <div className="mx-4 mt-4 rounded-lg bg-gradient-neural p-3">
          <div className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-white" />
            <span className="text-sm font-semibold text-white">Premium</span>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          const isPremiumOnly = item.premium && !isPremium

          return (
            <Link
              key={item.name}
              href={isPremiumOnly ? '#' : item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all',
                isActive
                  ? 'bg-primary text-white'
                  : 'text-muted-foreground hover:bg-white/10 hover:text-foreground',
                isPremiumOnly && 'opacity-50 cursor-not-allowed'
              )}
              onClick={(e) => isPremiumOnly && e.preventDefault()}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
              {isPremiumOnly && (
                <Crown className="ml-auto h-4 w-4 text-yellow-500" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-white/10 p-4">
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={handleSignOut}
        >
          <LogOut className="mr-3 h-5 w-5" />
          Sair
        </Button>
      </div>
    </div>
  )
}
