const BASE_URL = 'https://cbdsaas.com'
const ORGANIZATION_NAME = 'CBD SaaS Platform'

export interface LocalBusinessStore {
  id: string
  name: string
  address: string
  city: string
  postalCode: string
  country: string
  phone: string
  email: string
  latitude: number
  longitude: number
  isActive: boolean
}

export interface OpeningHoursSpec {
  dayOfWeek: string | string[]
  opens: string
  closes: string
}

const DEFAULT_OPENING_HOURS: OpeningHoursSpec[] = [
  {
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '10:00',
    closes: '20:00',
  },
  {
    dayOfWeek: 'Saturday',
    opens: '10:00',
    closes: '14:00',
  },
]

const AREA_SERVED_BY_CITY: Record<string, object> = {
  Madrid: {
    '@type': 'City',
    name: 'Madrid',
    sameAs: 'https://es.wikipedia.org/wiki/Madrid',
  },
  Valencia: {
    '@type': 'City',
    name: 'Valencia',
    sameAs: 'https://es.wikipedia.org/wiki/Valencia',
  },
  Barcelona: {
    '@type': 'City',
    name: 'Barcelona',
    sameAs: 'https://es.wikipedia.org/wiki/Barcelona',
  },
  Alicante: {
    '@type': 'City',
    name: 'Alicante',
    sameAs: 'https://es.wikipedia.org/wiki/Alicante',
  },
  Sevilla: {
    '@type': 'City',
    name: 'Sevilla',
    sameAs: 'https://es.wikipedia.org/wiki/Sevilla',
  },
}

export function generateLocalBusinessSchema(
  store: LocalBusinessStore,
  openingHours?: OpeningHoursSpec[]
) {
  const hours = openingHours || DEFAULT_OPENING_HOURS
  const slug = store.name.toLowerCase().replace(/\s+/g, '-')

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${BASE_URL}/tiendas/${slug}#localbusiness`,
    name: `${ORGANIZATION_NAME} - ${store.name}`,
    description: `Tienda especializada en productos de CBD de alta calidad en ${store.city}. Aceites, cremas, capsulas y mas con asesoramiento experto personalizado.`,
    url: `${BASE_URL}/tiendas/${slug}`,
    telephone: store.phone,
    email: store.email,
    image: `${BASE_URL}/images/stores/${slug}.jpg`,
    logo: `${BASE_URL}/images/logo.png`,
    priceRange: '$$',
    currenciesAccepted: 'EUR',
    paymentAccepted: 'Cash, Credit Card, Debit Card',
    address: {
      '@type': 'PostalAddress',
      streetAddress: store.address,
      addressLocality: store.city,
      postalCode: store.postalCode,
      addressRegion: store.city,
      addressCountry: 'ES',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: store.latitude,
      longitude: store.longitude,
    },
    openingHoursSpecification: hours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.dayOfWeek,
      opens: h.opens,
      closes: h.closes,
    })),
    areaServed: AREA_SERVED_BY_CITY[store.city] || {
      '@type': 'City',
      name: store.city,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.6',
      reviewCount: '127',
      bestRating: '5',
      worstRating: '1',
    },
    hasMap: `https://www.google.com/maps?q=${store.latitude},${store.longitude}`,
    isAccessibleForFree: true,
    parentOrganization: {
      '@type': 'Organization',
      name: ORGANIZATION_NAME,
      url: BASE_URL,
    },
  }
}

export function generateAllStoresLocalSEO(stores: LocalBusinessStore[]) {
  return stores
    .filter((store) => store.isActive)
    .map((store) => generateLocalBusinessSchema(store))
}
