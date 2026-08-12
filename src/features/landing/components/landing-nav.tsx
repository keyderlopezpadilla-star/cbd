'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

export function LandingNav() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 backdrop-blur-xl"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cbd-green to-cbd-green-dark" />
          <span className="text-xl font-bold text-gradient-green">CBD SaaS</span>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <Link href="#features" className="text-sm text-cbd-gray-light hover:text-cbd-green transition-colors">
            Features
          </Link>
          <Link href="#stores" className="text-sm text-cbd-gray-light hover:text-cbd-green transition-colors">
            Stores
          </Link>
          <Link href="#about" className="text-sm text-cbd-gray-light hover:text-cbd-green transition-colors">
            About
          </Link>
          <Link href="#contact" className="text-sm text-cbd-gray-light hover:text-cbd-green transition-colors">
            Contact
          </Link>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="ghost" asChild>
            <Link href="/login">Sign In</Link>
          </Button>
          <Button asChild className="glow-green">
            <Link href="/login">Get Started</Link>
          </Button>
        </div>
      </div>
    </motion.nav>
  )
}
