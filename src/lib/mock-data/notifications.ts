import { NotificationType } from '@/lib/constants'

export interface MockNotification {
  id: string
  type: NotificationType
  title: string
  message: string
  timestamp: string
  read: boolean
  link?: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  storeId?: string
  resourceId?: string
  resourceType?: string
}

export const mockNotifications: MockNotification[] = [
  {
    id: 'notif-001',
    type: NotificationType.STOCK_ALERT,
    title: 'Stock critico: CBD Oil 10%',
    message: 'Solo quedan 2 unidades de CBD Oil 10% en Madrid Centro. Reabastecer urgente.',
    timestamp: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
    read: false,
    link: '/dashboard/inventory',
    severity: 'critical',
    storeId: '1',
    resourceId: 'prod-001',
    resourceType: 'product',
  },
  {
    id: 'notif-002',
    type: NotificationType.ORDER_UPDATE,
    title: 'Nuevo pedido #ORD-2024-1205',
    message: 'Pedido recibido de Carlos Martinez por 189.90 EUR en Valencia Puerto.',
    timestamp: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
    read: false,
    link: '/dashboard/orders',
    severity: 'medium',
    storeId: '2',
    resourceId: 'ord-1205',
    resourceType: 'order',
  },
  {
    id: 'notif-003',
    type: NotificationType.SECURITY_ALERT,
    title: 'Intento de acceso fallido',
    message: 'Se detectaron 3 intentos fallidos de inicio de sesion desde IP 83.42.115.201.',
    timestamp: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    read: false,
    severity: 'critical',
    resourceType: 'security',
  },
  {
    id: 'notif-004',
    type: NotificationType.TRANSFER_UPDATE,
    title: 'Transferencia en transito',
    message: 'La transferencia TRF-2024-089 de Barcelona Gotico a Sevilla Triana esta en camino.',
    timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    read: false,
    link: '/dashboard/transfers',
    severity: 'low',
    storeId: '3',
    resourceId: 'trf-089',
    resourceType: 'transfer',
  },
  {
    id: 'notif-005',
    type: NotificationType.WARNING,
    title: 'Producto proximo a caducar',
    message: 'CBD Capsulas 25mg en Alicante Marina caduca en 15 dias. 24 unidades afectadas.',
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    read: false,
    link: '/dashboard/inventory',
    severity: 'high',
    storeId: '4',
    resourceId: 'prod-015',
    resourceType: 'product',
  },
  {
    id: 'notif-006',
    type: NotificationType.SUCCESS,
    title: 'Reporte mensual generado',
    message: 'El reporte de ventas de diciembre 2024 esta disponible para descarga.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    read: false,
    link: '/dashboard/analytics',
    severity: 'low',
    resourceType: 'report',
  },
  {
    id: 'notif-007',
    type: NotificationType.STOCK_ALERT,
    title: 'Stock bajo: Crema CBD 200ml',
    message: 'Solo 5 unidades disponibles en Barcelona Gotico. Minimo configurado: 10.',
    timestamp: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
    read: true,
    link: '/dashboard/inventory',
    severity: 'high',
    storeId: '3',
    resourceId: 'prod-008',
    resourceType: 'product',
  },
  {
    id: 'notif-008',
    type: NotificationType.ORDER_UPDATE,
    title: 'Pedido #ORD-2024-1198 enviado',
    message: 'El pedido ha sido enviado con numero de seguimiento ES2024891234.',
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    read: true,
    link: '/dashboard/orders',
    severity: 'low',
    storeId: '1',
    resourceId: 'ord-1198',
    resourceType: 'order',
  },
  {
    id: 'notif-009',
    type: NotificationType.INFO,
    title: 'Actualizacion del sistema programada',
    message: 'Se realizara mantenimiento el sabado 21 de diciembre de 02:00 a 04:00.',
    timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    read: true,
    severity: 'low',
    resourceType: 'system',
  },
  {
    id: 'notif-010',
    type: NotificationType.ERROR,
    title: 'Error en sincronizacion de inventario',
    message: 'La sincronizacion automatica de inventario fallo para Valencia Puerto. Reintentar manualmente.',
    timestamp: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
    read: false,
    link: '/dashboard/inventory',
    severity: 'critical',
    storeId: '2',
    resourceType: 'inventory',
  },
  {
    id: 'notif-011',
    type: NotificationType.TRANSFER_UPDATE,
    title: 'Transferencia completada',
    message: 'TRF-2024-087 de Madrid Centro a Valencia Puerto recibida correctamente.',
    timestamp: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
    read: true,
    link: '/dashboard/transfers',
    severity: 'low',
    storeId: '2',
    resourceId: 'trf-087',
    resourceType: 'transfer',
  },
  {
    id: 'notif-012',
    type: NotificationType.SUCCESS,
    title: 'Campana activada exitosamente',
    message: 'La campana "Navidad CBD 2024" ha sido activada y esta enviando correos.',
    timestamp: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
    read: true,
    link: '/dashboard/marketing',
    severity: 'low',
    resourceId: 'camp-012',
    resourceType: 'campaign',
  },
  {
    id: 'notif-013',
    type: NotificationType.SECURITY_ALERT,
    title: 'Nuevo dispositivo detectado',
    message: 'Ana Garcia inicio sesion desde un nuevo dispositivo en Sevilla.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    read: true,
    severity: 'medium',
    resourceType: 'security',
  },
  {
    id: 'notif-014',
    type: NotificationType.WARNING,
    title: 'Meta de ventas en riesgo',
    message: 'Sevilla Triana esta al 45% de su meta mensual con solo 5 dias restantes.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 10).toISOString(),
    read: true,
    link: '/dashboard/analytics',
    severity: 'high',
    storeId: '5',
    resourceType: 'sales',
  },
  {
    id: 'notif-015',
    type: NotificationType.ORDER_UPDATE,
    title: 'Pedido #ORD-2024-1190 cancelado',
    message: 'El cliente solicito la cancelacion del pedido. Reembolso en proceso.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    read: true,
    link: '/dashboard/orders',
    severity: 'medium',
    storeId: '1',
    resourceId: 'ord-1190',
    resourceType: 'order',
  },
  {
    id: 'notif-016',
    type: NotificationType.STOCK_ALERT,
    title: 'Reabastecimiento programado',
    message: 'El pedido al proveedor HempLife para Madrid Centro llegara manana.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 14).toISOString(),
    read: true,
    link: '/dashboard/suppliers',
    severity: 'low',
    storeId: '1',
    resourceType: 'supplier',
  },
  {
    id: 'notif-017',
    type: NotificationType.INFO,
    title: 'Nuevo empleado registrado',
    message: 'Miguel Sanchez ha sido anadido como vendedor en Barcelona Gotico.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
    read: true,
    link: '/dashboard/employees',
    severity: 'low',
    storeId: '3',
    resourceType: 'employee',
  },
  {
    id: 'notif-018',
    type: NotificationType.ERROR,
    title: 'Fallo en pasarela de pago',
    message: 'La pasarela de pago Stripe reporto un error temporal. 2 transacciones pendientes.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
    read: true,
    severity: 'critical',
    resourceType: 'payment',
  },
  {
    id: 'notif-019',
    type: NotificationType.TRANSFER_UPDATE,
    title: 'Transferencia aprobada',
    message: 'TRF-2024-090 de Alicante Marina a Madrid Centro ha sido aprobada por Admin.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 22).toISOString(),
    read: true,
    link: '/dashboard/transfers',
    severity: 'low',
    storeId: '4',
    resourceId: 'trf-090',
    resourceType: 'transfer',
  },
  {
    id: 'notif-020',
    type: NotificationType.SUCCESS,
    title: 'Inventario actualizado',
    message: 'El conteo fisico de Valencia Puerto ha sido completado. 3 diferencias encontradas.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    read: true,
    link: '/dashboard/inventory',
    severity: 'low',
    storeId: '2',
    resourceType: 'inventory',
  },
  {
    id: 'notif-021',
    type: NotificationType.WARNING,
    title: 'Certificacion por vencer',
    message: 'La certificacion organica de CBD Premium Oil vence en 30 dias. Renovar.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
    read: true,
    severity: 'high',
    resourceId: 'prod-003',
    resourceType: 'product',
  },
  {
    id: 'notif-022',
    type: NotificationType.SECURITY_ALERT,
    title: 'Cambio de contrasena exitoso',
    message: 'Pedro Lopez actualizo su contrasena correctamente.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 40).toISOString(),
    read: true,
    severity: 'low',
    resourceType: 'security',
  },
  {
    id: 'notif-023',
    type: NotificationType.ORDER_UPDATE,
    title: 'Pedido #ORD-2024-1185 entregado',
    message: 'El pedido fue entregado exitosamente al cliente en Barcelona.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    read: true,
    link: '/dashboard/orders',
    severity: 'low',
    storeId: '3',
    resourceId: 'ord-1185',
    resourceType: 'order',
  },
  {
    id: 'notif-024',
    type: NotificationType.INFO,
    title: 'Promocion de temporada disponible',
    message: 'La plantilla "Rebajas de Enero" esta lista para activar en el modulo de marketing.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 52).toISOString(),
    read: true,
    link: '/dashboard/marketing',
    severity: 'low',
    resourceType: 'campaign',
  },
  {
    id: 'notif-025',
    type: NotificationType.STOCK_ALERT,
    title: 'Stock agotado: Vaporizador CBD',
    message: 'Vaporizador Portatil CBD en Sevilla Triana tiene 0 unidades. Sin fecha de reposicion.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 56).toISOString(),
    read: true,
    link: '/dashboard/inventory',
    severity: 'critical',
    storeId: '5',
    resourceId: 'prod-022',
    resourceType: 'product',
  },
  {
    id: 'notif-026',
    type: NotificationType.ERROR,
    title: 'Error en exportacion de datos',
    message: 'La exportacion del reporte financiero Q4 fallo. Archivo corrupto.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 60).toISOString(),
    read: true,
    severity: 'high',
    resourceType: 'report',
  },
  {
    id: 'notif-027',
    type: NotificationType.SUCCESS,
    title: 'Cliente VIP alcanzado',
    message: 'Laura Fernandez ha alcanzado el nivel VIP con 5,200 puntos acumulados.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    read: true,
    link: '/dashboard/customers',
    severity: 'low',
    resourceId: 'cust-045',
    resourceType: 'customer',
  },
  {
    id: 'notif-028',
    type: NotificationType.WARNING,
    title: 'Proveedor con retraso',
    message: 'El pedido al proveedor GreenExtract tiene 3 dias de retraso. Contactar.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 80).toISOString(),
    read: true,
    link: '/dashboard/suppliers',
    severity: 'high',
    resourceType: 'supplier',
  },
  {
    id: 'notif-029',
    type: NotificationType.TRANSFER_UPDATE,
    title: 'Transferencia rechazada',
    message: 'TRF-2024-085 fue rechazada por falta de stock en origen.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(),
    read: true,
    link: '/dashboard/transfers',
    severity: 'medium',
    resourceId: 'trf-085',
    resourceType: 'transfer',
  },
  {
    id: 'notif-030',
    type: NotificationType.INFO,
    title: 'Backup completado',
    message: 'El backup automatico semanal se completo exitosamente.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString(),
    read: true,
    severity: 'low',
    resourceType: 'system',
  },
  {
    id: 'notif-031',
    type: NotificationType.SECURITY_ALERT,
    title: 'Permisos modificados',
    message: 'Los permisos del rol "Manager" han sido actualizados por el administrador.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 144).toISOString(),
    read: true,
    severity: 'medium',
    resourceType: 'security',
  },
  {
    id: 'notif-032',
    type: NotificationType.ORDER_UPDATE,
    title: 'Pedido mayorista recibido',
    message: 'Nuevo pedido mayorista #ORD-2024-1180 por 2,450 EUR de CBD Distribuciones.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 168).toISOString(),
    read: true,
    link: '/dashboard/orders',
    severity: 'medium',
    storeId: '1',
    resourceId: 'ord-1180',
    resourceType: 'order',
  },
]

// Helper function to get notification severity color
export function getNotificationSeverityColor(severity: MockNotification['severity']): string {
  switch (severity) {
    case 'critical':
      return 'text-red-400'
    case 'high':
      return 'text-amber-400'
    case 'medium':
      return 'text-yellow-400'
    case 'low':
      return 'text-cbd-gray-light'
  }
}

// Helper function to get notification type label
export function getNotificationTypeLabel(type: NotificationType): string {
  switch (type) {
    case NotificationType.INFO:
      return 'Informacion'
    case NotificationType.SUCCESS:
      return 'Exito'
    case NotificationType.WARNING:
      return 'Advertencia'
    case NotificationType.ERROR:
      return 'Error'
    case NotificationType.STOCK_ALERT:
      return 'Alerta de Stock'
    case NotificationType.ORDER_UPDATE:
      return 'Pedidos'
    case NotificationType.TRANSFER_UPDATE:
      return 'Transferencias'
    case NotificationType.SECURITY_ALERT:
      return 'Seguridad'
  }
}
