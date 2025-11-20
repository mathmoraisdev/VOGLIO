'use client'

import { useState, useEffect } from 'react'
import QuizLayout from '@/components/quiz/QuizLayout'
import WelcomeStep from '@/components/quiz/WelcomeStep'
import ObjectiveStep from '@/components/quiz/ObjectiveStep'
import DiagnosticStep from '@/components/quiz/DiagnosticStep'
import ChallengeStep from '@/components/quiz/ChallengeStep'
import HistoryStep from '@/components/quiz/HistoryStep'
import BusinessContextStep from '@/components/quiz/BusinessContextStep'
import ContactStep from '@/components/quiz/ContactStep'
import LoadingStep from '@/components/quiz/LoadingStep'
import ResultStep from '@/components/quiz/ResultStep'
import { QuizData, saveQuizData, loadQuizData, clearQuizData } from '@/lib/quizLogic'

const TOTAL_STEPS = 6 // Etapas de perguntas (sem contar welcome e loading)

export default function QuizPage() {
  const [currentStep, setCurrentStep] = useState<'welcome' | number | 'loading' | 'result'>('welcome')
  const [quizData, setQuizData] = useState<QuizData>(() => {
    if (typeof window !== 'undefined') {
      return loadQuizData() || {}
    }
    return {}
  })

  // Salvar dados sempre que mudarem
  useEffect(() => {
    saveQuizData(quizData)
  }, [quizData])

  const updateQuizData = (field: keyof QuizData, value: any) => {
    setQuizData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleStart = () => {
    setCurrentStep(1)
  }

  const handleNext = () => {
    if (typeof currentStep === 'number') {
      if (currentStep < TOTAL_STEPS) {
        setCurrentStep(currentStep + 1)
      } else {
        // Última etapa antes do loading
        setCurrentStep('loading')
      }
    }
  }

  const handleBack = () => {
    if (typeof currentStep === 'number' && currentStep > 1) {
      setCurrentStep(currentStep - 1)
    } else if (currentStep === 1) {
      setCurrentStep('welcome')
    }
  }

  const handleStep1Next = () => {
    handleNext()
  }

  const handleStep2Next = (diagnostico: any) => {
    updateQuizData('diagnostico', diagnostico)
    handleNext()
  }

  const handleStep3Next = (desafios: string[]) => {
    updateQuizData('desafios', desafios)
    handleNext()
  }

  const handleStep4Next = (historico: any) => {
    updateQuizData('historico', historico)
    handleNext()
  }

  const handleStep5Next = (businessContext: any) => {
    updateQuizData('businessContext', businessContext)
    handleNext()
  }

  const handleStep6Next = async (contato: any) => {
    updateQuizData('contato', contato)
    
    // Gerar análise completa com OpenAI
    try {
      const response = await fetch('/api/quiz/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quizData: { ...quizData, contato },
          tipo: 'analise-completa',
        }),
      })

      if (response.ok) {
        const data = await response.json()
        updateQuizData('aiAnalysis', data.analysis)
      }
    } catch (error) {
      console.error('Erro ao gerar análise:', error)
    }

    setCurrentStep('loading')
  }

  const handleLoadingComplete = () => {
    setCurrentStep('result')
  }

  // Função para gerar micro-insights durante o quiz
  const fetchMicroInsight = async (etapa: number) => {
    if (!quizData.objetivo || etapa < 2) return

    try {
      const response = await fetch('/api/quiz/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quizData,
          tipo: 'micro-insight',
          etapaAtual: etapa,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        if (data.insight) {
          const currentInsights = quizData.insights?.microInsights || []
          updateQuizData('insights', {
            ...quizData.insights,
            microInsights: [...currentInsights, data.insight],
          })
        }
      }
    } catch (error) {
      console.error('Erro ao gerar micro-insight:', error)
    }
  }

  const renderStep = () => {
    if (currentStep === 'welcome') {
      return <WelcomeStep onStart={handleStart} />
    }

    if (currentStep === 'loading') {
      return <LoadingStep onComplete={handleLoadingComplete} />
    }

    if (currentStep === 'result') {
      return <ResultStep quizData={quizData} />
    }

    // Etapas numeradas
    switch (currentStep) {
      case 1:
        return (
          <ObjectiveStep
            selected={quizData.objetivo}
            onSelect={(obj) => updateQuizData('objetivo', obj)}
            onNext={handleStep1Next}
            onBack={handleBack}
          />
        )
      case 2:
        return (
          <DiagnosticStep
            objective={quizData.objetivo || 'criar-zero'}
            diagnostico={quizData.diagnostico}
            onNext={handleStep2Next}
            onBack={handleBack}
            microInsights={quizData.insights?.microInsights || []}
            onInsightGenerated={(insight) => {
              const currentInsights = quizData.insights?.microInsights || []
              updateQuizData('insights', {
                ...quizData.insights,
                microInsights: [...currentInsights, insight],
              })
            }}
          />
        )
      case 3:
        return (
          <ChallengeStep
            desafios={quizData.desafios}
            nicho={quizData.nicho}
            onNext={handleStep3Next}
            onBack={handleBack}
          />
        )
      case 4:
        return (
          <HistoryStep
            historico={quizData.historico}
            onNext={handleStep4Next}
            onBack={handleBack}
          />
        )
      case 5:
        return (
          <BusinessContextStep
            businessContext={quizData.businessContext}
            tipoNegocioJaColetado={quizData.diagnostico?.negocio}
            onNext={handleStep5Next}
            onBack={handleBack}
          />
        )
      case 6:
        return (
          <ContactStep
            contato={quizData.contato}
            onNext={handleStep6Next}
            onBack={handleBack}
          />
        )
      default:
        return null
    }
  }

  // Páginas especiais não usam o layout padrão
  if (currentStep === 'welcome' || currentStep === 'loading' || currentStep === 'result') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-4xl">{renderStep()}</div>
      </div>
    )
  }

  // Etapas normais usam o layout com progresso
  return (
    <QuizLayout
      currentStep={currentStep as number}
      totalSteps={TOTAL_STEPS}
      showProgress={true}
      showBackButton={currentStep !== 1}
      onBack={handleBack}
    >
      {renderStep()}
    </QuizLayout>
  )
}
