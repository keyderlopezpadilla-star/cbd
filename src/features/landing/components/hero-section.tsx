'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Hero3D } from '@/components/3d/hero-3d'
import { ArrowRight, Sparkles } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Hero3D />
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-cbd-black via-transparent to-cbd-black z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-cbd-black/80 via-cbd-black/40 to-cbd-black/80 z-10" />

      {/* Content */}
      <div className="container relative z-20 mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-cbd-green/30 bg-cbd-green/10 px-4 py-2 text-sm text-cbd-green backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              <span>Next-Generation CBD Retail Platform</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-6 text-5xl font-bold leading-tight text-white md:text-7xl"
          >
            Transform Your{' '}
            <span className="text-gradient-green">CBD Business</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-8 text-lg text-cbd-gray-light md:text-xl max-w-2xl mx-auto"
          >
            Premium SaaS platform designed for CBD franchises. Manage inventory, sales, customers,
            and analytics across multiple stores with AI-powered insights.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button asChild size="lg" className="glow-green group">
              <Link href="/login">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="#features">Explore Features</Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-12 flex items-center justify-center gap-8 text-sm text-cbd-gray"
          >
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-cbd-green animate-pulse" />
              <span>Real-time Analytics</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-cbd-green animate-pulse" />
              <span>AI-Powered Insights</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-cbd-green animate-pulse" />
              <span>Multi-Store Ready</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="h-8 w-5 rounded-full border-2 border-cbd-green/50 flex items-start justify-center p-1"
        >
          <motion.div className="h-1.5 w-1.5 rounded-full bg-cbd-green" />
        </motion.div>
      </motion.div>
    </section>
  )
}
