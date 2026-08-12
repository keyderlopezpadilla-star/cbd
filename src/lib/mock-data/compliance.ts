// CBD Compliance & Age Verification Mock Data

export type VerificationMethod = 'dob' | 'button' | 'id_upload'

export interface AgeGateSettings {
  enabled: boolean
  minimumAge: number
  verificationMethod: VerificationMethod
  redirectUrl: string
  exemptPages: string[]
  customMessage: string
  rememberDays: number
  showOnEveryVisit: boolean
}

export type RegulatoryCategory = 'novel_food' | 'cosmetics' | 'supplements' | 'raw_material'

export interface ProductComplianceRecord {
  id: string
  productName: string
  sku: string
  regulatoryCategory: RegulatoryCategory
  thcPercentage: number
  cbdPercentage: number
  maxThcAllowed: number
  labCertificateId: string
  labCertificateDate: string
  labCertificateExpiry: string
  batchNumber: string
  countryAvailability: string[]
  novelFoodStatus: 'registered' | 'pending' | 'not_required' | 'exempt'
  warningLabels: string[]
  compliant: boolean
  lastReviewDate: string
  nextReviewDate: string
  notes: string
}

export interface ComplianceDocument {
  id: string
  title: string
  category: 'guide' | 'regulation' | 'checklist' | 'template'
  country: string
  description: string
  lastUpdated: string
  status: 'current' | 'outdated' | 'under_review'
  url: string
}

export const AGE_GATE_SETTINGS: AgeGateSettings = {
  enabled: true,
  minimumAge: 18,
  verificationMethod: 'button',
  redirectUrl: 'https://www.google.com',
  exemptPages: ['/legal', '/privacy', '/terms', '/contact'],
  customMessage: 'Debes ser mayor de 18 anos para acceder a este sitio. Los productos de CBD estan destinados exclusivamente a adultos.',
  rememberDays: 30,
  showOnEveryVisit: false,
}

export const PRODUCT_COMPLIANCE_RECORDS: ProductComplianceRecord[] = [
  {
    id: 'pc-001',
    productName: 'Aceite CBD Premium 10%',
    sku: 'CBD-OIL-10',
    regulatoryCategory: 'novel_food',
    thcPercentage: 0.18,
    cbdPercentage: 10.0,
    maxThcAllowed: 0.2,
    labCertificateId: 'LAB-2024-001',
    labCertificateDate: '2024-01-10',
    labCertificateExpiry: '2024-07-10',
    batchNumber: 'BATCH-2024-A001',
    countryAvailability: ['ES', 'PT', 'FR', 'DE', 'IT'],
    novelFoodStatus: 'registered',
    warningLabels: ['No apto para menores de 18', 'Consulte a su medico', 'Mantener fuera del alcance de los ninos'],
    compliant: true,
    lastReviewDate: '2024-01-15',
    nextReviewDate: '2024-04-15',
    notes: 'Cumple regulacion Novel Food EU. Registro completado.',
  },
  {
    id: 'pc-002',
    productName: 'Crema CBD Recuperacion',
    sku: 'CBD-CRM-50',
    regulatoryCategory: 'cosmetics',
    thcPercentage: 0.0,
    cbdPercentage: 5.0,
    maxThcAllowed: 0.2,
    labCertificateId: 'LAB-2024-002',
    labCertificateDate: '2024-01-20',
    labCertificateExpiry: '2024-07-20',
    batchNumber: 'BATCH-2024-B002',
    countryAvailability: ['ES', 'PT', 'FR', 'DE', 'IT', 'UK'],
    novelFoodStatus: 'not_required',
    warningLabels: ['Solo uso externo', 'Evitar contacto con los ojos'],
    compliant: true,
    lastReviewDate: '2024-01-25',
    nextReviewDate: '2024-04-25',
    notes: 'Regulado como cosmetico. CPNP registrado.',
  },
  {
    id: 'pc-003',
    productName: 'Flores CBD Sativa 15%',
    sku: 'CBD-FLR-15',
    regulatoryCategory: 'raw_material',
    thcPercentage: 0.19,
    cbdPercentage: 15.0,
    maxThcAllowed: 0.2,
    labCertificateId: 'LAB-2024-003',
    labCertificateDate: '2024-02-01',
    labCertificateExpiry: '2024-08-01',
    batchNumber: 'BATCH-2024-C003',
    countryAvailability: ['ES', 'PT'],
    novelFoodStatus: 'exempt',
    warningLabels: ['No apto para menores de 18', 'Producto coleccionable', 'No destinado al consumo humano'],
    compliant: true,
    lastReviewDate: '2024-02-05',
    nextReviewDate: '2024-05-05',
    notes: 'Comercializado como producto de coleccion/aromatico. Verificar regulacion local.',
  },
  {
    id: 'pc-004',
    productName: 'Capsulas CBD 25mg',
    sku: 'CBD-CAP-25',
    regulatoryCategory: 'novel_food',
    thcPercentage: 0.15,
    cbdPercentage: 8.3,
    maxThcAllowed: 0.2,
    labCertificateId: 'LAB-2024-004',
    labCertificateDate: '2023-12-15',
    labCertificateExpiry: '2024-03-15',
    batchNumber: 'BATCH-2024-D004',
    countryAvailability: ['ES', 'DE'],
    novelFoodStatus: 'pending',
    warningLabels: ['No apto para menores de 18', 'Consulte a su medico', 'No exceder dosis recomendada'],
    compliant: false,
    lastReviewDate: '2024-01-10',
    nextReviewDate: '2024-03-10',
    notes: 'Certificado de laboratorio proximo a expirar. Renovar antes del 15 de marzo.',
  },
  {
    id: 'pc-005',
    productName: 'Balsamo CBD Deportivo',
    sku: 'CBD-BLM-30',
    regulatoryCategory: 'cosmetics',
    thcPercentage: 0.0,
    cbdPercentage: 3.0,
    maxThcAllowed: 0.2,
    labCertificateId: 'LAB-2024-005',
    labCertificateDate: '2024-02-01',
    labCertificateExpiry: '2024-08-01',
    batchNumber: 'BATCH-2024-E005',
    countryAvailability: ['ES', 'PT', 'FR', 'DE', 'IT', 'UK', 'NL', 'BE'],
    novelFoodStatus: 'not_required',
    warningLabels: ['Solo uso externo', 'No aplicar sobre heridas abiertas'],
    compliant: true,
    lastReviewDate: '2024-02-05',
    nextReviewDate: '2024-05-05',
    notes: 'Amplia disponibilidad. Todos los registros al dia.',
  },
]

export const COMPLIANCE_DOCUMENTS: ComplianceDocument[] = [
  {
    id: 'doc-001',
    title: 'Guia de Regulacion Novel Food EU',
    category: 'guide',
    country: 'EU',
    description: 'Guia completa sobre el proceso de registro Novel Food para productos CBD en la Union Europea.',
    lastUpdated: '2024-01-15',
    status: 'current',
    url: '#',
  },
  {
    id: 'doc-002',
    title: 'Requisitos de Etiquetado CBD - Espana',
    category: 'regulation',
    country: 'ES',
    description: 'Normativa vigente sobre etiquetado de productos con cannabidiol en territorio espanol.',
    lastUpdated: '2024-01-20',
    status: 'current',
    url: '#',
  },
  {
    id: 'doc-003',
    title: 'Checklist Cumplimiento Cosmeticos CBD',
    category: 'checklist',
    country: 'EU',
    description: 'Lista de verificacion para asegurar el cumplimiento de la regulacion de cosmeticos con CBD.',
    lastUpdated: '2024-02-01',
    status: 'current',
    url: '#',
  },
  {
    id: 'doc-004',
    title: 'Regulacion THC - Limites por Pais',
    category: 'regulation',
    country: 'EU',
    description: 'Resumen de limites maximos de THC permitidos en cada pais de la UE para productos CBD.',
    lastUpdated: '2023-11-10',
    status: 'under_review',
    url: '#',
  },
  {
    id: 'doc-005',
    title: 'Plantilla Informe Laboratorio CBD',
    category: 'template',
    country: 'ES',
    description: 'Plantilla estandar para informes de analisis de laboratorio de productos CBD.',
    lastUpdated: '2024-01-05',
    status: 'current',
    url: '#',
  },
  {
    id: 'doc-006',
    title: 'Guia de Verificacion de Edad Online',
    category: 'guide',
    country: 'ES',
    description: 'Mejores practicas para implementar sistemas de verificacion de edad en tiendas online de CBD.',
    lastUpdated: '2024-02-08',
    status: 'current',
    url: '#',
  },
  {
    id: 'doc-007',
    title: 'Regulacion Suplementos Alimenticios CBD - Alemania',
    category: 'regulation',
    country: 'DE',
    description: 'Marco regulatorio aleman para la comercializacion de suplementos con CBD.',
    lastUpdated: '2023-09-20',
    status: 'outdated',
    url: '#',
  },
  {
    id: 'doc-008',
    title: 'Checklist Auditoria Cumplimiento General',
    category: 'checklist',
    country: 'EU',
    description: 'Lista de auditoria para revision trimestral de cumplimiento normativo.',
    lastUpdated: '2024-02-10',
    status: 'current',
    url: '#',
  },
]
