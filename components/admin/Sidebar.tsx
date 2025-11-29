'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Users, FolderKanban, DollarSign, Settings, LogOut } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Usuários', href: '/admin/users', icon: Users },
  { name: 'Projetos', href: '/admin/projects', icon: FolderKanban },
  { name: 'Financeiro', href: '/admin/financial', icon: DollarSign },
  { name: 'Configurações', href: '/admin/settings', icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()
  const { signOut } = useAuth()

  return (
    <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:border-r lg:border-gray-900 bg-black">
      <div className="flex flex-col flex-grow pt-8 pb-4 overflow-y-auto">
        <div className="flex items-center justify-center flex-shrink-0 px-6 mb-8">
          <Link href="/admin" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Voglio"
              width={120}
              height={40}
              className="w-[120px] h-auto"
              priority
            />
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== '/admin' && pathname?.startsWith(item.href))
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors',
                  isActive
                    ? 'bg-primary/20 text-primary border border-primary/30'
                    : 'text-gray-400 hover:bg-gray-900 hover:text-gray-200'
                )}
              >
                <item.icon
                  className={cn(
                    'mr-3 h-5 w-5 flex-shrink-0',
                    isActive ? 'text-primary' : 'text-gray-500 group-hover:text-gray-300'
                  )}
                />
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="px-4 mt-auto">
          <button
            onClick={signOut}
            className="group flex items-center w-full px-4 py-3 text-sm font-medium text-gray-400 rounded-lg hover:bg-gray-900 hover:text-gray-200 transition-colors"
          >
            <LogOut className="mr-3 h-5 w-5 text-gray-500 group-hover:text-gray-300" />
            Sair
          </button>
        </div>
      </div>
    </div>
  )
}

