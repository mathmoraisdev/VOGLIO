import type { ProjectType } from '@/lib/supabase/types'

export interface ProjectPhaseTemplate {
  name: string
  description: string | null
  order: number
}

export const projectTypePhases: Record<ProjectType, ProjectPhaseTemplate[]> = {
  sistema_web: [
    { name: 'Planejamento e Análise', description: 'Definição de requisitos e arquitetura', order: 1 },
    { name: 'Design e UX', description: 'Criação de wireframes e protótipos', order: 2 },
    { name: 'Desenvolvimento Backend', description: 'API e lógica de negócio', order: 3 },
    { name: 'Desenvolvimento Frontend', description: 'Interface e integração', order: 4 },
    { name: 'Testes e QA', description: 'Testes de funcionalidade e performance', order: 5 },
    { name: 'Deploy e Lançamento', description: 'Publicação e configuração', order: 6 },
  ],
  automacoes: [
    { name: 'Análise de Processos', description: 'Mapeamento de processos atuais', order: 1 },
    { name: 'Planejamento de Automação', description: 'Definição de fluxos e integrações', order: 2 },
    { name: 'Desenvolvimento', description: 'Implementação das automações', order: 3 },
    { name: 'Integração', description: 'Conectar sistemas e APIs', order: 4 },
    { name: 'Testes', description: 'Validação dos fluxos automatizados', order: 5 },
    { name: 'Ativação', description: 'Colocar em produção', order: 6 },
  ],
  landing_page: [
    { name: 'Briefing e Pesquisa', description: 'Entendimento do público e objetivo', order: 1 },
    { name: 'Copy e Conteúdo', description: 'Criação de textos persuasivos', order: 2 },
    { name: 'Design Visual', description: 'Criação do layout e identidade', order: 3 },
    { name: 'Desenvolvimento', description: 'Codificação responsiva', order: 4 },
    { name: 'Otimização', description: 'A/B testing e ajustes de conversão', order: 5 },
    { name: 'Lançamento', description: 'Publicação e configuração de analytics', order: 6 },
  ],
  funil_vendas: [
    { name: 'Estratégia de Funil', description: 'Mapeamento de jornada do cliente', order: 1 },
    { name: 'Criação de Páginas', description: 'Landing pages e páginas de captura', order: 2 },
    { name: 'Automação de Email', description: 'Sequências e workflows', order: 3 },
    { name: 'Integrações', description: 'CRM, email marketing e pagamentos', order: 4 },
    { name: 'Ofertas e Upsells', description: 'Estrutura de produtos e preços', order: 5 },
    { name: 'Ativação', description: 'Lançamento do funil completo', order: 6 },
  ],
  trafego_pago: [
    { name: 'Estratégia e Planejamento', description: 'Definição de público e objetivos', order: 1 },
    { name: 'Criação de Campanhas', description: 'Setup de anúncios e criativos', order: 2 },
    { name: 'Configuração de Pixels', description: 'Tracking e conversões', order: 3 },
    { name: 'Lançamento', description: 'Ativação das campanhas', order: 4 },
    { name: 'Otimização', description: 'Ajustes e melhorias contínuas', order: 5 },
    { name: 'Escala', description: 'Aumento de investimento e alcance', order: 6 },
  ],
}

export function getProjectTypePhases(type: ProjectType): ProjectPhaseTemplate[] {
  return projectTypePhases[type] || []
}

export function getProjectTypeLabel(type: ProjectType): string {
  const labels: Record<ProjectType, string> = {
    sistema_web: 'Sistema Web',
    automacoes: 'Automações e Integrações',
    landing_page: 'Landing Page',
    funil_vendas: 'Funil de Vendas',
    trafego_pago: 'Tráfego Pago',
  }
  return labels[type]
}

