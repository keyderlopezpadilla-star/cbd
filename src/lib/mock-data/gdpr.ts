// GDPR & Privacy Mock Data

export type ConsentCategoryId = 'essential' | 'analytics' | 'marketing' | 'personalization'

export interface ConsentCategory {
  id: ConsentCategoryId
  name: string
  description: string
  required: boolean
  defaultEnabled: boolean
}

export interface ConsentRecord {
  id: string
  userId: string
  userName: string
  email: string
  categories: Record<ConsentCategoryId, boolean>
  ipAddress: string
  userAgent: string
  consentDate: string
  lastUpdated: string
  version: string
}

export type DataRequestType = 'export' | 'deletion'
export type DataRequestStatus = 'pending' | 'processing' | 'completed' | 'rejected'

export interface DataRequest {
  id: string
  userId: string
  userName: string
  email: string
  type: DataRequestType
  status: DataRequestStatus
  requestDate: string
  processedDate: string | null
  processedBy: string | null
  reason: string
  notes: string
}

export type PolicyStatus = 'draft' | 'published' | 'archived'

export interface PrivacyPolicyVersion {
  id: string
  version: string
  title: string
  content: string
  status: PolicyStatus
  effectiveDate: string
  createdDate: string
  createdBy: string
  changes: string[]
}

export interface RetentionRule {
  id: string
  dataType: string
  description: string
  retentionPeriod: string
  retentionDays: number
  autoDelete: boolean
  legalBasis: string
  lastReview: string
  nextReview: string
}

export const CONSENT_CATEGORIES: ConsentCategory[] = [
  {
    id: 'essential',
    name: 'Cookies Esenciales',
    description: 'Necesarias para el funcionamiento basico del sitio. No pueden ser deshabilitadas.',
    required: true,
    defaultEnabled: true,
  },
  {
    id: 'analytics',
    name: 'Cookies de Analitica',
    description: 'Nos ayudan a entender como interactuas con el sitio para mejorar la experiencia.',
    required: false,
    defaultEnabled: false,
  },
  {
    id: 'marketing',
    name: 'Cookies de Marketing',
    description: 'Utilizadas para mostrar anuncios relevantes y medir la eficacia de las campanas.',
    required: false,
    defaultEnabled: false,
  },
  {
    id: 'personalization',
    name: 'Cookies de Personalizacion',
    description: 'Permiten recordar tus preferencias y personalizar tu experiencia en el sitio.',
    required: false,
    defaultEnabled: false,
  },
]

export const CONSENT_RECORDS: ConsentRecord[] = [
  {
    id: 'cr-001',
    userId: 'usr-101',
    userName: 'Maria Lopez',
    email: 'maria.lopez@email.com',
    categories: { essential: true, analytics: true, marketing: false, personalization: true },
    ipAddress: '192.168.1.45',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    consentDate: '2024-01-15T10:30:00Z',
    lastUpdated: '2024-01-15T10:30:00Z',
    version: '2.1',
  },
  {
    id: 'cr-002',
    userId: 'usr-102',
    userName: 'Carlos Fernandez',
    email: 'carlos.f@email.com',
    categories: { essential: true, analytics: true, marketing: true, personalization: true },
    ipAddress: '10.0.0.23',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15)',
    consentDate: '2024-01-16T14:22:00Z',
    lastUpdated: '2024-02-01T09:15:00Z',
    version: '2.1',
  },
  {
    id: 'cr-003',
    userId: 'usr-103',
    userName: 'Elena Martinez',
    email: 'elena.m@email.com',
    categories: { essential: true, analytics: false, marketing: false, personalization: false },
    ipAddress: '172.16.0.88',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0)',
    consentDate: '2024-01-18T08:45:00Z',
    lastUpdated: '2024-01-18T08:45:00Z',
    version: '2.0',
  },
  {
    id: 'cr-004',
    userId: 'usr-104',
    userName: 'Javier Ruiz',
    email: 'javier.ruiz@email.com',
    categories: { essential: true, analytics: true, marketing: true, personalization: false },
    ipAddress: '192.168.2.110',
    userAgent: 'Mozilla/5.0 (Linux; Android 13)',
    consentDate: '2024-01-20T16:33:00Z',
    lastUpdated: '2024-01-20T16:33:00Z',
    version: '2.1',
  },
  {
    id: 'cr-005',
    userId: 'usr-105',
    userName: 'Ana Torres',
    email: 'ana.torres@email.com',
    categories: { essential: true, analytics: true, marketing: false, personalization: true },
    ipAddress: '10.10.0.5',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    consentDate: '2024-01-22T11:10:00Z',
    lastUpdated: '2024-02-05T13:45:00Z',
    version: '2.1',
  },
  {
    id: 'cr-006',
    userId: 'usr-106',
    userName: 'Pablo Sanchez',
    email: 'pablo.s@email.com',
    categories: { essential: true, analytics: false, marketing: false, personalization: false },
    ipAddress: '192.168.0.201',
    userAgent: 'Mozilla/5.0 (iPad; CPU OS 17_1)',
    consentDate: '2024-01-25T09:00:00Z',
    lastUpdated: '2024-01-25T09:00:00Z',
    version: '2.1',
  },
  {
    id: 'cr-007',
    userId: 'usr-107',
    userName: 'Laura Diaz',
    email: 'laura.diaz@email.com',
    categories: { essential: true, analytics: true, marketing: true, personalization: true },
    ipAddress: '172.20.0.15',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0)',
    consentDate: '2024-01-28T15:20:00Z',
    lastUpdated: '2024-02-10T08:30:00Z',
    version: '2.1',
  },
  {
    id: 'cr-008',
    userId: 'usr-108',
    userName: 'Diego Moreno',
    email: 'diego.m@email.com',
    categories: { essential: true, analytics: true, marketing: false, personalization: true },
    ipAddress: '192.168.5.42',
    userAgent: 'Mozilla/5.0 (Windows NT 11.0; Win64; x64)',
    consentDate: '2024-02-01T12:45:00Z',
    lastUpdated: '2024-02-01T12:45:00Z',
    version: '2.1',
  },
]

export const DATA_REQUESTS: DataRequest[] = [
  {
    id: 'dr-001',
    userId: 'usr-103',
    userName: 'Elena Martinez',
    email: 'elena.m@email.com',
    type: 'export',
    status: 'completed',
    requestDate: '2024-01-20T10:00:00Z',
    processedDate: '2024-01-22T14:30:00Z',
    processedBy: 'admin@cbdsaas.com',
    reason: 'Quiero ver todos mis datos personales almacenados',
    notes: 'Exportacion completada. Se envio enlace de descarga al email.',
  },
  {
    id: 'dr-002',
    userId: 'usr-106',
    userName: 'Pablo Sanchez',
    email: 'pablo.s@email.com',
    type: 'deletion',
    status: 'pending',
    requestDate: '2024-02-05T09:15:00Z',
    processedDate: null,
    processedBy: null,
    reason: 'Deseo eliminar todos mis datos de la plataforma',
    notes: '',
  },
  {
    id: 'dr-003',
    userId: 'usr-104',
    userName: 'Javier Ruiz',
    email: 'javier.ruiz@email.com',
    type: 'export',
    status: 'processing',
    requestDate: '2024-02-08T16:45:00Z',
    processedDate: null,
    processedBy: 'admin@cbdsaas.com',
    reason: 'Necesito una copia de mis datos para portabilidad',
    notes: 'En proceso de recopilacion de datos.',
  },
  {
    id: 'dr-004',
    userId: 'usr-108',
    userName: 'Diego Moreno',
    email: 'diego.m@email.com',
    type: 'deletion',
    status: 'pending',
    requestDate: '2024-02-10T11:30:00Z',
    processedDate: null,
    processedBy: null,
    reason: 'Ya no soy cliente, quiero eliminar mis datos',
    notes: '',
  },
  {
    id: 'dr-005',
    userId: 'usr-101',
    userName: 'Maria Lopez',
    email: 'maria.lopez@email.com',
    type: 'export',
    status: 'completed',
    requestDate: '2024-01-10T08:00:00Z',
    processedDate: '2024-01-12T10:00:00Z',
    processedBy: 'admin@cbdsaas.com',
    reason: 'Solicitud rutinaria de acceso a datos',
    notes: 'Datos exportados en formato JSON.',
  },
  {
    id: 'dr-006',
    userId: 'usr-107',
    userName: 'Laura Diaz',
    email: 'laura.diaz@email.com',
    type: 'deletion',
    status: 'rejected',
    requestDate: '2024-02-01T14:00:00Z',
    processedDate: '2024-02-03T09:00:00Z',
    processedBy: 'admin@cbdsaas.com',
    reason: 'Quiero eliminar mi cuenta',
    notes: 'Rechazada: pedido activo en proceso. Se puede re-solicitar tras entrega.',
  },
]

export const PRIVACY_POLICY_VERSIONS: PrivacyPolicyVersion[] = [
  {
    id: 'pp-001',
    version: '2.1',
    title: 'Politica de Privacidad v2.1',
    content: `# Politica de Privacidad

## 1. Responsable del Tratamiento
CBD SaaS Platform es responsable del tratamiento de los datos personales recogidos a traves de esta plataforma.

## 2. Datos que Recopilamos
- Datos de identificacion (nombre, email, telefono)
- Datos de transacciones y pedidos
- Datos de navegacion y preferencias
- Datos de localizacion (con consentimiento)

## 3. Finalidad del Tratamiento
Utilizamos sus datos para:
- Gestionar su cuenta y pedidos
- Enviar comunicaciones comerciales (con consentimiento)
- Mejorar nuestros servicios mediante analitica
- Cumplir con obligaciones legales

## 4. Base Legal
El tratamiento se realiza en base a: consentimiento del interesado, ejecucion de contrato, interes legitimo y cumplimiento de obligacion legal.

## 5. Derechos del Usuario
Puede ejercer sus derechos de acceso, rectificacion, supresion, portabilidad, limitacion y oposicion contactando con nosotros.

## 6. Retencion de Datos
Conservamos sus datos durante el tiempo necesario para cumplir la finalidad y las obligaciones legales aplicables.`,
    status: 'published',
    effectiveDate: '2024-02-01',
    createdDate: '2024-01-25T10:00:00Z',
    createdBy: 'admin@cbdsaas.com',
    changes: ['Actualizada seccion de cookies', 'Agregada informacion sobre transferencias internacionales'],
  },
  {
    id: 'pp-002',
    version: '2.0',
    title: 'Politica de Privacidad v2.0',
    content: `# Politica de Privacidad v2.0\n\nVersion anterior de la politica de privacidad...`,
    status: 'archived',
    effectiveDate: '2023-06-01',
    createdDate: '2023-05-20T12:00:00Z',
    createdBy: 'admin@cbdsaas.com',
    changes: ['Version inicial completa', 'Adaptada al RGPD'],
  },
  {
    id: 'pp-003',
    version: '2.2',
    title: 'Politica de Privacidad v2.2 (Borrador)',
    content: `# Politica de Privacidad v2.2\n\nBorrador en preparacion con nuevas clausulas sobre IA y decisiones automatizadas...`,
    status: 'draft',
    effectiveDate: '2024-04-01',
    createdDate: '2024-02-10T16:00:00Z',
    createdBy: 'admin@cbdsaas.com',
    changes: ['Nueva seccion sobre decisiones automatizadas', 'Actualizacion de periodo de retencion'],
  },
]

export const RETENTION_RULES: RetentionRule[] = [
  {
    id: 'ret-001',
    dataType: 'Datos de Cuenta',
    description: 'Nombre, email, telefono, direccion del usuario',
    retentionPeriod: '3 anos tras ultima actividad',
    retentionDays: 1095,
    autoDelete: true,
    legalBasis: 'Ejecucion de contrato',
    lastReview: '2024-01-15',
    nextReview: '2024-07-15',
  },
  {
    id: 'ret-002',
    dataType: 'Datos de Pedidos',
    description: 'Historial de compras, facturas, transacciones',
    retentionPeriod: '5 anos (obligacion fiscal)',
    retentionDays: 1825,
    autoDelete: false,
    legalBasis: 'Obligacion legal',
    lastReview: '2024-01-15',
    nextReview: '2024-07-15',
  },
  {
    id: 'ret-003',
    dataType: 'Cookies de Analitica',
    description: 'Datos de navegacion, sesiones, eventos',
    retentionPeriod: '13 meses',
    retentionDays: 395,
    autoDelete: true,
    legalBasis: 'Consentimiento',
    lastReview: '2024-01-15',
    nextReview: '2024-07-15',
  },
  {
    id: 'ret-004',
    dataType: 'Datos de Marketing',
    description: 'Preferencias de comunicacion, interacciones con campanas',
    retentionPeriod: '2 anos tras ultima interaccion',
    retentionDays: 730,
    autoDelete: true,
    legalBasis: 'Consentimiento',
    lastReview: '2024-01-15',
    nextReview: '2024-07-15',
  },
  {
    id: 'ret-005',
    dataType: 'Registros de Consentimiento',
    description: 'Historial de consentimientos otorgados y revocados',
    retentionPeriod: '5 anos',
    retentionDays: 1825,
    autoDelete: false,
    legalBasis: 'Interes legitimo (demostrar cumplimiento)',
    lastReview: '2024-01-15',
    nextReview: '2024-07-15',
  },
  {
    id: 'ret-006',
    dataType: 'Logs de Seguridad',
    description: 'Accesos, intentos de login, cambios de contrasena',
    retentionPeriod: '1 ano',
    retentionDays: 365,
    autoDelete: true,
    legalBasis: 'Interes legitimo (seguridad)',
    lastReview: '2024-01-15',
    nextReview: '2024-07-15',
  },
  {
    id: 'ret-007',
    dataType: 'Datos de Soporte',
    description: 'Tickets, conversaciones, reclamaciones',
    retentionPeriod: '3 anos tras resolucion',
    retentionDays: 1095,
    autoDelete: true,
    legalBasis: 'Ejecucion de contrato',
    lastReview: '2024-01-15',
    nextReview: '2024-07-15',
  },
]
