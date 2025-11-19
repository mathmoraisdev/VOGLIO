import { NextRequest, NextResponse } from 'next/server'
import { generateAIAnalysis, generateMicroInsight, generateConditionalQuestions } from '@/lib/openai'
import { QuizData } from '@/lib/quizLogic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { quizData, tipo, etapaAtual } = body

    if (!quizData) {
      return NextResponse.json({ error: 'Dados do quiz são obrigatórios' }, { status: 400 })
    }

    // Validar estrutura básica
    const validatedData = quizData as QuizData

    switch (tipo) {
      case 'analise-completa':
        const analysis = await generateAIAnalysis(validatedData)
        return NextResponse.json({ analysis })

      case 'micro-insight':
        const insight = await generateMicroInsight(validatedData, etapaAtual || 0)
        return NextResponse.json({ insight })

      case 'perguntas-condicionais':
        const perguntas = await generateConditionalQuestions(validatedData, etapaAtual || 0)
        return NextResponse.json({ perguntas })

      default:
        return NextResponse.json({ error: 'Tipo inválido' }, { status: 400 })
    }
  } catch (error) {
    console.error('Erro na API de análise:', error)
    return NextResponse.json(
      { error: 'Erro ao processar análise. Tente novamente.' },
      { status: 500 }
    )
  }
}

