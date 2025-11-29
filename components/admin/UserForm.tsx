'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { createSupabaseClient } from '@/lib/supabase/client'
import type { UserProfile, UserRole } from '@/lib/supabase/types'
import Button from '@/components/ui/Button'
import { Loader2, AlertCircle } from 'lucide-react'

interface UserFormProps {
  user?: UserProfile
  onSuccess?: () => void
}

export default function UserForm({ user, onSuccess }: UserFormProps) {
  const router = useRouter()
  const supabase = createSupabaseClient()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    full_name: user?.full_name || '',
    email: user?.id || '', // Using id as email identifier
    company_name: user?.company_name || '',
    phone: user?.phone || '',
    role: (user?.role || 'client') as UserRole,
    password: '',
  })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (user) {
        // Update existing user
        const { error: updateError } = await supabase
          .from('user_profiles')
          .update({
            full_name: formData.full_name || null,
            company_name: formData.company_name || null,
            phone: formData.phone || null,
            role: formData.role,
          })
          .eq('id', user.id)

        if (updateError) throw updateError

        if (onSuccess) {
          onSuccess()
        } else {
          router.push('/admin/users')
        }
      } else {
        // Create new user - this requires creating auth user first
        // For now, we'll just create the profile and admin needs to create auth user manually
        // Or we can use Supabase Admin API to create user
        setError('Criação de usuário requer integração com Supabase Admin API. Use o dashboard do Supabase para criar usuários.')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar usuário')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-900/20 border border-red-800 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="full_name" className="block text-sm font-medium text-gray-300 mb-2">
            Nome Completo
          </label>
          <input
            id="full_name"
            type="text"
            value={formData.full_name}
            onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary"
            placeholder="Nome completo"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
            Email {user && '(ID do usuário)'}
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            disabled={!!user}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="email@exemplo.com"
          />
        </div>

        <div>
          <label htmlFor="company_name" className="block text-sm font-medium text-gray-300 mb-2">
            Empresa
          </label>
          <input
            id="company_name"
            type="text"
            value={formData.company_name}
            onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary"
            placeholder="Nome da empresa"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
            Telefone
          </label>
          <input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary"
            placeholder="(00) 00000-0000"
          />
        </div>

        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-2">
            Role
          </label>
          <select
            id="role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none focus:border-primary"
          >
            <option value="client">Cliente</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {!user && (
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary"
              placeholder="••••••••"
            />
          </div>
        )}
      </div>

      <div className="flex items-center justify-end gap-4">
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.back()}
          disabled={loading}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          variant="primary"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Salvando...
            </>
          ) : (
            user ? 'Atualizar' : 'Criar'
          )}
        </Button>
      </div>
    </form>
  )
}

