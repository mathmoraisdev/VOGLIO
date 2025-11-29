'use client'

import { useState, FormEvent } from 'react'
import { createSupabaseClient } from '@/lib/supabase/client'
import type { ProjectPayment, PaymentStatus } from '@/lib/supabase/types'
import Button from '@/components/ui/Button'
import { Loader2, AlertCircle } from 'lucide-react'

interface PaymentFormProps {
  projectId: string
  payment?: ProjectPayment
  onSuccess?: () => void
}

export default function PaymentForm({ projectId, payment, onSuccess }: PaymentFormProps) {
  const supabase = createSupabaseClient()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    amount: payment?.amount.toString() || '',
    due_date: payment?.due_date || '',
    installment_number: payment?.installment_number || 1,
    payment_method: payment?.payment_method || '',
    notes: payment?.notes || '',
    status: (payment?.status || 'pending') as PaymentStatus,
  })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (payment) {
        // Update existing payment
        const { error: updateError } = await supabase
          .from('project_payments')
          .update({
            amount: parseFloat(formData.amount),
            due_date: formData.due_date,
            installment_number: formData.installment_number,
            payment_method: formData.payment_method || null,
            notes: formData.notes || null,
            status: formData.status,
            paid_date: formData.status === 'paid' ? new Date().toISOString().split('T')[0] : null,
          })
          .eq('id', payment.id)

        if (updateError) throw updateError
      } else {
        // Create new payment
        const { error: insertError } = await supabase
          .from('project_payments')
          .insert({
            project_id: projectId,
            amount: parseFloat(formData.amount),
            due_date: formData.due_date,
            installment_number: formData.installment_number,
            payment_method: formData.payment_method || null,
            notes: formData.notes || null,
            status: formData.status,
          })

        if (insertError) throw insertError
      }

      if (onSuccess) {
        onSuccess()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar pagamento')
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
          <label htmlFor="due_date" className="block text-sm font-medium text-gray-300 mb-2">
            Data de Vencimento *
          </label>
          <input
            id="due_date"
            type="date"
            value={formData.due_date}
            onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
            required
            className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary"
          />
        </div>

        <div>
          <label htmlFor="installment_number" className="block text-sm font-medium text-gray-300 mb-2">
            Número da Parcela
          </label>
          <input
            id="installment_number"
            type="number"
            min="1"
            value={formData.installment_number}
            onChange={(e) => setFormData({ ...formData, installment_number: parseInt(e.target.value) })}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary"
          />
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-300 mb-2">
            Status
          </label>
          <select
            id="status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as PaymentStatus })}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none focus:border-primary"
          >
            <option value="pending">Pendente</option>
            <option value="paid">Pago</option>
            <option value="overdue">Atrasado</option>
            <option value="cancelled">Cancelado</option>
          </select>
        </div>

        <div>
          <label htmlFor="payment_method" className="block text-sm font-medium text-gray-300 mb-2">
            Método de Pagamento
          </label>
          <input
            id="payment_method"
            type="text"
            value={formData.payment_method}
            onChange={(e) => setFormData({ ...formData, payment_method: e.target.value })}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary"
            placeholder="PIX, Boleto, Cartão..."
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="notes" className="block text-sm font-medium text-gray-300 mb-2">
            Observações
          </label>
          <textarea
            id="notes"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            rows={3}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary"
            placeholder="Observações sobre o pagamento"
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
            payment ? 'Atualizar' : 'Criar'
          )}
        </Button>
      </div>
    </form>
  )
}

