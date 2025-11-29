'use client'

import { useState, useEffect } from 'react'
import { createSupabaseClient } from '@/lib/supabase/client'
import type { ProjectFinance, ProjectPayment, ProjectExpense } from '@/lib/supabase/types'

export function useFinancial(startDate?: Date, endDate?: Date) {
  const [finances, setFinances] = useState<ProjectFinance[]>([])
  const [payments, setPayments] = useState<ProjectPayment[]>([])
  const [expenses, setExpenses] = useState<ProjectExpense[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createSupabaseClient()

  useEffect(() => {
    fetchFinancialData()
  }, [startDate, endDate])

  const fetchFinancialData = async () => {
    try {
      setLoading(true)
      
      // Fetch finances
      const { data: financesData, error: financesError } = await supabase
        .from('project_finances')
        .select('*')

      if (financesError) throw financesError

      // Fetch payments
      let paymentsQuery = supabase
        .from('project_payments')
        .select('*')
        .order('due_date', { ascending: false })

      if (startDate) {
        paymentsQuery = paymentsQuery.gte('due_date', startDate.toISOString().split('T')[0])
      }
      if (endDate) {
        paymentsQuery = paymentsQuery.lte('due_date', endDate.toISOString().split('T')[0])
      }

      const { data: paymentsData, error: paymentsError } = await paymentsQuery

      if (paymentsError) throw paymentsError

      // Fetch expenses
      let expensesQuery = supabase
        .from('project_expenses')
        .select('*')
        .order('expense_date', { ascending: false })

      if (startDate) {
        expensesQuery = expensesQuery.gte('expense_date', startDate.toISOString().split('T')[0])
      }
      if (endDate) {
        expensesQuery = expensesQuery.lte('expense_date', endDate.toISOString().split('T')[0])
      }

      const { data: expensesData, error: expensesError } = await expensesQuery

      if (expensesError) throw expensesError

      setFinances(financesData || [])
      setPayments(paymentsData || [])
      setExpenses(expensesData || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar dados financeiros')
    } finally {
      setLoading(false)
    }
  }

  const totalRevenue = finances.reduce((sum, f) => sum + Number(f.total_value), 0)
  const totalPaid = payments
    .filter(p => p.status === 'paid')
    .reduce((sum, p) => sum + Number(p.amount), 0)
  const totalPending = payments
    .filter(p => p.status === 'pending')
    .reduce((sum, p) => sum + Number(p.amount), 0)
  const totalExpenses = expenses.reduce((sum, e) => sum + Number(e.amount), 0)
  const netProfit = totalPaid - totalExpenses

  return {
    finances,
    payments,
    expenses,
    loading,
    error,
    totalRevenue,
    totalPaid,
    totalPending,
    totalExpenses,
    netProfit,
    refetch: fetchFinancialData,
  }
}

