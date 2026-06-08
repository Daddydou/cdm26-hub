import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// Routes /picks/* accessibles sans authentification
const PICKS_BYPASS_PATHS = [
  '/picks/connexion',
  '/picks/inscription',
  '/picks/auth/callback',
  '/picks/inscription/completer',
  '/picks/api/admin/import-from-browser',
  '/picks/api/admin/import-squads',
  '/picks/api/admin/clear-players',
  '/picks/guide',
]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Hub + Fantasy = pas de middleware serveur (auth client-side)
  if (!pathname.startsWith('/picks')) {
    return NextResponse.next()
  }

  // Routes picks exemptées
  if (PICKS_BYPASS_PATHS.some(p => pathname.startsWith(p))) {
    return NextResponse.next()
  }

  // Routes /picks/* protégées — vérification de session Supabase
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.redirect(new URL('/picks/connexion', request.url))
  }

  if (pathname.startsWith('/picks/admin')) {
    const { data: cdmUser } = await supabase
      .from('cdm_users')
      .select('is_admin')
      .eq('auth_id', user.id)
      .single()

    if (!cdmUser?.is_admin) {
      return NextResponse.redirect(new URL('/picks', request.url))
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
