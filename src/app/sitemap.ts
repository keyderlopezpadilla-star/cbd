import { MetadataRoute } from 'next'

const BASE_URL = 'https://cbdsaas.com'

// Blog post slugs
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

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/store-locator`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/productos`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/nosotros`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/contacto`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/politica-privacidad`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terminos-condiciones`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  const blogPages: MetadataRoute.Sitemap = BLOG_SLUGS.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const storePages: MetadataRoute.Sitemap = STORE_SLUGS.map((slug) => ({
    url: `${BASE_URL}/tiendas/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const productCategoryPages: MetadataRoute.Sitemap = PRODUCT_CATEGORIES.map((category) => ({
    url: `${BASE_URL}/productos/${category}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...blogPages, ...storePages, ...productCategoryPages]
}
