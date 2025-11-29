'use client'

import ProjectForm from '@/components/admin/ProjectForm'

export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Criar Novo Projeto</h1>
        <p className="text-gray-400">Adicione um novo projeto ao sistema</p>
      </div>

      <div className="bg-black border border-gray-900 rounded-xl p-6">
        <ProjectForm />
      </div>
    </div>
  )
}

