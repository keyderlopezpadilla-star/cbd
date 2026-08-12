import { Metadata } from 'next'
import { HeroSection } from '@/features/landing/components/hero-section'
import { FeaturesSection } from '@/features/landing/components/features-section'
import { StoresSection } from '@/features/landing/components/stores-section'
import { CTASection } from '@/features/landing/components/cta-section'
import { LandingNav } from '@/features/landing/components/landing-nav'
import { LandingFooter } from '@/features/landing/components/landing-footer'

export const metadata: Metadata = {
  title: 'CBD SaaS Platform - Premium Multi-Store Management',
  description:
    'Transform your CBD retail business with our premium SaaS platform. Manage inventory, sales, customers, and analytics across multiple stores.',
}

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-cbd-black">
      <LandingNav />
      <main>
        <HeroSection />
        <FeaturesSection />
        <StoresSection />
        <CTASection />
      </main>
      <LandingFooter />
    </div>
  )
}
