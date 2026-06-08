'use client'

import { useState, useTransition, useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { signInWithMagicLink, signInByUsername } from '@/app/picks/actions/auth'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full py-3 px-4 bg-green-600 hover:bg-green-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors duration-200 text-sm"
    >
      {pending ? 'Connexion…' : 'Accéder aux pronostics →'}
    </button>
  )
}

export default function ConnexionPage() {
  const [email, setEmail]               = useState('')
  const [sent, setSent]                 = useState(false)
  const [magicError, setMagicError]     = useState<string | null>(null)
  const [isPending, start]              = useTransition()
  const [showMagicLink, setShowMagicLink] = useState(false)
  const [isPWA, setIsPWA]               = useState(false)

  const [state, action] = useFormState(signInByUsername, { error: null })

  useEffect(() => {
    setIsPWA(window.matchMedia('(display-mode: standalone)').matches)
  }, [])

  function handleMagicSubmit(e: React.FormEvent) {
    e.preventDefault()
    setMagicError(null)
    start(async () => {
      const result = await signInWithMagicLink(email.trim())
      if (result?.error) setMagicError(result.error)
      else setSent(true)
    })
  }

  return (
    <div className="w-full max-w-sm">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-600/15 border border-green-600/25 mb-4">
          <span className="text-2xl">⚽</span>
        </div>
        <h1 className="text-xl font-bold text-zinc-100 tracking-tight">CDM 2026</h1>
        <p className="text-zinc-500 mt-1 text-xs">Pronostics · Classements · Groupes</p>
      </div>

      {isPWA && (
        <div className="mb-4 bg-green-950/40 border border-green-800/40 rounded-xl px-4 py-3 flex items-center gap-2">
          <span className="text-base">📱</span>
          <p className="text-xs text-green-300 font-medium">Vous êtes dans l&apos;application CDM26</p>
        </div>
      )}

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-5">
        {!showMagicLink ? (
          <form action={action} className="space-y-4">
            <h2 className="text-base font-semibold text-zinc-100 mb-1">Connexion</h2>

            {state?.error && (
              <div className="bg-red-950/40 border border-red-800/40 rounded-lg px-3.5 py-2.5">
                <p className="text-red-400 text-sm">{state.error}</p>
              </div>
            )}

            <div>
              <label htmlFor="username" className="block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wide">
                Ton pseudo
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                autoComplete="username"
                placeholder="MonPseudo"
                className="w-full bg-zinc-800 border border-zinc-700 text-zinc-100 rounded-lg px-3.5 py-2.5 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/50 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wide">
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full bg-zinc-800 border border-zinc-700 text-zinc-100 rounded-lg px-3.5 py-2.5 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/50 transition-colors"
              />
            </div>

            <SubmitButton />

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-zinc-800" />
              <span className="text-[10px] text-zinc-600 uppercase tracking-wider">admin</span>
              <div className="flex-1 h-px bg-zinc-800" />
            </div>

            <button
              type="button"
              onClick={() => setShowMagicLink(true)}
              className="w-full text-xs text-zinc-500 hover:text-zinc-300 transition-colors text-center py-1"
            >
              Connexion par lien email →
            </button>
          </form>
        ) : (
          <div>
            <h2 className="text-base font-semibold text-zinc-100 mb-4">Connexion par lien email</h2>

            {isPWA && (
              <div className="mb-4 bg-amber-950/40 border border-amber-800/40 rounded-lg px-3.5 py-2.5">
                <p className="text-amber-300 text-xs leading-relaxed">
                  Le lien reçu s&apos;ouvre dans le navigateur. Préfère la connexion par pseudo dans l&apos;app.
                </p>
              </div>
            )}

            {sent ? (
              <div className="bg-green-950/40 border border-green-800/40 rounded-xl px-4 py-5 text-center space-y-2">
                <p className="text-2xl">✉️</p>
                <p className="text-sm font-medium text-green-300">Lien envoyé !</p>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Vérifie ta boîte mail à{' '}
                  <span className="text-zinc-200 font-medium">{email}</span>.
                </p>
                <button
                  onClick={() => { setSent(false); setEmail('') }}
                  className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors mt-2 underline underline-offset-2"
                >
                  Utiliser un autre email
                </button>
              </div>
            ) : (
              <form onSubmit={handleMagicSubmit} className="space-y-4">
                {magicError && (
                  <div className="bg-red-950/40 border border-red-800/40 rounded-lg px-3.5 py-2.5">
                    <p className="text-red-400 text-sm">{magicError}</p>
                  </div>
                )}
                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wide">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="vous@exemple.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 text-zinc-100 rounded-lg px-3.5 py-2.5 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/50 transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isPending || !email.trim()}
                  className="w-full py-3 px-4 bg-green-600 hover:bg-green-500 disabled:bg-green-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors duration-200 text-sm"
                >
                  {isPending ? 'Envoi en cours…' : 'Recevoir mon lien de connexion'}
                </button>
              </form>
            )}

            <div className="mt-4 flex items-center gap-3">
              <div className="flex-1 h-px bg-zinc-800" />
            </div>

            <button
              type="button"
              onClick={() => setShowMagicLink(false)}
              className="w-full text-xs text-zinc-500 hover:text-zinc-300 transition-colors text-center py-1 mt-3"
            >
              ← Connexion avec pseudo
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
