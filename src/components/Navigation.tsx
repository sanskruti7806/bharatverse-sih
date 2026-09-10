import Link from 'next/link'
import { Compass } from 'lucide-react'

export default function Navigation() {
  return (
    <nav className="bg-parchment-100 border-b border-parchment-300 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Compass className="w-6 h-6 text-gold-600" />
          <span className="font-serif text-xl font-bold tracking-tight text-earth-900">
            BHARAT<span className="text-gold-600">VERSE</span>
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-earth-800">
          <Link href="/dashboard" className="hover:text-gold-600 transition-colors">Dashboard</Link>
          <Link href="/map" className="hover:text-gold-600 transition-colors">India Map</Link>
          <Link href="/historian" className="hover:text-gold-600 transition-colors">AI Historian</Link>
          <Link href="/games" className="hover:text-gold-600 transition-colors">Traditional Games</Link>
          <Link href="/classroom" className="hover:text-gold-600 transition-colors">Classroom</Link>
        </div>
      </div>
    </nav>
  )
}
