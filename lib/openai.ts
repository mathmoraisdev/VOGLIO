import OpenAI from 'openai'
import { QuizData } from './quizLogic'

// Inicializar cliente OpenAI (só funciona no servidor)
let openai: OpenAI | null = null

function getOpenAI() {
  if (typeof window === 'undefined' && !openai) {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || '',
    })
  }
  return openai
}

export interface AIAnalysis {
  diagnostico: string
  oportunidades: string[]
  recomendacao: string
  roadmap: Array<{
    periodo: string
    titulo: string
    itens: string[]
  }>
  proximosPassos: string[]
  insights: string[]
}

export interface MicroInsight {
  texto: string
  tipo: 'oportunidade' | 'risco' | 'dica' | 'benchmark'
}

// Gerar análise completa usando OpenAI
export async function generateAIAnalysis(quizData: QuizData): Promise<AIAnalysis> {
  const prompt = buildAnalysisPrompt(quizData)
  const client = getOpenAI()

  if (!client) {
    return generateFallbackAnalysis(quizData)
  }

  try {
    const completion = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: `Você é um consultor estratégico de negócios da Voglio, um analytics translator com QI acima de 180. 
          Você entende profundamente a posição do cliente, o contexto do funil de captação e cria soluções perfeitas de copy e análise estratégica.
          
          SEU PAPEL:
          - Consultor estratégico que traduz dados em oportunidades de negócio
          - Especialista em fazer o cliente se sentir único e especial
          - Criador de copy persuasiva que instiga o agendamento de reunião
          
          SEU TOM:
          - Consultivo estratégico: fale sobre resultados de negócio, não sobre tecnologia
          - Conversacional pessoal: como um consultor experiente conversando com um parceiro
          - Inspirador motivacional: destaque o potencial único do cliente
          
          REGRAS CRÍTICAS:
          - NUNCA use termos técnicos (API, framework, stack, código, desenvolvimento técnico)
          - Fale sempre em linguagem de negócio e resultados
          - Faça o cliente se sentir escolhido e especial
          - Crie expectativa e urgência sutil para agendar reunião
          - Use o nome do cliente e detalhes mencionados no quiz
          - Foque em oportunidades, crescimento e transformação de negócio
          
          Responda APENAS em formato JSON válido, sem markdown, seguindo exatamente a estrutura especificada.`,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
      max_tokens: 2000,
    })

    const response = completion.choices[0]?.message?.content
    if (!response) {
      throw new Error('Resposta vazia da OpenAI')
    }

    const analysis = JSON.parse(response) as AIAnalysis
    return analysis
  } catch (error) {
    console.error('Erro ao gerar análise OpenAI:', error)
    // Fallback para análise básica
    return generateFallbackAnalysis(quizData)
  }
}

// Gerar micro-insight durante o quiz
export async function generateMicroInsight(
  quizData: QuizData,
  etapaAtual: number
): Promise<MicroInsight | null> {
  // Só gerar insights em etapas específicas para economizar tokens
  if (etapaAtual !== 2 && etapaAtual !== 3 && etapaAtual !== 4) {
    return null
  }

  const client = getOpenAI()
  if (!client) {
    return null
  }

  try {
    const prompt = buildMicroInsightPrompt(quizData, etapaAtual)

    const completion = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: `Você é um consultor estratégico da Voglio, um analytics translator com QI acima de 180.
          Forneça insights rápidos e valiosos durante o quiz (máximo 2 frases).
          Fale em linguagem de negócio, sem termos técnicos.
          Faça o cliente se sentir especial e crie expectativa para a análise completa.
          Responda em formato JSON: {"texto": "...", "tipo": "oportunidade|risco|dica|benchmark"}`,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.8,
      max_tokens: 150,
    })

    const response = completion.choices[0]?.message?.content
    if (response) {
      return JSON.parse(response) as MicroInsight
    }
  } catch (error) {
    console.error('Erro ao gerar micro-insight:', error)
  }

  return null
}

// Gerar perguntas condicionais baseadas nas respostas
export async function generateConditionalQuestions(
  quizData: QuizData,
  etapaAtual: number
): Promise<string[]> {
  const client = getOpenAI()
  if (!client) {
    return []
  }

  try {
    const prompt = buildConditionalQuestionsPrompt(quizData, etapaAtual)

    const completion = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: `Você é um consultor que faz perguntas estratégicas para entender melhor o cliente.
          Gere 2-3 perguntas específicas baseadas nas respostas anteriores.
          Seja direto e focado em capturar informações que ajudem a personalizar a solução.
          Responda em formato JSON: {"perguntas": ["pergunta1", "pergunta2"]}`,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
      max_tokens: 300,
    })

    const response = completion.choices[0]?.message?.content
    if (response) {
      const data = JSON.parse(response) as { perguntas: string[] }
      return data.perguntas || []
    }
  } catch (error) {
    console.error('Erro ao gerar perguntas condicionais:', error)
  }

  return []
}

// Construir prompt para análise completa
function buildAnalysisPrompt(quizData: QuizData): string {
  const nome = quizData.contato?.nome || 'você'
  const nomeEmpresa = quizData.businessContext?.nomeEmpresa || ''
  const objetivo = getObjectiveLabel(quizData.objetivo)
  const diagnostico = formatDiagnostico(quizData.diagnostico)
  const desafios = quizData.desafios?.join(', ') || 'Não especificado'
  const historico = formatHistorico(quizData.historico)
  const timeline = getTimelineLabel(quizData.timeline)
  const budget = getBudgetLabel(quizData.budget)
  
  // Formatar contexto do negócio
  const contextoNegocio: string[] = []
  if (nomeEmpresa) contextoNegocio.push(`Empresa: ${nomeEmpresa}`)
  if (quizData.businessContext?.tipoNegocio) contextoNegocio.push(`Tipo: ${quizData.businessContext.tipoNegocio}`)
  if (quizData.businessContext?.tamanho) {
    const tamanhoMap: Record<string, string> = {
      'iniciante': 'Está começando',
      'pequeno': 'Pequeno (até 5 funcionários)',
      'medio': 'Médio (6-20 funcionários)',
      'grande': 'Grande (20+ funcionários)',
    }
    contextoNegocio.push(`Tamanho: ${tamanhoMap[quizData.businessContext.tamanho] || quizData.businessContext.tamanho}`)
  }
  if (quizData.businessContext?.mercado) contextoNegocio.push(`Mercado: ${quizData.businessContext.mercado}`)
  if (quizData.businessContext?.concorrentes) contextoNegocio.push(`Concorrentes: ${quizData.businessContext.concorrentes}`)
  
  const contextoNegocioStr = contextoNegocio.length > 0 ? contextoNegocio.join(' | ') : 'Não especificado'

  return `Analise o seguinte perfil de cliente e gere uma análise estratégica completa:

NOME DO CLIENTE: ${nome}
${nomeEmpresa ? `NOME DA EMPRESA: ${nomeEmpresa}` : ''}
OBJETIVO: ${objetivo}
DIAGNÓSTICO: ${diagnostico}
DESAFIOS: ${desafios}
HISTÓRICO: ${historico}
CONTEXTO DO NEGÓCIO: ${contextoNegocioStr}
TIMELINE: ${timeline}
ORÇAMENTO: ${budget}

Gere uma análise estratégica e persuasiva em JSON com esta estrutura exata:
{
  "diagnostico": "Análise consultiva da situação atual do cliente em linguagem de negócio (2-3 parágrafos). Use o nome do cliente, mencione detalhes específicos que ele compartilhou. Faça-o se sentir entendido e especial. Fale sobre oportunidades de crescimento, não sobre tecnologia.",
  "oportunidades": ["oportunidade estratégica de negócio 1", "oportunidade estratégica de negócio 2", "oportunidade estratégica de negócio 3"],
  "recomendacao": "Recomendação estratégica focada em resultados de negócio (2-3 parágrafos). Conecte com os objetivos e dores mencionados. Crie expectativa para a reunião. Use copy persuasiva.",
  "roadmap": [
    {
      "periodo": "PRIMEIRAS SEMANAS",
      "titulo": "Título estratégico da fase (focado em resultados)",
      "itens": ["item estratégico 1", "item estratégico 2", "item estratégico 3"]
    }
  ],
  "proximosPassos": ["passo 1 focado em agendar reunião", "passo 2", "passo 3"],
  "insights": ["insight estratégico de negócio 1", "insight estratégico de negócio 2", "insight estratégico de negócio 3"]
}

IMPORTANTE:
- NÃO mencione preços, valores ou investimentos
- NÃO use termos técnicos
- Foque em resultados de negócio e crescimento
- Use o nome do cliente${nomeEmpresa ? ` e o nome da empresa (${nomeEmpresa})` : ''} para personalizar a mensagem
- Mencione o contexto do negócio quando relevante para criar conexão
- Crie urgência sutil para agendar reunião
- Faça o cliente se sentir único e especial`
}

// Construir prompt para micro-insight
function buildMicroInsightPrompt(quizData: QuizData, etapa: number): string {
  const contexto = `Objetivo: ${getObjectiveLabel(quizData.objetivo)}
Diagnóstico: ${formatDiagnostico(quizData.diagnostico)}
Desafios: ${quizData.desafios?.join(', ') || 'Não especificado'}`

  return `Com base nestas respostas do cliente:
${contexto}

Gere um insight rápido e valioso (máximo 2 frases) que:
- Seja específico ao perfil dele
- Adicione valor imediato
- Crie expectativa para a análise completa

Tipos possíveis: oportunidade (algo positivo), risco (algo a evitar), dica (orientação prática), benchmark (comparação com mercado)`
}

// Construir prompt para perguntas condicionais
function buildConditionalQuestionsPrompt(quizData: QuizData, etapa: number): string {
  const contexto = `Etapa atual: ${etapa}
Objetivo: ${getObjectiveLabel(quizData.objetivo)}
Respostas até agora: ${JSON.stringify(quizData, null, 2)}`

  return `Com base nas respostas do cliente até agora:
${contexto}

Gere 2-3 perguntas específicas que ajudem a:
- Entender melhor o contexto do negócio
- Qualificar o fit com a solução
- Personalizar a recomendação

As perguntas devem ser diretas, relevantes e não repetir informações já coletadas.`
}

// Análise fallback caso OpenAI falhe
function generateFallbackAnalysis(quizData: QuizData): AIAnalysis {
  const nome = quizData.contato?.nome?.split(' ')[0] || 'você'
  
  return {
    diagnostico: `Olá ${nome}! Nossa equipe está preparando uma análise estratégica personalizada baseada nas informações que você compartilhou. Identificamos oportunidades únicas de crescimento para seu negócio.`,
    oportunidades: ['Otimização de processos de negócio', 'Aumento de conversão e receita', 'Escalabilidade e crescimento'],
    recomendacao: `Recomendamos uma consultoria estratégica personalizada para mapearmos juntos as melhores oportunidades de crescimento para seu negócio. Na reunião, vamos detalhar tudo isso e criar um plano de ação específico para você.`,
    roadmap: [
      {
        periodo: 'PRIMEIRAS SEMANAS',
        titulo: 'Estratégia e Planejamento',
        itens: ['Análise estratégica do negócio', 'Definição de objetivos de crescimento', 'Planejamento de ação'],
      },
    ],
    proximosPassos: ['Agendar sua consultoria estratégica', 'Receber análise detalhada personalizada', 'Definir próximos passos juntos'],
    insights: ['Análise completa será apresentada na reunião', 'Oportunidades únicas identificadas para seu perfil'],
  }
}

// Funções auxiliares
function getObjectiveLabel(obj?: string): string {
  const labels: Record<string, string> = {
    'criar-zero': 'Criar algo do zero',
    'gerar-clientes': 'Gerar mais clientes',
    'corrigir': 'Corrigir o que já tem',
    'solucao-completa': 'Solução completa integrada',
  }
  return labels[obj || ''] || obj || 'Não especificado'
}

function formatDiagnostico(diagnostico?: any): string {
  if (!diagnostico) return 'Não especificado'
  
  const parts: string[] = []
  if (diagnostico.tipo?.length) parts.push(`Tipos: ${diagnostico.tipo.join(', ')}`)
  if (diagnostico.situacao) parts.push(`Situação: ${diagnostico.situacao}`)
  if (diagnostico.problema) parts.push(`Problema: ${diagnostico.problema}`)
  if (diagnostico.negocio) parts.push(`Negócio: ${diagnostico.negocio}`)
  if (diagnostico.outro) parts.push(`Outro: ${diagnostico.outro}`)
  
  return parts.join(' | ') || 'Não especificado'
}

function formatHistorico(historico?: any): string {
  if (!historico?.tentou) return 'Não tentou antes'
  return `${historico.tentou}${historico.detalhes ? ` - ${historico.detalhes}` : ''}`
}

function getTimelineLabel(timeline?: string): string {
  const labels: Record<string, string> = {
    'urgente': 'Urgente - até 30 dias',
    'rapido': 'Rápido - 1 a 2 meses',
    'normal': 'Normal - 2 a 3 meses',
    'sem-pressa': 'Sem pressa - 3+ meses',
    'pesquisando': 'Ainda pesquisando',
  }
  return labels[timeline || ''] || timeline || 'Não especificado'
}

function getBudgetLabel(budget?: string): string {
  const labels: Record<string, string> = {
    'ate-10k': 'Até R$ 10 mil',
    '10k-30k': 'R$ 10 a R$ 30 mil',
    '30k-60k': 'R$ 30 a R$ 60 mil',
    '60k-100k': 'R$ 60 a R$ 100 mil',
    'acima-100k': 'Acima de R$ 100 mil',
    'nao-definido': 'Ainda não definido',
  }
  return labels[budget || ''] || budget || 'Não especificado'
}

