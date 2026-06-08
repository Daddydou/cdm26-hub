import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code  = searchParams.get('code')
  const error = searchParams.get('error')

  const base = process.env.NEXT_PUBLIC_SITE_URL ?? new URL(request.url).origin

  if (error) {
    return NextResponse.redirect(`${base}/fantasy/admin-login?error=lien_invalide`)
  }

  if (code) {
    // Pass code to client so it can exchange it and store the session in localStorage
    return NextResponse.redirect(`${base}/fantasy?__auth_code=${encodeURIComponent(code)}`)
  }

  return NextResponse.redirect(`${base}/fantasy`)
}
