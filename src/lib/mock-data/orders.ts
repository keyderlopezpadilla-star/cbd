import { Order, OrderItem, Address } from '@/types'
import { OrderStatus } from '@/lib/constants'

export interface OrderTimelineEvent {
  id: string
  orderId: string
  status: OrderStatus
  timestamp: Date
  description: string
  user: string
}

export interface OrderCustomer {
  id: string
  name: string
  email: string
  phone: string
}

const MOCK_CUSTOMERS: OrderCustomer[] = [
  { id: 'cust-001', name: 'Maria Lopez', email: 'maria@email.com', phone: '+34 612 345 678' },
  { id: 'cust-002', name: 'Juan Perez', email: 'juan@email.com', phone: '+34 623 456 789' },
  { id: 'cust-003', name: 'Elena Rodriguez', email: 'elena@email.com', phone: '+34 634 567 890' },
  { id: 'cust-004', name: 'Pedro Sanchez', email: 'pedro@email.com', phone: '+34 645 678 901' },
  { id: 'cust-005', name: 'Sofia Martinez', email: 'sofia@email.com', phone: '+34 656 789 012' },
  { id: 'cust-006', name: 'Luis Hernandez', email: 'luis@email.com', phone: '+34 667 890 123' },
  { id: 'cust-007', name: 'Carmen Diaz', email: 'carmen@email.com', phone: '+34 678 901 234' },
  { id: 'cust-008', name: 'Alberto Gomez', email: 'alberto@email.com', phone: '+34 689 012 345' },
  { id: 'cust-009', name: 'Patricia Vega', email: 'patricia@email.com', phone: '+34 690 123 456' },
  { id: 'cust-010', name: 'Ricardo Navarro', email: 'ricardo@email.com', phone: '+34 601 234 567' },
]

const MOCK_ADDRESSES: Address[] = [
  { street: 'Calle Gran Via 42', city: 'Madrid', state: 'Madrid', postalCode: '28013', country: 'Espana' },
  { street: 'Avenida del Puerto 15', city: 'Valencia', state: 'Valencia', postalCode: '46023', country: 'Espana' },
  { street: 'Carrer de Ferran 8', city: 'Barcelona', state: 'Barcelona', postalCode: '08002', country: 'Espana' },
  { street: 'Paseo de la Explanada 12', city: 'Alicante', state: 'Alicante', postalCode: '03001', country: 'Espana' },
  { street: 'Calle Betis 5', city: 'Sevilla', state: 'Sevilla', postalCode: '41010', country: 'Espana' },
  { street: 'Plaza Mayor 3', city: 'Salamanca', state: 'Salamanca', postalCode: '37001', country: 'Espana' },
  { street: 'Calle Alcala 100', city: 'Madrid', state: 'Madrid', postalCode: '28009', country: 'Espana' },
  { street: 'Rambla Catalunya 45', city: 'Barcelona', state: 'Barcelona', postalCode: '08007', country: 'Espana' },
]

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ord-001',
    orderNumber: 'ORD-2024-0001',
    storeId: '1',
    customerId: 'cust-001',
    items: [
      { productId: 'prod-001', productName: 'Aceite CBD Premium 5%', quantity: 2, price: 29.99, total: 59.98 },
      { productId: 'prod-005', productName: 'Serum Facial CBD Anti-edad', quantity: 1, price: 45.99, total: 45.99 },
    ],
    subtotal: 105.97,
    tax: 22.25,
    shipping: 4.99,
    total: 133.21,
    status: OrderStatus.DELIVERED,
    shippingAddress: MOCK_ADDRESSES[0],
    trackingNumber: 'ES2024CBD001234',
    createdAt: new Date('2024-01-10T09:30:00'),
    updatedAt: new Date('2024-01-15T14:00:00'),
  },
  {
    id: 'ord-002',
    orderNumber: 'ORD-2024-0002',
    storeId: '1',
    customerId: 'cust-002',
    items: [
      { productId: 'prod-002', productName: 'Aceite CBD Intenso 10%', quantity: 1, price: 49.99, total: 49.99 },
      { productId: 'prod-014', productName: 'Crema CBD Muscular Sport', quantity: 2, price: 32.99, total: 65.98 },
    ],
    subtotal: 115.97,
    tax: 24.35,
    shipping: 4.99,
    total: 145.31,
    status: OrderStatus.SHIPPED,
    shippingAddress: MOCK_ADDRESSES[1],
    trackingNumber: 'ES2024CBD001235',
    createdAt: new Date('2024-01-12T11:15:00'),
    updatedAt: new Date('2024-01-14T16:30:00'),
  },
  {
    id: 'ord-003',
    orderNumber: 'ORD-2024-0003',
    storeId: '2',
    customerId: 'cust-003',
    items: [
      { productId: 'prod-011', productName: 'Capsulas CBD 10mg Sueno', quantity: 3, price: 34.99, total: 104.97 },
    ],
    subtotal: 104.97,
    tax: 22.04,
    shipping: 0,
    total: 127.01,
    status: OrderStatus.PREPARING,
    shippingAddress: MOCK_ADDRESSES[2],
    trackingNumber: null,
    createdAt: new Date('2024-01-14T08:45:00'),
    updatedAt: new Date('2024-01-14T12:00:00'),
  },
  {
    id: 'ord-004',
    orderNumber: 'ORD-2024-0004',
    storeId: '2',
    customerId: 'cust-004',
    items: [
      { productId: 'prod-008', productName: 'Flores CBD Amnesia Haze', quantity: 5, price: 8.99, total: 44.95 },
      { productId: 'prod-009', productName: 'Flores CBD OG Kush', quantity: 3, price: 9.99, total: 29.97 },
    ],
    subtotal: 74.92,
    tax: 15.73,
    shipping: 4.99,
    total: 95.64,
    status: OrderStatus.CONFIRMED,
    shippingAddress: MOCK_ADDRESSES[3],
    trackingNumber: null,
    createdAt: new Date('2024-01-14T10:20:00'),
    updatedAt: new Date('2024-01-14T10:45:00'),
  },
  {
    id: 'ord-005',
    orderNumber: 'ORD-2024-0005',
    storeId: '3',
    customerId: 'cust-005',
    items: [
      { productId: 'prod-003', productName: 'Aceite CBD Ultra 20%', quantity: 1, price: 89.99, total: 89.99 },
      { productId: 'prod-017', productName: 'Infusion CBD Relax', quantity: 2, price: 18.99, total: 37.98 },
      { productId: 'prod-018', productName: 'Gominolas CBD Frutas 10mg', quantity: 1, price: 29.99, total: 29.99 },
    ],
    subtotal: 157.96,
    tax: 33.17,
    shipping: 0,
    total: 191.13,
    status: OrderStatus.PENDING,
    shippingAddress: MOCK_ADDRESSES[4],
    trackingNumber: null,
    createdAt: new Date('2024-01-15T07:00:00'),
    updatedAt: new Date('2024-01-15T07:00:00'),
  },
  {
    id: 'ord-006',
    orderNumber: 'ORD-2024-0006',
    storeId: '3',
    customerId: 'cust-006',
    items: [
      { productId: 'prod-012', productName: 'Capsulas CBD 25mg Concentracion', quantity: 2, price: 54.99, total: 109.98 },
    ],
    subtotal: 109.98,
    tax: 23.10,
    shipping: 4.99,
    total: 138.07,
    status: OrderStatus.DELIVERED,
    shippingAddress: MOCK_ADDRESSES[5],
    trackingNumber: 'ES2024CBD001236',
    createdAt: new Date('2024-01-08T13:00:00'),
    updatedAt: new Date('2024-01-12T10:00:00'),
  },
  {
    id: 'ord-007',
    orderNumber: 'ORD-2024-0007',
    storeId: '1',
    customerId: 'cust-007',
    items: [
      { productId: 'prod-015', productName: 'Crema Hidratante CBD Facial', quantity: 1, price: 36.99, total: 36.99 },
      { productId: 'prod-006', productName: 'Balsamo Labial CBD', quantity: 3, price: 12.99, total: 38.97 },
    ],
    subtotal: 75.96,
    tax: 15.95,
    shipping: 4.99,
    total: 96.90,
    status: OrderStatus.CANCELLED,
    shippingAddress: MOCK_ADDRESSES[6],
    trackingNumber: null,
    createdAt: new Date('2024-01-11T15:30:00'),
    updatedAt: new Date('2024-01-12T09:00:00'),
  },
  {
    id: 'ord-008',
    orderNumber: 'ORD-2024-0008',
    storeId: '4',
    customerId: 'cust-008',
    items: [
      { productId: 'prod-019', productName: 'Proteina Whey + CBD Recovery', quantity: 1, price: 54.99, total: 54.99 },
      { productId: 'prod-014', productName: 'Crema CBD Muscular Sport', quantity: 1, price: 32.99, total: 32.99 },
    ],
    subtotal: 87.98,
    tax: 18.48,
    shipping: 4.99,
    total: 111.45,
    status: OrderStatus.SHIPPED,
    shippingAddress: MOCK_ADDRESSES[7],
    trackingNumber: 'ES2024CBD001237',
    createdAt: new Date('2024-01-13T09:15:00'),
    updatedAt: new Date('2024-01-15T08:00:00'),
  },
  {
    id: 'ord-009',
    orderNumber: 'ORD-2024-0009',
    storeId: '4',
    customerId: 'cust-009',
    items: [
      { productId: 'prod-010', productName: 'Flores CBD Gorilla Glue', quantity: 4, price: 11.99, total: 47.96 },
    ],
    subtotal: 47.96,
    tax: 10.07,
    shipping: 4.99,
    total: 63.02,
    status: OrderStatus.PENDING,
    shippingAddress: MOCK_ADDRESSES[0],
    trackingNumber: null,
    createdAt: new Date('2024-01-15T10:00:00'),
    updatedAt: new Date('2024-01-15T10:00:00'),
  },
  {
    id: 'ord-010',
    orderNumber: 'ORD-2024-0010',
    storeId: '3',
    customerId: 'cust-010',
    items: [
      { productId: 'prod-020', productName: 'Vaporizador CBD Pen Starter', quantity: 1, price: 29.99, total: 29.99 },
      { productId: 'prod-021', productName: 'Grinder Premium 4 piezas', quantity: 1, price: 19.99, total: 19.99 },
    ],
    subtotal: 49.98,
    tax: 10.50,
    shipping: 4.99,
    total: 65.47,
    status: OrderStatus.DELIVERED,
    shippingAddress: MOCK_ADDRESSES[1],
    trackingNumber: 'ES2024CBD001238',
    createdAt: new Date('2024-01-06T14:30:00'),
    updatedAt: new Date('2024-01-10T11:00:00'),
  },
  {
    id: 'ord-011',
    orderNumber: 'ORD-2024-0011',
    storeId: '1',
    customerId: 'cust-001',
    items: [
      { productId: 'prod-002', productName: 'Aceite CBD Intenso 10%', quantity: 2, price: 49.99, total: 99.98 },
      { productId: 'prod-022', productName: 'Kit Dosificacion Aceite CBD', quantity: 1, price: 14.99, total: 14.99 },
    ],
    subtotal: 114.97,
    tax: 24.14,
    shipping: 0,
    total: 139.11,
    status: OrderStatus.PREPARING,
    shippingAddress: MOCK_ADDRESSES[0],
    trackingNumber: null,
    createdAt: new Date('2024-01-14T16:00:00'),
    updatedAt: new Date('2024-01-15T09:30:00'),
  },
  {
    id: 'ord-012',
    orderNumber: 'ORD-2024-0012',
    storeId: '2',
    customerId: 'cust-003',
    items: [
      { productId: 'prod-016', productName: 'Crema CBD Articulaciones', quantity: 2, price: 39.99, total: 79.98 },
      { productId: 'prod-013', productName: 'Capsulas CBD 50mg Forte', quantity: 1, price: 79.99, total: 79.99 },
    ],
    subtotal: 159.97,
    tax: 33.59,
    shipping: 0,
    total: 193.56,
    status: OrderStatus.REFUNDED,
    shippingAddress: MOCK_ADDRESSES[2],
    trackingNumber: 'ES2024CBD001239',
    createdAt: new Date('2024-01-05T12:00:00'),
    updatedAt: new Date('2024-01-09T15:00:00'),
  },
  {
    id: 'ord-013',
    orderNumber: 'ORD-2024-0013',
    storeId: '3',
    customerId: 'cust-005',
    items: [
      { productId: 'prod-004', productName: 'Aceite CBD Mascotas 3%', quantity: 2, price: 24.99, total: 49.98 },
    ],
    subtotal: 49.98,
    tax: 10.50,
    shipping: 4.99,
    total: 65.47,
    status: OrderStatus.CONFIRMED,
    shippingAddress: MOCK_ADDRESSES[4],
    trackingNumber: null,
    createdAt: new Date('2024-01-15T08:30:00'),
    updatedAt: new Date('2024-01-15T09:00:00'),
  },
  {
    id: 'ord-014',
    orderNumber: 'ORD-2024-0014',
    storeId: '1',
    customerId: 'cust-006',
    items: [
      { productId: 'prod-001', productName: 'Aceite CBD Premium 5%', quantity: 1, price: 29.99, total: 29.99 },
      { productId: 'prod-011', productName: 'Capsulas CBD 10mg Sueno', quantity: 1, price: 34.99, total: 34.99 },
      { productId: 'prod-017', productName: 'Infusion CBD Relax', quantity: 3, price: 18.99, total: 56.97 },
    ],
    subtotal: 121.95,
    tax: 25.61,
    shipping: 0,
    total: 147.56,
    status: OrderStatus.SHIPPED,
    shippingAddress: MOCK_ADDRESSES[5],
    trackingNumber: 'ES2024CBD001240',
    createdAt: new Date('2024-01-13T07:45:00'),
    updatedAt: new Date('2024-01-14T18:00:00'),
  },
  {
    id: 'ord-015',
    orderNumber: 'ORD-2024-0015',
    storeId: '4',
    customerId: 'cust-008',
    items: [
      { productId: 'prod-018', productName: 'Gominolas CBD Frutas 10mg', quantity: 4, price: 29.99, total: 119.96 },
    ],
    subtotal: 119.96,
    tax: 25.19,
    shipping: 0,
    total: 145.15,
    status: OrderStatus.PENDING,
    shippingAddress: MOCK_ADDRESSES[7],
    trackingNumber: null,
    createdAt: new Date('2024-01-15T11:30:00'),
    updatedAt: new Date('2024-01-15T11:30:00'),
  },
  {
    id: 'ord-016',
    orderNumber: 'ORD-2024-0016',
    storeId: '2',
    customerId: 'cust-010',
    items: [
      { productId: 'prod-003', productName: 'Aceite CBD Ultra 20%', quantity: 1, price: 89.99, total: 89.99 },
      { productId: 'prod-005', productName: 'Serum Facial CBD Anti-edad', quantity: 2, price: 45.99, total: 91.98 },
    ],
    subtotal: 181.97,
    tax: 38.21,
    shipping: 4.99,
    total: 225.17,
    status: OrderStatus.DELIVERED,
    shippingAddress: MOCK_ADDRESSES[1],
    trackingNumber: 'ES2024CBD001241',
    createdAt: new Date('2024-01-07T10:00:00'),
    updatedAt: new Date('2024-01-11T14:30:00'),
  },
  {
    id: 'ord-017',
    orderNumber: 'ORD-2024-0017',
    storeId: '3',
    customerId: 'cust-007',
    items: [
      { productId: 'prod-009', productName: 'Flores CBD OG Kush', quantity: 6, price: 9.99, total: 59.94 },
      { productId: 'prod-010', productName: 'Flores CBD Gorilla Glue', quantity: 4, price: 11.99, total: 47.96 },
    ],
    subtotal: 107.90,
    tax: 22.66,
    shipping: 4.99,
    total: 135.55,
    status: OrderStatus.CANCELLED,
    shippingAddress: MOCK_ADDRESSES[6],
    trackingNumber: null,
    createdAt: new Date('2024-01-09T14:00:00'),
    updatedAt: new Date('2024-01-10T08:30:00'),
  },
  {
    id: 'ord-018',
    orderNumber: 'ORD-2024-0018',
    storeId: '1',
    customerId: 'cust-004',
    items: [
      { productId: 'prod-012', productName: 'Capsulas CBD 25mg Concentracion', quantity: 1, price: 54.99, total: 54.99 },
      { productId: 'prod-015', productName: 'Crema Hidratante CBD Facial', quantity: 1, price: 36.99, total: 36.99 },
    ],
    subtotal: 91.98,
    tax: 19.32,
    shipping: 4.99,
    total: 116.29,
    status: OrderStatus.CONFIRMED,
    shippingAddress: MOCK_ADDRESSES[3],
    trackingNumber: null,
    createdAt: new Date('2024-01-15T06:00:00'),
    updatedAt: new Date('2024-01-15T07:15:00'),
  },
]

export const MOCK_TIMELINE_EVENTS: OrderTimelineEvent[] = [
  // Order 001 - Delivered
  { id: 'evt-001', orderId: 'ord-001', status: OrderStatus.PENDING, timestamp: new Date('2024-01-10T09:30:00'), description: 'Pedido recibido', user: 'Sistema' },
  { id: 'evt-002', orderId: 'ord-001', status: OrderStatus.CONFIRMED, timestamp: new Date('2024-01-10T10:00:00'), description: 'Pago confirmado', user: 'Sistema' },
  { id: 'evt-003', orderId: 'ord-001', status: OrderStatus.PREPARING, timestamp: new Date('2024-01-11T08:00:00'), description: 'Preparando pedido', user: 'Carlos Martinez' },
  { id: 'evt-004', orderId: 'ord-001', status: OrderStatus.SHIPPED, timestamp: new Date('2024-01-12T14:30:00'), description: 'Enviado con SEUR', user: 'Carlos Martinez' },
  { id: 'evt-005', orderId: 'ord-001', status: OrderStatus.DELIVERED, timestamp: new Date('2024-01-15T14:00:00'), description: 'Entregado al cliente', user: 'Sistema' },
  // Order 002 - Shipped
  { id: 'evt-006', orderId: 'ord-002', status: OrderStatus.PENDING, timestamp: new Date('2024-01-12T11:15:00'), description: 'Pedido recibido', user: 'Sistema' },
  { id: 'evt-007', orderId: 'ord-002', status: OrderStatus.CONFIRMED, timestamp: new Date('2024-01-12T11:45:00'), description: 'Pago confirmado', user: 'Sistema' },
  { id: 'evt-008', orderId: 'ord-002', status: OrderStatus.PREPARING, timestamp: new Date('2024-01-13T09:00:00'), description: 'En preparacion', user: 'Ana Garcia' },
  { id: 'evt-009', orderId: 'ord-002', status: OrderStatus.SHIPPED, timestamp: new Date('2024-01-14T16:30:00'), description: 'Enviado con MRW', user: 'Ana Garcia' },
  // Order 005 - Pending
  { id: 'evt-010', orderId: 'ord-005', status: OrderStatus.PENDING, timestamp: new Date('2024-01-15T07:00:00'), description: 'Pedido recibido, pendiente de pago', user: 'Sistema' },
  // Order 007 - Cancelled
  { id: 'evt-011', orderId: 'ord-007', status: OrderStatus.PENDING, timestamp: new Date('2024-01-11T15:30:00'), description: 'Pedido recibido', user: 'Sistema' },
  { id: 'evt-012', orderId: 'ord-007', status: OrderStatus.CONFIRMED, timestamp: new Date('2024-01-11T16:00:00'), description: 'Pago confirmado', user: 'Sistema' },
  { id: 'evt-013', orderId: 'ord-007', status: OrderStatus.CANCELLED, timestamp: new Date('2024-01-12T09:00:00'), description: 'Cancelado por el cliente - producto no deseado', user: 'Carmen Diaz' },
  // Order 012 - Refunded
  { id: 'evt-014', orderId: 'ord-012', status: OrderStatus.PENDING, timestamp: new Date('2024-01-05T12:00:00'), description: 'Pedido recibido', user: 'Sistema' },
  { id: 'evt-015', orderId: 'ord-012', status: OrderStatus.CONFIRMED, timestamp: new Date('2024-01-05T12:30:00'), description: 'Pago confirmado', user: 'Sistema' },
  { id: 'evt-016', orderId: 'ord-012', status: OrderStatus.PREPARING, timestamp: new Date('2024-01-06T08:00:00'), description: 'Preparando pedido', user: 'Miguel Torres' },
  { id: 'evt-017', orderId: 'ord-012', status: OrderStatus.SHIPPED, timestamp: new Date('2024-01-06T17:00:00'), description: 'Enviado con Correos', user: 'Miguel Torres' },
  { id: 'evt-018', orderId: 'ord-012', status: OrderStatus.DELIVERED, timestamp: new Date('2024-01-08T12:00:00'), description: 'Entregado', user: 'Sistema' },
  { id: 'evt-019', orderId: 'ord-012', status: OrderStatus.REFUNDED, timestamp: new Date('2024-01-09T15:00:00'), description: 'Reembolso completo - producto defectuoso', user: 'Ana Garcia' },
]

// Valid status transitions
export const VALID_STATUS_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  [OrderStatus.PENDING]: [OrderStatus.CONFIRMED, OrderStatus.CANCELLED],
  [OrderStatus.CONFIRMED]: [OrderStatus.PREPARING, OrderStatus.CANCELLED],
  [OrderStatus.PREPARING]: [OrderStatus.SHIPPED, OrderStatus.CANCELLED],
  [OrderStatus.SHIPPED]: [OrderStatus.DELIVERED],
  [OrderStatus.DELIVERED]: [OrderStatus.REFUNDED],
  [OrderStatus.CANCELLED]: [],
  [OrderStatus.REFUNDED]: [],
}

// Helper functions
export function getOrderById(id: string): Order | undefined {
  return MOCK_ORDERS.find((order) => order.id === id)
}

export function getOrdersByStatus(status: OrderStatus): Order[] {
  return MOCK_ORDERS.filter((order) => order.status === status)
}

export function getOrdersByStore(storeId: string): Order[] {
  return MOCK_ORDERS.filter((order) => order.storeId === storeId)
}

export function getOrderTimelineEvents(orderId: string): OrderTimelineEvent[] {
  return MOCK_TIMELINE_EVENTS.filter((event) => event.orderId === orderId).sort(
    (a, b) => a.timestamp.getTime() - b.timestamp.getTime()
  )
}

export function getCustomerById(id: string): OrderCustomer | undefined {
  return MOCK_CUSTOMERS.find((c) => c.id === id)
}

export function getCustomers(): OrderCustomer[] {
  return MOCK_CUSTOMERS
}

export function canTransitionTo(currentStatus: OrderStatus, targetStatus: OrderStatus): boolean {
  return VALID_STATUS_TRANSITIONS[currentStatus].includes(targetStatus)
}

export function getValidNextStatuses(currentStatus: OrderStatus): OrderStatus[] {
  return VALID_STATUS_TRANSITIONS[currentStatus]
}

export function getOrderStats() {
  const totalOrders = MOCK_ORDERS.length
  const totalRevenue = MOCK_ORDERS.filter(
    (o) => o.status !== OrderStatus.CANCELLED && o.status !== OrderStatus.REFUNDED
  ).reduce((sum, o) => sum + o.total, 0)
  const pendingOrders = MOCK_ORDERS.filter((o) => o.status === OrderStatus.PENDING).length
  const shippedOrders = MOCK_ORDERS.filter((o) => o.status === OrderStatus.SHIPPED).length
  const deliveredOrders = MOCK_ORDERS.filter((o) => o.status === OrderStatus.DELIVERED).length
  const cancelledOrders = MOCK_ORDERS.filter((o) => o.status === OrderStatus.CANCELLED).length
  const avgProcessingHours = 36.5

  return {
    totalOrders,
    totalRevenue,
    pendingOrders,
    shippedOrders,
    deliveredOrders,
    cancelledOrders,
    avgProcessingHours,
  }
}
