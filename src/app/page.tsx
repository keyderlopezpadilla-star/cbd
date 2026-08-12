import { redirect } from 'next/navigation'

export default function HomePage() {
  // Redirect to landing page or dashboard based on auth
  redirect('/landing')
}
