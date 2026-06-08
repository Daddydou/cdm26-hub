'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function HubPage() {
  const router = useRouter()

  useEffect(() => {
    // Si une session est déjà active, on peut la détecter ici
    // Pour l'instant, on affiche juste la page de sélection
  }, [router])

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-zinc-950">
      <div className="text-center mb-12">
        <div className="text-6xl mb-4">⚽</div>
        <h1 className="text-4xl font-bold text-white mb-2">
          CDM<span className="text-green-500">26</span>
        </h1>
        <p className="text-zinc-500 text-sm">Coupe du Monde 2026</p>
      </div>

      <div className="flex flex-col gap-4 w-full max-w-xs">
        <a
          href="/fantasy"
          className="flex items-center gap-4 p-5 bg-zinc-900 border border-zinc-800 hover:border-yellow-500/40 hover:bg-zinc-800 rounded-2xl transition-all group"
        >
          <span className="text-3xl">🏆</span>
          <div>
            <p className="font-bold text-white group-hover:text-yellow-400 transition-colors">
              CDM26 Fantasy
            </p>
            <p className="text-xs text-zinc-500">Draft · Transferts · Classement</p>
          </div>
        </a>

        <a
          href="/picks"
          className="flex items-center gap-4 p-5 bg-zinc-900 border border-zinc-800 hover:border-green-500/40 hover:bg-zinc-800 rounded-2xl transition-all group"
        >
          <span className="text-3xl">⚽</span>
          <div>
            <p className="font-bold text-white group-hover:text-green-400 transition-colors">
              Picks CDM
            </p>
            <p className="text-xs text-zinc-500">Pronostics par match</p>
          </div>
        </a>
      </div>
    </main>
  )
}
