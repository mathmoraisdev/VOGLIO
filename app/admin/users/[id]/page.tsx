'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { createSupabaseClient } from '@/lib/supabase/client'
import type { UserProfile } from '@/lib/supabase/types'
import UserForm from '@/components/admin/UserForm'
import { useRouter } from 'next/navigation'

export default function EditUserPage() {
  const params = useParams()
  const router = useRouter()
  const userId = params.id as string
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createSupabaseClient()

  useEffect(() => {
    fetchUser()
  }, [userId])

  const fetchUser = async () => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) throw error
      setUser(data)
    } catch (error) {
      console.error('Error fetching user:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-black rounded w-64 animate-pulse" />
        <div className="h-96 bg-black rounded-xl animate-pulse border border-gray-900" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Usuário não encontrado</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Editar Usuário</h1>
        <p className="text-gray-400">Atualize as informações do usuário</p>
      </div>

      <div className="bg-black border border-gray-900 rounded-xl p-6">
        <UserForm user={user} onSuccess={() => router.push('/admin/users')} />
      </div>
    </div>
  )
}

