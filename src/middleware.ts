import { auth } from '@/server/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  const isAuthPage = nextUrl.pathname.startsWith('/login') || nextUrl.pathname.startsWith('/register')
  const isDashboardPage = nextUrl.pathname.startsWith('/dashboard')
  const isApiAuthRoute = nextUrl.pathname.startsWith('/api/auth')
  const isPublicRoute = ['/landing', '/styleguide', '/'].includes(nextUrl.pathname) || 
                        nextUrl.pathname.startsWith('/blog') ||
                        nextUrl.pathname.startsWith('/stores') ||
                        nextUrl.pathname.startsWith('/privacy') ||
                        nextUrl.pathname.startsWith('/terms')

  // Allow API auth routes
  if (isApiAuthRoute) {
    return NextResponse.next()
  }

  // Redirect logged-in users away from auth pages
  if (isLoggedIn && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', nextUrl))
  }

  // Protect dashboard routes
  if (isDashboardPage && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', nextUrl))
  }

  // Allow public routes
  if (isPublicRoute) {
    return NextResponse.next()
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
