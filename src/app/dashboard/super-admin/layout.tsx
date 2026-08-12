import { requireRole } from '@/lib/auth/utils'
import { UserRole } from '@/lib/constants'
import { SuperAdminSidebar } from './super-admin-sidebar'

export default async function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await requireRole(UserRole.SUPER_ADMIN)

  return (
    <div className="flex gap-6">
      <SuperAdminSidebar />
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  )
}
