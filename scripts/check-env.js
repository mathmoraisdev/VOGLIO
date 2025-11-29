// Script para verificar se as variáveis de ambiente estão sendo lidas
console.log('🔍 Verificando variáveis de ambiente...\n')

const requiredVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY'
]

let allPresent = true

requiredVars.forEach(varName => {
  const value = process.env[varName]
  if (value) {
    // Mostrar apenas os primeiros e últimos caracteres por segurança
    const masked = value.length > 20 
      ? `${value.substring(0, 10)}...${value.substring(value.length - 10)}`
      : '***'
    console.log(`✅ ${varName}: ${masked}`)
  } else {
    console.log(`❌ ${varName}: NÃO ENCONTRADA`)
    allPresent = false
  }
})

if (!allPresent) {
  console.log('\n⚠️  Algumas variáveis estão faltando!')
  console.log('\n📝 Verifique:')
  console.log('1. O arquivo .env.local existe na raiz do projeto?')
  console.log('2. As variáveis estão escritas corretamente (sem espaços extras)?')
  console.log('3. Você reiniciou o servidor após criar/modificar o .env.local?')
  console.log('\n💡 Lembre-se: No Next.js, variáveis de ambiente são carregadas apenas na inicialização!')
  process.exit(1)
} else {
  console.log('\n✅ Todas as variáveis estão configuradas corretamente!')
  process.exit(0)
}

