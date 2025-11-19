import { QuizData } from './quizLogic'

// Mapeamento de objetivos
export function getObjectiveText(objetivo?: string): string {
  const map: Record<string, string> = {
    'criar-zero': 'Criar sistema/plataforma do zero',
    'gerar-clientes': 'Gerar mais clientes para negócio existente',
    'corrigir': 'Corrigir e otimizar sistema atual',
    'solucao-completa': 'Solução completa integrada (criar + divulgar)',
    'criar_do_zero': 'Criar sistema/plataforma do zero',
    'gerar_clientes': 'Gerar mais clientes para negócio existente',
    'solucao_completa': 'Solução completa integrada (criar + divulgar)',
  }
  return map[objetivo || ''] || objetivo || 'Não especificado'
}

// Mapeamento de tipo de negócio
export function getTipoNegocioText(tipo?: string): string {
  const map: Record<string, string> = {
    'infoproduto': 'Infoproduto / Curso online',
    'ecommerce': 'E-commerce / Loja online',
    'saas': 'SaaS / Software como serviço',
    'servicos-b2b': 'Serviços B2B / Consultoria',
    'servicos-locais': 'Serviços locais',
    'marketplace': 'Marketplace / Plataforma',
  }
  return map[tipo || ''] || tipo || 'Não especificado'
}

// Mapeamento de desafios
export function getDesafioText(desafio: string): string {
  const map: Record<string, string> = {
    'nao_sei_comecar': 'Não sabe por onde começar',
    'falta_tempo': 'Falta de tempo para gerenciar tudo',
    'ja_contratei_nao_funcionou': 'Já contratou e não deu certo',
    'medo_gastar': 'Medo de gastar sem retorno',
    'nao_entendo_tecnologia': 'Não entende de tecnologia',
    'nao_entendo_marketing': 'Não entende de marketing digital',
    'dificil_coordenar': 'Difícil coordenar vários fornecedores',
    'preciso_rapido': 'Precisa de resultado rápido',
    'orcamento_limitado': 'Orçamento limitado',
    'Tenho tráfego mas não converte': 'Tenho tráfego mas não converte',
    'Gasto em anúncios mas não vejo retorno': 'Gasto em anúncios mas não vejo retorno',
    'Não sei qual plataforma usar para anunciar': 'Não sei qual plataforma usar para anunciar',
  }
  return map[desafio] || desafio
}

// Mapeamento de prazo
export function getPrazoText(prazo?: string): string {
  const map: Record<string, string> = {
    'urgente': 'Urgente (precisa em até 30 dias)',
    'rapido': 'Rápido (1 a 2 meses)',
    'normal': 'Normal (2 a 3 meses)',
    'sem-pressa': 'Sem pressa (3+ meses)',
    'pesquisando': 'Ainda pesquisando opções',
    'urgente_30_dias': 'Urgente (precisa em até 30 dias)',
    'rapido_1_2_meses': 'Rápido (1 a 2 meses)',
    'normal_2_3_meses': 'Normal (2 a 3 meses)',
    'sem_pressa_3plus': 'Sem pressa (3+ meses)',
  }
  return map[prazo || ''] || prazo || 'Não especificado'
}

// Mapeamento de histórico
export function getHistoricoText(historico?: { tentou?: string; detalhes?: string }): string {
  if (!historico?.tentou || historico.tentou === 'nao') {
    return 'Primeira vez investindo nisso'
  }

  const map: Record<string, string> = {
    'freelancer': 'Já tentou com freelancer',
    'agencia': 'Já tentou com outra agência',
    'sozinho': 'Tentou fazer sozinho',
    'varias_vezes': 'Já tentou várias vezes',
  }

  const base = map[historico.tentou] || historico.tentou
  return historico.detalhes ? `${base} - ${historico.detalhes}` : base
}

// Gerar recomendações baseadas no perfil
export function gerarRecomendacao(quizData: QuizData) {
  const servicos: string[] = []
  const razoes: string[] = []
  const objetivo = quizData.objetivo
  const desafios = quizData.desafios || []
  const prazo = quizData.timeline

  // Baseado no objetivo
  if (objetivo === 'criar-zero' || objetivo === 'solucao-completa') {
    servicos.push('✅ Desenvolvimento completo do sistema/plataforma')
    servicos.push('✅ Design profissional e responsivo')
    razoes.push('✓ Você precisa criar tudo do zero')
  }

  if (objetivo === 'gerar-clientes' || objetivo === 'solucao-completa') {
    servicos.push('✅ Gestão de tráfego qualificado (Google Ads, Meta Ads)')
    servicos.push('✅ Landing pages otimizadas para conversão')
    razoes.push('✓ Você precisa de clientes chegando')
  }

  if (objetivo === 'corrigir' || quizData.diagnostico?.problema) {
    servicos.push('✅ Auditoria e correção do sistema atual')
    servicos.push('✅ Otimização de conversão')
    razoes.push('✓ Você precisa corrigir o que não está funcionando')
  }

  // Sempre adicionar (diferencial)
  servicos.push('✅ Integração completa entre desenvolvimento e marketing')
  servicos.push('✅ Acompanhamento com entregas semanais')

  // Baseado nos desafios
  if (desafios.some(d => d.includes('Não sei por onde começar') || d.includes('nao_sei_comecar'))) {
    razoes.push('✓ Você não precisa saber por onde começar - nós guiamos cada etapa')
  }

  if (desafios.some(d => d.includes('Falta de tempo') || d.includes('falta_tempo'))) {
    razoes.push('✓ Você não gerencia nada - uma equipe cuida de tudo')
  }

  if (desafios.some(d => d.includes('Já contratei e não deu certo') || d.includes('ja_contratei_nao_funcionou'))) {
    razoes.push('✓ Você quer garantia que vai funcionar desta vez - tudo integrado')
  }

  if (desafios.some(d => d.includes('Medo de gastar') || d.includes('medo_gastar'))) {
    razoes.push('✓ Você acompanha semanalmente - zero surpresas no final')
  }

  if (desafios.some(d => d.includes('Difícil coordenar') || d.includes('dificil_coordenar'))) {
    razoes.push('✓ Você não coordena múltiplos fornecedores - é tudo uma equipe')
  }

  if (desafios.some(d => d.includes('Preciso de resultado rápido') || d.includes('preciso_rapido'))) {
    razoes.push('✓ Você tem urgência - trabalhamos com prazos acelerados')
  }

  // Baseado no prazo
  if (prazo === 'urgente') {
    servicos.push('✅ Priorização no cronograma para entrega acelerada')
  }

  return { servicos, razoes }
}

// Gerar timeline personalizada
export function gerarTimeline(objetivo?: string): string[] {
  if (objetivo === 'criar-zero' || objetivo === 'solucao-completa') {
    return [
      'FASE 1: Planejamento Estratégico',
      '✓ Workshop de descoberta com você',
      '✓ Definição de público e posicionamento',
      '✓ Protótipos e aprovações',
      '',
      'FASE 2: Desenvolvimento',
      '✓ Construção do sistema/plataforma',
      '✓ Design profissional aplicado',
      '✓ Entregas semanais para validação',
      '',
      'FASE 3: Marketing e Conversão',
      '✓ Landing pages otimizadas',
      '✓ Estruturação do funil',
      '✓ Setup de tracking e analytics',
      '',
      'FASE 4: Lançamento e Tráfego',
      '✓ Go-live do sistema',
      '✓ Início das campanhas',
      '✓ Otimização contínua',
    ]
  }

  if (objetivo === 'gerar-clientes') {
    return [
      'FASE 1: Auditoria e Estratégia',
      '✓ Análise completa do seu sistema atual',
      '✓ Identificação de pontos de melhoria',
      '✓ Definição de público e mensagem',
      '',
      'FASE 2: Otimização',
      '✓ Ajustes no sistema para conversão',
      '✓ Criação/otimização de landing pages',
      '✓ Configuração de tracking',
      '',
      'FASE 3: Campanhas de Tráfego',
      '✓ Criação de campanhas segmentadas',
      '✓ Testes de criativos e copies',
      '✓ Ajustes baseados em dados',
      '',
      'FASE 4: Escala',
      '✓ Aumento progressivo de budget',
      '✓ Redução de CAC',
      '✓ Maximização de ROI',
    ]
  }

  if (objetivo === 'corrigir') {
    return [
      'FASE 1: Diagnóstico Profundo',
      '✓ Auditoria técnica completa',
      '✓ Análise de UX e conversão',
      '✓ Identificação de gargalos',
      '',
      'FASE 2: Correções Prioritárias',
      '✓ Ajustes técnicos críticos',
      '✓ Melhorias de performance',
      '✓ Otimização de conversão',
      '',
      'FASE 3: Testes e Validação',
      '✓ Testes A/B de melhorias',
      '✓ Validação com usuários reais',
      '✓ Ajustes finos',
      '',
      'FASE 4: Crescimento',
      '✓ Estratégias de escala',
      '✓ Novas funcionalidades',
      '✓ Expansão do tráfego',
    ]
  }

  return []
}

// Gerar problemas baseados em tentativas anteriores
export function gerarProblemasAnteriores(jaTentou?: string): { contexto: string; problemas: string[] } {
  if (jaTentou === 'freelancer') {
    return {
      contexto: 'contrata freelancer',
      problemas: [
        '❌ Freelancer cria sistema bonito mas não pensa em conversão',
        '❌ Quando você tenta divulgar, descobre que falta tracking, pixels, estrutura',
        '❌ Precisa contratar outra pessoa para "consertar" o que foi feito',
        '❌ Gasta o dobro e perde meses no retrabalho',
      ],
    }
  }

  if (jaTentou === 'agencia') {
    return {
      contexto: 'contrata agência',
      problemas: [
        '❌ Agência entrega só uma parte (ou dev, ou marketing)',
        '❌ Você fica no meio gerenciando dev + agência sem se falarem',
        '❌ Nada se integra de verdade, tudo gambiarra',
        '❌ Culpam um ao outro quando não funciona',
      ],
    }
  }

  if (jaTentou === 'sozinho') {
    return {
      contexto: 'tenta fazer sozinho',
      problemas: [
        '❌ Falta tempo para aprender tudo (dev, design, marketing)',
        '❌ Resultado amador, não passa confiança',
        '❌ Quando trava em algo técnico, não sabe resolver',
        '❌ Meses investidos e pouco resultado concreto',
      ],
    }
  }

  if (jaTentou === 'varias_vezes') {
    return {
      contexto: 'tentou várias vezes',
      problemas: [
        '❌ Contratar separado sempre acaba da mesma forma',
        '❌ Cada um entrega "sua parte" mas nada funciona junto',
        '❌ Você vira gerente de projeto sem querer',
        '❌ Frustração de ver dinheiro sendo queimado',
      ],
    }
  }

  return { contexto: '', problemas: [] }
}

// Gerar soluções baseadas em desafios
export function gerarSolucoesDesafios(desafios: string[]): Array<{ desafio: string; solucao: string[] }> {
  const solucoes: Array<{ desafio: string; solucao: string[] }> = []

  const map: Record<string, string[]> = {
    'Não sei por onde começar': [
      '→ Nós guiamos CADA etapa do processo',
      '→ Você só valida e aprova',
      '→ Workshop inicial mapeia tudo que você precisa',
      '→ Roadmap claro desde o dia 1',
    ],
    'Falta de tempo para gerenciar tudo': [
      '→ Você não gerencia nada',
      '→ Uma equipe integrada cuida de tudo',
      '→ Você só participa de validações semanais (30min)',
      '→ Foco no seu negócio, não em fornecedores',
    ],
    'Já contratei e não deu certo': [
      '→ Fornecedores separados = sempre falha',
      '→ Aqui é tudo pela mesma equipe',
      '→ Zero risco de desalinhamento',
      '→ Zero retrabalho por falta de integração',
    ],
    'Medo de gastar e não ter retorno': [
      '→ Entregas semanais (você vê o progresso)',
      '→ Sistema já sai pronto para vender',
      '→ Baseamos tudo em dados e cases reais',
      '→ Suporte de 30 dias pós-lançamento',
    ],
    'Não entendo de tecnologia': [
      '→ Você não precisa entender',
      '→ Explicamos tudo em linguagem simples',
      '→ Tomamos as decisões técnicas por você',
      '→ Você só aprova o que vê funcionando',
    ],
    'Não entendo de marketing digital': [
      '→ Nosso time de marketing cuida disso',
      '→ Trazemos estratégia pronta',
      '→ Você não precisa virar especialista',
      '→ Só acompanha os resultados chegando',
    ],
    'Não entendo de marketing digital / tráfego': [
      '→ Nosso time de marketing cuida disso',
      '→ Trazemos estratégia pronta',
      '→ Você não precisa virar especialista',
      '→ Só acompanha os resultados chegando',
    ],
    'Tenho tráfego mas não converte': [
      '→ Otimizamos seu sistema para conversão',
      '→ Ajustamos landing pages e funil',
      '→ Melhoramos o que já está funcionando',
      '→ Resultados rápidos sem refazer tudo',
    ],
    'Gasto em anúncios mas não vejo retorno': [
      '→ Auditamos suas campanhas atuais',
      '→ Otimizamos targeting e criativos',
      '→ Ajustamos sistema para converter melhor',
      '→ ROI positivo desde o início',
    ],
    'Não sei qual plataforma usar para anunciar': [
      '→ Analisamos seu público e definimos a melhor plataforma',
      '→ Criamos campanhas otimizadas desde o início',
      '→ Testamos e escalamos o que funciona',
      '→ Você não precisa decidir sozinho',
    ],
    'Difícil coordenar vários fornecedores': [
      '→ Um contrato. Uma equipe. Um ponto de contato.',
      '→ Você não faz ponte entre dev e marketing',
      '→ Eles já trabalham juntos naturalmente',
      '→ Você economiza 15-20h/mês só nisso',
    ],
    'Preciso de resultado rápido': [
      '→ Trabalhamos com prazos acelerados',
      '→ Equipe integrada = menos tempo perdido',
      '→ Não refazemos nada = mais velocidade',
      '→ Entregas semanais mantêm ritmo alto',
    ],
    'Não tenho orçamento grande': [
      '→ Fazemos certo na primeira vez (não gasta 2x)',
      '→ Parcelamento flexível disponível',
      '→ ROI rápido compensa investimento',
      '→ Na consultoria mostramos opções',
    ],
  }

  desafios.forEach((desafio) => {
    // Tentar encontrar mapeamento exato primeiro
    let solucao = map[desafio]
    
    // Se não encontrar, tentar match parcial
    if (!solucao) {
      const match = Object.keys(map).find(key => 
        desafio.toLowerCase().includes(key.toLowerCase()) || 
        key.toLowerCase().includes(desafio.toLowerCase())
      )
      if (match) {
        solucao = map[match]
      }
    }
    
    if (solucao) {
      solucoes.push({ desafio, solucao })
    }
  })

  return solucoes
}

// Calcular vagas disponíveis (simulado)
export function calcularVagas(): string {
  const hoje = new Date()
  const diaSemana = hoje.getDay()
  const hora = hoje.getHours()

  if (diaSemana === 0 || diaSemana === 6) {
    return 'Novas vagas abrem na segunda-feira'
  }

  let vagas: number
  if (diaSemana >= 1 && diaSemana <= 4) {
    if (hora < 12) vagas = Math.floor(Math.random() * 3) + 3
    else if (hora < 18) vagas = Math.floor(Math.random() * 3) + 2
    else vagas = Math.floor(Math.random() * 3) + 1
  } else {
    if (hora < 14) vagas = Math.floor(Math.random() * 2) + 2
    else vagas = Math.floor(Math.random() * 2) + 1
  }

  return `${vagas} vagas disponíveis esta semana`
}

// Cases de sucesso (database simplificado)
interface Case {
  nome: string
  tipo: string
  situacao_antes: string
  solucao: string
  resultado: string
  tags: string[]
}

const cases: Case[] = [
  {
    nome: 'João Silva',
    tipo: 'Infoproduto',
    situacao_antes: 'Tentou com 2 freelancers, gastou R$ 30k e não saiu do papel',
    solucao: 'Desenvolvimento + Marketing integrado',
    resultado: 'R$ 150k faturados em 90 dias',
    tags: ['criar-zero', 'freelancer', 'infoproduto'],
  },
  {
    nome: 'Maria Costa',
    tipo: 'Curso Online',
    situacao_antes: 'Site pronto mas nenhuma venda. Queimou R$ 15k em anúncios',
    solucao: 'Otimização + Tráfego qualificado',
    resultado: 'Conversão de 2% → 18% (9x)',
    tags: ['gerar-clientes', 'anuncios_sem_retorno', 'infoproduto'],
  },
  {
    nome: 'Carlos Mendes',
    tipo: 'SaaS',
    situacao_antes: 'Sistema funcionando mas não conseguia escalar',
    solucao: 'Reestruturação + Growth Marketing',
    resultado: 'De 50 para 500 clientes em 6 meses',
    tags: ['corrigir', 'saas', 'precisa_escalar'],
  },
  {
    nome: 'Ana Rodrigues',
    tipo: 'E-commerce',
    situacao_antes: 'Loja online com baixa conversão',
    solucao: 'Redesign + Otimização de funil',
    resultado: 'Ticket médio +45%, conversão +280%',
    tags: ['corrigir', 'ecommerce', 'conversao_baixa'],
  },
  {
    nome: 'Roberto Andrade',
    tipo: 'Serviços B2B',
    situacao_antes: 'Dependia só de indicação, sem previsibilidade',
    solucao: 'Sistema de captação + Inbound',
    resultado: '30 leads qualificados/mês consistentes',
    tags: ['gerar-clientes', 'servicos-b2b', 'criar-zero'],
  },
]

export function selecionarCases(quizData: QuizData): Case[] {
  const scoredCases = cases.map((c) => {
    let score = 0

    // Match de tipo de negócio
    const tipoNegocio = quizData.diagnostico?.negocio || ''
    if (c.tags.some((tag) => tag.includes(tipoNegocio))) score += 3

    // Match de objetivo
    if (quizData.objetivo && c.tags.includes(quizData.objetivo)) score += 2

    // Match de tentativas anteriores
    const jaTentou = quizData.historico?.tentou
    if (jaTentou === 'freelancer' && c.tags.includes('freelancer')) score += 2
    if (jaTentou === 'agencia' && c.tags.includes('agencia')) score += 2

    // Match de situação atual
    const situacao = quizData.diagnostico?.situacao
    if (situacao && c.tags.some((tag) => tag.includes(situacao))) score += 2

    return { ...c, score }
  })

  return scoredCases
    .sort((a, b) => b.score - a.score)
    .slice(0, 2)
    .filter((c) => c.score > 0)
}

