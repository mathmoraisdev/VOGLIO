# Como Criar um Usuário Administrador

## Opção 1: Via Supabase Dashboard (Recomendado)

1. Acesse o Supabase Dashboard
2. Vá para Authentication > Users
3. Crie um novo usuário ou use um existente
4. Anote o UUID do usuário
5. Execute o seguinte SQL no SQL Editor do Supabase:

```sql
-- Substitua 'USER_UUID_AQUI' pelo UUID do usuário criado
UPDATE public.user_profiles
SET role = 'admin'
WHERE id = 'USER_UUID_AQUI';

-- Se o perfil não existir, crie um:
INSERT INTO public.user_profiles (id, role, full_name)
VALUES ('USER_UUID_AQUI', 'admin', 'Nome do Admin')
ON CONFLICT (id) DO UPDATE SET role = 'admin';
```

## Opção 2: Via Registro e Atualização

1. Registre-se normalmente em `/register`
2. Anote o UUID do usuário criado (pode ser encontrado no Supabase Dashboard)
3. Execute o SQL acima para atualizar o role para 'admin'

## Verificação

Após criar o admin, faça login com as credenciais do usuário. Você deve ser redirecionado para `/admin` em vez de `/inside`.

