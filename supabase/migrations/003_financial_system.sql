-- Create payment_status enum
CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'overdue', 'cancelled');

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

-- RLS Policies for project_finances (users can see their own, admins see all)
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

