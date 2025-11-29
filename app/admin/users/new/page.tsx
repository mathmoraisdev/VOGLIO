'use client'

import UserForm from '@/components/admin/UserForm'

export default function NewUserPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Criar Novo Usuário</h1>
        <p className="text-gray-400">Adicione um novo usuário ao sistema</p>
      </div>

      <div className="bg-black border border-gray-900 rounded-xl p-6">
        <UserForm />
      </div>
    </div>
  )
}

