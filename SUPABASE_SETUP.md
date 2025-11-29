# Configuração do Supabase

## Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima
SUPABASE_SERVICE_ROLE_KEY=sua_chave_service_role
```

## Configuração do Banco de Dados

1. Acesse o SQL Editor no Supabase Dashboard
2. Execute o arquivo `supabase/migrations/001_initial_schema.sql` para criar todas as tabelas, índices e políticas RLS

## Configuração do Storage

1. No Supabase Dashboard, vá em Storage
2. Crie um novo bucket chamado `project-files`
3. Configure as políticas de acesso:

```sql
-- Policy para permitir upload de arquivos autenticados
CREATE POLICY "Users can upload files to their projects"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'project-files' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Policy para permitir leitura de arquivos dos próprios projetos
CREATE POLICY "Users can view files from their projects"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'project-files' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Policy para permitir exclusão de arquivos próprios
CREATE POLICY "Users can delete their own files"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'project-files' AND
  auth.uid()::text = (storage.foldername(name))[1]
);
```

## Estrutura do Banco de Dados

### Tabelas Criadas:
- `user_profiles` - Perfis estendidos dos usuários
- `projects` - Projetos dos clientes
- `project_phases` - Fases configuráveis de cada projeto
- `project_updates` - Atualizações e comunicados sobre projetos
- `project_files` - Arquivos anexados aos projetos

### Segurança:
- Todas as tabelas têm Row Level Security (RLS) habilitado
- Usuários só podem ver/editar seus próprios projetos
- Políticas RLS garantem isolamento de dados entre clientes

## Próximos Passos

1. Configure as variáveis de ambiente
2. Execute a migration SQL
3. Configure o bucket de storage
4. Teste o login e criação de projetos

