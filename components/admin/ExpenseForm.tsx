'use client'

import { useState, FormEvent } from 'react'
import { createSupabaseClient } from '@/lib/supabase/client'
import type { ProjectExpense } from '@/lib/supabase/types'
import Button from '@/components/ui/Button'
import { Loader2, AlertCircle } from 'lucide-react'

interface ExpenseFormProps {
  projectId: string
  expense?: ProjectExpense
  onSuccess?: () => void
}

const expenseCategories = [
  'Desenvolvimento',
  'Design',
  'Marketing',
  'Infraestrutura',
  'Serviços',
  'Materiais',
  'Outros',
]

export default function ExpenseForm({ projectId, expense, onSuccess }: ExpenseFormProps) {
  const supabase = createSupabaseClient()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    description: expense?.description || '',
    amount: expense?.amount.toString() || '',
    category: expense?.category || '',
    expense_date: expense?.expense_date || new Date().toISOString().split('T')[0],
    receipt_url: expense?.receipt_url || '',
  })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const expenseData = {
        project_id: projectId,
        description: formData.description,
        amount: parseFloat(formData.amount),
        category: formData.category,
        expense_date: formData.expense_date,
        receipt_url: formData.receipt_url || null,
      }

      if (expense) {
        // Update existing expense
        const { error: updateError } = await supabase
          .from('project_expenses')
          .update(expenseData)
          .eq('id', expense.id)

        if (updateError) throw updateError
      } else {
        // Create new expense
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) throw new Error('Usuário não autenticado')

        const { error: insertError } = await supabase
          .from('project_expenses')
          .insert({
            ...expenseData,
            created_by: user.id,
          })

        if (insertError) throw insertError
      }

      if (onSuccess) {
        onSuccess()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar despesa')
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
        <div className="md:col-span-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
            Descrição *
          </label>
          <input
            id="description"
            type="text"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
            className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary"
            placeholder="Descrição da despesa"
          />
        </div>

        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-300 mb-2">
            Valor *
          </label>
          <input
            id="amount"
            type="number"
            step="0.01"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            required
            className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary"
            placeholder="0.00"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">
            Categoria *
          </label>
          <select
            id="category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
            className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none focus:border-primary"
          >
            <option value="">Selecione...</option>
            {expenseCategories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="expense_date" className="block text-sm font-medium text-gray-300 mb-2">
            Data da Despesa *
          </label>
          <input
            id="expense_date"
            type="date"
            value={formData.expense_date}
            onChange={(e) => setFormData({ ...formData, expense_date: e.target.value })}
            required
            className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary"
          />
        </div>

        <div>
          <label htmlFor="receipt_url" className="block text-sm font-medium text-gray-300 mb-2">
            URL do Comprovante
          </label>
          <input
            id="receipt_url"
            type="url"
            value={formData.receipt_url}
            onChange={(e) => setFormData({ ...formData, receipt_url: e.target.value })}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary"
            placeholder="https://..."
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-4">
        <Button
          type="button"
          variant="secondary"
          onClick={() => onSuccess?.()}
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
            expense ? 'Atualizar' : 'Criar'
          )}
        </Button>
      </div>
    </form>
  )
}

