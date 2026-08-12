import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import { Providers } from '@/components/providers'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'CBD SaaS Platform - Multi-Store Management',
  description:
    'Premium SaaS platform for managing CBD franchise stores with inventory, sales, CRM, and AI-powered analytics.',
  keywords: ['CBD', 'SaaS', 'inventory management', 'POS', 'retail', 'franchise'],
  authors: [{ name: 'CBD SaaS Platform' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'CBD SaaS Platform',
    description: 'Premium multi-store management platform for CBD franchises',
    siteName: 'CBD SaaS Platform',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CBD SaaS Platform',
    description: 'Premium multi-store management platform for CBD franchises',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
