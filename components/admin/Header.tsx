'use client'

import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { User, ChevronDown } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

export default function Header() {
  const { user } = useAuth()
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const userInitial = user?.email?.charAt(0).toUpperCase() || 'A'

  return (
    <header className="sticky top-0 z-40 bg-black border-b border-gray-900">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        <div className="flex-1"></div>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-900 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
              <span className="text-sm font-semibold text-primary">{userInitial}</span>
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium text-white">
                {user?.email?.split('@')[0] || 'Admin'}
              </p>
              <p className="text-xs text-gray-400">{user?.email}</p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-56 bg-gray-900 rounded-lg shadow-xl border border-gray-800 py-1 z-50">
              <div className="px-4 py-3 border-b border-gray-800">
                <p className="text-sm font-medium text-white">{user?.email}</p>
                <p className="text-xs text-gray-500 mt-1">Administrador</p>
              </div>
              <Link
                href="/admin/settings"
                className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                onClick={() => setShowDropdown(false)}
              >
                <User className="w-4 h-4 mr-3 text-gray-400" />
                Configurações
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

