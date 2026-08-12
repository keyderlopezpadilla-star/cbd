'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { EmployeeStats } from '@/features/employees/components/employee-stats'
import { EmployeeList } from '@/features/employees/components/employee-list'
import { EmployeeForm } from '@/features/employees/components/employee-form'

export default function EmployeesPage() {
  const [showNewEmployee, setShowNewEmployee] = useState(false)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Empleados</h1>
          <p className="text-sm text-muted-foreground">
            Gestion de personal, horarios y rendimiento
          </p>
        </div>
        <Button
          onClick={() => setShowNewEmployee(!showNewEmployee)}
          className="bg-cbd-green text-black hover:bg-cbd-green-light"
        >
          <Plus className="h-4 w-4 mr-2" />
          {showNewEmployee ? 'Ver Empleados' : 'Nuevo Empleado'}
        </Button>
      </div>

      {showNewEmployee ? (
        <EmployeeForm
          onSubmit={() => {
            setShowNewEmployee(false)
          }}
          onCancel={() => setShowNewEmployee(false)}
        />
      ) : (
        <>
          {/* Stats */}
          <EmployeeStats />

          {/* Employee List */}
          <EmployeeList />
        </>
      )}
    </div>
  )
}
