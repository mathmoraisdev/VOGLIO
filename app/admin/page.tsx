'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUsers } from '@/hooks/useUsers'
import { useAdminProjects } from '@/hooks/useAdminProjects'
import { useFinancial } from '@/hooks/useFinancial'
import { useAuth } from '@/hooks/useAuth'
import StatsCard from '@/components/admin/StatsCard'
import { Users, FolderKanban, DollarSign, Clock } from 'lucide-react'
import { formatCurrency } from '@/lib/admin/utils'
import Link from 'next/link'

export default function AdminDashboard() {
  const router = useRouter()
  const { role, loading: authLoading } = useAuth()
  const { users, loading: usersLoading, error: usersError } = useUsers()
  const { projects, loading: projectsLoading, error: projectsError } = useAdminProjects()
  const { totalPaid, totalPending, totalExpenses, netProfit, payments, loading: financialLoading, error: financialError } = useFinancial()

  // Redirect non-admins away from admin area
  useEffect(() => {
    if (!authLoading && role !== 'admin') {
      router.replace('/inside')
    }
  }, [role, authLoading, router])

  const loading = authLoading || usersLoading || projectsLoading || financialLoading
  const hasError = usersError || projectsError || financialError

  // Show loading state
  if (authLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-black rounded w-64 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-32 bg-black rounded-xl animate-pulse border border-gray-900" />
          ))}
        </div>
      </div>
    )
  }

  // Don't render if not admin
  if (role !== 'admin') {
    return null
  }

  const stats = {
    totalUsers: users.length,
    activeProjects: projects.filter(p => p.status === 'active').length,
    monthlyRevenue: totalPaid,
    pendingProjects: projects.filter(p => p.status === 'draft' || p.status === 'paused').length,
  }

  const recentProjects = projects.slice(0, 5)
  const pendingPayments = payments.filter(p => p.status === 'pending').slice(0, 5)

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-black rounded w-64 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-32 bg-black rounded-xl animate-pulse border border-gray-900" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard Administrativo</h1>
        <p className="text-gray-400">Visão geral do sistema e operações</p>
      </div>

      {/* Error Messages */}
      {hasError && (
        <div className="bg-red-900/20 border border-red-800 rounded-lg p-4">
          <p className="text-sm text-red-400">
            Erro ao carregar dados: {usersError || projectsError || financialError}
          </p>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total de Usuários"
          value={stats.totalUsers}
          icon={Users}
        />
        <StatsCard
          title="Projetos Ativos"
          value={stats.activeProjects}
          icon={FolderKanban}
        />
        <StatsCard
          title="Receita do Mês"
          value={formatCurrency(stats.monthlyRevenue)}
          icon={DollarSign}
        />
        <StatsCard
          title="Projetos Pendentes"
          value={stats.pendingProjects}
          icon={Clock}
        />
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-black border border-gray-900 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400 mb-1">Receita Total</p>
              <p className="text-2xl font-bold text-green-400">{formatCurrency(totalPaid)}</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-400" />
          </div>
        </div>
        <div className="bg-black border border-gray-900 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400 mb-1">Despesas</p>
              <p className="text-2xl font-bold text-red-400">{formatCurrency(totalExpenses)}</p>
            </div>
            <DollarSign className="w-8 h-8 text-red-400" />
          </div>
        </div>
        <div className="bg-black border border-gray-900 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400 mb-1">Lucro Líquido</p>
              <p className="text-2xl font-bold text-primary">{formatCurrency(netProfit)}</p>
            </div>
            <DollarSign className="w-8 h-8 text-primary" />
          </div>
        </div>
      </div>

      {/* Recent Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-black border border-gray-900 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Projetos Recentes</h2>
            <Link
              href="/admin/projects"
              className="text-sm text-primary hover:text-primary-400 font-medium transition-colors"
            >
              Ver todos →
            </Link>
          </div>
          {recentProjects.length === 0 ? (
            <p className="text-gray-400 text-sm">Nenhum projeto encontrado</p>
          ) : (
            <div className="space-y-3">
              {recentProjects.map(project => (
                <div key={project.id} className="flex items-center justify-between p-3 bg-gray-900 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-white">{project.name}</p>
                    <p className="text-xs text-gray-400">{project.status}</p>
                  </div>
                  <Link
                    href={`/admin/projects/${project.id}`}
                    className="text-xs text-primary hover:text-primary-400"
                  >
                    Ver →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-black border border-gray-900 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Pagamentos Pendentes</h2>
            <Link
              href="/admin/financial/payments"
              className="text-sm text-primary hover:text-primary-400 font-medium transition-colors"
            >
              Ver todos →
            </Link>
          </div>
          {pendingPayments.length === 0 ? (
            <p className="text-gray-400 text-sm">Nenhum pagamento pendente</p>
          ) : (
            <div className="space-y-3">
              {pendingPayments.map(payment => (
                <div key={payment.id} className="flex items-center justify-between p-3 bg-gray-900 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-white">{formatCurrency(Number(payment.amount))}</p>
                    <p className="text-xs text-gray-400">Vencimento: {new Date(payment.due_date).toLocaleDateString('pt-BR')}</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-yellow-900 text-yellow-400 rounded">Pendente</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

