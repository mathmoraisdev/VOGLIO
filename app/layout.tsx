import type { Metadata } from 'next'
import { generalSans } from '@/lib/fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'Voglio - Você pensa, nós executamos',
  description: 'Desenvolvimento à divulgação, cuidamos de tudo. Apps, sistemas, landing pages e marketing de performance.',
  keywords: 'desenvolvimento de sistemas, aplicativos, landing pages, marketing de performance, automações',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={generalSans.variable}>
      <body className={`${generalSans.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}

