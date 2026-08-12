import { InventoryItem } from '@/types'
import { StockStatus } from '@/lib/constants'

export interface StockMovement {
  id: string
  productId: string
  productName: string
  storeId: string
  storeName: string
  type: 'restock' | 'sale' | 'adjustment' | 'transfer'
  quantityChange: number
  previousQuantity: number
  newQuantity: number
  performedBy: string
  timestamp: Date
  notes: string | null
}

const STORE_NAMES: Record<string, string> = {
  '1': 'Madrid Centro',
  '2': 'Valencia Puerto',
  '3': 'Barcelona Gotico',
  '4': 'Alicante Marina',
  '5': 'Sevilla Triana',
}

const PRODUCT_NAMES: Record<string, string> = {
  'prod-001': 'Aceite CBD Premium 5%',
  'prod-002': 'Aceite CBD Intenso 10%',
  'prod-003': 'Aceite CBD Ultra 20%',
  'prod-004': 'Aceite CBD Mascotas 3%',
  'prod-005': 'Serum Facial CBD Anti-edad',
  'prod-006': 'Balsamo Labial CBD',
  'prod-007': 'Crema Contorno de Ojos CBD',
  'prod-008': 'Flores CBD Amnesia Haze',
  'prod-009': 'Flores CBD OG Kush',
  'prod-010': 'Flores CBD Gorilla Glue',
  'prod-011': 'Capsulas CBD 10mg Sueno',
  'prod-012': 'Capsulas CBD 25mg Concentracion',
  'prod-013': 'Capsulas CBD 50mg Forte',
  'prod-014': 'Crema CBD Muscular Sport',
  'prod-015': 'Crema Hidratante CBD Facial',
  'prod-016': 'Crema CBD Articulaciones',
  'prod-017': 'Infusion CBD Relax',
  'prod-018': 'Gominolas CBD Frutas 10mg',
  'prod-019': 'Proteina Whey + CBD Recovery',
  'prod-020': 'Vaporizador CBD Pen Starter',
  'prod-021': 'Grinder Premium 4 piezas',
  'prod-022': 'Kit Dosificacion Aceite CBD',
}

export { STORE_NAMES, PRODUCT_NAMES }

export const mockInventoryItems: InventoryItem[] = [
  // Madrid Centro (Store 1) - well stocked
  { id: 'inv-001', productId: 'prod-001', storeId: '1', quantity: 45, minStock: 10, maxStock: 100, status: StockStatus.NORMAL, lastRestocked: new Date('2024-03-10'), expiryDate: new Date('2025-06-15'), location: 'Estante A1' },
  { id: 'inv-002', productId: 'prod-002', storeId: '1', quantity: 32, minStock: 10, maxStock: 80, status: StockStatus.NORMAL, lastRestocked: new Date('2024-03-08'), expiryDate: new Date('2025-05-20'), location: 'Estante A2' },
  { id: 'inv-003', productId: 'prod-005', storeId: '1', quantity: 8, minStock: 10, maxStock: 50, status: StockStatus.LOW, lastRestocked: new Date('2024-02-20'), expiryDate: new Date('2025-01-10'), location: 'Estante B1' },
  { id: 'inv-004', productId: 'prod-008', storeId: '1', quantity: 3, minStock: 5, maxStock: 40, status: StockStatus.CRITICAL, lastRestocked: new Date('2024-02-15'), expiryDate: new Date('2024-05-01'), location: 'Estante C1' },
  { id: 'inv-005', productId: 'prod-011', storeId: '1', quantity: 22, minStock: 10, maxStock: 60, status: StockStatus.NORMAL, lastRestocked: new Date('2024-03-12'), expiryDate: new Date('2025-08-30'), location: 'Estante D1' },
  { id: 'inv-006', productId: 'prod-014', storeId: '1', quantity: 0, minStock: 5, maxStock: 30, status: StockStatus.OUT_OF_STOCK, lastRestocked: new Date('2024-01-10'), expiryDate: new Date('2025-03-15'), location: 'Estante B2' },
  { id: 'inv-007', productId: 'prod-017', storeId: '1', quantity: 55, minStock: 15, maxStock: 80, status: StockStatus.NORMAL, lastRestocked: new Date('2024-03-14'), expiryDate: new Date('2024-12-01'), location: 'Estante E1' },
  { id: 'inv-008', productId: 'prod-020', storeId: '1', quantity: 12, minStock: 5, maxStock: 25, status: StockStatus.NORMAL, lastRestocked: new Date('2024-03-01'), expiryDate: null, location: 'Vitrina 1' },
  { id: 'inv-009', productId: 'prod-018', storeId: '1', quantity: 4, minStock: 10, maxStock: 50, status: StockStatus.CRITICAL, lastRestocked: new Date('2024-02-28'), expiryDate: new Date('2024-04-20'), location: 'Estante E2' },
  // Valencia Puerto (Store 2)
  { id: 'inv-010', productId: 'prod-001', storeId: '2', quantity: 28, minStock: 10, maxStock: 80, status: StockStatus.NORMAL, lastRestocked: new Date('2024-03-09'), expiryDate: new Date('2025-06-15'), location: 'Zona A' },
  { id: 'inv-011', productId: 'prod-003', storeId: '2', quantity: 6, minStock: 8, maxStock: 40, status: StockStatus.LOW, lastRestocked: new Date('2024-02-25'), expiryDate: new Date('2025-04-10'), location: 'Zona A' },
  { id: 'inv-012', productId: 'prod-006', storeId: '2', quantity: 40, minStock: 15, maxStock: 60, status: StockStatus.NORMAL, lastRestocked: new Date('2024-03-11'), expiryDate: new Date('2025-09-20'), location: 'Zona B' },
  { id: 'inv-013', productId: 'prod-009', storeId: '2', quantity: 2, minStock: 5, maxStock: 30, status: StockStatus.CRITICAL, lastRestocked: new Date('2024-02-10'), expiryDate: new Date('2024-04-15'), location: 'Zona C' },
  { id: 'inv-014', productId: 'prod-012', storeId: '2', quantity: 18, minStock: 8, maxStock: 50, status: StockStatus.NORMAL, lastRestocked: new Date('2024-03-05'), expiryDate: new Date('2025-07-01'), location: 'Zona D' },
  { id: 'inv-015', productId: 'prod-015', storeId: '2', quantity: 9, minStock: 10, maxStock: 40, status: StockStatus.LOW, lastRestocked: new Date('2024-02-22'), expiryDate: new Date('2025-02-28'), location: 'Zona B' },
  { id: 'inv-016', productId: 'prod-019', storeId: '2', quantity: 25, minStock: 8, maxStock: 40, status: StockStatus.NORMAL, lastRestocked: new Date('2024-03-13'), expiryDate: new Date('2025-01-15'), location: 'Zona E' },
  { id: 'inv-017', productId: 'prod-021', storeId: '2', quantity: 15, minStock: 5, maxStock: 30, status: StockStatus.NORMAL, lastRestocked: new Date('2024-03-02'), expiryDate: null, location: 'Vitrina' },
  // Barcelona Gotico (Store 3) - busiest store
  { id: 'inv-018', productId: 'prod-001', storeId: '3', quantity: 60, minStock: 15, maxStock: 120, status: StockStatus.NORMAL, lastRestocked: new Date('2024-03-14'), expiryDate: new Date('2025-06-15'), location: 'Planta Baja A' },
  { id: 'inv-019', productId: 'prod-002', storeId: '3', quantity: 7, minStock: 10, maxStock: 80, status: StockStatus.LOW, lastRestocked: new Date('2024-02-28'), expiryDate: new Date('2025-05-20'), location: 'Planta Baja A' },
  { id: 'inv-020', productId: 'prod-004', storeId: '3', quantity: 35, minStock: 10, maxStock: 60, status: StockStatus.NORMAL, lastRestocked: new Date('2024-03-10'), expiryDate: new Date('2025-07-10'), location: 'Planta Baja B' },
  { id: 'inv-021', productId: 'prod-007', storeId: '3', quantity: 0, minStock: 5, maxStock: 25, status: StockStatus.OUT_OF_STOCK, lastRestocked: new Date('2024-01-20'), expiryDate: new Date('2024-11-30'), location: 'Planta 1 A' },
  { id: 'inv-022', productId: 'prod-010', storeId: '3', quantity: 4, minStock: 5, maxStock: 35, status: StockStatus.CRITICAL, lastRestocked: new Date('2024-02-18'), expiryDate: new Date('2024-04-25'), location: 'Planta 1 B' },
  { id: 'inv-023', productId: 'prod-013', storeId: '3', quantity: 42, minStock: 10, maxStock: 70, status: StockStatus.NORMAL, lastRestocked: new Date('2024-03-12'), expiryDate: new Date('2025-10-15'), location: 'Planta 1 C' },
  { id: 'inv-024', productId: 'prod-016', storeId: '3', quantity: 8, minStock: 10, maxStock: 40, status: StockStatus.LOW, lastRestocked: new Date('2024-02-25'), expiryDate: new Date('2025-04-01'), location: 'Planta Baja C' },
  { id: 'inv-025', productId: 'prod-018', storeId: '3', quantity: 50, minStock: 15, maxStock: 80, status: StockStatus.NORMAL, lastRestocked: new Date('2024-03-14'), expiryDate: new Date('2024-09-30'), location: 'Planta Baja D' },
  { id: 'inv-026', productId: 'prod-022', storeId: '3', quantity: 20, minStock: 5, maxStock: 40, status: StockStatus.NORMAL, lastRestocked: new Date('2024-03-05'), expiryDate: null, location: 'Vitrina Principal' },
  // Alicante Marina (Store 4)
  { id: 'inv-027', productId: 'prod-001', storeId: '4', quantity: 18, minStock: 8, maxStock: 60, status: StockStatus.NORMAL, lastRestocked: new Date('2024-03-07'), expiryDate: new Date('2025-06-15'), location: 'Seccion 1' },
  { id: 'inv-028', productId: 'prod-005', storeId: '4', quantity: 3, minStock: 5, maxStock: 30, status: StockStatus.CRITICAL, lastRestocked: new Date('2024-02-12'), expiryDate: new Date('2024-04-30'), location: 'Seccion 2' },
  { id: 'inv-029', productId: 'prod-008', storeId: '4', quantity: 22, minStock: 8, maxStock: 40, status: StockStatus.NORMAL, lastRestocked: new Date('2024-03-10'), expiryDate: new Date('2024-08-15'), location: 'Seccion 3' },
  { id: 'inv-030', productId: 'prod-011', storeId: '4', quantity: 0, minStock: 5, maxStock: 30, status: StockStatus.OUT_OF_STOCK, lastRestocked: new Date('2024-01-05'), expiryDate: new Date('2025-02-01'), location: 'Seccion 4' },
  { id: 'inv-031', productId: 'prod-014', storeId: '4', quantity: 14, minStock: 5, maxStock: 30, status: StockStatus.NORMAL, lastRestocked: new Date('2024-03-08'), expiryDate: new Date('2025-05-20'), location: 'Seccion 2' },
  { id: 'inv-032', productId: 'prod-017', storeId: '4', quantity: 7, minStock: 8, maxStock: 35, status: StockStatus.LOW, lastRestocked: new Date('2024-02-20'), expiryDate: new Date('2024-11-15'), location: 'Seccion 5' },
  { id: 'inv-033', productId: 'prod-020', storeId: '4', quantity: 10, minStock: 3, maxStock: 20, status: StockStatus.NORMAL, lastRestocked: new Date('2024-03-01'), expiryDate: null, location: 'Vitrina' },
  // Sevilla Triana (Store 5) - inactive store, low stock
  { id: 'inv-034', productId: 'prod-001', storeId: '5', quantity: 5, minStock: 10, maxStock: 60, status: StockStatus.LOW, lastRestocked: new Date('2024-01-15'), expiryDate: new Date('2025-06-15'), location: 'Pasillo 1' },
  { id: 'inv-035', productId: 'prod-003', storeId: '5', quantity: 0, minStock: 5, maxStock: 30, status: StockStatus.OUT_OF_STOCK, lastRestocked: new Date('2023-12-20'), expiryDate: new Date('2024-08-10'), location: 'Pasillo 1' },
  { id: 'inv-036', productId: 'prod-006', storeId: '5', quantity: 2, minStock: 5, maxStock: 25, status: StockStatus.CRITICAL, lastRestocked: new Date('2024-01-08'), expiryDate: new Date('2024-04-10'), location: 'Pasillo 2' },
  { id: 'inv-037', productId: 'prod-009', storeId: '5', quantity: 12, minStock: 5, maxStock: 30, status: StockStatus.NORMAL, lastRestocked: new Date('2024-01-20'), expiryDate: new Date('2024-06-01'), location: 'Pasillo 3' },
  { id: 'inv-038', productId: 'prod-012', storeId: '5', quantity: 1, minStock: 5, maxStock: 25, status: StockStatus.CRITICAL, lastRestocked: new Date('2024-01-02'), expiryDate: new Date('2025-03-01'), location: 'Pasillo 4' },
  { id: 'inv-039', productId: 'prod-015', storeId: '5', quantity: 0, minStock: 5, maxStock: 20, status: StockStatus.OUT_OF_STOCK, lastRestocked: new Date('2023-12-15'), expiryDate: new Date('2024-09-15'), location: 'Pasillo 2' },
  { id: 'inv-040', productId: 'prod-018', storeId: '5', quantity: 6, minStock: 8, maxStock: 30, status: StockStatus.LOW, lastRestocked: new Date('2024-01-10'), expiryDate: new Date('2024-05-20'), location: 'Pasillo 5' },
  { id: 'inv-041', productId: 'prod-021', storeId: '5', quantity: 8, minStock: 3, maxStock: 15, status: StockStatus.NORMAL, lastRestocked: new Date('2024-01-18'), expiryDate: null, location: 'Vitrina' },
  { id: 'inv-042', productId: 'prod-010', storeId: '1', quantity: 15, minStock: 5, maxStock: 35, status: StockStatus.NORMAL, lastRestocked: new Date('2024-03-06'), expiryDate: new Date('2024-07-20'), location: 'Estante C2' },
  { id: 'inv-043', productId: 'prod-016', storeId: '2', quantity: 30, minStock: 8, maxStock: 50, status: StockStatus.NORMAL, lastRestocked: new Date('2024-03-10'), expiryDate: new Date('2025-06-01'), location: 'Zona B' },
  { id: 'inv-044', productId: 'prod-004', storeId: '4', quantity: 9, minStock: 10, maxStock: 40, status: StockStatus.LOW, lastRestocked: new Date('2024-02-28'), expiryDate: new Date('2025-05-15'), location: 'Seccion 1' },
]

export const mockStockMovements: StockMovement[] = [
  { id: 'mov-001', productId: 'prod-001', productName: 'Aceite CBD Premium 5%', storeId: '1', storeName: 'Madrid Centro', type: 'restock', quantityChange: 50, previousQuantity: 10, newQuantity: 60, performedBy: 'Carlos Martinez', timestamp: new Date('2024-03-10T09:30:00'), notes: 'Pedido semanal recibido' },
  { id: 'mov-002', productId: 'prod-002', productName: 'Aceite CBD Intenso 10%', storeId: '1', storeName: 'Madrid Centro', type: 'sale', quantityChange: -3, previousQuantity: 35, newQuantity: 32, performedBy: 'Maria Lopez', timestamp: new Date('2024-03-14T14:22:00'), notes: null },
  { id: 'mov-003', productId: 'prod-008', productName: 'Flores CBD Amnesia Haze', storeId: '1', storeName: 'Madrid Centro', type: 'sale', quantityChange: -5, previousQuantity: 8, newQuantity: 3, performedBy: 'Maria Lopez', timestamp: new Date('2024-03-13T11:15:00'), notes: 'Venta promocional' },
  { id: 'mov-004', productId: 'prod-014', productName: 'Crema CBD Muscular Sport', storeId: '1', storeName: 'Madrid Centro', type: 'adjustment', quantityChange: -2, previousQuantity: 2, newQuantity: 0, performedBy: 'Carlos Martinez', timestamp: new Date('2024-03-12T16:45:00'), notes: 'Producto danado en almacen' },
  { id: 'mov-005', productId: 'prod-017', productName: 'Infusion CBD Relax', storeId: '1', storeName: 'Madrid Centro', type: 'restock', quantityChange: 40, previousQuantity: 15, newQuantity: 55, performedBy: 'Carlos Martinez', timestamp: new Date('2024-03-14T08:00:00'), notes: 'Reposicion urgente' },
  { id: 'mov-006', productId: 'prod-001', productName: 'Aceite CBD Premium 5%', storeId: '2', storeName: 'Valencia Puerto', type: 'restock', quantityChange: 30, previousQuantity: 5, newQuantity: 35, performedBy: 'Ana Garcia', timestamp: new Date('2024-03-09T10:00:00'), notes: 'Pedido quincenal' },
  { id: 'mov-007', productId: 'prod-009', productName: 'Flores CBD OG Kush', storeId: '2', storeName: 'Valencia Puerto', type: 'sale', quantityChange: -8, previousQuantity: 10, newQuantity: 2, performedBy: 'Luis Hernandez', timestamp: new Date('2024-03-12T15:30:00'), notes: null },
  { id: 'mov-008', productId: 'prod-006', productName: 'Balsamo Labial CBD', storeId: '2', storeName: 'Valencia Puerto', type: 'restock', quantityChange: 25, previousQuantity: 15, newQuantity: 40, performedBy: 'Ana Garcia', timestamp: new Date('2024-03-11T09:15:00'), notes: null },
  { id: 'mov-009', productId: 'prod-001', productName: 'Aceite CBD Premium 5%', storeId: '3', storeName: 'Barcelona Gotico', type: 'restock', quantityChange: 60, previousQuantity: 20, newQuantity: 80, performedBy: 'Miguel Torres', timestamp: new Date('2024-03-14T07:45:00'), notes: 'Gran pedido mensual' },
  { id: 'mov-010', productId: 'prod-010', productName: 'Flores CBD Gorilla Glue', storeId: '3', storeName: 'Barcelona Gotico', type: 'sale', quantityChange: -6, previousQuantity: 10, newQuantity: 4, performedBy: 'Isabel Moreno', timestamp: new Date('2024-03-13T17:00:00'), notes: null },
  { id: 'mov-011', productId: 'prod-018', productName: 'Gominolas CBD Frutas 10mg', storeId: '3', storeName: 'Barcelona Gotico', type: 'restock', quantityChange: 35, previousQuantity: 15, newQuantity: 50, performedBy: 'Miguel Torres', timestamp: new Date('2024-03-14T08:30:00'), notes: null },
  { id: 'mov-012', productId: 'prod-007', productName: 'Crema Contorno de Ojos CBD', storeId: '3', storeName: 'Barcelona Gotico', type: 'adjustment', quantityChange: -5, previousQuantity: 5, newQuantity: 0, performedBy: 'Miguel Torres', timestamp: new Date('2024-03-10T14:00:00'), notes: 'Lote expirado retirado' },
  { id: 'mov-013', productId: 'prod-005', productName: 'Serum Facial CBD Anti-edad', storeId: '4', storeName: 'Alicante Marina', type: 'sale', quantityChange: -4, previousQuantity: 7, newQuantity: 3, performedBy: 'Laura Fernandez', timestamp: new Date('2024-03-11T12:00:00'), notes: null },
  { id: 'mov-014', productId: 'prod-011', productName: 'Capsulas CBD 10mg Sueno', storeId: '4', storeName: 'Alicante Marina', type: 'sale', quantityChange: -5, previousQuantity: 5, newQuantity: 0, performedBy: 'Laura Fernandez', timestamp: new Date('2024-03-09T16:30:00'), notes: 'Ultimo stock vendido' },
  { id: 'mov-015', productId: 'prod-008', productName: 'Flores CBD Amnesia Haze', storeId: '4', storeName: 'Alicante Marina', type: 'restock', quantityChange: 15, previousQuantity: 7, newQuantity: 22, performedBy: 'Laura Fernandez', timestamp: new Date('2024-03-10T09:00:00'), notes: null },
  { id: 'mov-016', productId: 'prod-001', productName: 'Aceite CBD Premium 5%', storeId: '1', storeName: 'Madrid Centro', type: 'transfer', quantityChange: -15, previousQuantity: 60, newQuantity: 45, performedBy: 'Carlos Martinez', timestamp: new Date('2024-03-11T11:00:00'), notes: 'Transferencia a Sevilla Triana' },
  { id: 'mov-017', productId: 'prod-001', productName: 'Aceite CBD Premium 5%', storeId: '5', storeName: 'Sevilla Triana', type: 'transfer', quantityChange: 15, previousQuantity: 0, newQuantity: 15, performedBy: 'Pablo Ruiz', timestamp: new Date('2024-03-12T10:00:00'), notes: 'Recibido de Madrid Centro' },
  { id: 'mov-018', productId: 'prod-018', productName: 'Gominolas CBD Frutas 10mg', storeId: '1', storeName: 'Madrid Centro', type: 'sale', quantityChange: -6, previousQuantity: 10, newQuantity: 4, performedBy: 'Maria Lopez', timestamp: new Date('2024-03-14T10:45:00'), notes: null },
  { id: 'mov-019', productId: 'prod-003', productName: 'Aceite CBD Ultra 20%', storeId: '2', storeName: 'Valencia Puerto', type: 'sale', quantityChange: -2, previousQuantity: 8, newQuantity: 6, performedBy: 'Luis Hernandez', timestamp: new Date('2024-03-13T09:30:00'), notes: null },
  { id: 'mov-020', productId: 'prod-012', productName: 'Capsulas CBD 25mg Concentracion', storeId: '5', storeName: 'Sevilla Triana', type: 'sale', quantityChange: -4, previousQuantity: 5, newQuantity: 1, performedBy: 'Pablo Ruiz', timestamp: new Date('2024-03-08T14:15:00'), notes: null },
  { id: 'mov-021', productId: 'prod-015', productName: 'Crema Hidratante CBD Facial', storeId: '2', storeName: 'Valencia Puerto', type: 'sale', quantityChange: -3, previousQuantity: 12, newQuantity: 9, performedBy: 'Carmen Diaz', timestamp: new Date('2024-03-12T11:20:00'), notes: null },
  { id: 'mov-022', productId: 'prod-002', productName: 'Aceite CBD Intenso 10%', storeId: '3', storeName: 'Barcelona Gotico', type: 'sale', quantityChange: -5, previousQuantity: 12, newQuantity: 7, performedBy: 'Isabel Moreno', timestamp: new Date('2024-03-14T13:00:00'), notes: null },
  { id: 'mov-023', productId: 'prod-016', productName: 'Crema CBD Articulaciones', storeId: '3', storeName: 'Barcelona Gotico', type: 'sale', quantityChange: -2, previousQuantity: 10, newQuantity: 8, performedBy: 'Diego Castro', timestamp: new Date('2024-03-13T15:45:00'), notes: null },
  { id: 'mov-024', productId: 'prod-006', productName: 'Balsamo Labial CBD', storeId: '5', storeName: 'Sevilla Triana', type: 'sale', quantityChange: -3, previousQuantity: 5, newQuantity: 2, performedBy: 'Pablo Ruiz', timestamp: new Date('2024-03-07T10:30:00'), notes: null },
  { id: 'mov-025', productId: 'prod-017', productName: 'Infusion CBD Relax', storeId: '4', storeName: 'Alicante Marina', type: 'sale', quantityChange: -4, previousQuantity: 11, newQuantity: 7, performedBy: 'Javier Ortega', timestamp: new Date('2024-03-12T16:00:00'), notes: null },
  { id: 'mov-026', productId: 'prod-004', productName: 'Aceite CBD Mascotas 3%', storeId: '4', storeName: 'Alicante Marina', type: 'sale', quantityChange: -3, previousQuantity: 12, newQuantity: 9, performedBy: 'Laura Fernandez', timestamp: new Date('2024-03-13T14:30:00'), notes: null },
  { id: 'mov-027', productId: 'prod-019', productName: 'Proteina Whey + CBD Recovery', storeId: '2', storeName: 'Valencia Puerto', type: 'restock', quantityChange: 20, previousQuantity: 5, newQuantity: 25, performedBy: 'Ana Garcia', timestamp: new Date('2024-03-13T08:00:00'), notes: 'Pedido especial' },
  { id: 'mov-028', productId: 'prod-013', productName: 'Capsulas CBD 50mg Forte', storeId: '3', storeName: 'Barcelona Gotico', type: 'restock', quantityChange: 30, previousQuantity: 12, newQuantity: 42, performedBy: 'Miguel Torres', timestamp: new Date('2024-03-12T07:30:00'), notes: null },
  { id: 'mov-029', productId: 'prod-020', productName: 'Vaporizador CBD Pen Starter', storeId: '1', storeName: 'Madrid Centro', type: 'sale', quantityChange: -3, previousQuantity: 15, newQuantity: 12, performedBy: 'Maria Lopez', timestamp: new Date('2024-03-14T16:15:00'), notes: null },
  { id: 'mov-030', productId: 'prod-010', productName: 'Flores CBD Gorilla Glue', storeId: '1', storeName: 'Madrid Centro', type: 'restock', quantityChange: 10, previousQuantity: 5, newQuantity: 15, performedBy: 'Carlos Martinez', timestamp: new Date('2024-03-06T08:45:00'), notes: null },
  { id: 'mov-031', productId: 'prod-005', productName: 'Serum Facial CBD Anti-edad', storeId: '1', storeName: 'Madrid Centro', type: 'sale', quantityChange: -4, previousQuantity: 12, newQuantity: 8, performedBy: 'Maria Lopez', timestamp: new Date('2024-03-14T11:30:00'), notes: null },
  { id: 'mov-032', productId: 'prod-018', productName: 'Gominolas CBD Frutas 10mg', storeId: '5', storeName: 'Sevilla Triana', type: 'adjustment', quantityChange: -2, previousQuantity: 8, newQuantity: 6, performedBy: 'Pablo Ruiz', timestamp: new Date('2024-03-05T15:00:00'), notes: 'Devolucion de cliente' },
]

export function getProductName(productId: string): string {
  return PRODUCT_NAMES[productId] || 'Producto desconocido'
}

export function getStoreName(storeId: string): string {
  return STORE_NAMES[storeId] || 'Tienda desconocida'
}
