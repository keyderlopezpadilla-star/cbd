'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Clock } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const stores = [
  {
    name: 'Madrid Centro',
    address: 'Calle Gran Vía, 28013 Madrid',
    phone: '+34 912 345 678',
    hours: 'Lun-Sáb: 10:00-21:00',
  },
  {
    name: 'Valencia Puerto',
    address: 'Av. del Puerto, 46023 Valencia',
    phone: '+34 963 123 456',
    hours: 'Lun-Sáb: 10:00-21:00',
  },
  {
    name: 'Barcelona Gótico',
    address: 'Carrer de Ferran, 08002 Barcelona',
    phone: '+34 934 567 890',
    hours: 'Lun-Sáb: 10:00-21:00',
  },
  {
    name: 'Alicante Marina',
    address: 'Explanada de España, 03001 Alicante',
    phone: '+34 965 789 012',
    hours: 'Lun-Sáb: 10:00-21:00',
  },
  {
    name: 'Sevilla Triana',
    address: 'Calle Betis, 41010 Sevilla',
    phone: '+34 954 321 098',
    hours: 'Lun-Sáb: 10:00-21:00',
  },
]

export function StoresSection() {
  return (
    <section id="stores" className="relative py-24 bg-cbd-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Find Your Nearest <span className="text-gradient-green">Store</span>
          </h2>
          <p className="text-lg text-cbd-gray-light max-w-2xl mx-auto">
            Visit one of our premium CBD retail locations across Spain
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {stores.map((store, index) => (
            <motion.div
              key={store.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="glass border-cbd-green/20 h-full hover:border-cbd-green/50 transition-all duration-300 card-hover">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">{store.name}</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 text-cbd-gray-light">
                      <MapPin className="h-5 w-5 text-cbd-green flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{store.address}</span>
                    </div>
                    
                    <div className="flex items-center gap-3 text-cbd-gray-light">
                      <Phone className="h-5 w-5 text-cbd-green flex-shrink-0" />
                      <span className="text-sm">{store.phone}</span>
                    </div>
                    
                    <div className="flex items-center gap-3 text-cbd-gray-light">
                      <Clock className="h-5 w-5 text-cbd-green flex-shrink-0" />
                      <span className="text-sm">{store.hours}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
