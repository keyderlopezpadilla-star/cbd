export interface StoreConfig {
  name: string
  logo: string | null
  description: string
  address: string
  city: string
  postalCode: string
  country: string
  phone: string
  email: string
  website: string
  timezone: string
  businessHours: {
    day: string
    open: string
    close: string
    isOpen: boolean
  }[]
}

export interface TaxRate {
  id: string
  name: string
  region: string
  rate: number
  productType: string
  isActive: boolean
}

export interface CurrencyOption {
  code: string
  name: string
  symbol: string
}

export interface LanguageOption {
  code: string
  name: string
  flag: string
}

export interface NotificationSetting {
  id: string
  type: string
  label: string
  description: string
  channels: {
    email: boolean
    push: boolean
    sms: boolean
    inApp: boolean
  }
  frequency: 'instant' | 'hourly' | 'daily' | 'weekly'
}

export interface IntegrationConfig {
  id: string
  name: string
  description: string
  category: 'payment' | 'shipping' | 'analytics' | 'crm'
  icon: string
  isConnected: boolean
  status: 'active' | 'inactive' | 'error'
  lastSync?: string
  configUrl?: string
}

export const STORE_CONFIG: StoreConfig = {
  name: 'CBD Premium Store',
  logo: null,
  description: 'Tienda especializada en productos de CBD de alta calidad. Ofrecemos aceites, cremas, flores y mas productos certificados.',
  address: 'Calle Gran Via 42, Planta Baja',
  city: 'Madrid',
  postalCode: '28013',
  country: 'Espana',
  phone: '+34 91 234 5678',
  email: 'info@cbdpremium.es',
  website: 'https://www.cbdpremium.es',
  timezone: 'Europe/Madrid',
  businessHours: [
    { day: 'Lunes', open: '10:00', close: '20:00', isOpen: true },
    { day: 'Martes', open: '10:00', close: '20:00', isOpen: true },
    { day: 'Miercoles', open: '10:00', close: '20:00', isOpen: true },
    { day: 'Jueves', open: '10:00', close: '20:00', isOpen: true },
    { day: 'Viernes', open: '10:00', close: '21:00', isOpen: true },
    { day: 'Sabado', open: '11:00', close: '21:00', isOpen: true },
    { day: 'Domingo', open: '11:00', close: '15:00', isOpen: false },
  ],
}

export const TAX_RATES: TaxRate[] = [
  { id: 'tax-1', name: 'IVA General', region: 'Espana', rate: 21, productType: 'General', isActive: true },
  { id: 'tax-2', name: 'IVA Reducido', region: 'Espana', rate: 10, productType: 'Cosmeticos', isActive: true },
  { id: 'tax-3', name: 'IVA Superreducido', region: 'Espana', rate: 4, productType: 'Alimentacion', isActive: true },
  { id: 'tax-4', name: 'IGIC General', region: 'Canarias', rate: 7, productType: 'General', isActive: true },
  { id: 'tax-5', name: 'IGIC Reducido', region: 'Canarias', rate: 3, productType: 'Cosmeticos', isActive: true },
  { id: 'tax-6', name: 'IVA Portugal', region: 'Portugal', rate: 23, productType: 'General', isActive: false },
  { id: 'tax-7', name: 'TVA Francia', region: 'Francia', rate: 20, productType: 'General', isActive: false },
]

export const CURRENCY_OPTIONS: CurrencyOption[] = [
  { code: 'EUR', name: 'Euro', symbol: '\u20AC' },
  { code: 'USD', name: 'Dolar Estadounidense', symbol: '$' },
  { code: 'GBP', name: 'Libra Esterlina', symbol: '\u00A3' },
  { code: 'CHF', name: 'Franco Suizo', symbol: 'CHF' },
]

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: 'es', name: 'Espanol', flag: '\uD83C\uDDEA\uD83C\uDDF8' },
  { code: 'en', name: 'English', flag: '\uD83C\uDDEC\uD83C\uDDE7' },
  { code: 'fr', name: 'Francais', flag: '\uD83C\uDDEB\uD83C\uDDF7' },
  { code: 'de', name: 'Deutsch', flag: '\uD83C\uDDE9\uD83C\uDDEA' },
  { code: 'pt', name: 'Portugues', flag: '\uD83C\uDDF5\uD83C\uDDF9' },
]

export const NOTIFICATION_SETTINGS: NotificationSetting[] = [
  {
    id: 'notif-1',
    type: 'orders',
    label: 'Pedidos Nuevos',
    description: 'Notificacion cuando se recibe un nuevo pedido',
    channels: { email: true, push: true, sms: false, inApp: true },
    frequency: 'instant',
  },
  {
    id: 'notif-2',
    type: 'orders',
    label: 'Pedido Cancelado',
    description: 'Notificacion cuando un cliente cancela un pedido',
    channels: { email: true, push: true, sms: true, inApp: true },
    frequency: 'instant',
  },
  {
    id: 'notif-3',
    type: 'inventory',
    label: 'Stock Bajo',
    description: 'Alerta cuando un producto alcanza el stock minimo',
    channels: { email: true, push: false, sms: false, inApp: true },
    frequency: 'daily',
  },
  {
    id: 'notif-4',
    type: 'inventory',
    label: 'Stock Agotado',
    description: 'Alerta inmediata cuando un producto se agota',
    channels: { email: true, push: true, sms: true, inApp: true },
    frequency: 'instant',
  },
  {
    id: 'notif-5',
    type: 'marketing',
    label: 'Campana Finalizada',
    description: 'Resumen de resultados al finalizar una campana',
    channels: { email: true, push: false, sms: false, inApp: true },
    frequency: 'daily',
  },
  {
    id: 'notif-6',
    type: 'marketing',
    label: 'Nuevo Suscriptor',
    description: 'Notificacion de nuevos suscriptores al newsletter',
    channels: { email: false, push: false, sms: false, inApp: true },
    frequency: 'weekly',
  },
  {
    id: 'notif-7',
    type: 'system',
    label: 'Actualizaciones del Sistema',
    description: 'Notificaciones sobre mantenimiento y actualizaciones',
    channels: { email: true, push: false, sms: false, inApp: true },
    frequency: 'weekly',
  },
  {
    id: 'notif-8',
    type: 'system',
    label: 'Alertas de Seguridad',
    description: 'Accesos sospechosos o cambios de configuracion',
    channels: { email: true, push: true, sms: true, inApp: true },
    frequency: 'instant',
  },
]

export const INTEGRATION_CONFIGS: IntegrationConfig[] = [
  {
    id: 'int-1',
    name: 'Stripe',
    description: 'Procesamiento de pagos con tarjeta de credito y debito',
    category: 'payment',
    icon: 'CreditCard',
    isConnected: true,
    status: 'active',
    lastSync: '2024-01-15T10:30:00Z',
  },
  {
    id: 'int-2',
    name: 'Redsys',
    description: 'Pasarela de pago espanola para comercio electronico',
    category: 'payment',
    icon: 'CreditCard',
    isConnected: true,
    status: 'active',
    lastSync: '2024-01-15T10:30:00Z',
  },
  {
    id: 'int-3',
    name: 'PayPal',
    description: 'Pagos online seguros y transferencias de dinero',
    category: 'payment',
    icon: 'Wallet',
    isConnected: false,
    status: 'inactive',
  },
  {
    id: 'int-4',
    name: 'Correos Express',
    description: 'Envios nacionales e internacionales con seguimiento',
    category: 'shipping',
    icon: 'Truck',
    isConnected: true,
    status: 'active',
    lastSync: '2024-01-15T08:00:00Z',
  },
  {
    id: 'int-5',
    name: 'SEUR',
    description: 'Logistica y paqueteria express en la peninsula',
    category: 'shipping',
    icon: 'Package',
    isConnected: true,
    status: 'active',
    lastSync: '2024-01-14T22:00:00Z',
  },
  {
    id: 'int-6',
    name: 'MRW',
    description: 'Transporte urgente y logistica empresarial',
    category: 'shipping',
    icon: 'Truck',
    isConnected: false,
    status: 'inactive',
  },
  {
    id: 'int-7',
    name: 'Google Analytics 4',
    description: 'Analisis de trafico web y comportamiento de usuarios',
    category: 'analytics',
    icon: 'BarChart3',
    isConnected: true,
    status: 'active',
    lastSync: '2024-01-15T11:00:00Z',
  },
  {
    id: 'int-8',
    name: 'Meta Pixel',
    description: 'Seguimiento de conversiones para Facebook e Instagram Ads',
    category: 'analytics',
    icon: 'Activity',
    isConnected: false,
    status: 'inactive',
  },
  {
    id: 'int-9',
    name: 'HubSpot',
    description: 'CRM completo para gestion de clientes y marketing',
    category: 'crm',
    icon: 'Users',
    isConnected: false,
    status: 'inactive',
  },
  {
    id: 'int-10',
    name: 'Mailchimp',
    description: 'Email marketing y automatizacion de campanas',
    category: 'crm',
    icon: 'Mail',
    isConnected: true,
    status: 'error',
    lastSync: '2024-01-13T15:00:00Z',
  },
]
