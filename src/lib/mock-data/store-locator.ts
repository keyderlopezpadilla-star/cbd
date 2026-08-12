export interface StoreLocation {
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
  description: string
  features: string[]
  rating: number
  reviewCount: number
  photos: string[]
  hours: {
    day: string
    open: string
    close: string
    isOpen: boolean
  }[]
}

export const STORE_LOCATIONS: StoreLocation[] = [
  {
    id: 'loc-1',
    name: 'CBD Premium Madrid Centro',
    address: 'Calle Gran Via 42',
    city: 'Madrid',
    postalCode: '28013',
    country: 'Espana',
    phone: '+34 91 234 5678',
    email: 'madrid@cbdpremium.es',
    latitude: 40.4168,
    longitude: -3.7038,
    description: 'Nuestra tienda insignia en el corazon de Madrid. Amplio espacio con zona de consulta personalizada y la mayor variedad de productos CBD premium.',
    features: ['Consulta personalizada', 'Zona de degustacion', 'Parking cercano', 'Accesible', 'Wi-Fi gratis'],
    rating: 4.8,
    reviewCount: 234,
    photos: ['/stores/madrid-1.jpg', '/stores/madrid-2.jpg', '/stores/madrid-3.jpg'],
    hours: [
      { day: 'Lunes', open: '10:00', close: '20:00', isOpen: true },
      { day: 'Martes', open: '10:00', close: '20:00', isOpen: true },
      { day: 'Miercoles', open: '10:00', close: '20:00', isOpen: true },
      { day: 'Jueves', open: '10:00', close: '20:00', isOpen: true },
      { day: 'Viernes', open: '10:00', close: '21:00', isOpen: true },
      { day: 'Sabado', open: '11:00', close: '21:00', isOpen: true },
      { day: 'Domingo', open: '11:00', close: '15:00', isOpen: true },
    ],
  },
  {
    id: 'loc-2',
    name: 'CBD Premium Valencia Puerto',
    address: 'Av. del Puerto 15',
    city: 'Valencia',
    postalCode: '46023',
    country: 'Espana',
    phone: '+34 96 345 6789',
    email: 'valencia@cbdpremium.es',
    latitude: 39.4561,
    longitude: -0.3248,
    description: 'Ubicada junto al puerto de Valencia, esta tienda combina un ambiente mediterraneo con una seleccion exclusiva de productos CBD para el bienestar.',
    features: ['Terraza exterior', 'Zona de relax', 'Eventos mensuales', 'Accesible', 'Cerca del puerto'],
    rating: 4.6,
    reviewCount: 156,
    photos: ['/stores/valencia-1.jpg', '/stores/valencia-2.jpg'],
    hours: [
      { day: 'Lunes', open: '10:00', close: '20:00', isOpen: true },
      { day: 'Martes', open: '10:00', close: '20:00', isOpen: true },
      { day: 'Miercoles', open: '10:00', close: '20:00', isOpen: true },
      { day: 'Jueves', open: '10:00', close: '20:00', isOpen: true },
      { day: 'Viernes', open: '10:00', close: '21:00', isOpen: true },
      { day: 'Sabado', open: '10:00', close: '21:00', isOpen: true },
      { day: 'Domingo', open: '00:00', close: '00:00', isOpen: false },
    ],
  },
  {
    id: 'loc-3',
    name: 'CBD Premium Barcelona Gotico',
    address: 'Carrer de Ferran 28',
    city: 'Barcelona',
    postalCode: '08002',
    country: 'Espana',
    phone: '+34 93 456 7890',
    email: 'barcelona@cbdpremium.es',
    latitude: 41.3818,
    longitude: 2.1685,
    description: 'En pleno Barrio Gotico de Barcelona, nuestra tienda mas emblematica ofrece un espacio unico con arquitectura historica y los mejores productos CBD del mercado.',
    features: ['Edificio historico', 'Asesoramiento experto', 'Productos exclusivos', 'Multilingue', 'Zona de cata'],
    rating: 4.9,
    reviewCount: 312,
    photos: ['/stores/barcelona-1.jpg', '/stores/barcelona-2.jpg', '/stores/barcelona-3.jpg'],
    hours: [
      { day: 'Lunes', open: '09:30', close: '20:30', isOpen: true },
      { day: 'Martes', open: '09:30', close: '20:30', isOpen: true },
      { day: 'Miercoles', open: '09:30', close: '20:30', isOpen: true },
      { day: 'Jueves', open: '09:30', close: '20:30', isOpen: true },
      { day: 'Viernes', open: '09:30', close: '21:30', isOpen: true },
      { day: 'Sabado', open: '10:00', close: '21:30', isOpen: true },
      { day: 'Domingo', open: '11:00', close: '17:00', isOpen: true },
    ],
  },
  {
    id: 'loc-4',
    name: 'CBD Premium Alicante Marina',
    address: 'Explanada de Espana 3',
    city: 'Alicante',
    postalCode: '03001',
    country: 'Espana',
    phone: '+34 96 567 8901',
    email: 'alicante@cbdpremium.es',
    latitude: 38.3452,
    longitude: -0.4810,
    description: 'Frente al Mediterraneo, nuestra tienda de Alicante ofrece una experiencia relajada con vistas al mar y una cuidada seleccion de productos CBD orientados al deporte y bienestar.',
    features: ['Vistas al mar', 'Productos deportivos', 'Aparcamiento gratuito', 'Talleres wellness', 'Terraza'],
    rating: 4.5,
    reviewCount: 98,
    photos: ['/stores/alicante-1.jpg', '/stores/alicante-2.jpg'],
    hours: [
      { day: 'Lunes', open: '10:00', close: '19:30', isOpen: true },
      { day: 'Martes', open: '10:00', close: '19:30', isOpen: true },
      { day: 'Miercoles', open: '10:00', close: '19:30', isOpen: true },
      { day: 'Jueves', open: '10:00', close: '19:30', isOpen: true },
      { day: 'Viernes', open: '10:00', close: '20:30', isOpen: true },
      { day: 'Sabado', open: '10:00', close: '20:30', isOpen: true },
      { day: 'Domingo', open: '00:00', close: '00:00', isOpen: false },
    ],
  },
  {
    id: 'loc-5',
    name: 'CBD Premium Sevilla Triana',
    address: 'Calle Betis 45',
    city: 'Sevilla',
    postalCode: '41010',
    country: 'Espana',
    phone: '+34 95 678 9012',
    email: 'sevilla@cbdpremium.es',
    latitude: 37.3826,
    longitude: -5.9984,
    description: 'En el animado barrio de Triana, junto al Guadalquivir, esta tienda combina la tradicion sevillana con los beneficios del CBD en un espacio acogedor y lleno de encanto.',
    features: ['Barrio historico', 'Junto al rio', 'Ambiente acogedor', 'Productos artesanales', 'Eventos culturales'],
    rating: 4.7,
    reviewCount: 178,
    photos: ['/stores/sevilla-1.jpg', '/stores/sevilla-2.jpg', '/stores/sevilla-3.jpg'],
    hours: [
      { day: 'Lunes', open: '10:00', close: '20:00', isOpen: true },
      { day: 'Martes', open: '10:00', close: '20:00', isOpen: true },
      { day: 'Miercoles', open: '10:00', close: '20:00', isOpen: true },
      { day: 'Jueves', open: '10:00', close: '20:00', isOpen: true },
      { day: 'Viernes', open: '10:00', close: '21:00', isOpen: true },
      { day: 'Sabado', open: '10:30', close: '21:00', isOpen: true },
      { day: 'Domingo', open: '11:00', close: '15:00', isOpen: true },
    ],
  },
]

export function getStoreLocations(): StoreLocation[] {
  return STORE_LOCATIONS
}

export function getStoreLocationById(id: string): StoreLocation | undefined {
  return STORE_LOCATIONS.find((store) => store.id === id)
}

export function getStoreLocationsByCity(city: string): StoreLocation[] {
  return STORE_LOCATIONS.filter((store) => store.city.toLowerCase() === city.toLowerCase())
}

export function getDirectionsUrl(lat: number, lng: number): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
}
