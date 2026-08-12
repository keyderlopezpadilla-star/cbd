'use client'

import { motion } from 'framer-motion'
import {
  Store,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Brain,
  Shield,
  Zap,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const features = [
  {
    icon: Store,
    title: 'Multi-Store Management',
    description: 'Manage multiple CBD stores from a single, unified dashboard with real-time synchronization.',
  },
  {
    icon: Package,
    title: 'Smart Inventory',
    description: 'AI-powered inventory tracking with automatic stock alerts and predictive reordering.',
  },
  {
    icon: ShoppingCart,
    title: 'Point of Sale',
    description: 'Lightning-fast POS system designed specifically for CBD retail with compliance built-in.',
  },
  {
    icon: Users,
    title: 'Customer CRM',
    description: 'Complete customer relationship management with loyalty programs and segmentation.',
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Deep insights into sales, performance, and trends across all your stores.',
  },
  {
    icon: Brain,
    title: 'AI Assistant',
    description: 'Intelligent business assistant that answers questions and provides recommendations.',
  },
  {
    icon: Shield,
    title: 'Compliance & Security',
    description: 'Enterprise-grade security with GDPR compliance and audit logs for every action.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Built with cutting-edge technology for exceptional performance and reliability.',
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-24 bg-cbd-black-secondary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Everything You Need to <span className="text-gradient-green">Scale</span>
          </h2>
          <p className="text-lg text-cbd-gray-light max-w-2xl mx-auto">
            A complete platform designed specifically for CBD retail operations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="glass border-cbd-green/20 h-full hover:border-cbd-green/50 transition-all duration-300 group card-hover">
                <CardContent className="p-6">
                  <div className="mb-4 inline-flex p-3 rounded-lg bg-cbd-green/10 group-hover:bg-cbd-green/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-cbd-green" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-cbd-gray-light">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
