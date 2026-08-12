import { UserRole } from '@/lib/constants'
import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role: UserRole
      storeId: string | null
    } & DefaultSession['user']
  }

  interface User {
    role: UserRole
    storeId: string | null
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    role: UserRole
    storeId: string | null
  }
}
