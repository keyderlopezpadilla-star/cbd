// Supplier Types & Status
export type SupplierStatus = 'ACTIVE' | 'INACTIVE' | 'PENDING'
export type PaymentTerms = 'NET_15' | 'NET_30' | 'NET_60' | 'PREPAID' | 'COD'

export interface ContactPerson {
  id: string
  name: string
  role: string
  email: string
  phone: string
  isPrimary: boolean
}

export interface SupplierOrder {
  id: string
  date: Date
  products: string[]
  total: number
  status: 'DELIVERED' | 'IN_TRANSIT' | 'PENDING' | 'CANCELLED'
  deliveryDate?: Date
}

export interface Supplier {
  id: string
  name: string
  company: string
  email: string
  phone: string
  address: string
  city: string
  country: string
  productsSupplied: string[]
  categories: string[]
  leadTimeDays: number
  rating: number
  paymentTerms: PaymentTerms
  orderHistory: SupplierOrder[]
  status: SupplierStatus
  contactPersons: ContactPerson[]
  totalOrders: number
  totalSpent: number
  onTimeDeliveryRate: number
  qualityScore: number
  createdAt: Date
  lastOrderDate: Date
  notes: string
}

const now = new Date()
const daysAgo = (days: number) => new Date(now.getTime() - days * 24 * 60 * 60 * 1000)
const daysFromNow = (days: number) => new Date(now.getTime() + days * 24 * 60 * 60 * 1000)

export const MOCK_SUPPLIERS: Supplier[] = [
  {
    id: 'sup-001',
    name: 'Carlos Martinez',
    company: 'CBD Extracts Europe S.L.',
    email: 'carlos@cbdextracts.eu',
    phone: '+34 612 345 678',
    address: 'Calle Industrial 45, Nave 12',
    city: 'Barcelona',
    country: 'Espana',
    productsSupplied: ['Aceite CBD 5%', 'Aceite CBD 10%', 'Aceite CBD 20%', 'Aceite CBD 30%', 'CBD Full Spectrum'],
    categories: ['oils'],
    leadTimeDays: 5,
    rating: 4.8,
    paymentTerms: 'NET_30',
    orderHistory: [
      { id: 'ord-001', date: daysAgo(7), products: ['Aceite CBD 10%', 'Aceite CBD 20%'], total: 4500, status: 'DELIVERED', deliveryDate: daysAgo(2) },
      { id: 'ord-002', date: daysAgo(30), products: ['Aceite CBD 5%', 'CBD Full Spectrum'], total: 3200, status: 'DELIVERED', deliveryDate: daysAgo(25) },
      { id: 'ord-003', date: daysAgo(60), products: ['Aceite CBD 30%'], total: 6800, status: 'DELIVERED', deliveryDate: daysAgo(55) },
    ],
    status: 'ACTIVE',
    contactPersons: [
      { id: 'cp-001', name: 'Carlos Martinez', role: 'Director Comercial', email: 'carlos@cbdextracts.eu', phone: '+34 612 345 678', isPrimary: true },
      { id: 'cp-002', name: 'Ana Lopez', role: 'Logistica', email: 'ana@cbdextracts.eu', phone: '+34 612 345 679', isPrimary: false },
    ],
    totalOrders: 45,
    totalSpent: 187500,
    onTimeDeliveryRate: 96.5,
    qualityScore: 4.9,
    createdAt: daysAgo(730),
    lastOrderDate: daysAgo(7),
    notes: 'Proveedor principal de aceites CBD. Excelente calidad y cumplimiento.',
  },
  {
    id: 'sup-002',
    name: 'Marie Dubois',
    company: 'French Hemp Cosmetics',
    email: 'marie@frenchhemp.fr',
    phone: '+33 6 12 34 56 78',
    address: '15 Rue de la Paix',
    city: 'Lyon',
    country: 'Francia',
    productsSupplied: ['Crema Facial CBD', 'Serum Anti-edad', 'Balsamo Labial CBD', 'Aceite Corporal'],
    categories: ['cosmetics', 'creams'],
    leadTimeDays: 8,
    rating: 4.5,
    paymentTerms: 'NET_30',
    orderHistory: [
      { id: 'ord-004', date: daysAgo(14), products: ['Crema Facial CBD', 'Serum Anti-edad'], total: 3800, status: 'IN_TRANSIT' },
      { id: 'ord-005', date: daysAgo(45), products: ['Balsamo Labial CBD'], total: 1200, status: 'DELIVERED', deliveryDate: daysAgo(37) },
    ],
    status: 'ACTIVE',
    contactPersons: [
      { id: 'cp-003', name: 'Marie Dubois', role: 'CEO', email: 'marie@frenchhemp.fr', phone: '+33 6 12 34 56 78', isPrimary: true },
    ],
    totalOrders: 28,
    totalSpent: 89400,
    onTimeDeliveryRate: 89.2,
    qualityScore: 4.6,
    createdAt: daysAgo(540),
    lastOrderDate: daysAgo(14),
    notes: 'Cosmetica premium de origen frances. Certificaciones organicas.',
  },
  {
    id: 'sup-003',
    name: 'Hans Mueller',
    company: 'Swiss CBD Labs AG',
    email: 'hans@swisscbdlabs.ch',
    phone: '+41 79 123 45 67',
    address: 'Industriestrasse 88',
    city: 'Zurich',
    country: 'Suiza',
    productsSupplied: ['Capsulas CBD 25mg', 'Capsulas CBD 50mg', 'Softgels CBD', 'CBD Isolate Powder'],
    categories: ['capsules'],
    leadTimeDays: 10,
    rating: 4.9,
    paymentTerms: 'NET_60',
    orderHistory: [
      { id: 'ord-006', date: daysAgo(5), products: ['Capsulas CBD 25mg', 'CBD Isolate Powder'], total: 7200, status: 'PENDING' },
      { id: 'ord-007', date: daysAgo(35), products: ['Softgels CBD'], total: 5400, status: 'DELIVERED', deliveryDate: daysAgo(25) },
      { id: 'ord-008', date: daysAgo(70), products: ['Capsulas CBD 50mg'], total: 4800, status: 'DELIVERED', deliveryDate: daysAgo(60) },
    ],
    status: 'ACTIVE',
    contactPersons: [
      { id: 'cp-004', name: 'Hans Mueller', role: 'Sales Director', email: 'hans@swisscbdlabs.ch', phone: '+41 79 123 45 67', isPrimary: true },
      { id: 'cp-005', name: 'Petra Schneider', role: 'Quality Control', email: 'petra@swisscbdlabs.ch', phone: '+41 79 123 45 68', isPrimary: false },
    ],
    totalOrders: 32,
    totalSpent: 156800,
    onTimeDeliveryRate: 98.1,
    qualityScore: 5.0,
    createdAt: daysAgo(600),
    lastOrderDate: daysAgo(5),
    notes: 'Laboratorio suizo de alta calidad. Certificacion GMP. Precios premium pero calidad excelente.',
  },
  {
    id: 'sup-004',
    name: 'Elena Rossi',
    company: 'Herbal Wellness Italia',
    email: 'elena@herbalwellness.it',
    phone: '+39 333 456 7890',
    address: 'Via Roma 23',
    city: 'Milan',
    country: 'Italia',
    productsSupplied: ['Infusiones CBD', 'Te CBD Relajante', 'Mezcla Bienestar', 'Capsulas Sueno'],
    categories: ['wellness'],
    leadTimeDays: 7,
    rating: 4.3,
    paymentTerms: 'NET_30',
    orderHistory: [
      { id: 'ord-009', date: daysAgo(10), products: ['Infusiones CBD', 'Te CBD Relajante'], total: 2100, status: 'DELIVERED', deliveryDate: daysAgo(3) },
      { id: 'ord-010', date: daysAgo(40), products: ['Mezcla Bienestar'], total: 1800, status: 'DELIVERED', deliveryDate: daysAgo(33) },
    ],
    status: 'ACTIVE',
    contactPersons: [
      { id: 'cp-006', name: 'Elena Rossi', role: 'Directora General', email: 'elena@herbalwellness.it', phone: '+39 333 456 7890', isPrimary: true },
      { id: 'cp-007', name: 'Marco Bianchi', role: 'Export Manager', email: 'marco@herbalwellness.it', phone: '+39 333 456 7891', isPrimary: false },
    ],
    totalOrders: 22,
    totalSpent: 67200,
    onTimeDeliveryRate: 91.8,
    qualityScore: 4.4,
    createdAt: daysAgo(400),
    lastOrderDate: daysAgo(10),
    notes: 'Proveedor de infusiones y productos de bienestar. Buena relacion calidad-precio.',
  },
  {
    id: 'sup-005',
    name: 'Pedro Oliveira',
    company: 'Hemp Flowers Portugal Lda.',
    email: 'pedro@hempflowers.pt',
    phone: '+351 912 345 678',
    address: 'Rua do Comercio 100',
    city: 'Lisboa',
    country: 'Portugal',
    productsSupplied: ['Flores CBD Indoor', 'Flores CBD Outdoor', 'Pre-rolls CBD', 'Hash CBD Legal'],
    categories: ['flowers'],
    leadTimeDays: 4,
    rating: 4.6,
    paymentTerms: 'NET_15',
    orderHistory: [
      { id: 'ord-011', date: daysAgo(3), products: ['Flores CBD Indoor', 'Pre-rolls CBD'], total: 5600, status: 'IN_TRANSIT' },
      { id: 'ord-012', date: daysAgo(20), products: ['Flores CBD Outdoor', 'Hash CBD Legal'], total: 4200, status: 'DELIVERED', deliveryDate: daysAgo(16) },
      { id: 'ord-013', date: daysAgo(50), products: ['Flores CBD Indoor'], total: 3800, status: 'DELIVERED', deliveryDate: daysAgo(46) },
    ],
    status: 'ACTIVE',
    contactPersons: [
      { id: 'cp-008', name: 'Pedro Oliveira', role: 'Propietario', email: 'pedro@hempflowers.pt', phone: '+351 912 345 678', isPrimary: true },
    ],
    totalOrders: 38,
    totalSpent: 134500,
    onTimeDeliveryRate: 94.7,
    qualityScore: 4.5,
    createdAt: daysAgo(500),
    lastOrderDate: daysAgo(3),
    notes: 'Cultivo propio en Portugal. Entregas rapidas a Espana. Calidad constante.',
  },
  {
    id: 'sup-006',
    name: 'Johann Weber',
    company: 'BioHemp Austria GmbH',
    email: 'johann@biohemp.at',
    phone: '+43 660 123 4567',
    address: 'Hauptstrasse 55',
    city: 'Viena',
    country: 'Austria',
    productsSupplied: ['Aceite CBD Mascotas', 'Snacks CBD Perros', 'Balsamo CBD Animales'],
    categories: ['wellness'],
    leadTimeDays: 12,
    rating: 4.1,
    paymentTerms: 'NET_30',
    orderHistory: [
      { id: 'ord-014', date: daysAgo(25), products: ['Aceite CBD Mascotas', 'Snacks CBD Perros'], total: 2800, status: 'DELIVERED', deliveryDate: daysAgo(13) },
    ],
    status: 'ACTIVE',
    contactPersons: [
      { id: 'cp-009', name: 'Johann Weber', role: 'Ventas', email: 'johann@biohemp.at', phone: '+43 660 123 4567', isPrimary: true },
    ],
    totalOrders: 12,
    totalSpent: 34200,
    onTimeDeliveryRate: 83.3,
    qualityScore: 4.2,
    createdAt: daysAgo(300),
    lastOrderDate: daysAgo(25),
    notes: 'Especialistas en productos CBD para mascotas. Lead time largo pero productos unicos.',
  },
  {
    id: 'sup-007',
    name: 'Laura Fernandez',
    company: 'Packaging Verde S.L.',
    email: 'laura@packagingverde.es',
    phone: '+34 623 456 789',
    address: 'Poligono Norte, Nave 8',
    city: 'Zaragoza',
    country: 'Espana',
    productsSupplied: ['Cajas Eco', 'Frascos Vidrio', 'Etiquetas', 'Bolsas Biodegradables', 'Tubos Cremas'],
    categories: ['accessories'],
    leadTimeDays: 3,
    rating: 4.7,
    paymentTerms: 'NET_15',
    orderHistory: [
      { id: 'ord-015', date: daysAgo(2), products: ['Cajas Eco', 'Frascos Vidrio'], total: 1800, status: 'PENDING' },
      { id: 'ord-016', date: daysAgo(15), products: ['Etiquetas', 'Bolsas Biodegradables'], total: 950, status: 'DELIVERED', deliveryDate: daysAgo(12) },
      { id: 'ord-017', date: daysAgo(30), products: ['Tubos Cremas', 'Frascos Vidrio'], total: 2200, status: 'DELIVERED', deliveryDate: daysAgo(27) },
    ],
    status: 'ACTIVE',
    contactPersons: [
      { id: 'cp-010', name: 'Laura Fernandez', role: 'Directora Comercial', email: 'laura@packagingverde.es', phone: '+34 623 456 789', isPrimary: true },
      { id: 'cp-011', name: 'Javier Torres', role: 'Produccion', email: 'javier@packagingverde.es', phone: '+34 623 456 790', isPrimary: false },
    ],
    totalOrders: 56,
    totalSpent: 78900,
    onTimeDeliveryRate: 97.3,
    qualityScore: 4.8,
    createdAt: daysAgo(800),
    lastOrderDate: daysAgo(2),
    notes: 'Proveedor de packaging sostenible. Entregas muy puntuales. Precio competitivo.',
  },
  {
    id: 'sup-008',
    name: 'Thomas Berg',
    company: 'Nordic CBD Solutions',
    email: 'thomas@nordiccbd.se',
    phone: '+46 70 123 4567',
    address: 'Storgatan 12',
    city: 'Estocolmo',
    country: 'Suecia',
    productsSupplied: ['Vaporizadores CBD', 'Cartuchos CBD', 'E-liquid CBD', 'Dispositivos Vape'],
    categories: ['accessories'],
    leadTimeDays: 14,
    rating: 3.8,
    paymentTerms: 'PREPAID',
    orderHistory: [
      { id: 'ord-018', date: daysAgo(60), products: ['Vaporizadores CBD', 'Cartuchos CBD'], total: 8900, status: 'DELIVERED', deliveryDate: daysAgo(46) },
    ],
    status: 'INACTIVE',
    contactPersons: [
      { id: 'cp-012', name: 'Thomas Berg', role: 'CEO', email: 'thomas@nordiccbd.se', phone: '+46 70 123 4567', isPrimary: true },
    ],
    totalOrders: 8,
    totalSpent: 42300,
    onTimeDeliveryRate: 75.0,
    qualityScore: 3.9,
    createdAt: daysAgo(365),
    lastOrderDate: daysAgo(60),
    notes: 'Problemas recurrentes con tiempos de entrega. En pausa temporal.',
  },
  {
    id: 'sup-009',
    name: 'Sofia Papadopoulos',
    company: 'Mediterranean Oils Co.',
    email: 'sofia@medoils.gr',
    phone: '+30 694 567 8901',
    address: 'Odos Ermou 78',
    city: 'Atenas',
    country: 'Grecia',
    productsSupplied: ['Aceite CBD + Oliva', 'Aceite CBD + Coco', 'Tintura CBD Premium'],
    categories: ['oils'],
    leadTimeDays: 9,
    rating: 4.4,
    paymentTerms: 'NET_30',
    orderHistory: [
      { id: 'ord-019', date: daysAgo(12), products: ['Aceite CBD + Oliva', 'Aceite CBD + Coco'], total: 3600, status: 'DELIVERED', deliveryDate: daysAgo(3) },
    ],
    status: 'ACTIVE',
    contactPersons: [
      { id: 'cp-013', name: 'Sofia Papadopoulos', role: 'Export Manager', email: 'sofia@medoils.gr', phone: '+30 694 567 8901', isPrimary: true },
    ],
    totalOrders: 15,
    totalSpent: 52100,
    onTimeDeliveryRate: 86.7,
    qualityScore: 4.5,
    createdAt: daysAgo(280),
    lastOrderDate: daysAgo(12),
    notes: 'Aceites con base de aceite de oliva griego extra virgen. Producto diferenciador.',
  },
  {
    id: 'sup-010',
    name: 'Ricardo Sanchez',
    company: 'Lab Analitico CBD S.A.',
    email: 'ricardo@labanalitico.es',
    phone: '+34 634 567 890',
    address: 'Parque Tecnologico, Edificio 3',
    city: 'Malaga',
    country: 'Espana',
    productsSupplied: ['Analisis THC', 'Certificados COA', 'Tests Pureza', 'Analisis Terpenos'],
    categories: ['wellness'],
    leadTimeDays: 5,
    rating: 5.0,
    paymentTerms: 'COD',
    orderHistory: [
      { id: 'ord-020', date: daysAgo(8), products: ['Analisis THC', 'Tests Pureza'], total: 890, status: 'DELIVERED', deliveryDate: daysAgo(3) },
      { id: 'ord-021', date: daysAgo(22), products: ['Certificados COA', 'Analisis Terpenos'], total: 1200, status: 'DELIVERED', deliveryDate: daysAgo(17) },
    ],
    status: 'ACTIVE',
    contactPersons: [
      { id: 'cp-014', name: 'Ricardo Sanchez', role: 'Director Laboratorio', email: 'ricardo@labanalitico.es', phone: '+34 634 567 890', isPrimary: true },
      { id: 'cp-015', name: 'Marta Diaz', role: 'Coordinadora Muestras', email: 'marta@labanalitico.es', phone: '+34 634 567 891', isPrimary: false },
    ],
    totalOrders: 24,
    totalSpent: 28900,
    onTimeDeliveryRate: 100.0,
    qualityScore: 5.0,
    createdAt: daysAgo(650),
    lastOrderDate: daysAgo(8),
    notes: 'Laboratorio de analisis y certificacion. Servicio impecable. Esencial para cumplimiento normativo.',
  },
  {
    id: 'sup-011',
    name: 'Claire Dupont',
    company: 'EcoPack France',
    email: 'claire@ecopack.fr',
    phone: '+33 7 89 01 23 45',
    address: '42 Avenue des Champs',
    city: 'Paris',
    country: 'Francia',
    productsSupplied: ['Displays Tienda', 'Material POS', 'Folletos'],
    categories: ['accessories'],
    leadTimeDays: 10,
    rating: 3.5,
    paymentTerms: 'NET_30',
    orderHistory: [
      { id: 'ord-022', date: daysAgo(90), products: ['Displays Tienda'], total: 4500, status: 'DELIVERED', deliveryDate: daysAgo(80) },
    ],
    status: 'PENDING',
    contactPersons: [
      { id: 'cp-016', name: 'Claire Dupont', role: 'Account Manager', email: 'claire@ecopack.fr', phone: '+33 7 89 01 23 45', isPrimary: true },
    ],
    totalOrders: 3,
    totalSpent: 12800,
    onTimeDeliveryRate: 66.7,
    qualityScore: 3.6,
    createdAt: daysAgo(120),
    lastOrderDate: daysAgo(90),
    notes: 'En evaluacion. Primer pedido con retraso significativo. Pendiente decision.',
  },
  {
    id: 'sup-012',
    name: 'Andreas Kohl',
    company: 'GreenTech Grow Systems',
    email: 'andreas@greentech.de',
    phone: '+49 170 123 4567',
    address: 'Berliner Strasse 200',
    city: 'Berlin',
    country: 'Alemania',
    productsSupplied: ['Sistemas Cultivo LED', 'Nutrientes Organicos', 'Sustratos Premium'],
    categories: ['accessories'],
    leadTimeDays: 15,
    rating: 4.2,
    paymentTerms: 'PREPAID',
    orderHistory: [
      { id: 'ord-023', date: daysAgo(45), products: ['Sistemas Cultivo LED'], total: 12500, status: 'DELIVERED', deliveryDate: daysAgo(30) },
    ],
    status: 'ACTIVE',
    contactPersons: [
      { id: 'cp-017', name: 'Andreas Kohl', role: 'Technical Sales', email: 'andreas@greentech.de', phone: '+49 170 123 4567', isPrimary: true },
    ],
    totalOrders: 6,
    totalSpent: 45600,
    onTimeDeliveryRate: 83.3,
    qualityScore: 4.3,
    createdAt: daysAgo(200),
    lastOrderDate: daysAgo(45),
    notes: 'Equipamiento tecnico de cultivo. Pedidos grandes pero esporadicos.',
  },
]

// Helper functions
export function getSupplierById(id: string): Supplier | undefined {
  return MOCK_SUPPLIERS.find((s) => s.id === id)
}

export function getActiveSuppliers(): Supplier[] {
  return MOCK_SUPPLIERS.filter((s) => s.status === 'ACTIVE')
}

export function getSuppliersByCategory(category: string): Supplier[] {
  return MOCK_SUPPLIERS.filter((s) => s.categories.includes(category))
}

export function getSupplierStatusColor(status: SupplierStatus): string {
  const colors: Record<SupplierStatus, string> = {
    ACTIVE: 'bg-green-500/20 text-green-400 border-green-500/30',
    INACTIVE: 'bg-red-500/20 text-red-400 border-red-500/30',
    PENDING: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  }
  return colors[status]
}

export function getSupplierStatusLabel(status: SupplierStatus): string {
  const labels: Record<SupplierStatus, string> = {
    ACTIVE: 'Activo',
    INACTIVE: 'Inactivo',
    PENDING: 'Pendiente',
  }
  return labels[status]
}

export function getPaymentTermsLabel(terms: PaymentTerms): string {
  const labels: Record<PaymentTerms, string> = {
    NET_15: 'Neto 15 dias',
    NET_30: 'Neto 30 dias',
    NET_60: 'Neto 60 dias',
    PREPAID: 'Prepago',
    COD: 'Contra Entrega',
  }
  return labels[terms]
}

export function getOrderStatusColor(status: SupplierOrder['status']): string {
  const colors: Record<SupplierOrder['status'], string> = {
    DELIVERED: 'bg-green-500/20 text-green-400 border-green-500/30',
    IN_TRANSIT: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    PENDING: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    CANCELLED: 'bg-red-500/20 text-red-400 border-red-500/30',
  }
  return colors[status]
}

export function getOrderStatusLabel(status: SupplierOrder['status']): string {
  const labels: Record<SupplierOrder['status'], string> = {
    DELIVERED: 'Entregado',
    IN_TRANSIT: 'En Transito',
    PENDING: 'Pendiente',
    CANCELLED: 'Cancelado',
  }
  return labels[status]
}
