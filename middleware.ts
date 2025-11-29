import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  
  // Verificar se as variáveis de ambiente estão configuradas
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ Variáveis de ambiente do Supabase não encontradas!')
    console.error('Verifique se NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY estão definidas no .env.local')
    
    // Se não estiver na rota /inside, permitir continuar
    if (!req.nextUrl.pathname.startsWith('/inside')) {
      return res
    }
    
    // Se estiver tentando acessar /inside sem config, redirecionar para login
    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = '/login'
    return NextResponse.redirect(redirectUrl)
  }
  
  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          req.cookies.set({
            name,
            value,
            ...options,
          })
          res.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: any) {
          req.cookies.set({
            name,
            value: '',
            ...options,
          })
          res.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  // Use getUser() instead of getSession() for security
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Get user role if authenticated
  let userRole: 'client' | 'admin' | null = null
  if (user) {
    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select('role')
      .eq('id', user.id)
      .single()
    
    // If profile doesn't exist, default to 'client'
    // If profile exists, use its role
    if (profileError && profileError.code === 'PGRST116') {
      userRole = 'client' // Profile doesn't exist, default to client
    } else if (profile) {
      userRole = profile.role as 'client' | 'admin'
    } else {
      userRole = 'client' // Fallback to client
    }
  }

  // Protect /admin routes - only admins can access
  if (req.nextUrl.pathname.startsWith('/admin')) {
    if (!user) {
      const redirectUrl = req.nextUrl.clone()
      redirectUrl.pathname = '/login'
      redirectUrl.searchParams.set('redirectedFrom', req.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }
    if (userRole !== 'admin') {
      // Non-admin trying to access admin area, redirect to client area
      return NextResponse.redirect(new URL('/inside', req.url))
    }
  }

  // Protect /inside routes - clients and admins can access
  if (req.nextUrl.pathname.startsWith('/inside')) {
    if (!user) {
      const redirectUrl = req.nextUrl.clone()
      redirectUrl.pathname = '/login'
      redirectUrl.searchParams.set('redirectedFrom', req.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }
  }

  // Redirect authenticated users away from login/register pages
  if ((req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/register') && user) {
    // Redirect based on role
    if (userRole === 'admin') {
      return NextResponse.redirect(new URL('/admin', req.url))
    }
    return NextResponse.redirect(new URL('/inside', req.url))
  }

  return res
}

export const config = {
  matcher: ['/inside/:path*', '/admin/:path*', '/login', '/register'],
}

