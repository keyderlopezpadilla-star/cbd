import { StockTransfer } from '@/types'
import { TransferStatus } from '@/lib/constants'

export interface TransferTimelineEntry {
  state: TransferStatus
  timestamp: Date
  actor: string
  notes?: string
}

// Mock transfers with various states
export const mockTransfers: StockTransfer[] = [
  // REQUESTED state (3 transfers)
  {
    id: 'trf-001',
    transferNumber: 'TRF-0042',
    fromStoreId: '1',
    toStoreId: '3',
    items: [
      { productId: 'prod-001', productName: 'Aceite CBD Premium 5%', quantity: 20 },
      { productId: 'prod-005', productName: 'Serum Facial CBD Anti-edad', quantity: 10 },
      { productId: 'prod-014', productName: 'Crema CBD Muscular Sport', quantity: 15 },
    ],
    status: TransferStatus.REQUESTED,
    requestedBy: 'Carlos Martinez',
    approvedBy: null,
    notes: 'Barcelona necesita stock urgente para campana de verano',
    createdAt: new Date('2024-03-18T09:30:00'),
    updatedAt: new Date('2024-03-18T09:30:00'),
  },
  {
    id: 'trf-002',
    transferNumber: 'TRF-0043',
    fromStoreId: '2',
    toStoreId: '5',
    items: [
      { productId: 'prod-008', productName: 'Flores CBD Amnesia Haze', quantity: 50 },
      { productId: 'prod-009', productName: 'Flores CBD OG Kush', quantity: 30 },
    ],
    status: TransferStatus.REQUESTED,
    requestedBy: 'Maria Lopez',
    approvedBy: null,
    notes: 'Sevilla agotando stock de flores, Valencia tiene excedente',
    createdAt: new Date('2024-03-19T11:00:00'),
    updatedAt: new Date('2024-03-19T11:00:00'),
  },
  {
    id: 'trf-003',
    transferNumber: 'TRF-0044',
    fromStoreId: '4',
    toStoreId: '1',
    items: [
      { productId: 'prod-017', productName: 'Infusion CBD Relax', quantity: 40 },
      { productId: 'prod-018', productName: 'Gominolas CBD Frutas 10mg', quantity: 25 },
      { productId: 'prod-011', productName: 'Capsulas CBD 10mg Sueno', quantity: 20 },
    ],
    status: TransferStatus.REQUESTED,
    requestedBy: 'Ana Garcia',
    approvedBy: null,
    notes: null,
    createdAt: new Date('2024-03-20T08:15:00'),
    updatedAt: new Date('2024-03-20T08:15:00'),
  },

  // APPROVED state (2 transfers)
  {
    id: 'trf-004',
    transferNumber: 'TRF-0039',
    fromStoreId: '1',
    toStoreId: '4',
    items: [
      { productId: 'prod-002', productName: 'Aceite CBD Intenso 10%', quantity: 15 },
      { productId: 'prod-003', productName: 'Aceite CBD Ultra 20%', quantity: 8 },
      { productId: 'prod-012', productName: 'Capsulas CBD 25mg Concentracion', quantity: 20 },
    ],
    status: TransferStatus.APPROVED,
    requestedBy: 'Pedro Sanchez',
    approvedBy: 'Laura Fernandez',
    notes: 'Aprobado - Alicante necesita aceites de alta gama para clientela premium',
    createdAt: new Date('2024-03-15T10:00:00'),
    updatedAt: new Date('2024-03-16T14:30:00'),
  },
  {
    id: 'trf-005',
    transferNumber: 'TRF-0040',
    fromStoreId: '3',
    toStoreId: '2',
    items: [
      { productId: 'prod-020', productName: 'Vaporizador CBD Pen Starter', quantity: 12 },
      { productId: 'prod-021', productName: 'Grinder Premium 4 piezas', quantity: 18 },
    ],
    status: TransferStatus.APPROVED,
    requestedBy: 'Javier Ruiz',
    approvedBy: 'Laura Fernandez',
    notes: 'Equilibrar stock de accesorios entre tiendas',
    createdAt: new Date('2024-03-16T09:00:00'),
    updatedAt: new Date('2024-03-17T11:00:00'),
  },

  // PREPARING state (1 transfer)
  {
    id: 'trf-006',
    transferNumber: 'TRF-0037',
    fromStoreId: '1',
    toStoreId: '2',
    items: [
      { productId: 'prod-014', productName: 'Crema CBD Muscular Sport', quantity: 25 },
      { productId: 'prod-015', productName: 'Crema Hidratante CBD Facial', quantity: 20 },
      { productId: 'prod-016', productName: 'Crema CBD Articulaciones', quantity: 15 },
      { productId: 'prod-006', productName: 'Balsamo Labial CBD', quantity: 30 },
    ],
    status: TransferStatus.PREPARING,
    requestedBy: 'Maria Lopez',
    approvedBy: 'Laura Fernandez',
    notes: 'Preparar con cuidado - productos cosmeticos sensibles a temperatura',
    createdAt: new Date('2024-03-12T08:00:00'),
    updatedAt: new Date('2024-03-15T16:00:00'),
  },

  // IN_TRANSIT state (2 transfers)
  {
    id: 'trf-007',
    transferNumber: 'TRF-0035',
    fromStoreId: '2',
    toStoreId: '4',
    items: [
      { productId: 'prod-001', productName: 'Aceite CBD Premium 5%', quantity: 30 },
      { productId: 'prod-004', productName: 'Aceite CBD Mascotas 3%', quantity: 15 },
      { productId: 'prod-022', productName: 'Kit Dosificacion Aceite CBD', quantity: 20 },
    ],
    status: TransferStatus.IN_TRANSIT,
    requestedBy: 'Ana Garcia',
    approvedBy: 'Carlos Martinez',
    notes: 'Enviado con mensajeria express - llegada estimada manana',
    createdAt: new Date('2024-03-10T09:00:00'),
    updatedAt: new Date('2024-03-14T10:00:00'),
  },
  {
    id: 'trf-008',
    transferNumber: 'TRF-0036',
    fromStoreId: '5',
    toStoreId: '3',
    items: [
      { productId: 'prod-019', productName: 'Proteina Whey + CBD Recovery', quantity: 10 },
      { productId: 'prod-010', productName: 'Flores CBD Gorilla Glue', quantity: 40 },
    ],
    status: TransferStatus.IN_TRANSIT,
    requestedBy: 'Javier Ruiz',
    approvedBy: 'Laura Fernandez',
    notes: 'Transporte refrigerado contratado para las flores',
    createdAt: new Date('2024-03-11T11:00:00'),
    updatedAt: new Date('2024-03-14T08:30:00'),
  },

  // RECEIVED state (5 transfers)
  {
    id: 'trf-009',
    transferNumber: 'TRF-0028',
    fromStoreId: '1',
    toStoreId: '5',
    items: [
      { productId: 'prod-002', productName: 'Aceite CBD Intenso 10%', quantity: 20 },
      { productId: 'prod-011', productName: 'Capsulas CBD 10mg Sueno', quantity: 30 },
    ],
    status: TransferStatus.RECEIVED,
    requestedBy: 'Pedro Sanchez',
    approvedBy: 'Carlos Martinez',
    notes: 'Recibido en perfectas condiciones',
    createdAt: new Date('2024-02-20T10:00:00'),
    updatedAt: new Date('2024-02-25T16:00:00'),
  },
  {
    id: 'trf-010',
    transferNumber: 'TRF-0029',
    fromStoreId: '3',
    toStoreId: '1',
    items: [
      { productId: 'prod-005', productName: 'Serum Facial CBD Anti-edad', quantity: 15 },
      { productId: 'prod-015', productName: 'Crema Hidratante CBD Facial', quantity: 12 },
      { productId: 'prod-006', productName: 'Balsamo Labial CBD', quantity: 25 },
    ],
    status: TransferStatus.RECEIVED,
    requestedBy: 'Maria Lopez',
    approvedBy: 'Laura Fernandez',
    notes: null,
    createdAt: new Date('2024-02-22T09:00:00'),
    updatedAt: new Date('2024-02-27T14:30:00'),
  },
  {
    id: 'trf-011',
    transferNumber: 'TRF-0030',
    fromStoreId: '4',
    toStoreId: '2',
    items: [
      { productId: 'prod-008', productName: 'Flores CBD Amnesia Haze', quantity: 35 },
      { productId: 'prod-009', productName: 'Flores CBD OG Kush', quantity: 25 },
      { productId: 'prod-010', productName: 'Flores CBD Gorilla Glue', quantity: 20 },
    ],
    status: TransferStatus.RECEIVED,
    requestedBy: 'Javier Ruiz',
    approvedBy: 'Carlos Martinez',
    notes: 'Todo correcto, verificado lote a lote',
    createdAt: new Date('2024-02-25T08:30:00'),
    updatedAt: new Date('2024-03-01T11:00:00'),
  },
  {
    id: 'trf-012',
    transferNumber: 'TRF-0031',
    fromStoreId: '2',
    toStoreId: '1',
    items: [
      { productId: 'prod-017', productName: 'Infusion CBD Relax', quantity: 50 },
      { productId: 'prod-018', productName: 'Gominolas CBD Frutas 10mg', quantity: 40 },
    ],
    status: TransferStatus.RECEIVED,
    requestedBy: 'Ana Garcia',
    approvedBy: 'Laura Fernandez',
    notes: 'Stock repuesto para Madrid antes del fin de semana',
    createdAt: new Date('2024-03-01T10:00:00'),
    updatedAt: new Date('2024-03-05T09:00:00'),
  },
  {
    id: 'trf-013',
    transferNumber: 'TRF-0032',
    fromStoreId: '5',
    toStoreId: '4',
    items: [
      { productId: 'prod-012', productName: 'Capsulas CBD 25mg Concentracion', quantity: 18 },
      { productId: 'prod-013', productName: 'Capsulas CBD 50mg Forte', quantity: 10 },
    ],
    status: TransferStatus.RECEIVED,
    requestedBy: 'Pedro Sanchez',
    approvedBy: 'Carlos Martinez',
    notes: null,
    createdAt: new Date('2024-03-03T14:00:00'),
    updatedAt: new Date('2024-03-07T16:30:00'),
  },

  // CANCELLED state (1 transfer)
  {
    id: 'trf-014',
    transferNumber: 'TRF-0033',
    fromStoreId: '3',
    toStoreId: '5',
    items: [
      { productId: 'prod-003', productName: 'Aceite CBD Ultra 20%', quantity: 10 },
      { productId: 'prod-013', productName: 'Capsulas CBD 50mg Forte', quantity: 12 },
    ],
    status: TransferStatus.CANCELLED,
    requestedBy: 'Maria Lopez',
    approvedBy: null,
    notes: 'Cancelada - Sevilla recibio stock directo del proveedor',
    createdAt: new Date('2024-03-05T11:00:00'),
    updatedAt: new Date('2024-03-06T09:00:00'),
  },
]

// Timeline data for each transfer
export const mockTransferTimelines: Record<string, TransferTimelineEntry[]> = {
  'trf-001': [
    { state: TransferStatus.REQUESTED, timestamp: new Date('2024-03-18T09:30:00'), actor: 'Carlos Martinez', notes: 'Solicitud creada' },
  ],
  'trf-002': [
    { state: TransferStatus.REQUESTED, timestamp: new Date('2024-03-19T11:00:00'), actor: 'Maria Lopez', notes: 'Solicitud creada' },
  ],
  'trf-003': [
    { state: TransferStatus.REQUESTED, timestamp: new Date('2024-03-20T08:15:00'), actor: 'Ana Garcia', notes: 'Solicitud creada' },
  ],
  'trf-004': [
    { state: TransferStatus.REQUESTED, timestamp: new Date('2024-03-15T10:00:00'), actor: 'Pedro Sanchez', notes: 'Solicitud creada' },
    { state: TransferStatus.APPROVED, timestamp: new Date('2024-03-16T14:30:00'), actor: 'Laura Fernandez', notes: 'Aprobado - stock verificado' },
  ],
  'trf-005': [
    { state: TransferStatus.REQUESTED, timestamp: new Date('2024-03-16T09:00:00'), actor: 'Javier Ruiz', notes: 'Solicitud creada' },
    { state: TransferStatus.APPROVED, timestamp: new Date('2024-03-17T11:00:00'), actor: 'Laura Fernandez', notes: 'Aprobado' },
  ],
  'trf-006': [
    { state: TransferStatus.REQUESTED, timestamp: new Date('2024-03-12T08:00:00'), actor: 'Maria Lopez', notes: 'Solicitud creada' },
    { state: TransferStatus.APPROVED, timestamp: new Date('2024-03-13T10:00:00'), actor: 'Laura Fernandez', notes: 'Aprobado - prioridad media' },
    { state: TransferStatus.PREPARING, timestamp: new Date('2024-03-15T16:00:00'), actor: 'Carlos Martinez', notes: 'Embalaje iniciado' },
  ],
  'trf-007': [
    { state: TransferStatus.REQUESTED, timestamp: new Date('2024-03-10T09:00:00'), actor: 'Ana Garcia', notes: 'Solicitud creada' },
    { state: TransferStatus.APPROVED, timestamp: new Date('2024-03-11T08:00:00'), actor: 'Carlos Martinez', notes: 'Aprobado' },
    { state: TransferStatus.PREPARING, timestamp: new Date('2024-03-12T09:30:00'), actor: 'Pedro Sanchez', notes: 'Productos embalados' },
    { state: TransferStatus.IN_TRANSIT, timestamp: new Date('2024-03-14T10:00:00'), actor: 'Pedro Sanchez', notes: 'Enviado con SEUR Express' },
  ],
  'trf-008': [
    { state: TransferStatus.REQUESTED, timestamp: new Date('2024-03-11T11:00:00'), actor: 'Javier Ruiz', notes: 'Solicitud creada' },
    { state: TransferStatus.APPROVED, timestamp: new Date('2024-03-12T09:00:00'), actor: 'Laura Fernandez', notes: 'Aprobado - envio refrigerado necesario' },
    { state: TransferStatus.PREPARING, timestamp: new Date('2024-03-13T08:00:00'), actor: 'Maria Lopez', notes: 'Preparacion con embalaje termico' },
    { state: TransferStatus.IN_TRANSIT, timestamp: new Date('2024-03-14T08:30:00'), actor: 'Maria Lopez', notes: 'Enviado con transporte refrigerado' },
  ],
  'trf-009': [
    { state: TransferStatus.REQUESTED, timestamp: new Date('2024-02-20T10:00:00'), actor: 'Pedro Sanchez', notes: 'Solicitud creada' },
    { state: TransferStatus.APPROVED, timestamp: new Date('2024-02-21T09:00:00'), actor: 'Carlos Martinez', notes: 'Aprobado' },
    { state: TransferStatus.PREPARING, timestamp: new Date('2024-02-22T10:00:00'), actor: 'Ana Garcia', notes: 'Preparado' },
    { state: TransferStatus.IN_TRANSIT, timestamp: new Date('2024-02-23T08:00:00'), actor: 'Ana Garcia', notes: 'Enviado' },
    { state: TransferStatus.RECEIVED, timestamp: new Date('2024-02-25T16:00:00'), actor: 'Pedro Sanchez', notes: 'Recibido correctamente' },
  ],
  'trf-010': [
    { state: TransferStatus.REQUESTED, timestamp: new Date('2024-02-22T09:00:00'), actor: 'Maria Lopez', notes: 'Solicitud creada' },
    { state: TransferStatus.APPROVED, timestamp: new Date('2024-02-23T10:00:00'), actor: 'Laura Fernandez', notes: 'Aprobado' },
    { state: TransferStatus.PREPARING, timestamp: new Date('2024-02-24T09:00:00'), actor: 'Javier Ruiz', notes: 'Preparado' },
    { state: TransferStatus.IN_TRANSIT, timestamp: new Date('2024-02-25T08:00:00'), actor: 'Javier Ruiz', notes: 'En camino' },
    { state: TransferStatus.RECEIVED, timestamp: new Date('2024-02-27T14:30:00'), actor: 'Maria Lopez', notes: 'Recibido sin incidencias' },
  ],
  'trf-011': [
    { state: TransferStatus.REQUESTED, timestamp: new Date('2024-02-25T08:30:00'), actor: 'Javier Ruiz', notes: 'Solicitud creada' },
    { state: TransferStatus.APPROVED, timestamp: new Date('2024-02-26T09:00:00'), actor: 'Carlos Martinez', notes: 'Aprobado' },
    { state: TransferStatus.PREPARING, timestamp: new Date('2024-02-27T10:00:00'), actor: 'Ana Garcia', notes: 'Preparado con verificacion de lotes' },
    { state: TransferStatus.IN_TRANSIT, timestamp: new Date('2024-02-28T08:00:00'), actor: 'Ana Garcia', notes: 'Enviado' },
    { state: TransferStatus.RECEIVED, timestamp: new Date('2024-03-01T11:00:00'), actor: 'Javier Ruiz', notes: 'Verificado lote a lote' },
  ],
  'trf-012': [
    { state: TransferStatus.REQUESTED, timestamp: new Date('2024-03-01T10:00:00'), actor: 'Ana Garcia', notes: 'Solicitud creada' },
    { state: TransferStatus.APPROVED, timestamp: new Date('2024-03-02T08:00:00'), actor: 'Laura Fernandez', notes: 'Aprobado - urgente' },
    { state: TransferStatus.PREPARING, timestamp: new Date('2024-03-02T14:00:00'), actor: 'Pedro Sanchez', notes: 'Preparado' },
    { state: TransferStatus.IN_TRANSIT, timestamp: new Date('2024-03-03T08:00:00'), actor: 'Pedro Sanchez', notes: 'Enviado express' },
    { state: TransferStatus.RECEIVED, timestamp: new Date('2024-03-05T09:00:00'), actor: 'Ana Garcia', notes: 'Recibido' },
  ],
  'trf-013': [
    { state: TransferStatus.REQUESTED, timestamp: new Date('2024-03-03T14:00:00'), actor: 'Pedro Sanchez', notes: 'Solicitud creada' },
    { state: TransferStatus.APPROVED, timestamp: new Date('2024-03-04T09:00:00'), actor: 'Carlos Martinez', notes: 'Aprobado' },
    { state: TransferStatus.PREPARING, timestamp: new Date('2024-03-05T08:00:00'), actor: 'Maria Lopez', notes: 'Preparado' },
    { state: TransferStatus.IN_TRANSIT, timestamp: new Date('2024-03-06T09:00:00'), actor: 'Maria Lopez', notes: 'Enviado' },
    { state: TransferStatus.RECEIVED, timestamp: new Date('2024-03-07T16:30:00'), actor: 'Pedro Sanchez', notes: 'Todo correcto' },
  ],
  'trf-014': [
    { state: TransferStatus.REQUESTED, timestamp: new Date('2024-03-05T11:00:00'), actor: 'Maria Lopez', notes: 'Solicitud creada' },
    { state: TransferStatus.CANCELLED, timestamp: new Date('2024-03-06T09:00:00'), actor: 'Laura Fernandez', notes: 'Cancelada - stock recibido directamente del proveedor' },
  ],
}

// Helper to get timeline for a transfer
export function getTransferTimeline(transferId: string): TransferTimelineEntry[] {
  return mockTransferTimelines[transferId] || []
}

// Helper to get transfer by ID
export function getTransferById(id: string): StockTransfer | undefined {
  return mockTransfers.find((t) => t.id === id)
}

// Helper to get store name by ID
export function getStoreName(storeId: string): string {
  const storeNames: Record<string, string> = {
    '1': 'Madrid Centro',
    '2': 'Valencia Puerto',
    '3': 'Barcelona Gotico',
    '4': 'Alicante Marina',
    '5': 'Sevilla Triana',
  }
  return storeNames[storeId] || 'Desconocida'
}

// Helper to get store city by ID
export function getStoreCity(storeId: string): string {
  const storeCities: Record<string, string> = {
    '1': 'Madrid',
    '2': 'Valencia',
    '3': 'Barcelona',
    '4': 'Alicante',
    '5': 'Sevilla',
  }
  return storeCities[storeId] || ''
}
