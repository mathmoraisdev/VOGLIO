'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createSupabaseClient } from '@/lib/supabase/client'
import Button from '@/components/ui/Button'
import { Loader2, Mail, Lock, AlertCircle } from 'lucide-react'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createSupabaseClient()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) throw signInError

      if (data.user) {
        // Fetch user role to determine redirect
        let { data: profile, error: profileError } = await supabase
          .from('user_profiles')
          .select('role')
          .eq('id', data.user.id)
          .single()

        // If profile doesn't exist, create one with default role 'client'
        if (profileError && profileError.code === 'PGRST116') {
          const { error: insertError } = await supabase
            .from('user_profiles')
            .insert({
              id: data.user.id,
              role: 'client',
            })
          
          if (insertError) {
            console.error('Error creating profile:', insertError)
          } else {
            // Fetch the newly created profile
            const { data: newProfile } = await supabase
              .from('user_profiles')
              .select('role')
              .eq('id', data.user.id)
              .single()
            profile = newProfile
          }
        }

        const role = profile?.role || 'client'
        
        console.log('User role:', role, 'User ID:', data.user.id)
        
        // Redirect based on role - use window.location for more reliable redirect
        if (role === 'admin') {
          console.log('Redirecting to /admin')
          window.location.href = '/admin'
        } else {
          console.log('Redirecting to /inside')
          window.location.href = '/inside'
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer login. Verifique suas credenciais.')
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Por favor, insira seu email primeiro')
      return
    }

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })

      if (resetError) throw resetError
      alert('Email de recuperação enviado! Verifique sua caixa de entrada.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao enviar email de recuperação')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Bem-vindo de volta</h1>
        <p className="text-gray-600">Entre na sua conta para acompanhar seus projetos</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-gray-900 placeholder:text-gray-400"
              placeholder="seu@email.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Senha
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-gray-900 placeholder:text-gray-400"
              placeholder="••••••••"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={handleForgotPassword}
          className="text-sm text-primary hover:text-primary-600 transition-colors"
        >
          Esqueceu sua senha?
        </button>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
            Entrando...
          </>
        ) : (
          'Entrar'
        )}
      </Button>

      <p className="text-center text-sm text-gray-600">
        Não tem uma conta?{' '}
        <Link href="/register" className="text-primary hover:text-primary-600 font-medium">
          Criar conta
        </Link>
      </p>
    </form>
  )
}

