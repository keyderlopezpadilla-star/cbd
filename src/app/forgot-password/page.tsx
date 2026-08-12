import { Metadata } from 'next'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { ForgotPasswordForm } from '@/features/auth/components/forgot-password-form'

const Login3D = dynamic(() => import('@/components/3d/login-3d').then(mod => ({ default: mod.Login3D })), {
  ssr: false,
})

export const metadata: Metadata = {
  title: 'Forgot Password - CBD SaaS Platform',
  description: 'Reset your password',
}

export default function ForgotPasswordPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-cbd-black overflow-hidden">
      {/* 3D Background */}
      <Login3D />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-cbd-black via-cbd-black/95 to-cbd-black" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cbd-green/5 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-md px-6">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-cbd-green to-cbd-green-dark group-hover:scale-110 transition-transform" />
            <span className="text-2xl font-bold text-gradient-green">CBD SaaS</span>
          </Link>
        </div>

        {/* Forgot Password Card */}
        <div className="glass-strong border-cbd-green/20 rounded-2xl p-8 backdrop-blur-xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Forgot Password?</h1>
            <p className="text-cbd-gray-light">
              No worries, we'll send you reset instructions
            </p>
          </div>

          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  )
}
