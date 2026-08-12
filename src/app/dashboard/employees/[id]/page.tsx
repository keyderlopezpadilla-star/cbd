'use client'

import { use } from 'react'
import { EmployeeDetail } from '@/features/employees/components/employee-detail'
import { getEmployeeById } from '@/lib/mock-data/employees'
import { notFound } from 'next/navigation'

export default function EmployeeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const employee = getEmployeeById(id)

  if (!employee) {
    notFound()
  }

  return <EmployeeDetail employee={employee} />
}
