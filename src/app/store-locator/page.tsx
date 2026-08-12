'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { LandingNav } from '@/features/landing/components/landing-nav'
import { LandingFooter } from '@/features/landing/components/landing-footer'
import { StoreLocatorMap } from '@/features/landing/components/store-locator-map'
import { StoreLocatorCard } from '@/features/landing/components/store-locator-card'
import { StoreLocatorFilters } from '@/features/landing/components/store-locator-filters'
import { STORE_LOCATIONS, StoreLocation } from '@/lib/mock-data/store-locator'

export default function StoreLocatorPage() {
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCity, setSelectedCity] = useState<string | null>(null)
  const [showOnlyOpen, setShowOnlyOpen] = useState(false)
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])

  const toggleFeature = (feature: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]
    )
  }

  const filteredStores = useMemo(() => {
    let results = STORE_LOCATIONS

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      results = results.filter(
        (store) =>
          store.name.toLowerCase().includes(query) ||
          store.address.toLowerCase().includes(query) ||
          store.city.toLowerCase().includes(query)
      )
    }

    // City filter
    if (selectedCity) {
      results = results.filter((store) => store.city === selectedCity)
    }

    // Open now filter
    if (showOnlyOpen) {
      const today = new Date().getDay()
      const todayIndex = today === 0 ? 6 : today - 1
      results = results.filter((store) => store.hours[todayIndex]?.isOpen)
    }

    // Features filter
    if (selectedFeatures.length > 0) {
      results = results.filter((store) =>
        selectedFeatures.every((feature) => store.features.includes(feature))
      )
    }

    return results
  }, [searchQuery, selectedCity, showOnlyOpen, selectedFeatures])

  return (
    <div className="relative min-h-screen bg-cbd-black">
      <LandingNav />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cbd-green/10 border border-cbd-green/20 mb-4">
              <MapPin className="h-4 w-4 text-cbd-green" />
              <span className="text-sm text-cbd-green font-medium">Nuestras Tiendas</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Encuentra tu tienda{' '}
              <span className="text-gradient-green">CBD Premium</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Visitanos en cualquiera de nuestras 5 tiendas repartidas por toda Espana. Disfruta de asesoramiento personalizado y la mejor seleccion de productos CBD.
            </p>
          </motion.div>

          {/* Map */}
          <div className="mb-8">
            <StoreLocatorMap
              stores={filteredStores}
              selectedStoreId={selectedStoreId}
              onSelectStore={setSelectedStoreId}
            />
          </div>

          {/* Filters + Store Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Filters Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-4"
            >
              <div className="glass border border-white/10 rounded-xl p-5 sticky top-24">
                <StoreLocatorFilters
                  stores={STORE_LOCATIONS}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  selectedCity={selectedCity}
                  onCityChange={setSelectedCity}
                  showOnlyOpen={showOnlyOpen}
                  onToggleOpen={() => setShowOnlyOpen(!showOnlyOpen)}
                  selectedFeatures={selectedFeatures}
                  onToggleFeature={toggleFeature}
                />
              </div>
            </motion.div>

            {/* Store Cards */}
            <div className="lg:col-span-8">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-muted-foreground">
                  {filteredStores.length} tienda{filteredStores.length !== 1 ? 's' : ''} encontrada{filteredStores.length !== 1 ? 's' : ''}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredStores.map((store, index) => (
                  <StoreLocatorCard
                    key={store.id}
                    store={store}
                    isSelected={selectedStoreId === store.id}
                    onSelect={() => setSelectedStoreId(store.id)}
                    index={index}
                  />
                ))}
              </div>

              {filteredStores.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg text-white mb-2">No se encontraron tiendas</p>
                  <p className="text-sm text-muted-foreground">
                    Intenta modificar los filtros de busqueda
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </main>
      <LandingFooter />
    </div>
  )
}
