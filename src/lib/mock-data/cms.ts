// CMS Internal - Mock Data

export interface Banner {
  id: string
  title: string
  subtitle: string
  imageUrl: string
  ctaText: string
  ctaLink: string
  position: 'hero' | 'sidebar' | 'footer' | 'popup'
  isActive: boolean
  startDate: string
  endDate: string | null
  createdAt: string
  updatedAt: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  author: string
  featuredImage: string
  status: 'draft' | 'published' | 'scheduled'
  publishDate: string | null
  seoTitle: string
  seoDescription: string
  tags: string[]
  createdAt: string
  updatedAt: string
}

export interface FAQEntry {
  id: string
  question: string
  answer: string
  category: string
  order: number
  isPublished: boolean
  createdAt: string
  updatedAt: string
}

export interface PageContent {
  id: string
  title: string
  slug: string
  content: string
  status: 'draft' | 'published'
  lastEditedBy: string
  createdAt: string
  updatedAt: string
}

export interface SEOMetadata {
  id: string
  route: string
  pageTitle: string
  metaTitle: string
  metaDescription: string
  keywords: string[]
  ogTitle: string
  ogDescription: string
  ogImage: string
  canonical: string
  updatedAt: string
}

export const MOCK_BANNERS: Banner[] = [
  {
    id: 'banner-1',
    title: 'Nueva Coleccion Primavera 2024',
    subtitle: 'Descubre nuestros aceites y cremas con formulaciones renovadas',
    imageUrl: '/images/banners/spring-2024.jpg',
    ctaText: 'Ver Coleccion',
    ctaLink: '/productos/primavera-2024',
    position: 'hero',
    isActive: true,
    startDate: '2024-03-01',
    endDate: '2024-05-31',
    createdAt: '2024-02-15',
    updatedAt: '2024-02-20',
  },
  {
    id: 'banner-2',
    title: 'Envio Gratis +50EUR',
    subtitle: 'En todos los pedidos superiores a 50 euros',
    imageUrl: '/images/banners/free-shipping.jpg',
    ctaText: 'Comprar Ahora',
    ctaLink: '/productos',
    position: 'sidebar',
    isActive: true,
    startDate: '2024-01-01',
    endDate: null,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: 'banner-3',
    title: 'Pack Duo San Valentin',
    subtitle: 'Regala bienestar con un 25% de descuento',
    imageUrl: '/images/banners/valentines.jpg',
    ctaText: 'Ver Packs',
    ctaLink: '/productos/san-valentin',
    position: 'popup',
    isActive: false,
    startDate: '2024-02-01',
    endDate: '2024-02-14',
    createdAt: '2024-01-20',
    updatedAt: '2024-01-25',
  },
  {
    id: 'banner-4',
    title: 'Programa de Puntos CBD',
    subtitle: 'Acumula puntos con cada compra y canjealos por descuentos',
    imageUrl: '/images/banners/loyalty.jpg',
    ctaText: 'Unirme',
    ctaLink: '/fidelidad',
    position: 'footer',
    isActive: true,
    startDate: '2024-01-01',
    endDate: null,
    createdAt: '2023-11-01',
    updatedAt: '2024-01-10',
  },
]

export const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Guia Completa: Como Elegir tu Aceite CBD',
    slug: 'guia-elegir-aceite-cbd',
    excerpt: 'Todo lo que necesitas saber para elegir el aceite CBD que mejor se adapte a tus necesidades.',
    content: '# Guia Completa: Como Elegir tu Aceite CBD\n\nElegir el aceite CBD adecuado puede parecer complicado con tantas opciones disponibles. En esta guia te ayudamos a entender las diferencias.\n\n## Tipos de Extracto\n\n### Full Spectrum\nContiene todos los cannabinoides naturales de la planta, incluyendo trazas de THC (< 0.2%).\n\n### Broad Spectrum\nSimilar al full spectrum pero sin THC detectable.\n\n### Aislado (Isolate)\nCBD puro al 99%, sin otros cannabinoides.\n\n## Concentraciones\n\n- **5%** - Ideal para principiantes\n- **10%** - Uso regular\n- **20%** - Usuarios experimentados\n- **30%** - Uso intensivo\n\n## Como Usarlo\n\nAplica las gotas bajo la lengua y mantelas 60 segundos antes de tragar.',
    category: 'Guias',
    author: 'Dra. Maria Lopez',
    featuredImage: '/images/blog/aceite-cbd-guia.jpg',
    status: 'published',
    publishDate: '2024-01-10',
    seoTitle: 'Guia Completa para Elegir Aceite CBD | CBD SaaS',
    seoDescription: 'Aprende a elegir el aceite CBD ideal. Comparamos full spectrum, broad spectrum y aislado. Guia de concentraciones y uso.',
    tags: ['aceite', 'guia', 'principiantes'],
    createdAt: '2024-01-08',
    updatedAt: '2024-01-10',
  },
  {
    id: 'blog-2',
    title: 'CBD y Deporte: Lo que Necesitas Saber',
    slug: 'cbd-deporte-guia',
    excerpt: 'El CBD se ha convertido en un complemento popular entre deportistas. Descubre por que.',
    content: '# CBD y Deporte\n\nCada vez mas deportistas incorporan el CBD a su rutina. Veamos que dice la evidencia actual.\n\n## CBD en el Deporte Profesional\n\nDesde 2018, la WADA elimino el CBD de la lista de sustancias prohibidas.\n\n## Usos Comunes\n\n- Rutina post-entrenamiento\n- Complemento para el descanso\n- Cuidado muscular topico\n\n## Productos Recomendados para Deportistas\n\n- Balsamo CBD Sport\n- Aceite CBD Recovery\n- Capsulas CBD Energy\n\n*Nota: Los resultados individuales pueden variar.*',
    category: 'Deporte',
    author: 'Carlos Martinez',
    featuredImage: '/images/blog/cbd-deporte.jpg',
    status: 'published',
    publishDate: '2024-01-05',
    seoTitle: 'CBD y Deporte: Guia Completa para Deportistas | CBD SaaS',
    seoDescription: 'Descubre como los deportistas usan CBD. Informacion sobre WADA, productos recomendados y rutinas.',
    tags: ['deporte', 'fitness', 'recuperacion'],
    createdAt: '2024-01-03',
    updatedAt: '2024-01-05',
  },
  {
    id: 'blog-3',
    title: 'Novedades CBD 2024: Tendencias del Sector',
    slug: 'novedades-cbd-2024',
    excerpt: 'Las principales tendencias que marcaran el mercado CBD en 2024.',
    content: '# Tendencias CBD 2024\n\nEl mercado del CBD sigue creciendo y evolucionando. Estas son las tendencias clave para 2024.\n\n## 1. CBD Hidrosoluble\nFormulaciones que mejoran la biodisponibilidad.\n\n## 2. Personalizacion\nProductos adaptados al perfil individual del usuario.\n\n## 3. Sostenibilidad\nEnvases eco-friendly y cultivo regenerativo.\n\n## 4. Nuevos Formatos\n- Bebidas funcionales\n- Parches transdermicos\n- Tecnologia liposomal',
    category: 'Tendencias',
    author: 'Ana Garcia',
    featuredImage: '/images/blog/tendencias-2024.jpg',
    status: 'draft',
    publishDate: null,
    seoTitle: 'Tendencias CBD 2024 | CBD SaaS',
    seoDescription: 'Conoce las principales tendencias del mercado CBD para 2024: CBD hidrosoluble, personalizacion, sostenibilidad.',
    tags: ['tendencias', '2024', 'innovacion'],
    createdAt: '2024-01-12',
    updatedAt: '2024-01-14',
  },
  {
    id: 'blog-4',
    title: 'Diferencias entre CBD y THC',
    slug: 'diferencias-cbd-thc',
    excerpt: 'Entende las diferencias fundamentales entre CBD y THC de forma clara y sencilla.',
    content: '# CBD vs THC: Diferencias Clave\n\nAmbos son cannabinoides pero tienen efectos muy diferentes.\n\n## CBD (Cannabidiol)\n- No psicoactivo\n- Legal en la UE (< 0.2% THC)\n- No produce dependencia\n\n## THC (Tetrahidrocannabinol)\n- Psicoactivo\n- Regulado/prohibido en muchos paises\n- Produce el efecto "high"\n\n## Legalidad en Espana\nEl CBD derivado de canamo industrial con menos del 0.2% de THC es legal para su venta.',
    category: 'Educacion',
    author: 'Dra. Maria Lopez',
    featuredImage: '/images/blog/cbd-vs-thc.jpg',
    status: 'published',
    publishDate: '2023-12-20',
    seoTitle: 'CBD vs THC: Diferencias Explicadas | CBD SaaS',
    seoDescription: 'Comprende las diferencias entre CBD y THC. Efectos, legalidad y usos explicados de forma sencilla.',
    tags: ['educacion', 'CBD', 'THC', 'legalidad'],
    createdAt: '2023-12-18',
    updatedAt: '2023-12-20',
  },
]

export const MOCK_FAQ_ENTRIES: FAQEntry[] = [
  {
    id: 'faq-1',
    question: 'Que es el CBD?',
    answer: 'El CBD (cannabidiol) es un compuesto natural que se encuentra en la planta de canamo. A diferencia del THC, no produce efectos psicoactivos y es legal en la Union Europea cuando se deriva de variedades de canamo certificadas con menos del 0.2% de THC.',
    category: 'General',
    order: 1,
    isPublished: true,
    createdAt: '2023-06-01',
    updatedAt: '2024-01-05',
  },
  {
    id: 'faq-2',
    question: 'Es legal el CBD en Espana?',
    answer: 'Si, el CBD derivado de canamo industrial con un contenido de THC inferior al 0.2% es legal en Espana. Nuestros productos cumplen con toda la normativa vigente y cuentan con certificados de laboratorio que verifican su composicion.',
    category: 'Legal',
    order: 2,
    isPublished: true,
    createdAt: '2023-06-01',
    updatedAt: '2024-01-05',
  },
  {
    id: 'faq-3',
    question: 'Como se usa el aceite CBD?',
    answer: 'El aceite CBD se aplica en gotas bajo la lengua (uso sublingual). Se recomienda mantener las gotas durante 60 segundos antes de tragar para una mejor absorcion. La dosificacion varia segun la persona y la concentracion del producto.',
    category: 'Uso',
    order: 3,
    isPublished: true,
    createdAt: '2023-06-01',
    updatedAt: '2024-01-05',
  },
  {
    id: 'faq-4',
    question: 'El CBD da positivo en un test de drogas?',
    answer: 'Los productos de CBD aislado (isolate) no deberian dar positivo. Sin embargo, los productos Full Spectrum contienen trazas de THC (< 0.2%) que, en consumo elevado, podrian ser detectados. Si te preocupa, opta por productos Broad Spectrum o Isolate.',
    category: 'General',
    order: 4,
    isPublished: true,
    createdAt: '2023-06-15',
    updatedAt: '2024-01-05',
  },
  {
    id: 'faq-5',
    question: 'Cuanto tarda el envio?',
    answer: 'Los envios dentro de la peninsula se realizan en 24-48 horas laborables. Baleares y Canarias pueden tardar 3-5 dias laborables. Envio gratuito en pedidos superiores a 50EUR.',
    category: 'Envios',
    order: 5,
    isPublished: true,
    createdAt: '2023-06-01',
    updatedAt: '2024-01-10',
  },
  {
    id: 'faq-6',
    question: 'Cual es la politica de devolucion?',
    answer: 'Aceptamos devoluciones en los 14 dias siguientes a la recepcion del pedido, siempre que el producto este sin abrir y en su embalaje original. Contacta con nuestro servicio de atencion al cliente para iniciar el proceso.',
    category: 'Envios',
    order: 6,
    isPublished: true,
    createdAt: '2023-06-01',
    updatedAt: '2024-01-10',
  },
  {
    id: 'faq-7',
    question: 'Tienen tiendas fisicas?',
    answer: 'Si, contamos con tiendas en Madrid, Barcelona, Valencia y Alicante. Puedes consultar las direcciones y horarios en nuestra pagina de Tiendas.',
    category: 'General',
    order: 7,
    isPublished: true,
    createdAt: '2023-07-01',
    updatedAt: '2024-01-05',
  },
  {
    id: 'faq-8',
    question: 'Puedo usar CBD si tomo medicacion?',
    answer: 'Recomendamos consultar con su medico antes de usar CBD si esta tomando medicacion, especialmente anticoagulantes, anticonvulsivos o medicamentos metabolizados por el higado. El CBD puede interactuar con algunos farmacos.',
    category: 'Uso',
    order: 8,
    isPublished: false,
    createdAt: '2023-08-01',
    updatedAt: '2024-01-05',
  },
]

export const MOCK_PAGE_CONTENT: PageContent[] = [
  {
    id: 'page-1',
    title: 'Sobre Nosotros',
    slug: 'sobre-nosotros',
    content: '# Sobre CBD SaaS\n\nSomos una empresa dedicada al bienestar natural a traves de productos CBD de la mas alta calidad.\n\n## Nuestra Mision\n\nHacer accesibles productos CBD premium, seguros y legales a todas las personas que buscan complementar su rutina de bienestar.\n\n## Nuestros Valores\n\n- **Calidad**: Solo trabajamos con extractos certificados\n- **Transparencia**: Todos nuestros productos tienen analisis de laboratorio publicos\n- **Sostenibilidad**: Comprometidos con el medio ambiente\n- **Educacion**: Informamos para que tomes decisiones conscientes',
    status: 'published',
    lastEditedBy: 'Admin',
    createdAt: '2023-03-01',
    updatedAt: '2024-01-05',
  },
  {
    id: 'page-2',
    title: 'Terminos y Condiciones',
    slug: 'terminos-condiciones',
    content: '# Terminos y Condiciones\n\n## 1. Condiciones Generales\n\nEstos terminos regulan el uso de la plataforma CBD SaaS y la compra de productos.\n\n## 2. Edad Minima\n\nDebes ser mayor de 18 anos para comprar nuestros productos.\n\n## 3. Productos\n\nTodos nuestros productos contienen CBD derivado de canamo industrial con THC < 0.2%, conforme a la normativa europea.\n\n## 4. Pagos\n\nAceptamos tarjeta de credito/debito, transferencia bancaria y Bizum.\n\n## 5. Envios y Devoluciones\n\nConsulta nuestra politica de envios y devoluciones en la seccion correspondiente.',
    status: 'published',
    lastEditedBy: 'Legal',
    createdAt: '2023-03-01',
    updatedAt: '2023-12-15',
  },
  {
    id: 'page-3',
    title: 'Politica de Privacidad',
    slug: 'politica-privacidad',
    content: '# Politica de Privacidad\n\n## Responsable del Tratamiento\n\nCBD SaaS S.L. es responsable del tratamiento de tus datos personales.\n\n## Datos que Recopilamos\n\n- Datos de identificacion (nombre, email)\n- Datos de facturacion\n- Historial de compras\n- Datos de navegacion\n\n## Finalidad\n\n- Gestion de pedidos\n- Comunicaciones comerciales (con consentimiento)\n- Mejora del servicio\n\n## Derechos RGPD\n\nPuedes ejercer tus derechos de acceso, rectificacion, supresion y portabilidad contactando a privacidad@cbdsaas.com.',
    status: 'published',
    lastEditedBy: 'Legal',
    createdAt: '2023-03-01',
    updatedAt: '2023-12-15',
  },
  {
    id: 'page-4',
    title: 'Programa de Afiliados',
    slug: 'programa-afiliados',
    content: '# Programa de Afiliados CBD SaaS\n\n## Como Funciona\n\nGana comisiones recomendando nuestros productos CBD. Nuestro programa de afiliados te ofrece:\n\n- Comision del 15% por cada venta referida\n- Panel de control en tiempo real\n- Materiales de marketing listos para usar\n- Pagos mensuales via transferencia\n\n## Requisitos\n\n- Tener una plataforma online (blog, redes sociales, web)\n- Contenido alineado con nuestros valores\n- Cumplir con las normas de publicidad de CBD',
    status: 'draft',
    lastEditedBy: 'Marketing',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-14',
  },
]

export const MOCK_SEO_METADATA: SEOMetadata[] = [
  {
    id: 'seo-1',
    route: '/',
    pageTitle: 'Inicio',
    metaTitle: 'CBD SaaS - Productos CBD Premium en Espana',
    metaDescription: 'Descubre la mejor seleccion de productos CBD en Espana. Aceites, cremas, capsulas y mas. Envio gratuito +50EUR. Calidad certificada.',
    keywords: ['CBD', 'aceite CBD', 'productos CBD', 'Espana', 'cannabidiol', 'bienestar'],
    ogTitle: 'CBD SaaS - Tu Tienda CBD de Confianza',
    ogDescription: 'Productos CBD premium certificados. Envio gratis +50EUR. Tiendas en toda Espana.',
    ogImage: '/images/og/home.jpg',
    canonical: 'https://cbdsaas.com',
    updatedAt: '2024-01-10',
  },
  {
    id: 'seo-2',
    route: '/productos',
    pageTitle: 'Productos',
    metaTitle: 'Catalogo CBD - Aceites, Cremas, Capsulas | CBD SaaS',
    metaDescription: 'Explora nuestro catalogo completo de productos CBD. Full Spectrum, Broad Spectrum e Isolate. Certificados por laboratorio independiente.',
    keywords: ['catalogo CBD', 'comprar CBD', 'aceite CBD online', 'crema CBD', 'capsulas CBD'],
    ogTitle: 'Productos CBD Premium - Catalogo Completo',
    ogDescription: 'Mas de 100 productos CBD certificados. Encuentra el ideal para ti.',
    ogImage: '/images/og/productos.jpg',
    canonical: 'https://cbdsaas.com/productos',
    updatedAt: '2024-01-08',
  },
  {
    id: 'seo-3',
    route: '/blog',
    pageTitle: 'Blog',
    metaTitle: 'Blog CBD - Guias, Noticias y Educacion | CBD SaaS',
    metaDescription: 'Aprende todo sobre el CBD. Guias para principiantes, noticias del sector, y contenido educativo sobre cannabidiol.',
    keywords: ['blog CBD', 'guia CBD', 'informacion CBD', 'que es CBD'],
    ogTitle: 'Blog CBD SaaS - Informacion y Guias',
    ogDescription: 'Todo lo que necesitas saber sobre CBD. Articulos escritos por expertos.',
    ogImage: '/images/og/blog.jpg',
    canonical: 'https://cbdsaas.com/blog',
    updatedAt: '2024-01-12',
  },
  {
    id: 'seo-4',
    route: '/tiendas',
    pageTitle: 'Tiendas',
    metaTitle: 'Tiendas CBD en Espana - Madrid, Barcelona, Valencia | CBD SaaS',
    metaDescription: 'Visita nuestras tiendas CBD en Madrid, Barcelona, Valencia y Alicante. Asesoria personalizada y productos exclusivos en tienda.',
    keywords: ['tiendas CBD Madrid', 'tiendas CBD Barcelona', 'CBD fisico', 'tienda cannabidiol'],
    ogTitle: 'Nuestras Tiendas CBD en Espana',
    ogDescription: 'Encuentra tu tienda CBD mas cercana. 4 ubicaciones en Espana.',
    ogImage: '/images/og/tiendas.jpg',
    canonical: 'https://cbdsaas.com/tiendas',
    updatedAt: '2024-01-05',
  },
]

export const FAQ_CATEGORIES = ['General', 'Legal', 'Uso', 'Envios', 'Productos']
export const BLOG_CATEGORIES = ['Guias', 'Deporte', 'Tendencias', 'Educacion', 'Noticias']
export const BANNER_POSITIONS = ['hero', 'sidebar', 'footer', 'popup'] as const
