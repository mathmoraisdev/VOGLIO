# Troubleshooting - Variáveis de Ambiente

## Problema: Variáveis de ambiente não estão sendo lidas

### ✅ Checklist de Verificação

1. **Nome do arquivo correto**
   - ✅ Deve ser `.env.local` (não `.env`)
   - ✅ Deve estar na raiz do projeto (mesmo nível que `package.json`)

2. **Formato correto do arquivo**
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_aqui
   SUPABASE_SERVICE_ROLE_KEY=sua_chave_service_role_aqui
   ```
   - ❌ NÃO use aspas nas variáveis
   - ❌ NÃO tenha espaços antes ou depois do `=`
   - ❌ NÃO tenha linhas em branco extras no início

3. **Reiniciar o servidor**
   - Pare completamente o servidor (Ctrl+C)
   - Inicie novamente: `npm run dev`
   - ⚠️ Variáveis são carregadas apenas na inicialização!

4. **Verificar se as variáveis estão sendo lidas**
   ```bash
   node scripts/check-env.js
   ```

### 🔧 Solução Rápida

1. Pare o servidor completamente
2. Verifique o arquivo `.env.local`:
   - Está na raiz do projeto?
   - Tem o nome correto `.env.local`?
   - As variáveis estão sem aspas?
3. Reinicie o servidor: `npm run dev`

### 📝 Exemplo de arquivo .env.local correto:

```
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYzODk2ODAwMCwiZXhwIjoxOTU0NTQ0MDAwfQ.exemplo
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.exemplo
```

### ⚠️ Erros Comuns

- **Erro: "Missing API key"**
  → Variáveis não estão sendo lidas. Verifique o nome do arquivo e reinicie o servidor.

- **Erro no middleware**
  → O middleware precisa das variáveis. Certifique-se de que `.env.local` existe e está correto.

- **Variáveis aparecem como `undefined`**
  → Reinicie o servidor completamente. Next.js carrega variáveis apenas na inicialização.

