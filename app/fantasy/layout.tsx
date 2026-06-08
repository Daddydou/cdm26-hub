import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CDM26 Fantasy',
  description: 'Fantasy football — Coupe du Monde 2026',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'CDM26 Fantasy',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0f',
}

export default function FantasyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="/" className="fixed top-3 left-3 z-50 text-xs text-zinc-600 hover:text-zinc-400 transition-colors px-2 py-1 rounded-md hover:bg-zinc-800/50">← Hub</a>
      {children}
    </>
  )
}
