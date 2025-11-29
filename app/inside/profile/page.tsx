'use client'

import { useAuth } from '@/hooks/useAuth'
import { User, Mail, Building2 } from 'lucide-react'

export default function ProfilePage() {
  const { user } = useAuth()

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Meu Perfil</h1>
        <p className="text-gray-400">Gerencie suas informações pessoais</p>
      </div>

      <div className="bg-black border border-gray-900 rounded-xl p-8">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-20 h-20 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
            <span className="text-3xl font-bold text-primary">
              {user?.email?.charAt(0).toUpperCase() || 'U'}
            </span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white mb-1">
              {user?.email?.split('@')[0] || 'Usuário'}
            </h2>
            <p className="text-gray-400">{user?.email}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 bg-black rounded-lg border border-gray-900">
            <Mail className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-400">Email</p>
              <p className="text-white">{user?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-black rounded-lg border border-gray-900">
            <User className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-400">ID do Usuário</p>
              <p className="text-gray-300 font-mono text-sm">{user?.id}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

