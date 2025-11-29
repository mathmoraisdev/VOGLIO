-- Add role enum
CREATE TYPE user_role AS ENUM ('client', 'admin');

-- Add project_type enum based on services
CREATE TYPE project_type AS ENUM (
  'sistema_web',
  'automacoes',
  'landing_page',
  'funil_vendas',
  'trafego_pago'
);

-- Add role column to user_profiles
ALTER TABLE public.user_profiles
ADD COLUMN IF NOT EXISTS role user_role NOT NULL DEFAULT 'client';

-- Add project_type column to projects
ALTER TABLE public.projects
ADD COLUMN IF NOT EXISTS project_type project_type;

-- Create index for role lookups
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON public.user_profiles(role);

-- Create index for project_type lookups
CREATE INDEX IF NOT EXISTS idx_projects_project_type ON public.projects(project_type);

-- Function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.user_profiles
    WHERE id = user_id AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

