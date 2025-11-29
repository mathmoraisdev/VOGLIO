-- ============================================
-- SETUP COMPLETO DO BANCO DE DADOS
-- Execute este arquivo completo no SQL Editor do Supabase Dashboard
-- ============================================

-- ============================================
-- MIGRAÇÃO 001: Schema Inicial
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE project_status AS ENUM ('draft', 'active', 'paused', 'completed', 'archived');
CREATE TYPE phase_status AS ENUM ('pending', 'in_progress', 'completed', 'blocked');
CREATE TYPE update_type AS ENUM ('progress', 'milestone', 'issue', 'note');

-- Create users profile table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  company_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create projects table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  status project_status NOT NULL DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create project_phases table
CREATE TABLE IF NOT EXISTS public.project_phases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  status phase_status NOT NULL DEFAULT 'pending',
  "order" INTEGER NOT NULL DEFAULT 0,
  start_date DATE,
  end_date DATE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create project_updates table
CREATE TABLE IF NOT EXISTS public.project_updates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  phase_id UUID REFERENCES public.project_phases(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  type update_type NOT NULL DEFAULT 'progress',
  created_by UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create project_files table
CREATE TABLE IF NOT EXISTS public.project_files (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  phase_id UUID REFERENCES public.project_phases(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  size BIGINT NOT NULL,
  mime_type TEXT NOT NULL,
  uploaded_by UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON public.projects(user_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON public.projects(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_projects_user_status ON public.projects(user_id, status);

CREATE INDEX IF NOT EXISTS idx_project_phases_project_id ON public.project_phases(project_id);
CREATE INDEX IF NOT EXISTS idx_project_phases_status ON public.project_phases(status);
CREATE INDEX IF NOT EXISTS idx_project_phases_order ON public.project_phases(project_id, "order");

CREATE INDEX IF NOT EXISTS idx_project_updates_project_id ON public.project_updates(project_id);
CREATE INDEX IF NOT EXISTS idx_project_updates_phase_id ON public.project_updates(phase_id);
CREATE INDEX IF NOT EXISTS idx_project_updates_created_at ON public.project_updates(project_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_project_files_project_id ON public.project_files(project_id);
CREATE INDEX IF NOT EXISTS idx_project_files_phase_id ON public.project_files(phase_id);

-- Enable Row Level Security
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_phases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_files ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_profiles
DROP POLICY IF EXISTS "Users can view their own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.user_profiles;

CREATE POLICY "Users can view their own profile"
  ON public.user_profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.user_profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.user_profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- RLS Policies for projects
DROP POLICY IF EXISTS "Users can view their own projects" ON public.projects;
DROP POLICY IF EXISTS "Users can create their own projects" ON public.projects;
DROP POLICY IF EXISTS "Users can update their own projects" ON public.projects;
DROP POLICY IF EXISTS "Users can delete their own projects" ON public.projects;

CREATE POLICY "Users can view their own projects"
  ON public.projects FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own projects"
  ON public.projects FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own projects"
  ON public.projects FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own projects"
  ON public.projects FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for project_phases
DROP POLICY IF EXISTS "Users can view phases of their projects" ON public.project_phases;
DROP POLICY IF EXISTS "Users can create phases for their projects" ON public.project_phases;
DROP POLICY IF EXISTS "Users can update phases of their projects" ON public.project_phases;
DROP POLICY IF EXISTS "Users can delete phases of their projects" ON public.project_phases;

CREATE POLICY "Users can view phases of their projects"
  ON public.project_phases FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = project_phases.project_id
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create phases for their projects"
  ON public.project_phases FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = project_phases.project_id
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update phases of their projects"
  ON public.project_phases FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = project_phases.project_id
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete phases of their projects"
  ON public.project_phases FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = project_phases.project_id
      AND projects.user_id = auth.uid()
    )
  );

-- RLS Policies for project_updates
DROP POLICY IF EXISTS "Users can view updates of their projects" ON public.project_updates;
DROP POLICY IF EXISTS "Users can create updates for their projects" ON public.project_updates;
DROP POLICY IF EXISTS "Users can update updates of their projects" ON public.project_updates;
DROP POLICY IF EXISTS "Users can delete updates of their projects" ON public.project_updates;

CREATE POLICY "Users can view updates of their projects"
  ON public.project_updates FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = project_updates.project_id
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create updates for their projects"
  ON public.project_updates FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = project_updates.project_id
      AND projects.user_id = auth.uid()
    )
    AND auth.uid() = created_by
  );

CREATE POLICY "Users can update updates of their projects"
  ON public.project_updates FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = project_updates.project_id
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete updates of their projects"
  ON public.project_updates FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = project_updates.project_id
      AND projects.user_id = auth.uid()
    )
  );

-- RLS Policies for project_files
DROP POLICY IF EXISTS "Users can view files of their projects" ON public.project_files;
DROP POLICY IF EXISTS "Users can create files for their projects" ON public.project_files;
DROP POLICY IF EXISTS "Users can delete files of their projects" ON public.project_files;

CREATE POLICY "Users can view files of their projects"
  ON public.project_files FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = project_files.project_id
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create files for their projects"
  ON public.project_files FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = project_files.project_id
      AND projects.user_id = auth.uid()
    )
    AND auth.uid() = uploaded_by
  );

CREATE POLICY "Users can delete files of their projects"
  ON public.project_files FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = project_files.project_id
      AND projects.user_id = auth.uid()
    )
  );

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON public.user_profiles;
DROP TRIGGER IF EXISTS update_projects_updated_at ON public.projects;

CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- MIGRAÇÃO 002: Roles e Tipos de Projeto
-- ============================================

-- Add role enum
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('client', 'admin');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Add project_type enum based on services
DO $$ BEGIN
  CREATE TYPE project_type AS ENUM (
    'sistema_web',
    'automacoes',
    'landing_page',
    'funil_vendas',
    'trafego_pago'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

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

-- ============================================
-- MIGRAÇÃO 003: Sistema Financeiro
-- ============================================

-- Create payment_status enum
DO $$ BEGIN
  CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'overdue', 'cancelled');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create project_finances table
CREATE TABLE IF NOT EXISTS public.project_finances (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  total_value DECIMAL(12, 2) NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'BRL',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  UNIQUE(project_id)
);

-- Create project_payments table
CREATE TABLE IF NOT EXISTS public.project_payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  amount DECIMAL(12, 2) NOT NULL,
  due_date DATE NOT NULL,
  paid_date DATE,
  status payment_status NOT NULL DEFAULT 'pending',
  installment_number INTEGER NOT NULL,
  payment_method TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create project_invoices table
CREATE TABLE IF NOT EXISTS public.project_invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  payment_id UUID REFERENCES public.project_payments(id) ON DELETE SET NULL,
  invoice_number TEXT NOT NULL UNIQUE,
  file_url TEXT NOT NULL,
  issue_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create project_expenses table
CREATE TABLE IF NOT EXISTS public.project_expenses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  amount DECIMAL(12, 2) NOT NULL,
  category TEXT NOT NULL,
  expense_date DATE NOT NULL,
  receipt_url TEXT,
  created_by UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_project_finances_project_id ON public.project_finances(project_id);
CREATE INDEX IF NOT EXISTS idx_project_payments_project_id ON public.project_payments(project_id);
CREATE INDEX IF NOT EXISTS idx_project_payments_status ON public.project_payments(status);
CREATE INDEX IF NOT EXISTS idx_project_payments_due_date ON public.project_payments(due_date);
CREATE INDEX IF NOT EXISTS idx_project_invoices_project_id ON public.project_invoices(project_id);
CREATE INDEX IF NOT EXISTS idx_project_invoices_payment_id ON public.project_invoices(payment_id);
CREATE INDEX IF NOT EXISTS idx_project_expenses_project_id ON public.project_expenses(project_id);
CREATE INDEX IF NOT EXISTS idx_project_expenses_category ON public.project_expenses(category);
CREATE INDEX IF NOT EXISTS idx_project_expenses_expense_date ON public.project_expenses(expense_date);

-- Enable Row Level Security
ALTER TABLE public.project_finances ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_expenses ENABLE ROW LEVEL SECURITY;

-- RLS Policies for project_finances
DROP POLICY IF EXISTS "Users can view finances of their projects" ON public.project_finances;
DROP POLICY IF EXISTS "Admins can manage all finances" ON public.project_finances;

CREATE POLICY "Users can view finances of their projects"
  ON public.project_finances FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = project_finances.project_id
      AND projects.user_id = auth.uid()
    )
    OR is_admin(auth.uid())
  );

CREATE POLICY "Admins can manage all finances"
  ON public.project_finances FOR ALL
  USING (is_admin(auth.uid()));

-- RLS Policies for project_payments
DROP POLICY IF EXISTS "Users can view payments of their projects" ON public.project_payments;
DROP POLICY IF EXISTS "Admins can manage all payments" ON public.project_payments;

CREATE POLICY "Users can view payments of their projects"
  ON public.project_payments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = project_payments.project_id
      AND projects.user_id = auth.uid()
    )
    OR is_admin(auth.uid())
  );

CREATE POLICY "Admins can manage all payments"
  ON public.project_payments FOR ALL
  USING (is_admin(auth.uid()));

-- RLS Policies for project_invoices
DROP POLICY IF EXISTS "Users can view invoices of their projects" ON public.project_invoices;
DROP POLICY IF EXISTS "Admins can manage all invoices" ON public.project_invoices;

CREATE POLICY "Users can view invoices of their projects"
  ON public.project_invoices FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = project_invoices.project_id
      AND projects.user_id = auth.uid()
    )
    OR is_admin(auth.uid())
  );

CREATE POLICY "Admins can manage all invoices"
  ON public.project_invoices FOR ALL
  USING (is_admin(auth.uid()));

-- RLS Policies for project_expenses
DROP POLICY IF EXISTS "Users can view expenses of their projects" ON public.project_expenses;
DROP POLICY IF EXISTS "Admins can manage all expenses" ON public.project_expenses;

CREATE POLICY "Users can view expenses of their projects"
  ON public.project_expenses FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = project_expenses.project_id
      AND projects.user_id = auth.uid()
    )
    OR is_admin(auth.uid())
  );

CREATE POLICY "Admins can manage all expenses"
  ON public.project_expenses FOR ALL
  USING (is_admin(auth.uid()));

-- Triggers for updated_at
DROP TRIGGER IF EXISTS update_project_finances_updated_at ON public.project_finances;
DROP TRIGGER IF EXISTS update_project_payments_updated_at ON public.project_payments;
DROP TRIGGER IF EXISTS update_project_expenses_updated_at ON public.project_expenses;

CREATE TRIGGER update_project_finances_updated_at
  BEFORE UPDATE ON public.project_finances
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_project_payments_updated_at
  BEFORE UPDATE ON public.project_payments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_project_expenses_updated_at
  BEFORE UPDATE ON public.project_expenses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- MIGRAÇÃO 004: Policies Administrativas
-- ============================================

-- Update RLS policies to allow admins full access

-- Update projects policies
DROP POLICY IF EXISTS "Users can view their own projects or admins see all" ON public.projects;
DROP POLICY IF EXISTS "Users can create their own projects or admins create any" ON public.projects;
DROP POLICY IF EXISTS "Users can update their own projects or admins update any" ON public.projects;
DROP POLICY IF EXISTS "Users can delete their own projects or admins delete any" ON public.projects;

CREATE POLICY "Users can view their own projects or admins see all"
  ON public.projects FOR SELECT
  USING (user_id = auth.uid() OR is_admin(auth.uid()));

CREATE POLICY "Users can create their own projects or admins create any"
  ON public.projects FOR INSERT
  WITH CHECK (user_id = auth.uid() OR is_admin(auth.uid()));

CREATE POLICY "Users can update their own projects or admins update any"
  ON public.projects FOR UPDATE
  USING (user_id = auth.uid() OR is_admin(auth.uid()));

CREATE POLICY "Users can delete their own projects or admins delete any"
  ON public.projects FOR DELETE
  USING (user_id = auth.uid() OR is_admin(auth.uid()));

-- Update project_phases policies
DROP POLICY IF EXISTS "Users can view phases of their projects or admins see all" ON public.project_phases;
DROP POLICY IF EXISTS "Users can create phases for their projects or admins create any" ON public.project_phases;
DROP POLICY IF EXISTS "Users can update phases of their projects or admins update any" ON public.project_phases;
DROP POLICY IF EXISTS "Users can delete phases of their projects or admins delete any" ON public.project_phases;

CREATE POLICY "Users can view phases of their projects or admins see all"
  ON public.project_phases FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = project_phases.project_id
      AND projects.user_id = auth.uid()
    )
    OR is_admin(auth.uid())
  );

CREATE POLICY "Users can create phases for their projects or admins create any"
  ON public.project_phases FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = project_phases.project_id
      AND projects.user_id = auth.uid()
    )
    OR is_admin(auth.uid())
  );

CREATE POLICY "Users can update phases of their projects or admins update any"
  ON public.project_phases FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = project_phases.project_id
      AND projects.user_id = auth.uid()
    )
    OR is_admin(auth.uid())
  );

CREATE POLICY "Users can delete phases of their projects or admins delete any"
  ON public.project_phases FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = project_phases.project_id
      AND projects.user_id = auth.uid()
    )
    OR is_admin(auth.uid())
  );

-- Update project_updates policies
DROP POLICY IF EXISTS "Users can view updates of their projects or admins see all" ON public.project_updates;
DROP POLICY IF EXISTS "Users can create updates for their projects or admins create any" ON public.project_updates;
DROP POLICY IF EXISTS "Users can update updates of their projects or admins update any" ON public.project_updates;
DROP POLICY IF EXISTS "Users can delete updates of their projects or admins delete any" ON public.project_updates;

CREATE POLICY "Users can view updates of their projects or admins see all"
  ON public.project_updates FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = project_updates.project_id
      AND projects.user_id = auth.uid()
    )
    OR is_admin(auth.uid())
  );

CREATE POLICY "Users can create updates for their projects or admins create any"
  ON public.project_updates FOR INSERT
  WITH CHECK (
    (
      EXISTS (
        SELECT 1 FROM public.projects
        WHERE projects.id = project_updates.project_id
        AND projects.user_id = auth.uid()
      )
      AND auth.uid() = created_by
    )
    OR is_admin(auth.uid())
  );

CREATE POLICY "Users can update updates of their projects or admins update any"
  ON public.project_updates FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = project_updates.project_id
      AND projects.user_id = auth.uid()
    )
    OR is_admin(auth.uid())
  );

CREATE POLICY "Users can delete updates of their projects or admins delete any"
  ON public.project_updates FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = project_updates.project_id
      AND projects.user_id = auth.uid()
    )
    OR is_admin(auth.uid())
  );

-- Update project_files policies
DROP POLICY IF EXISTS "Users can view files of their projects or admins see all" ON public.project_files;
DROP POLICY IF EXISTS "Users can create files for their projects or admins create any" ON public.project_files;
DROP POLICY IF EXISTS "Users can delete files of their projects or admins delete any" ON public.project_files;

CREATE POLICY "Users can view files of their projects or admins see all"
  ON public.project_files FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = project_files.project_id
      AND projects.user_id = auth.uid()
    )
    OR is_admin(auth.uid())
  );

CREATE POLICY "Users can create files for their projects or admins create any"
  ON public.project_files FOR INSERT
  WITH CHECK (
    (
      EXISTS (
        SELECT 1 FROM public.projects
        WHERE projects.id = project_files.project_id
        AND projects.user_id = auth.uid()
      )
      AND auth.uid() = uploaded_by
    )
    OR is_admin(auth.uid())
  );

CREATE POLICY "Users can delete files of their projects or admins delete any"
  ON public.project_files FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = project_files.project_id
      AND projects.user_id = auth.uid()
    )
    OR is_admin(auth.uid())
  );

-- Allow admins to view all user profiles
DROP POLICY IF EXISTS "Admins can view all user profiles" ON public.user_profiles;
DROP POLICY IF EXISTS "Admins can update all user profiles" ON public.user_profiles;

CREATE POLICY "Admins can view all user profiles"
  ON public.user_profiles FOR SELECT
  USING (is_admin(auth.uid()));

CREATE POLICY "Admins can update all user profiles"
  ON public.user_profiles FOR UPDATE
  USING (is_admin(auth.uid()));

-- ============================================
-- CONFIGURAR USUÁRIO ADMIN
-- ============================================

-- Tornar lucasreda@gmail.com em administrador
UPDATE public.user_profiles
SET role = 'admin'
WHERE id = (
  SELECT id FROM auth.users WHERE email = 'lucasreda@gmail.com'
);

-- Se o perfil não existir, criar um novo com role admin
INSERT INTO public.user_profiles (id, role, full_name)
SELECT id, 'admin', COALESCE(raw_user_meta_data->>'full_name', 'Admin')
FROM auth.users
WHERE email = 'lucasreda@gmail.com'
ON CONFLICT (id) DO UPDATE SET role = 'admin';

-- Verificar se foi configurado corretamente
SELECT 
  au.id,
  au.email,
  up.role,
  CASE 
    WHEN up.role = 'admin' THEN '✅ É ADMINISTRADOR'
    WHEN up.role = 'client' THEN '❌ É CLIENTE'
    WHEN up.id IS NULL THEN '⚠️ PERFIL NÃO EXISTE'
    ELSE '❓ ROLE DESCONHECIDO'
  END as status
FROM auth.users au
LEFT JOIN public.user_profiles up ON up.id = au.id
WHERE au.email = 'lucasreda@gmail.com';

