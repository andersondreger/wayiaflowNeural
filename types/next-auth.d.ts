import { Role } from '@prisma/client'
import 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name?: string | null
      image?: string | null
      role: Role
      isPremium: boolean
    }
  }

  interface User {
    role: Role
    isPremium?: boolean
  }
}
