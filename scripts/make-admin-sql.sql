-- Script SQL para tornar o usuário lucasreda@gmail.com em administrador
-- Execute este script no SQL Editor do Supabase Dashboard

-- Opção 1: Se o perfil já existe, atualize o role
UPDATE public.user_profiles
SET role = 'admin'
WHERE id = (
  SELECT id FROM auth.users WHERE email = 'lucasreda@gmail.com'
);

-- Opção 2: Se o perfil não existe, crie um novo com role admin
-- (Execute esta se a Opção 1 não funcionar ou retornar 0 linhas afetadas)
INSERT INTO public.user_profiles (id, role, full_name)
SELECT id, 'admin', COALESCE(raw_user_meta_data->>'full_name', 'Admin')
FROM auth.users
WHERE email = 'lucasreda@gmail.com'
ON CONFLICT (id) DO UPDATE SET role = 'admin';

-- Verificar se foi atualizado corretamente
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
