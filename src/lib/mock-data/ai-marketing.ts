// AI Marketing Content Generator - Mock Data

export interface BannedPhrase {
  phrase: string
  category: 'medical_claim' | 'therapeutic' | 'unapproved' | 'misleading'
  suggestion: string
}

export interface GeneratedContent {
  id: string
  type: 'campaign' | 'email' | 'product_description'
  title: string
  content: string
  tone: string
  targetAudience: string
  complianceScore: number
  violations: string[]
  createdAt: string
}

export interface ContentTemplate {
  id: string
  name: string
  category: 'seasonal' | 'product_launch' | 'loyalty' | 'educational'
  description: string
  content: string
  tags: string[]
}

export const BANNED_PHRASES: BannedPhrase[] = [
  { phrase: 'cura', category: 'medical_claim', suggestion: 'puede contribuir al bienestar' },
  { phrase: 'cures', category: 'medical_claim', suggestion: 'supports wellness' },
  { phrase: 'treats', category: 'medical_claim', suggestion: 'may help with' },
  { phrase: 'trata', category: 'medical_claim', suggestion: 'puede ayudar con' },
  { phrase: 'heals', category: 'medical_claim', suggestion: 'promotes recovery' },
  { phrase: 'sana', category: 'medical_claim', suggestion: 'promueve la recuperacion' },
  { phrase: 'elimina el dolor', category: 'therapeutic', suggestion: 'puede aliviar molestias' },
  { phrase: 'eliminates pain', category: 'therapeutic', suggestion: 'may help ease discomfort' },
  { phrase: 'anti-cancer', category: 'medical_claim', suggestion: 'promueve el bienestar general' },
  { phrase: 'anticancer', category: 'medical_claim', suggestion: 'supports overall wellness' },
  { phrase: 'previene enfermedades', category: 'medical_claim', suggestion: 'apoya un estilo de vida saludable' },
  { phrase: 'prevents disease', category: 'medical_claim', suggestion: 'supports a healthy lifestyle' },
  { phrase: 'tratamiento', category: 'therapeutic', suggestion: 'rutina de bienestar' },
  { phrase: 'treatment', category: 'therapeutic', suggestion: 'wellness routine' },
  { phrase: 'medicamento', category: 'unapproved', suggestion: 'producto de bienestar' },
  { phrase: 'medicine', category: 'unapproved', suggestion: 'wellness product' },
  { phrase: 'diagnostico', category: 'medical_claim', suggestion: 'evaluacion personal' },
  { phrase: 'diagnosis', category: 'medical_claim', suggestion: 'personal assessment' },
  { phrase: 'prescripcion', category: 'unapproved', suggestion: 'recomendacion' },
  { phrase: 'prescription', category: 'unapproved', suggestion: 'recommendation' },
  { phrase: 'garantizado', category: 'misleading', suggestion: 'resultados pueden variar' },
  { phrase: 'guaranteed', category: 'misleading', suggestion: 'results may vary' },
  { phrase: 'cientificamente probado', category: 'misleading', suggestion: 'basado en estudios preliminares' },
  { phrase: 'scientifically proven', category: 'misleading', suggestion: 'based on preliminary studies' },
  { phrase: 'FDA approved', category: 'unapproved', suggestion: 'producido bajo estandares de calidad' },
  { phrase: 'aprobado por la FDA', category: 'unapproved', suggestion: 'producido bajo estandares de calidad' },
  { phrase: 'cura el insomnio', category: 'medical_claim', suggestion: 'puede favorecer el descanso' },
  { phrase: 'cures insomnia', category: 'medical_claim', suggestion: 'may promote restful sleep' },
  { phrase: 'reduce la ansiedad', category: 'therapeutic', suggestion: 'puede contribuir a la calma' },
  { phrase: 'reduces anxiety', category: 'therapeutic', suggestion: 'may promote a sense of calm' },
]

export const MOCK_GENERATED_CONTENT: GeneratedContent[] = [
  {
    id: 'gen-1',
    type: 'campaign',
    title: 'Campana Primavera Bienestar',
    content: 'Descubre nuestra nueva coleccion de primavera. Productos CBD premium que complementan tu rutina de bienestar diaria. Aceites, cremas y capsulas formulados con extractos naturales de la mas alta calidad. Siente la diferencia con ingredientes cuidadosamente seleccionados para tu equilibrio natural.',
    tone: 'profesional',
    targetAudience: 'Adultos 25-45, interesados en bienestar',
    complianceScore: 98,
    violations: [],
    createdAt: '2024-01-15',
  },
  {
    id: 'gen-2',
    type: 'email',
    title: 'Newsletter - Nuevos Productos Enero',
    content: 'Hola {nombre},\n\nEmpezamos el ano con novedades increibles. Nuestro nuevo Aceite CBD Premium 20% esta formulado con terpenos naturales que promueven una sensacion de bienestar y equilibrio.\n\nAdemas, te presentamos nuestra linea Sport con Balsamo CBD, ideal para tu rutina post-ejercicio.\n\nUsa el codigo ENERO20 para un 20% de descuento en tu primera compra del ano.\n\nSalud y bienestar,\nEl equipo CBD SaaS',
    tone: 'cercano',
    targetAudience: 'Clientes existentes',
    complianceScore: 95,
    violations: [],
    createdAt: '2024-01-12',
  },
  {
    id: 'gen-3',
    type: 'product_description',
    title: 'Aceite CBD Premium Full Spectrum 10%',
    content: 'Nuestro Aceite CBD Full Spectrum 10% es el companero perfecto para tu rutina de bienestar. Extraido mediante CO2 supercritico de canamo cultivado organicamente en Europa, cada gota contiene el espectro completo de cannabinoides y terpenos naturales.\n\nCaracteristicas:\n- 1000mg CBD por frasco de 10ml\n- Espectro completo con terpenos naturales\n- THC < 0.2% (conforme a normativa EU)\n- Certificado por laboratorio independiente\n- Sabor natural con notas terrosas',
    tone: 'informativo',
    targetAudience: 'Nuevos usuarios CBD',
    complianceScore: 100,
    violations: [],
    createdAt: '2024-01-10',
  },
  {
    id: 'gen-4',
    type: 'campaign',
    title: 'Promo San Valentin',
    content: 'Regala bienestar este San Valentin. Nuestros packs duo estan disenados para compartir momentos de relax y cuidado mutuo. El CBD puede favorecer la relajacion y el descanso. Packs desde 49.90EUR con envio gratuito.',
    tone: 'romantico',
    targetAudience: 'Parejas 25-50',
    complianceScore: 92,
    violations: [],
    createdAt: '2024-01-08',
  },
  {
    id: 'gen-5',
    type: 'email',
    title: 'Alerta: Contenido No Conforme',
    content: 'Nuestro CBD cura el estres y elimina el dolor. Es un tratamiento natural garantizado que previene enfermedades. Compra ahora nuestro medicamento natural.',
    tone: 'agresivo',
    targetAudience: 'Todos',
    complianceScore: 15,
    violations: ['cura', 'elimina el dolor', 'tratamiento', 'garantizado', 'previene enfermedades', 'medicamento'],
    createdAt: '2024-01-05',
  },
]

export const CONTENT_TEMPLATES: ContentTemplate[] = [
  {
    id: 'tpl-1',
    name: 'Lanzamiento de Producto',
    category: 'product_launch',
    description: 'Template para anunciar nuevos productos CBD',
    content: 'Presentamos {nombre_producto}: nuestra ultima innovacion en bienestar natural.\n\n{descripcion_breve}\n\nCaracteristicas principales:\n- {caracteristica_1}\n- {caracteristica_2}\n- {caracteristica_3}\n\nDisponible ahora en todas nuestras tiendas y online.\nUsa el codigo {codigo_descuento} para un {porcentaje}% en tu primera compra.',
    tags: ['producto', 'lanzamiento', 'novedad'],
  },
  {
    id: 'tpl-2',
    name: 'Promocion Estacional - Verano',
    category: 'seasonal',
    description: 'Campana de verano enfocada en bienestar y cuidado solar',
    content: 'Este verano, complementa tu rutina de cuidado con CBD.\n\nNuestra linea solar con CBD ofrece:\n- Hidratacion profunda con aceites naturales\n- Formulaciones ligeras ideales para el calor\n- Ingredientes premium de origen europeo\n\nOferta especial: {oferta_detalle}\nValida hasta {fecha_fin}.',
    tags: ['verano', 'estacional', 'solar', 'cuidado'],
  },
  {
    id: 'tpl-3',
    name: 'Programa de Fidelidad',
    category: 'loyalty',
    description: 'Comunicacion para miembros del programa de puntos',
    content: 'Hola {nombre},\n\nGracias por ser parte de nuestra comunidad CBD. Como miembro {nivel}, tienes acceso a:\n\n- {beneficio_1}\n- {beneficio_2}\n- Envio gratuito en pedidos superiores a {monto_minimo}EUR\n- Acceso anticipado a nuevos lanzamientos\n\nTus puntos actuales: {puntos}\nPuntos para el siguiente nivel: {puntos_faltantes}\n\nSigue disfrutando de tu rutina de bienestar.',
    tags: ['fidelidad', 'puntos', 'VIP'],
  },
  {
    id: 'tpl-4',
    name: 'Contenido Educativo - Que es el CBD',
    category: 'educational',
    description: 'Articulo informativo sobre CBD para nuevos usuarios',
    content: 'Guia para principiantes: Entendiendo el CBD\n\nEl CBD (cannabidiol) es un compuesto natural derivado del canamo industrial. A diferencia del THC, el CBD no produce efectos psicoactivos.\n\nPuntos clave:\n- El CBD es legal en la UE con THC < 0.2%\n- Se extrae de variedades de canamo certificadas\n- Disponible en aceites, capsulas, topicos y mas\n- Cada persona puede experimentar resultados diferentes\n\nNota: Este contenido es meramente informativo y no constituye consejo medico. Consulta siempre con un profesional de la salud.',
    tags: ['educativo', 'principiantes', 'informativo'],
  },
  {
    id: 'tpl-5',
    name: 'Promocion Estacional - Invierno',
    category: 'seasonal',
    description: 'Campana de invierno enfocada en relax y descanso',
    content: 'Encuentra tu equilibrio este invierno.\n\nNuestra seleccion invernal incluye:\n- Infusiones CBD para noches frias\n- Balsamos reconfortantes con aceites esenciales\n- Packs regalo para Navidad\n\nLa temporada perfecta para incorporar el CBD a tu rutina nocturna.\n\nDescubre nuestras ofertas: {url_ofertas}\nEnvio gratuito a partir de {monto}EUR.',
    tags: ['invierno', 'navidad', 'relax', 'regalo'],
  },
  {
    id: 'tpl-6',
    name: 'Reactivacion de Clientes',
    category: 'loyalty',
    description: 'Email para clientes inactivos',
    content: 'Hola {nombre},\n\nTe echamos de menos. Han pasado {dias} dias desde tu ultima visita y queremos recordarte que tu bienestar es nuestra prioridad.\n\nComo muestra de agradecimiento, aqui tienes un {porcentaje}% de descuento exclusivo: {codigo}\n\nValido durante los proximos 7 dias.\n\nAdemas, hemos anadido nuevos productos a nuestro catalogo que creemos te encantaran.\n\nTe esperamos,\nEl equipo CBD SaaS',
    tags: ['reactivacion', 'winback', 'descuento'],
  },
]

export const TONE_OPTIONS = [
  { id: 'profesional', label: 'Profesional' },
  { id: 'cercano', label: 'Cercano y amigable' },
  { id: 'informativo', label: 'Informativo' },
  { id: 'persuasivo', label: 'Persuasivo' },
  { id: 'inspirador', label: 'Inspirador' },
]

export const AUDIENCE_OPTIONS = [
  { id: 'nuevos', label: 'Nuevos usuarios CBD' },
  { id: 'existentes', label: 'Clientes existentes' },
  { id: 'deportistas', label: 'Deportistas' },
  { id: 'bienestar', label: 'Interesados en bienestar' },
  { id: 'seniors', label: 'Adultos mayores' },
  { id: 'todos', label: 'Publico general' },
]

export function checkCompliance(text: string): { score: number; violations: BannedPhrase[] } {
  const lowerText = text.toLowerCase()
  const violations = BANNED_PHRASES.filter((bp) => lowerText.includes(bp.phrase.toLowerCase()))
  const score = Math.max(0, 100 - violations.length * 15)
  return { score, violations }
}

export function getTemplatesByCategory(category: ContentTemplate['category']): ContentTemplate[] {
  return CONTENT_TEMPLATES.filter((t) => t.category === category)
}
