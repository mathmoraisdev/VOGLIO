import { DollarSign, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react'
import { formatCurrency } from '@/lib/admin/utils'

interface FinancialOverviewProps {
  totalRevenue: number
  totalPaid: number
  totalPending: number
  totalExpenses: number
  netProfit: number
}

export default function FinancialOverview({
  totalRevenue,
  totalPaid,
  totalPending,
  totalExpenses,
  netProfit,
}: FinancialOverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-black border border-gray-900 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-400 mb-1">Receita Total</p>
            <p className="text-2xl font-bold text-white">{formatCurrency(totalRevenue)}</p>
          </div>
          <div className="w-12 h-12 rounded-lg bg-green-500/20 border border-green-500/30 flex items-center justify-center">
            <DollarSign className="w-6 h-6 text-green-400" />
          </div>
        </div>
      </div>

      <div className="bg-black border border-gray-900 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-400 mb-1">Receita Recebida</p>
            <p className="text-2xl font-bold text-green-400">{formatCurrency(totalPaid)}</p>
          </div>
          <div className="w-12 h-12 rounded-lg bg-green-500/20 border border-green-500/30 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-green-400" />
          </div>
        </div>
      </div>

      <div className="bg-black border border-gray-900 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-400 mb-1">Pendente</p>
            <p className="text-2xl font-bold text-yellow-400">{formatCurrency(totalPending)}</p>
          </div>
          <div className="w-12 h-12 rounded-lg bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center">
            <AlertCircle className="w-6 h-6 text-yellow-400" />
          </div>
        </div>
      </div>

      <div className="bg-black border border-gray-900 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-400 mb-1">Lucro Líquido</p>
            <p className={`text-2xl font-bold ${netProfit >= 0 ? 'text-primary' : 'text-red-400'}`}>
              {formatCurrency(netProfit)}
            </p>
          </div>
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
            netProfit >= 0 
              ? 'bg-primary/20 border border-primary/30' 
              : 'bg-red-500/20 border border-red-500/30'
          }`}>
            {netProfit >= 0 ? (
              <TrendingUp className="w-6 h-6 text-primary" />
            ) : (
              <TrendingDown className="w-6 h-6 text-red-400" />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

