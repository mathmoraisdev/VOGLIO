export type ProjectStatus = 'draft' | 'active' | 'paused' | 'completed' | 'archived'
export type PhaseStatus = 'pending' | 'in_progress' | 'completed' | 'blocked'
export type UpdateType = 'progress' | 'milestone' | 'issue' | 'note'
export type UserRole = 'client' | 'admin'
export type ProjectType = 'sistema_web' | 'automacoes' | 'landing_page' | 'funil_vendas' | 'trafego_pago'
export type PaymentStatus = 'pending' | 'paid' | 'overdue' | 'cancelled'

export interface Project {
  id: string
  user_id: string
  name: string
  description: string | null
  status: ProjectStatus
  project_type: ProjectType | null
  created_at: string
  updated_at: string
}

export interface ProjectPhase {
  id: string
  project_id: string
  name: string
  description: string | null
  status: PhaseStatus
  order: number
  start_date: string | null
  end_date: string | null
  completed_at: string | null
  created_at: string
}

export interface ProjectUpdate {
  id: string
  project_id: string
  phase_id: string | null
  title: string
  content: string
  type: UpdateType
  created_by: string
  created_at: string
}

export interface ProjectFile {
  id: string
  project_id: string
  phase_id: string | null
  name: string
  url: string
  size: number
  mime_type: string
  uploaded_by: string
  created_at: string
}

export interface UserProfile {
  id: string
  full_name: string | null
  company_name: string | null
  phone: string | null
  avatar_url: string | null
  role: UserRole
  created_at: string
  updated_at: string
}

export interface ProjectFinance {
  id: string
  project_id: string
  total_value: number
  currency: string
  created_at: string
  updated_at: string
}

export interface ProjectPayment {
  id: string
  project_id: string
  amount: number
  due_date: string
  paid_date: string | null
  status: PaymentStatus
  installment_number: number
  payment_method: string | null
  notes: string | null
  created_at: string
  updated_at: string
}

export interface ProjectInvoice {
  id: string
  project_id: string
  payment_id: string | null
  invoice_number: string
  file_url: string
  issue_date: string
  created_at: string
}

export interface ProjectExpense {
  id: string
  project_id: string
  description: string
  amount: number
  category: string
  expense_date: string
  receipt_url: string | null
  created_by: string
  created_at: string
  updated_at: string
}

