const BASE_URL = 'https://cbdsaas.com'

export interface SitemapEntry {
  url: string
  lastModified: Date
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority: number
}

// Static pages with their priorities
const STATIC_PAGES: { path: string; changeFrequency: SitemapEntry['changeFrequency']; priority: number }[] = [
  { path: '/', changeFrequency: 'daily', priority: 1.0 },
  { path: '/blog', changeFrequency: 'daily', priority: 0.9 },
  { path: '/faq', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/store-locator', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/productos', changeFrequency: 'daily', priority: 0.9 },
  { path: '/nosotros', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/contacto', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/politica-privacidad', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/terminos-condiciones', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/politica-cookies', changeFrequency: 'yearly', priority: 0.3 },
]

// Blog post slugs from mock data
const BLOG_SLUGS = [
  'guia-completa-cbd-bienestar',
  'regulacion-cbd-espana-2024',
  'aceites-cbd-como-elegir',
  'cbd-deporte-recuperacion',
  'sistema-endocannabinoide-explicado',
  'cosmetica-cbd-tendencias',
  'cbd-sueno-insomnio',
  'mercado-cbd-europa-crecimiento',
  'cbd-mascotas-guia-veterinaria',
  'terpenos-cbd-efecto-sequito',
]

// Store slugs
const STORE_SLUGS = [
  'madrid-centro',
  'valencia-puerto',
  'barcelona-gotico',
  'alicante-marina',
  'sevilla-triana',
]

// Product category slugs
const PRODUCT_CATEGORIES = [
  'aceites',
  'cremas',
  'capsulas',
  'flores',
  'comestibles',
  'cosmetica',
  'mascotas',
  'packs',
]

export function generateStaticPageEntries(): SitemapEntry[] {
  return STATIC_PAGES.map((page) => ({
    url: `${BASE_URL}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }))
}

export function generateBlogEntries(): SitemapEntry[] {
  return BLOG_SLUGS.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))
}

export function generateStoreEntries(): SitemapEntry[] {
  return STORE_SLUGS.map((slug) => ({
    url: `${BASE_URL}/tiendas/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))
}

export function generateProductCategoryEntries(): SitemapEntry[] {
  return PRODUCT_CATEGORIES.map((category) => ({
    url: `${BASE_URL}/productos/${category}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))
}

export function generateAllSitemapEntries(): SitemapEntry[] {
  return [
    ...generateStaticPageEntries(),
    ...generateBlogEntries(),
    ...generateStoreEntries(),
    ...generateProductCategoryEntries(),
  ]
}
