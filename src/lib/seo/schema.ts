const BASE_URL = 'https://cbdsaas.com'
const ORGANIZATION_NAME = 'CBD SaaS Platform'
const ORGANIZATION_LOGO = `${BASE_URL}/images/logo.png`

export interface BreadcrumbItem {
  name: string
  url: string
}

export interface SchemaStore {
  name: string
  address: string
  city: string
  postalCode: string
  country: string
  phone: string
  email: string
  latitude: number
  longitude: number
}

export interface SchemaProduct {
  name: string
  description: string
  slug: string
  image?: string
  price: number
  currency?: string
  category?: string
  sku?: string
  inStock?: boolean
  brand?: string
}

export interface SchemaBlogPost {
  title: string
  excerpt: string
  slug: string
  author: string
  publishedAt: string
  featuredImage?: string
  content?: string
}

export interface SchemaFAQ {
  question: string
  answer: string
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: ORGANIZATION_NAME,
    url: BASE_URL,
    logo: ORGANIZATION_LOGO,
    description: 'Plataforma SaaS premium para la gestion integral de tiendas CBD en Espana.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'ES',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['Spanish', 'English'],
    },
    sameAs: [
      'https://twitter.com/cbdsaas',
      'https://www.instagram.com/cbdsaas',
      'https://www.linkedin.com/company/cbdsaas',
    ],
  }
}

export function generateStoreSchema(store: SchemaStore) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Store',
    name: `CBD SaaS - ${store.name}`,
    description: `Tienda especializada en productos CBD en ${store.city}. Aceites, cremas, capsulas y mas con asesoramiento experto.`,
    url: `${BASE_URL}/tiendas/${store.name.toLowerCase().replace(/\s+/g, '-')}`,
    telephone: store.phone,
    email: store.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: store.address,
      addressLocality: store.city,
      postalCode: store.postalCode,
      addressCountry: store.country === 'Espana' ? 'ES' : store.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: store.latitude,
      longitude: store.longitude,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '10:00',
        closes: '20:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '10:00',
        closes: '14:00',
      },
    ],
    image: ORGANIZATION_LOGO,
    priceRange: '$$',
  }
}

export function generateProductSchema(product: SchemaProduct) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    url: `${BASE_URL}/productos/${product.slug}`,
    image: product.image || `${BASE_URL}/images/products/default.jpg`,
    sku: product.sku || product.slug,
    brand: {
      '@type': 'Brand',
      name: product.brand || ORGANIZATION_NAME,
    },
    category: product.category || 'Productos CBD',
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: product.currency || 'EUR',
      availability: product.inStock !== false
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: ORGANIZATION_NAME,
      },
    },
  }
}

export function generateBlogPostSchema(post: SchemaBlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    url: `${BASE_URL}/blog/${post.slug}`,
    image: post.featuredImage || `${BASE_URL}/images/blog/default.jpg`,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: ORGANIZATION_NAME,
      logo: {
        '@type': 'ImageObject',
        url: ORGANIZATION_LOGO,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/blog/${post.slug}`,
    },
    articleBody: post.content || post.excerpt,
  }
}

export function generateFAQSchema(faqs: SchemaFAQ[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${BASE_URL}${item.url}`,
    })),
  }
}
