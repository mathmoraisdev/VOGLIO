'use client'

import { ReactNode } from 'react'

interface AuthLayoutProps {
  children: ReactNode
  leftContent: ReactNode
}

export default function AuthLayout({ children, leftContent }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left side - Branding */}
      <div className="w-full lg:w-1/2 bg-gradient-to-br from-primary via-primary-600 to-primary-900 flex items-center justify-center p-8 md:p-12 lg:p-16">
        <div className="max-w-lg text-white">
          {leftContent}
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-8 md:p-12 lg:p-16">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  )
}

