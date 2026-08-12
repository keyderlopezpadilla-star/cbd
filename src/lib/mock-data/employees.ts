import { UserRole, DEMO_STORES } from '@/lib/constants'

export type EmployeeStatus = 'ACTIVE' | 'INACTIVE' | 'ON_LEAVE' | 'TERMINATED'

export interface Schedule {
  monday: { start: string; end: string } | null
  tuesday: { start: string; end: string } | null
  wednesday: { start: string; end: string } | null
  thursday: { start: string; end: string } | null
  friday: { start: string; end: string } | null
  saturday: { start: string; end: string } | null
  sunday: { start: string; end: string } | null
}

export interface SalesMetrics {
  totalRevenue: number
  totalTransactions: number
  avgTicket: number
  conversionRate: number
  monthlyRevenue: number[]
  itemsSold: number
  returnsHandled: number
  customerSatisfaction: number
}

export interface Employee {
  id: string
  name: string
  email: string
  phone: string
  role: UserRole
  storeId: string
  storeName: string
  hireDate: Date
  schedule: Schedule
  salesMetrics: SalesMetrics
  status: EmployeeStatus
  avatar: string
  department: string
  salary: number
  performanceScore: number
  certifications: string[]
  notes: string
}

const now = new Date()
const daysAgo = (days: number) => new Date(now.getTime() - days * 24 * 60 * 60 * 1000)

export const MOCK_EMPLOYEES: Employee[] = [
  {
    id: 'emp-001',
    name: 'Alejandro Ruiz',
    email: 'alejandro.ruiz@cbdsaas.com',
    phone: '+34 611 222 333',
    role: UserRole.MANAGER,
    storeId: '1',
    storeName: 'Madrid Centro',
    hireDate: daysAgo(730),
    schedule: {
      monday: { start: '09:00', end: '17:00' },
      tuesday: { start: '09:00', end: '17:00' },
      wednesday: { start: '09:00', end: '17:00' },
      thursday: { start: '09:00', end: '17:00' },
      friday: { start: '09:00', end: '15:00' },
      saturday: null,
      sunday: null,
    },
    salesMetrics: {
      totalRevenue: 187500,
      totalTransactions: 1250,
      avgTicket: 150,
      conversionRate: 78.5,
      monthlyRevenue: [15200, 16800, 14500, 18200, 17100, 15900],
      itemsSold: 3200,
      returnsHandled: 45,
      customerSatisfaction: 4.8,
    },
    status: 'ACTIVE',
    avatar: 'AR',
    department: 'Ventas',
    salary: 3200,
    performanceScore: 95,
    certifications: ['CBD Expert', 'Gestion de Equipos', 'Atencion al Cliente Premium'],
    notes: 'Manager estrella. Excelentes resultados consistentes.',
  },
  {
    id: 'emp-002',
    name: 'Maria Garcia',
    email: 'maria.garcia@cbdsaas.com',
    phone: '+34 622 333 444',
    role: UserRole.EMPLOYEE,
    storeId: '1',
    storeName: 'Madrid Centro',
    hireDate: daysAgo(540),
    schedule: {
      monday: { start: '10:00', end: '18:00' },
      tuesday: { start: '10:00', end: '18:00' },
      wednesday: null,
      thursday: { start: '10:00', end: '18:00' },
      friday: { start: '10:00', end: '18:00' },
      saturday: { start: '10:00', end: '14:00' },
      sunday: null,
    },
    salesMetrics: {
      totalRevenue: 124800,
      totalTransactions: 980,
      avgTicket: 127.35,
      conversionRate: 72.3,
      monthlyRevenue: [10200, 11500, 10800, 12100, 11800, 10900],
      itemsSold: 2450,
      returnsHandled: 32,
      customerSatisfaction: 4.6,
    },
    status: 'ACTIVE',
    avatar: 'MG',
    department: 'Ventas',
    salary: 2100,
    performanceScore: 88,
    certifications: ['CBD Expert', 'Atencion al Cliente'],
    notes: 'Muy buena con clientes nuevos. Alta tasa de conversion.',
  },
  {
    id: 'emp-003',
    name: 'Carlos Vega',
    email: 'carlos.vega@cbdsaas.com',
    phone: '+34 633 444 555',
    role: UserRole.EMPLOYEE,
    storeId: '2',
    storeName: 'Valencia Puerto',
    hireDate: daysAgo(365),
    schedule: {
      monday: { start: '14:00', end: '22:00' },
      tuesday: { start: '14:00', end: '22:00' },
      wednesday: { start: '14:00', end: '22:00' },
      thursday: null,
      friday: { start: '14:00', end: '22:00' },
      saturday: { start: '10:00', end: '18:00' },
      sunday: null,
    },
    salesMetrics: {
      totalRevenue: 98500,
      totalTransactions: 820,
      avgTicket: 120.12,
      conversionRate: 68.9,
      monthlyRevenue: [8200, 8900, 9100, 8700, 9500, 8800],
      itemsSold: 1890,
      returnsHandled: 28,
      customerSatisfaction: 4.3,
    },
    status: 'ACTIVE',
    avatar: 'CV',
    department: 'Ventas',
    salary: 1900,
    performanceScore: 76,
    certifications: ['CBD Basico', 'Atencion al Cliente'],
    notes: 'Buen rendimiento en turno de tarde. Especialista en flores.',
  },
  {
    id: 'emp-004',
    name: 'Isabel Torres',
    email: 'isabel.torres@cbdsaas.com',
    phone: '+34 644 555 666',
    role: UserRole.MANAGER,
    storeId: '2',
    storeName: 'Valencia Puerto',
    hireDate: daysAgo(600),
    schedule: {
      monday: { start: '09:00', end: '17:00' },
      tuesday: { start: '09:00', end: '17:00' },
      wednesday: { start: '09:00', end: '17:00' },
      thursday: { start: '09:00', end: '17:00' },
      friday: { start: '09:00', end: '15:00' },
      saturday: null,
      sunday: null,
    },
    salesMetrics: {
      totalRevenue: 165200,
      totalTransactions: 1100,
      avgTicket: 150.18,
      conversionRate: 75.2,
      monthlyRevenue: [13500, 14200, 13800, 15100, 14600, 13900],
      itemsSold: 2800,
      returnsHandled: 38,
      customerSatisfaction: 4.7,
    },
    status: 'ACTIVE',
    avatar: 'IT',
    department: 'Ventas',
    salary: 3000,
    performanceScore: 91,
    certifications: ['CBD Expert', 'Gestion de Equipos', 'Primeros Auxilios'],
    notes: 'Excelente liderazgo. Tienda Valencia crece cada trimestre.',
  },
  {
    id: 'emp-005',
    name: 'David Moreno',
    email: 'david.moreno@cbdsaas.com',
    phone: '+34 655 666 777',
    role: UserRole.EMPLOYEE,
    storeId: '3',
    storeName: 'Barcelona Gotico',
    hireDate: daysAgo(200),
    schedule: {
      monday: { start: '09:00', end: '17:00' },
      tuesday: null,
      wednesday: { start: '09:00', end: '17:00' },
      thursday: { start: '09:00', end: '17:00' },
      friday: { start: '09:00', end: '17:00' },
      saturday: { start: '10:00', end: '14:00' },
      sunday: null,
    },
    salesMetrics: {
      totalRevenue: 67300,
      totalTransactions: 580,
      avgTicket: 116.03,
      conversionRate: 65.4,
      monthlyRevenue: [5800, 6200, 5900, 6500, 6100, 5800],
      itemsSold: 1340,
      returnsHandled: 22,
      customerSatisfaction: 4.1,
    },
    status: 'ACTIVE',
    avatar: 'DM',
    department: 'Ventas',
    salary: 1800,
    performanceScore: 72,
    certifications: ['CBD Basico'],
    notes: 'En formacion continua. Mejorando cada mes.',
  },
  {
    id: 'emp-006',
    name: 'Ana Jimenez',
    email: 'ana.jimenez@cbdsaas.com',
    phone: '+34 666 777 888',
    role: UserRole.MANAGER,
    storeId: '3',
    storeName: 'Barcelona Gotico',
    hireDate: daysAgo(900),
    schedule: {
      monday: { start: '09:00', end: '17:00' },
      tuesday: { start: '09:00', end: '17:00' },
      wednesday: { start: '09:00', end: '17:00' },
      thursday: { start: '09:00', end: '17:00' },
      friday: { start: '09:00', end: '15:00' },
      saturday: null,
      sunday: null,
    },
    salesMetrics: {
      totalRevenue: 198700,
      totalTransactions: 1380,
      avgTicket: 144.0,
      conversionRate: 80.1,
      monthlyRevenue: [16200, 17500, 16800, 18200, 17900, 16500],
      itemsSold: 3500,
      returnsHandled: 52,
      customerSatisfaction: 4.9,
    },
    status: 'ACTIVE',
    avatar: 'AJ',
    department: 'Ventas',
    salary: 3400,
    performanceScore: 97,
    certifications: ['CBD Expert', 'Gestion de Equipos', 'Marketing Digital', 'Primeros Auxilios'],
    notes: 'Top performer de la cadena. Candidata a Regional Manager.',
  },
  {
    id: 'emp-007',
    name: 'Pablo Herrera',
    email: 'pablo.herrera@cbdsaas.com',
    phone: '+34 677 888 999',
    role: UserRole.EMPLOYEE,
    storeId: '4',
    storeName: 'Alicante Marina',
    hireDate: daysAgo(150),
    schedule: {
      monday: { start: '10:00', end: '18:00' },
      tuesday: { start: '10:00', end: '18:00' },
      wednesday: { start: '10:00', end: '18:00' },
      thursday: null,
      friday: { start: '10:00', end: '18:00' },
      saturday: { start: '10:00', end: '14:00' },
      sunday: null,
    },
    salesMetrics: {
      totalRevenue: 45200,
      totalTransactions: 420,
      avgTicket: 107.62,
      conversionRate: 62.8,
      monthlyRevenue: [3800, 4200, 4500, 4100, 3900, 4200],
      itemsSold: 950,
      returnsHandled: 15,
      customerSatisfaction: 4.0,
    },
    status: 'ACTIVE',
    avatar: 'PH',
    department: 'Ventas',
    salary: 1750,
    performanceScore: 68,
    certifications: ['CBD Basico'],
    notes: 'Nuevo incorporacion. En periodo de mejora.',
  },
  {
    id: 'emp-008',
    name: 'Laura Mendez',
    email: 'laura.mendez@cbdsaas.com',
    phone: '+34 688 999 000',
    role: UserRole.EMPLOYEE,
    storeId: '4',
    storeName: 'Alicante Marina',
    hireDate: daysAgo(420),
    schedule: {
      monday: null,
      tuesday: { start: '09:00', end: '17:00' },
      wednesday: { start: '09:00', end: '17:00' },
      thursday: { start: '09:00', end: '17:00' },
      friday: { start: '09:00', end: '17:00' },
      saturday: { start: '10:00', end: '18:00' },
      sunday: null,
    },
    salesMetrics: {
      totalRevenue: 112400,
      totalTransactions: 890,
      avgTicket: 126.29,
      conversionRate: 74.1,
      monthlyRevenue: [9200, 9800, 10100, 9500, 10200, 9600],
      itemsSold: 2100,
      returnsHandled: 30,
      customerSatisfaction: 4.5,
    },
    status: 'ACTIVE',
    avatar: 'LM',
    department: 'Ventas',
    salary: 2000,
    performanceScore: 85,
    certifications: ['CBD Expert', 'Atencion al Cliente'],
    notes: 'Especialista en cosmetica CBD. Muy valorada por clientes.',
  },
  {
    id: 'emp-009',
    name: 'Roberto Castillo',
    email: 'roberto.castillo@cbdsaas.com',
    phone: '+34 699 000 111',
    role: UserRole.MANAGER,
    storeId: '5',
    storeName: 'Sevilla Triana',
    hireDate: daysAgo(500),
    schedule: {
      monday: { start: '09:00', end: '17:00' },
      tuesday: { start: '09:00', end: '17:00' },
      wednesday: { start: '09:00', end: '17:00' },
      thursday: { start: '09:00', end: '17:00' },
      friday: { start: '09:00', end: '15:00' },
      saturday: null,
      sunday: null,
    },
    salesMetrics: {
      totalRevenue: 142300,
      totalTransactions: 1020,
      avgTicket: 139.51,
      conversionRate: 73.8,
      monthlyRevenue: [11500, 12200, 11800, 12800, 12100, 11600],
      itemsSold: 2600,
      returnsHandled: 40,
      customerSatisfaction: 4.5,
    },
    status: 'ACTIVE',
    avatar: 'RC',
    department: 'Ventas',
    salary: 2900,
    performanceScore: 82,
    certifications: ['CBD Expert', 'Gestion de Equipos'],
    notes: 'Buen gestor. Tienda Sevilla en crecimiento sostenido.',
  },
  {
    id: 'emp-010',
    name: 'Lucia Navarro',
    email: 'lucia.navarro@cbdsaas.com',
    phone: '+34 610 111 222',
    role: UserRole.EMPLOYEE,
    storeId: '5',
    storeName: 'Sevilla Triana',
    hireDate: daysAgo(280),
    schedule: {
      monday: { start: '14:00', end: '22:00' },
      tuesday: { start: '14:00', end: '22:00' },
      wednesday: null,
      thursday: { start: '14:00', end: '22:00' },
      friday: { start: '14:00', end: '22:00' },
      saturday: { start: '10:00', end: '18:00' },
      sunday: null,
    },
    salesMetrics: {
      totalRevenue: 78900,
      totalTransactions: 680,
      avgTicket: 116.03,
      conversionRate: 70.2,
      monthlyRevenue: [6500, 7100, 6800, 7400, 7200, 6900],
      itemsSold: 1580,
      returnsHandled: 25,
      customerSatisfaction: 4.4,
    },
    status: 'ACTIVE',
    avatar: 'LN',
    department: 'Ventas',
    salary: 1850,
    performanceScore: 79,
    certifications: ['CBD Basico', 'Atencion al Cliente'],
    notes: 'Turno tarde. Buena actitud y mejora constante.',
  },
  {
    id: 'emp-011',
    name: 'Fernando Gil',
    email: 'fernando.gil@cbdsaas.com',
    phone: '+34 621 222 333',
    role: UserRole.EMPLOYEE,
    storeId: '1',
    storeName: 'Madrid Centro',
    hireDate: daysAgo(90),
    schedule: {
      monday: { start: '14:00', end: '22:00' },
      tuesday: null,
      wednesday: { start: '14:00', end: '22:00' },
      thursday: { start: '14:00', end: '22:00' },
      friday: { start: '14:00', end: '22:00' },
      saturday: { start: '10:00', end: '18:00' },
      sunday: null,
    },
    salesMetrics: {
      totalRevenue: 32100,
      totalTransactions: 310,
      avgTicket: 103.55,
      conversionRate: 58.9,
      monthlyRevenue: [2800, 3200, 3500, 3100, 3400, 3200],
      itemsSold: 720,
      returnsHandled: 12,
      customerSatisfaction: 3.9,
    },
    status: 'ACTIVE',
    avatar: 'FG',
    department: 'Ventas',
    salary: 1700,
    performanceScore: 62,
    certifications: ['CBD Basico'],
    notes: 'Recien incorporado. En periodo de formacion intensiva.',
  },
  {
    id: 'emp-012',
    name: 'Carmen Reyes',
    email: 'carmen.reyes@cbdsaas.com',
    phone: '+34 632 333 444',
    role: UserRole.EMPLOYEE,
    storeId: '3',
    storeName: 'Barcelona Gotico',
    hireDate: daysAgo(450),
    schedule: {
      monday: { start: '09:00', end: '17:00' },
      tuesday: { start: '09:00', end: '17:00' },
      wednesday: null,
      thursday: { start: '09:00', end: '17:00' },
      friday: { start: '09:00', end: '17:00' },
      saturday: null,
      sunday: { start: '10:00', end: '14:00' },
    },
    salesMetrics: {
      totalRevenue: 105600,
      totalTransactions: 850,
      avgTicket: 124.24,
      conversionRate: 71.5,
      monthlyRevenue: [8800, 9200, 8600, 9500, 9100, 8700],
      itemsSold: 2000,
      returnsHandled: 28,
      customerSatisfaction: 4.4,
    },
    status: 'ACTIVE',
    avatar: 'CR',
    department: 'Ventas',
    salary: 1950,
    performanceScore: 81,
    certifications: ['CBD Expert', 'Atencion al Cliente'],
    notes: 'Especialista en aceites. Excelentes recomendaciones a clientes.',
  },
  {
    id: 'emp-013',
    name: 'Miguel Santos',
    email: 'miguel.santos@cbdsaas.com',
    phone: '+34 643 444 555',
    role: UserRole.EMPLOYEE,
    storeId: '2',
    storeName: 'Valencia Puerto',
    hireDate: daysAgo(320),
    schedule: {
      monday: { start: '09:00', end: '17:00' },
      tuesday: { start: '09:00', end: '17:00' },
      wednesday: { start: '09:00', end: '17:00' },
      thursday: null,
      friday: { start: '09:00', end: '17:00' },
      saturday: null,
      sunday: { start: '10:00', end: '14:00' },
    },
    salesMetrics: {
      totalRevenue: 89200,
      totalTransactions: 740,
      avgTicket: 120.54,
      conversionRate: 69.8,
      monthlyRevenue: [7200, 7800, 7500, 8100, 7600, 7400],
      itemsSold: 1720,
      returnsHandled: 24,
      customerSatisfaction: 4.2,
    },
    status: 'ON_LEAVE',
    avatar: 'MS',
    department: 'Ventas',
    salary: 1900,
    performanceScore: 77,
    certifications: ['CBD Basico', 'Atencion al Cliente'],
    notes: 'De baja temporal por motivos personales. Retorno previsto en 2 semanas.',
  },
  {
    id: 'emp-014',
    name: 'Patricia Luna',
    email: 'patricia.luna@cbdsaas.com',
    phone: '+34 654 555 666',
    role: UserRole.MARKETING,
    storeId: '1',
    storeName: 'Madrid Centro',
    hireDate: daysAgo(400),
    schedule: {
      monday: { start: '09:00', end: '17:00' },
      tuesday: { start: '09:00', end: '17:00' },
      wednesday: { start: '09:00', end: '17:00' },
      thursday: { start: '09:00', end: '17:00' },
      friday: { start: '09:00', end: '15:00' },
      saturday: null,
      sunday: null,
    },
    salesMetrics: {
      totalRevenue: 0,
      totalTransactions: 0,
      avgTicket: 0,
      conversionRate: 0,
      monthlyRevenue: [0, 0, 0, 0, 0, 0],
      itemsSold: 0,
      returnsHandled: 0,
      customerSatisfaction: 0,
    },
    status: 'ACTIVE',
    avatar: 'PL',
    department: 'Marketing',
    salary: 2800,
    performanceScore: 89,
    certifications: ['Marketing Digital', 'Social Media', 'SEO/SEM'],
    notes: 'Responsable de marketing digital y campanas. Sede central.',
  },
]

// Helper functions
export function getEmployeeById(id: string): Employee | undefined {
  return MOCK_EMPLOYEES.find((e) => e.id === id)
}

export function getEmployeesByStore(storeId: string): Employee[] {
  return MOCK_EMPLOYEES.filter((e) => e.storeId === storeId)
}

export function getActiveEmployees(): Employee[] {
  return MOCK_EMPLOYEES.filter((e) => e.status === 'ACTIVE')
}

export function getEmployeeStatusColor(status: EmployeeStatus): string {
  const colors: Record<EmployeeStatus, string> = {
    ACTIVE: 'bg-green-500/20 text-green-400 border-green-500/30',
    INACTIVE: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    ON_LEAVE: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    TERMINATED: 'bg-red-500/20 text-red-400 border-red-500/30',
  }
  return colors[status]
}

export function getEmployeeStatusLabel(status: EmployeeStatus): string {
  const labels: Record<EmployeeStatus, string> = {
    ACTIVE: 'Activo',
    INACTIVE: 'Inactivo',
    ON_LEAVE: 'De Baja',
    TERMINATED: 'Baja Definitiva',
  }
  return labels[status]
}

export function getRoleLabel(role: UserRole): string {
  const labels: Record<UserRole, string> = {
    [UserRole.SUPER_ADMIN]: 'Super Admin',
    [UserRole.ADMIN]: 'Administrador',
    [UserRole.MANAGER]: 'Gerente',
    [UserRole.EMPLOYEE]: 'Empleado',
    [UserRole.ACCOUNTING]: 'Contabilidad',
    [UserRole.MARKETING]: 'Marketing',
  }
  return labels[role]
}

export function getRoleColor(role: UserRole): string {
  const colors: Record<UserRole, string> = {
    [UserRole.SUPER_ADMIN]: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    [UserRole.ADMIN]: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    [UserRole.MANAGER]: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    [UserRole.EMPLOYEE]: 'bg-green-500/20 text-green-400 border-green-500/30',
    [UserRole.ACCOUNTING]: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    [UserRole.MARKETING]: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  }
  return colors[role]
}
