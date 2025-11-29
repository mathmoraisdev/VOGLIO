'use client'

import { useState } from 'react'
import { useFinancial } from '@/hooks/useFinancial'
import ExpenseForm from '@/components/admin/ExpenseForm'
import { Plus, Trash2, Receipt } from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/admin/utils'
import { createSupabaseClient } from '@/lib/supabase/client'
import Button from '@/components/ui/Button'

export default function ExpensesPage() {
  const { expenses, loading, refetch } = useFinancial()
  const [showForm, setShowForm] = useState(false)
  const [selectedProjectId, setSelectedProjectId] = useState<string>('')
  const supabase = createSupabaseClient()

  const handleDelete = async (expenseId: string) => {
    if (!confirm('Tem certeza que deseja excluir esta despesa?')) {
      return
    }

    try {
      const { error } = await supabase
        .from('project_expenses')
        .delete()
        .eq('id', expenseId)

      if (error) throw error
      refetch()
    } catch (error) {
      alert('Erro ao excluir despesa: ' + (error instanceof Error ? error.message : 'Erro desconhecido'))
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
          <h1 className="text-3xl font-bold text-white mb-2">Despesas</h1>
          <p className="text-gray-400">Gerencie todas as despesas do sistema</p>
        </div>
        <Button variant="primary" onClick={() => setShowForm(!showForm)}>
          <Plus className="w-4 h-4 mr-2" />
          Nova Despesa
        </Button>
      </div>

      {showForm && (
        <div className="bg-black border border-gray-900 rounded-xl p-6">
          <h2 className="text-lg font-bold text-white mb-4">Criar Nova Despesa</h2>
          <ExpenseForm
            projectId={selectedProjectId}
            onSuccess={() => {
              setShowForm(false)
              setSelectedProjectId('')
              refetch()
            }}
          />
        </div>
      )}

      <div className="bg-black border border-gray-900 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Descrição
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Categoria
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Valor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-900">
              {expenses.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-400">
                    Nenhuma despesa encontrada
                  </td>
                </tr>
              ) : (
                expenses.map((expense) => (
                  <tr key={expense.id} className="hover:bg-gray-900/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white">{expense.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-300">{expense.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-red-400">
                        {formatCurrency(Number(expense.amount))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-300">
                        {formatDate(expense.expense_date)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        {expense.receipt_url && (
                          <a
                            href={expense.receipt_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary-400 transition-colors"
                          >
                            <Receipt className="w-4 h-4" />
                          </a>
                        )}
                        <button
                          onClick={() => handleDelete(expense.id)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

