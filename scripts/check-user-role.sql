-- Script para verificar o role de um usuário
-- Execute no SQL Editor do Supabase Dashboard

-- Verificar o usuário lucasreda@gmail.com
SELECT 
  au.id,
  au.email,
  au.created_at as auth_created_at,
  up.id as profile_id,
  up.role,
  up.full_name,
  up.created_at as profile_created_at,
  CASE 
    WHEN up.role = 'admin' THEN '✅ É ADMINISTRADOR'
    WHEN up.role = 'client' THEN '❌ É CLIENTE'
    WHEN up.id IS NULL THEN '⚠️ PERFIL NÃO EXISTE'
    ELSE '❓ ROLE DESCONHECIDO'
  END as status
FROM auth.users au
LEFT JOIN public.user_profiles up ON up.id = au.id
WHERE au.email = 'lucasreda@gmail.com';

-- Se o perfil não existir ou não for admin, execute:
-- UPDATE public.user_profiles SET role = 'admin' WHERE id = (SELECT id FROM auth.users WHERE email = 'lucasreda@gmail.com');
-- ou
-- INSERT INTO public.user_profiles (id, role) SELECT id, 'admin' FROM auth.users WHERE email = 'lucasreda@gmail.com' ON CONFLICT (id) DO UPDATE SET role = 'admin';

