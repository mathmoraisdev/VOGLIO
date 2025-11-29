# Como Tornar um Usuário Administrador

## Para o usuário: lucasreda@gmail.com

### Método 1: SQL Direto (Mais Rápido)

1. Acesse o **Supabase Dashboard**
2. Vá em **SQL Editor**
3. Cole e execute o seguinte SQL:

```sql
-- Tornar lucasreda@gmail.com em administrador
UPDATE public.user_profiles
SET role = 'admin'
WHERE id = (
  SELECT id FROM auth.users WHERE email = 'lucasreda@gmail.com'
);

-- Se o perfil não existir, criar um novo
INSERT INTO public.user_profiles (id, role, full_name)
SELECT id, 'admin', COALESCE(raw_user_meta_data->>'full_name', 'Admin')
FROM auth.users
WHERE email = 'lucasreda@gmail.com'
ON CONFLICT (id) DO UPDATE SET role = 'admin';

-- Verificar se funcionou
SELECT 
  up.id, 
  up.role, 
  up.full_name, 
  au.email,
  CASE 
    WHEN up.role = 'admin' THEN '✅ Usuário é administrador'
    ELSE '❌ Usuário não é administrador'
  END as status
FROM public.user_profiles up
JOIN auth.users au ON au.id = up.id
WHERE au.email = 'lucasreda@gmail.com';
```

4. Verifique se a última query retorna `role = 'admin'`
5. Faça logout e login novamente com `lucasreda@gmail.com`
6. Você será redirecionado para `/admin` automaticamente

### Método 2: Via Script Node.js

Se preferir usar um script:

1. Instale dotenv (se ainda não tiver): `npm install dotenv`
2. Execute: `node scripts/make-admin.js lucasreda@gmail.com`

---

**Nota:** O arquivo `scripts/make-admin-sql.sql` contém o SQL completo para referência.

