// Tipos e interfaces para o quiz
export type ObjectiveType = 'criar-zero' | 'gerar-clientes' | 'corrigir' | 'solucao-completa'

export interface QuizData {
  objetivo?: ObjectiveType
  diagnostico?: {
    tipo?: string[]
    situacao?: string
    problema?: string
    negocio?: string
    outro?: string
  }
  desafios?: string[]
  historico?: {
    tentou?: string
    detalhes?: string
  }
  timeline?: string
  budget?: string
  contexto?: {
    faturamento?: string
    equipe?: string
    mercado?: string
    concorrencia?: string
    diferencial?: string
    crescimento?: string
  }
  trafego?: {
    plataformas?: string[]
    orcamentoMensal?: string
    taxaConversao?: string
    desafios?: string[]
  }
  contato?: {
    nome?: string
    email?: string
    whatsapp?: string
    empresa?: string
    optIn?: boolean
  }
  insights?: {
    microInsights?: Array<{
      texto: string
      tipo: 'oportunidade' | 'risco' | 'dica' | 'benchmark'
    }>
    previewAnalysis?: string
  }
  aiAnalysis?: any // Será tipado quando importar do openai.ts
}

// Lógica de personalização baseada nas respostas
export function generatePersonalizedAnalysis(data: QuizData) {
  const analysis = {
    diagnostico: {
      objetivo: data.objetivo || '',
      tipo: data.diagnostico?.tipo || [],
      situacao: data.diagnostico?.situacao || '',
      problema: data.diagnostico?.problema || '',
      negocio: data.diagnostico?.negocio || '',
    },
    desafios: data.desafios || [],
    timeline: data.timeline || '',
    budget: data.budget || '',
  }

  // Determinar pacote recomendado baseado no perfil
  let pacote = 'GROWTH'
  let investimento = 'R$ 45-65k'
  let prazo = '60 dias'
  let roi = '5-8x em 6 meses'

  if (data.objetivo === 'solucao-completa') {
    pacote = 'COMPLETE'
    investimento = 'R$ 60-100k'
    prazo = '90 dias'
    roi = '8-12x em 6 meses'
  } else if (data.objetivo === 'corrigir') {
    pacote = 'OPTIMIZE'
    investimento = 'R$ 30-50k'
    prazo = '45 dias'
    roi = '3-5x em 6 meses'
  } else if (data.budget && data.budget.includes('100')) {
    pacote = 'ENTERPRISE'
    investimento = 'R$ 100k+'
    prazo = '120 dias'
    roi = '10-15x em 6 meses'
  }

  // Gerar roadmap personalizado
  const roadmap = generateRoadmap(data.objetivo, prazo)

  // Gerar explicação personalizada
  const explicacao = generateExplanation(data.desafios || [])

  return {
    ...analysis,
    pacote,
    investimento,
    prazo,
    roi,
    roadmap,
    explicacao,
  }
}

function generateRoadmap(objetivo?: ObjectiveType, prazo: string = '60 dias') {
  const semanas = prazo.includes('45') ? 6 : prazo.includes('90') ? 12 : prazo.includes('120') ? 16 : 8

  if (objetivo === 'criar-zero') {
    return [
      {
        periodo: 'SEMANA 1-2',
        titulo: 'Planejamento & Estratégia',
        itens: [
          'Workshop de descoberta',
          'Definição de escopo e metas',
          'Wireframes e protótipos',
        ],
      },
      {
        periodo: `SEMANA 3-${semanas - 2}`,
        titulo: 'Desenvolvimento',
        itens: [
          'Construção da plataforma',
          'Design profissional',
          'Integrações e automações',
        ],
      },
      {
        periodo: `SEMANA ${semanas - 1}-${semanas}`,
        titulo: 'Lançamento & Tráfego',
        itens: [
          'Go-live da plataforma',
          'Início das campanhas',
          'Otimização contínua',
        ],
      },
    ]
  } else if (objetivo === 'gerar-clientes') {
    return [
      {
        periodo: 'SEMANA 1',
        titulo: 'Auditoria & Diagnóstico',
        itens: [
          'Análise do site/sistema atual',
          'Identificação de gargalos',
          'Plano de otimização',
        ],
      },
      {
        periodo: 'SEMANA 2-3',
        titulo: 'Otimização & Landing Pages',
        itens: [
          'Melhorias de conversão',
          'Criação de páginas de captura',
          'Configuração de funil',
        ],
      },
      {
        periodo: `SEMANA 4-${semanas}`,
        titulo: 'Tráfego & Conversão',
        itens: [
          'Lançamento de campanhas',
          'Otimização contínua',
          'Acompanhamento de resultados',
        ],
      },
    ]
  } else {
    return [
      {
        periodo: 'SEMANA 1-2',
        titulo: 'Planejamento & Estratégia',
        itens: [
          'Workshop de descoberta',
          'Definição de escopo e metas',
          'Wireframes e protótipos',
        ],
      },
      {
        periodo: `SEMANA 3-${semanas - 2}`,
        titulo: 'Desenvolvimento',
        itens: [
          'Construção da plataforma',
          'Design profissional',
          'Integrações e automações',
        ],
      },
      {
        periodo: `SEMANA ${semanas - 1}-${semanas}`,
        titulo: 'Lançamento & Tráfego',
        itens: [
          'Go-live da plataforma',
          'Início das campanhas',
          'Otimização contínua',
        ],
      },
    ]
  }
}

function generateExplanation(desafios: string[]) {
  const explicacoes: string[] = []

  if (desafios.includes('Não sei por onde começar')) {
    explicacoes.push('VOCÊ NÃO PRECISA SABER POR ONDE COMEÇAR - Nós guiamos cada etapa do processo')
  }

  if (desafios.includes('Falta de tempo para gerenciar tudo')) {
    explicacoes.push('VOCÊ NÃO GERENCIA NADA - Uma equipe cuida de tudo integrado')
  }

  if (desafios.includes('Já contratei e não deu certo')) {
    explicacoes.push('SOLUÇÃO INTEGRADA - Desenvolvimento e marketing trabalhando juntos desde o dia 1')
  }

  if (desafios.includes('Difícil coordenar vários fornecedores')) {
    explicacoes.push('UMA ÚNICA EQUIPE - Você só valida e aprova, sem coordenar nada')
  }

  if (explicacoes.length === 0) {
    explicacoes.push('SOLUÇÃO COMPLETA - Desenvolvimento e marketing integrados desde o início')
    explicacoes.push('ENTREGAS SEMANAIS - Sem surpresas, você só valida e aprova')
  }

  return explicacoes
}

// Salvar dados no localStorage
export function saveQuizData(data: QuizData) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('voglio_quiz_data', JSON.stringify(data))
  }
}

// Carregar dados do localStorage
export function loadQuizData(): QuizData | null {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('voglio_quiz_data')
    return saved ? JSON.parse(saved) : null
  }
  return null
}

// Limpar dados do localStorage
export function clearQuizData() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('voglio_quiz_data')
  }
}
