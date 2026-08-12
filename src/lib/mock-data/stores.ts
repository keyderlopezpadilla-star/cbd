import { Store } from '@/types'

export interface StoreKPIs {
  dailySales: number
  dailyOrders: number
  stockAlerts: number
  employeeCount: number
  topProducts: { name: string; sales: number }[]
  monthlyRevenue: number
  averageTicket: number
  customerSatisfaction: number
}

export interface StoreRecentOrder {
  id: string
  orderNumber: string
  customerName: string
  total: number
  status: 'pending' | 'confirmed' | 'preparing' | 'shipped' | 'delivered'
  date: string
}

export interface StoreInventorySummary {
  totalProducts: number
  normalStock: number
  lowStock: number
  criticalStock: number
}

export interface StoreManager {
  id: string
  name: string
  email: string
  avatar: string | null
}

export const STORE_MANAGERS: StoreManager[] = [
  { id: 'mgr-1', name: 'Carlos Martinez', email: 'carlos@cbdsaas.com', avatar: null },
  { id: 'mgr-2', name: 'Ana Garcia', email: 'ana@cbdsaas.com', avatar: null },
  { id: 'mgr-3', name: 'Miguel Torres', email: 'miguel@cbdsaas.com', avatar: null },
  { id: 'mgr-4', name: 'Laura Fernandez', email: 'laura@cbdsaas.com', avatar: null },
  { id: 'mgr-5', name: 'Pablo Ruiz', email: 'pablo@cbdsaas.com', avatar: null },
]

export const MOCK_STORES: Store[] = [
  {
    id: '1',
    name: 'Madrid Centro',
    address: 'Calle Gran Via 42, Planta Baja',
    city: 'Madrid',
    postalCode: '28013',
    country: 'España',
    phone: '+34 91 234 5678',
    email: 'madrid@cbdsaas.com',
    managerId: 'mgr-1',
    latitude: 40.4200,
    longitude: -3.7025,
    isActive: true,
    createdAt: new Date('2023-03-15'),
    updatedAt: new Date('2024-01-10'),
  },
  {
    id: '2',
    name: 'Valencia Puerto',
    address: 'Avenida del Puerto 128',
    city: 'Valencia',
    postalCode: '46023',
    country: 'España',
    phone: '+34 96 345 6789',
    email: 'valencia@cbdsaas.com',
    managerId: 'mgr-2',
    latitude: 39.4561,
    longitude: -0.3220,
    isActive: true,
    createdAt: new Date('2023-05-20'),
    updatedAt: new Date('2024-01-08'),
  },
  {
    id: '3',
    name: 'Barcelona Gotico',
    address: 'Carrer de Ferran 18',
    city: 'Barcelona',
    postalCode: '08002',
    country: 'España',
    phone: '+34 93 456 7890',
    email: 'barcelona@cbdsaas.com',
    managerId: 'mgr-3',
    latitude: 41.3818,
    longitude: 2.1685,
    isActive: true,
    createdAt: new Date('2023-01-10'),
    updatedAt: new Date('2024-01-12'),
  },
  {
    id: '4',
    name: 'Alicante Marina',
    address: 'Paseo de la Explanada 7',
    city: 'Alicante',
    postalCode: '03001',
    country: 'España',
    phone: '+34 96 567 8901',
    email: 'alicante@cbdsaas.com',
    managerId: 'mgr-4',
    latitude: 38.3452,
    longitude: -0.4810,
    isActive: true,
    createdAt: new Date('2023-07-01'),
    updatedAt: new Date('2024-01-05'),
  },
  {
    id: '5',
    name: 'Sevilla Triana',
    address: 'Calle Betis 22',
    city: 'Sevilla',
    postalCode: '41010',
    country: 'España',
    phone: '+34 95 678 9012',
    email: 'sevilla@cbdsaas.com',
    managerId: 'mgr-5',
    latitude: 37.3826,
    longitude: -6.0030,
    isActive: false,
    createdAt: new Date('2023-09-15'),
    updatedAt: new Date('2024-01-02'),
  },
]

export const STORE_KPIS: Record<string, StoreKPIs> = {
  '1': {
    dailySales: 2450.80,
    dailyOrders: 18,
    stockAlerts: 3,
    employeeCount: 6,
    topProducts: [
      { name: 'Aceite CBD Premium 10%', sales: 520 },
      { name: 'Crema Facial CBD', sales: 380 },
      { name: 'Flores CBD Sativa', sales: 290 },
    ],
    monthlyRevenue: 52340,
    averageTicket: 136.15,
    customerSatisfaction: 4.7,
  },
  '2': {
    dailySales: 1890.50,
    dailyOrders: 14,
    stockAlerts: 1,
    employeeCount: 4,
    topProducts: [
      { name: 'Capsulas CBD 25mg', sales: 410 },
      { name: 'Aceite CBD Full Spectrum', sales: 350 },
      { name: 'Balsamo CBD Sport', sales: 280 },
    ],
    monthlyRevenue: 41200,
    averageTicket: 135.04,
    customerSatisfaction: 4.5,
  },
  '3': {
    dailySales: 3120.00,
    dailyOrders: 22,
    stockAlerts: 5,
    employeeCount: 7,
    topProducts: [
      { name: 'Aceite CBD Premium 20%', sales: 680 },
      { name: 'Pack Bienestar CBD', sales: 520 },
      { name: 'Infusion CBD Relax', sales: 340 },
    ],
    monthlyRevenue: 68500,
    averageTicket: 141.82,
    customerSatisfaction: 4.8,
  },
  '4': {
    dailySales: 1540.25,
    dailyOrders: 11,
    stockAlerts: 2,
    employeeCount: 4,
    topProducts: [
      { name: 'Aceite CBD 5%', sales: 320 },
      { name: 'Crema Corporal CBD', sales: 250 },
      { name: 'Gomitas CBD', sales: 190 },
    ],
    monthlyRevenue: 33800,
    averageTicket: 140.02,
    customerSatisfaction: 4.4,
  },
  '5': {
    dailySales: 0,
    dailyOrders: 0,
    stockAlerts: 8,
    employeeCount: 3,
    topProducts: [
      { name: 'Aceite CBD Premium 10%', sales: 0 },
      { name: 'Flores CBD Indica', sales: 0 },
      { name: 'Serum CBD Anti-Edad', sales: 0 },
    ],
    monthlyRevenue: 0,
    averageTicket: 0,
    customerSatisfaction: 0,
  },
}

export const STORE_RECENT_ORDERS: Record<string, StoreRecentOrder[]> = {
  '1': [
    { id: 'ord-101', orderNumber: 'ORD-2024-0101', customerName: 'Maria Lopez', total: 89.90, status: 'delivered', date: '2024-01-15' },
    { id: 'ord-102', orderNumber: 'ORD-2024-0102', customerName: 'Juan Perez', total: 156.50, status: 'shipped', date: '2024-01-15' },
    { id: 'ord-103', orderNumber: 'ORD-2024-0103', customerName: 'Elena Rodriguez', total: 245.00, status: 'preparing', date: '2024-01-14' },
    { id: 'ord-104', orderNumber: 'ORD-2024-0104', customerName: 'Pedro Sanchez', total: 67.80, status: 'confirmed', date: '2024-01-14' },
    { id: 'ord-105', orderNumber: 'ORD-2024-0105', customerName: 'Sofia Martinez', total: 198.30, status: 'pending', date: '2024-01-13' },
  ],
  '2': [
    { id: 'ord-201', orderNumber: 'ORD-2024-0201', customerName: 'Luis Hernandez', total: 134.50, status: 'delivered', date: '2024-01-15' },
    { id: 'ord-202', orderNumber: 'ORD-2024-0202', customerName: 'Carmen Diaz', total: 89.00, status: 'shipped', date: '2024-01-15' },
    { id: 'ord-203', orderNumber: 'ORD-2024-0203', customerName: 'Alberto Gomez', total: 210.75, status: 'preparing', date: '2024-01-14' },
    { id: 'ord-204', orderNumber: 'ORD-2024-0204', customerName: 'Marta Ruiz', total: 45.90, status: 'confirmed', date: '2024-01-14' },
    { id: 'ord-205', orderNumber: 'ORD-2024-0205', customerName: 'Fernando Morales', total: 178.00, status: 'pending', date: '2024-01-13' },
  ],
  '3': [
    { id: 'ord-301', orderNumber: 'ORD-2024-0301', customerName: 'Patricia Vega', total: 312.00, status: 'delivered', date: '2024-01-15' },
    { id: 'ord-302', orderNumber: 'ORD-2024-0302', customerName: 'Ricardo Navarro', total: 167.50, status: 'shipped', date: '2024-01-15' },
    { id: 'ord-303', orderNumber: 'ORD-2024-0303', customerName: 'Isabel Moreno', total: 98.25, status: 'preparing', date: '2024-01-14' },
    { id: 'ord-304', orderNumber: 'ORD-2024-0304', customerName: 'Diego Castro', total: 445.00, status: 'confirmed', date: '2024-01-14' },
    { id: 'ord-305', orderNumber: 'ORD-2024-0305', customerName: 'Lucia Blanco', total: 76.80, status: 'pending', date: '2024-01-13' },
  ],
  '4': [
    { id: 'ord-401', orderNumber: 'ORD-2024-0401', customerName: 'Antonio Gil', total: 145.60, status: 'delivered', date: '2024-01-15' },
    { id: 'ord-402', orderNumber: 'ORD-2024-0402', customerName: 'Rosa Flores', total: 220.00, status: 'shipped', date: '2024-01-15' },
    { id: 'ord-403', orderNumber: 'ORD-2024-0403', customerName: 'Javier Ortega', total: 88.90, status: 'preparing', date: '2024-01-14' },
    { id: 'ord-404', orderNumber: 'ORD-2024-0404', customerName: 'Paula Herrera', total: 134.50, status: 'confirmed', date: '2024-01-14' },
    { id: 'ord-405', orderNumber: 'ORD-2024-0405', customerName: 'Marcos Ramos', total: 56.70, status: 'pending', date: '2024-01-13' },
  ],
  '5': [
    { id: 'ord-501', orderNumber: 'ORD-2024-0501', customerName: 'Natalia Serrano', total: 178.90, status: 'delivered', date: '2024-01-02' },
    { id: 'ord-502', orderNumber: 'ORD-2024-0502', customerName: 'Andres Molina', total: 95.00, status: 'delivered', date: '2024-01-01' },
    { id: 'ord-503', orderNumber: 'ORD-2024-0503', customerName: 'Clara Jimenez', total: 267.50, status: 'delivered', date: '2023-12-30' },
    { id: 'ord-504', orderNumber: 'ORD-2024-0504', customerName: 'Victor Sanz', total: 112.30, status: 'delivered', date: '2023-12-29' },
    { id: 'ord-505', orderNumber: 'ORD-2024-0505', customerName: 'Eva Dominguez', total: 89.60, status: 'delivered', date: '2023-12-28' },
  ],
}

export const STORE_INVENTORY_SUMMARY: Record<string, StoreInventorySummary> = {
  '1': { totalProducts: 85, normalStock: 72, lowStock: 10, criticalStock: 3 },
  '2': { totalProducts: 68, normalStock: 60, lowStock: 7, criticalStock: 1 },
  '3': { totalProducts: 95, normalStock: 78, lowStock: 12, criticalStock: 5 },
  '4': { totalProducts: 54, normalStock: 47, lowStock: 5, criticalStock: 2 },
  '5': { totalProducts: 42, normalStock: 28, lowStock: 6, criticalStock: 8 },
}

export function getStoreById(id: string): Store | undefined {
  return MOCK_STORES.find((store) => store.id === id)
}

export function getStoreManager(managerId: string | null): StoreManager | undefined {
  if (!managerId) return undefined
  return STORE_MANAGERS.find((mgr) => mgr.id === managerId)
}

export function getStoreKPIs(storeId: string): StoreKPIs | undefined {
  return STORE_KPIS[storeId]
}

export function getStoreRecentOrders(storeId: string): StoreRecentOrder[] {
  return STORE_RECENT_ORDERS[storeId] || []
}

export function getStoreInventorySummary(storeId: string): StoreInventorySummary | undefined {
  return STORE_INVENTORY_SUMMARY[storeId]
}
