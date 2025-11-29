'use client'

import { createBrowserClient } from '@supabase/ssr'

export const createSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      '❌ Variáveis de ambiente do Supabase não encontradas!\n\n' +
      'Por favor, verifique:\n' +
      '1. O arquivo .env.local existe na raiz do projeto?\n' +
      '2. As variáveis NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY estão definidas?\n' +
      '3. Você reiniciou o servidor após criar/modificar o .env.local?\n\n' +
      'Lembre-se: No Next.js, variáveis de ambiente são carregadas apenas na inicialização do servidor!'
    )
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}

