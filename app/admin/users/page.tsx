'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useUsers } from '@/hooks/useUsers'
import UserTable from '@/components/admin/UserTable'
import Button from '@/components/ui/Button'
import { Plus, Users } from 'lucide-react'
import { createSupabaseClient } from '@/lib/supabase/client'

export default function UsersPage() {
  const { users, loading, refetch } = useUsers()
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const supabase = createSupabaseClient()

  const handleDelete = async (userId: string) => {
    if (!confirm('Tem certeza que deseja excluir este usuário? Esta ação não pode ser desfeita.')) {
      return
    }

    try {
      setDeletingId(userId)
      // Note: This will only delete the profile. The auth user needs to be deleted separately via Supabase Admin API
      const { error } = await supabase
        .from('user_profiles')
        .delete()
        .eq('id', userId)

      if (error) throw error
      refetch()
    } catch (error) {
      alert('Erro ao excluir usuário: ' + (error instanceof Error ? error.message : 'Erro desconhecido'))
    } finally {
      setDeletingId(null)
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Usuários</h1>
          <p className="text-gray-400">Gerencie todos os usuários do sistema</p>
        </div>
        <Link href="/admin/users/new">
          <Button variant="primary">
            <Plus className="w-4 h-4 mr-2" />
            Criar Usuário
          </Button>
        </Link>
      </div>

      <div className="bg-black border border-gray-900 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Users className="w-5 h-5 text-primary" />
          <span className="text-sm text-gray-400">
            Total: <span className="text-white font-medium">{users.length}</span> usuários
          </span>
        </div>
        <UserTable users={users} onDelete={handleDelete} />
      </div>
    </div>
  )
}

