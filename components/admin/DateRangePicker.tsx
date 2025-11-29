'use client'

import { useState } from 'react'
import { Calendar } from 'lucide-react'

interface DateRangePickerProps {
  startDate?: Date
  endDate?: Date
  onStartDateChange: (date: Date | undefined) => void
  onEndDateChange: (date: Date | undefined) => void
}

export default function DateRangePicker({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: DateRangePickerProps) {
  const formatDateForInput = (date: Date | undefined): string => {
    if (!date) return ''
    return date.toISOString().split('T')[0]
  }

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value ? new Date(e.target.value) : undefined
    onStartDateChange(date)
  }

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value ? new Date(e.target.value) : undefined
    onEndDateChange(date)
  }

  const clearDates = () => {
    onStartDateChange(undefined)
    onEndDateChange(undefined)
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-end">
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Data Inicial
        </label>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="date"
            value={formatDateForInput(startDate)}
            onChange={handleStartDateChange}
            className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none focus:border-primary"
          />
        </div>
      </div>
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Data Final
        </label>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="date"
            value={formatDateForInput(endDate)}
            onChange={handleEndDateChange}
            className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none focus:border-primary"
          />
        </div>
      </div>
      {(startDate || endDate) && (
        <button
          onClick={clearDates}
          className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          Limpar
        </button>
      )}
    </div>
  )
}

