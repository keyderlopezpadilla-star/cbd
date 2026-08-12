import { Metadata } from 'next'
import Link from 'next/link'
import { RegisterForm } from '@/features/auth/components/register-form'
import { Login3D } from '@/components/3d/login-3d'

export const metadata: Metadata = {
  title: 'Create Account - CBD SaaS Platform',
  description: 'Create your account to start managing your CBD retail business',
}

export default function RegisterPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-cbd-black overflow-hidden py-12">
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

        {/* Register Card */}
        <div className="glass-strong border-cbd-green/20 rounded-2xl p-8 backdrop-blur-xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-cbd-gray-light">Get started with your CBD business</p>
          </div>

          <RegisterForm />
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-cbd-gray mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-cbd-green hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
