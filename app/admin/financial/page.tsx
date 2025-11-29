'use client'

import { useState } from 'react'
import { useFinancial } from '@/hooks/useFinancial'
import FinancialOverview from '@/components/admin/FinancialOverview'
import PaymentTable from '@/components/admin/PaymentTable'
import DateRangePicker from '@/components/admin/DateRangePicker'
import { DollarSign } from 'lucide-react'

export default function FinancialPage() {
  const [startDate, setStartDate] = useState<Date | undefined>()
  const [endDate, setEndDate] = useState<Date | undefined>()
  
  const { 
    totalRevenue, 
    totalPaid, 
    totalPending, 
    totalExpenses, 
    netProfit,
    payments,
    loading,
    refetch 
  } = useFinancial(startDate, endDate)

  const handleMarkAsPaid = async (paymentId: string) => {
    // This would be implemented with a hook or direct Supabase call
    // For now, just refetch
    refetch()
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-black rounded w-64 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-32 bg-black rounded-xl animate-pulse border border-gray-900" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Controle Financeiro</h1>
        <p className="text-gray-400">Visão geral financeira e gestão de pagamentos</p>
      </div>

      {/* Date Range Picker */}
      <div className="bg-black border border-gray-900 rounded-xl p-6">
        <h2 className="text-lg font-bold text-white mb-4">Filtrar por Período</h2>
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
        />
      </div>

      {/* Financial Overview */}
      <FinancialOverview
        totalRevenue={totalRevenue}
        totalPaid={totalPaid}
        totalPending={totalPending}
        totalExpenses={totalExpenses}
        netProfit={netProfit}
      />

      {/* Pending Payments */}
      <div className="bg-black border border-gray-900 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Pagamentos Pendentes</h2>
        </div>
        <PaymentTable 
          payments={payments.filter(p => p.status === 'pending')} 
          onMarkAsPaid={handleMarkAsPaid}
        />
      </div>
    </div>
  )
}

