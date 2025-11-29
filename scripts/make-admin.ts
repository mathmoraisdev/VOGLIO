/**
 * Script para tornar um usuário administrador
 * 
 * Uso: npx tsx scripts/make-admin.ts lucasreda@gmail.com
 * ou: node --loader ts-node/esm scripts/make-admin.ts lucasreda@gmail.com
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Variáveis de ambiente não encontradas!')
  console.error('Certifique-se de que NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY estão definidas')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

async function makeAdmin(email: string) {
  try {
    console.log(`🔍 Buscando usuário com email: ${email}...`)

    // Buscar usuário pelo email no auth.users
    const { data: authUser, error: authError } = await supabase.auth.admin.getUserByEmail(email)

    if (authError || !authUser?.user) {
      console.error('❌ Usuário não encontrado:', authError?.message || 'Usuário não existe')
      process.exit(1)
    }

    const userId = authUser.user.id
    console.log(`✅ Usuário encontrado! ID: ${userId}`)

    // Verificar se o perfil existe
    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (profileError && profileError.code !== 'PGRST116') {
      console.error('❌ Erro ao buscar perfil:', profileError.message)
      process.exit(1)
    }

    if (profile) {
      // Atualizar perfil existente
      const { error: updateError } = await supabase
        .from('user_profiles')
        .update({ role: 'admin' })
        .eq('id', userId)

      if (updateError) {
        console.error('❌ Erro ao atualizar perfil:', updateError.message)
        process.exit(1)
      }

      console.log('✅ Perfil atualizado para admin!')
    } else {
      // Criar novo perfil com role admin
      const { error: insertError } = await supabase
        .from('user_profiles')
        .insert({
          id: userId,
          role: 'admin',
          full_name: authUser.user.user_metadata?.full_name || null,
        })

      if (insertError) {
        console.error('❌ Erro ao criar perfil:', insertError.message)
        process.exit(1)
      }

      console.log('✅ Perfil criado como admin!')
    }

    console.log(`\n🎉 Usuário ${email} agora é administrador!`)
    console.log('💡 Faça login novamente para acessar o painel administrativo em /admin')
  } catch (error) {
    console.error('❌ Erro:', error)
    process.exit(1)
  }
}

// Pegar email dos argumentos da linha de comando
const email = process.argv[2] || 'lucasreda@gmail.com'

if (!email) {
  console.error('❌ Por favor, forneça um email como argumento')
  console.error('Uso: npx tsx scripts/make-admin.ts email@exemplo.com')
  process.exit(1)
}

makeAdmin(email)

