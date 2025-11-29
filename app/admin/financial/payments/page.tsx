'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useFinancial } from '@/hooks/useFinancial'
import PaymentTable from '@/components/admin/PaymentTable'
import Button from '@/components/ui/Button'
import { Plus, DollarSign } from 'lucide-react'
import { createSupabaseClient } from '@/lib/supabase/client'

export default function PaymentsPage() {
  const { payments, loading, refetch } = useFinancial()
  const supabase = createSupabaseClient()

  const handleMarkAsPaid = async (paymentId: string) => {
    try {
      const { error } = await supabase
        .from('project_payments')
        .update({
          status: 'paid',
          paid_date: new Date().toISOString().split('T')[0],
        })
        .eq('id', paymentId)

      if (error) throw error
      refetch()
    } catch (error) {
      alert('Erro ao marcar como pago: ' + (error instanceof Error ? error.message : 'Erro desconhecido'))
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
          <h1 className="text-3xl font-bold text-white mb-2">Pagamentos</h1>
          <p className="text-gray-400">Gerencie todos os pagamentos do sistema</p>
        </div>
      </div>

      <div className="bg-black border border-gray-900 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <DollarSign className="w-5 h-5 text-primary" />
          <span className="text-sm text-gray-400">
            Total: <span className="text-white font-medium">{payments.length}</span> pagamentos
          </span>
        </div>
        <PaymentTable payments={payments} onMarkAsPaid={handleMarkAsPaid} />
      </div>
    </div>
  )
}

