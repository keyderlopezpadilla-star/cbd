import { Metadata } from 'next'

const BASE_URL = 'https://cbdsaas.com'
const SITE_NAME = 'CBD SaaS Platform'
const DEFAULT_DESCRIPTION = 'Plataforma SaaS premium para la gestion integral de tiendas CBD en Espana. Inventario, ventas, marketing y cumplimiento normativo.'
const DEFAULT_IMAGE = `${BASE_URL}/images/og-default.jpg`

interface PageMetadataOptions {
  title: string
  description: string
  path: string
  image?: string
  noIndex?: boolean
}

interface ProductMetadata {
  name: string
  description: string
  slug: string
  image?: string
  price?: number
  currency?: string
  category?: string
}

interface StoreMetadata {
  name: string
  city: string
  address: string
  slug?: string
  image?: string
}

interface BlogPostMetadata {
  title: string
  excerpt: string
  slug: string
  author: string
  publishedAt: string
  featuredImage?: string
  tags?: string[]
}

export function generatePageMetadata(
  title: string,
  description: string,
  path: string,
  options?: { image?: string; noIndex?: boolean }
): Metadata {
  const url = `${BASE_URL}${path}`
  const image = options?.image || DEFAULT_IMAGE

  return {
    title: `${title} | ${SITE_NAME}`,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'es_ES',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [image],
    },
    ...(options?.noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  }
}

export function generateProductMetadata(product: ProductMetadata): Metadata {
  const url = `${BASE_URL}/productos/${product.slug}`
  const image = product.image || DEFAULT_IMAGE
  const title = `${product.name} - Comprar CBD Online`
  const description = product.description.slice(0, 160)

  return {
    title: `${title} | ${SITE_NAME}`,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
      locale: 'es_ES',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    keywords: [
      'CBD',
      product.name,
      product.category || 'productos CBD',
      'comprar CBD',
      'CBD Espana',
    ],
  }
}

export function generateStoreMetadata(store: StoreMetadata): Metadata {
  const slug = store.slug || store.name.toLowerCase().replace(/\s+/g, '-')
  const url = `${BASE_URL}/tiendas/${slug}`
  const image = store.image || DEFAULT_IMAGE
  const title = `Tienda CBD ${store.name} - ${store.city}`
  const description = `Visita nuestra tienda CBD en ${store.address}, ${store.city}. Productos de CBD premium con asesoramiento personalizado.`

  return {
    title: `${title} | ${SITE_NAME}`,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `Tienda CBD ${store.name}`,
        },
      ],
      locale: 'es_ES',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    keywords: [
      'tienda CBD',
      store.city,
      'CBD ' + store.city,
      'comprar CBD ' + store.city,
      store.name,
    ],
  }
}

export function generateBlogMetadata(post: BlogPostMetadata): Metadata {
  const url = `${BASE_URL}/blog/${post.slug}`
  const image = post.featuredImage || DEFAULT_IMAGE
  const title = post.title
  const description = post.excerpt.slice(0, 160)

  return {
    title: `${title} | Blog ${SITE_NAME}`,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'es_ES',
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    keywords: post.tags || ['CBD', 'blog', 'cannabis'],
    authors: [{ name: post.author }],
  }
}
