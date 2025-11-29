'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { fadeInUp } from '@/lib/animations'
import Button from '@/components/ui/Button'
import { Check, MessageCircle, Mail, Star } from 'lucide-react'
import { QuizData } from '@/lib/quizLogic'
import {
  getObjectiveText,
  getTipoNegocioText,
  getDesafioText,
  getPrazoText,
  getHistoricoText,
  gerarRecomendacao,
  gerarProblemasAnteriores,
  calcularVagas,
  selecionarCases,
} from '@/lib/resultPersonalization'

interface ResultStepProps {
  quizData: QuizData
}

export default function ResultStep({ quizData }: ResultStepProps) {
  const [isLoading, setIsLoading] = useState(true)
  const nome = quizData.contato?.nome?.split(' ')[0] || 'você'
  const nomeEmpresa = quizData.businessContext?.nomeEmpresa
  const objetivo = quizData.objetivo
  const tipoNegocio = quizData.diagnostico?.negocio || quizData.businessContext?.tipoNegocio
  const desafios = quizData.desafios || []
  const historico = quizData.historico
  const prazo = quizData.timeline
  const jaTentou = historico?.tentou

  // Dados personalizados
  const recomendacao = gerarRecomendacao(quizData)
  const problemasAnteriores = gerarProblemasAnteriores(jaTentou)
  const casesRelevantes = selecionarCases(quizData)
  const vagas = calcularVagas()

  useEffect(() => {
    // Simular loading de análise
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  const handleSchedule = () => {
    // Redirecionar para agendamento
    window.open('https://calendly.com/voglio/consultoria', '_blank')
  }

  const handleContact = () => {
    const whatsappNumber = '5511999999999' // Substituir pelo número real
    const message = encodeURIComponent(
      `Olá! Gostaria de agendar uma consultoria estratégica. Meu nome é ${quizData.contato?.nome} e acabei de completar o quiz.`
    )
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank')
  }

  if (isLoading) {
    return (
      <div className="text-center py-20">
        <div className="text-3xl font-bold text-white mb-2">VOGLIO</div>
        <div className="h-1 w-24 bg-[#365eff] mx-auto rounded-full mb-8" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xl text-gray-300"
        >
          Analisando suas respostas...
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6">
      {/* SEÇÃO 1: HEADER */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="text-center mb-12"
      >
        <div className="text-3xl font-bold text-white mb-2">VOGLIO</div>
        <div className="h-1 w-24 bg-[#365eff] mx-auto rounded-full mb-6" />
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[32px] font-bold text-white mb-4">
          Olá, {nome}{nomeEmpresa ? ` da ${nomeEmpresa}` : ''}! Sua Análise Está Pronta 🎉
        </h1>
      </motion.div>

      {/* SEÇÃO 2: DIAGNÓSTICO PERSONALIZADO */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.1 }}
        className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 sm:p-8 mb-8"
      >
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <span className="text-2xl">📊</span> SEU DIAGNÓSTICO
        </h2>
        <div className="space-y-4 text-gray-300">
          <p className="mb-4">Com base nas suas respostas:</p>

          {nomeEmpresa && (
            <div>
              <span className="text-gray-400">✓ Empresa:</span>{' '}
              <span className="text-white font-semibold">{nomeEmpresa}</span>
            </div>
          )}

          <div>
            <span className="text-gray-400">✓ Objetivo:</span>{' '}
            <span className="text-white font-semibold">{getObjectiveText(objetivo)}</span>
          </div>

          {tipoNegocio && (
            <div>
              <span className="text-gray-400">✓ Tipo de negócio:</span>{' '}
              <span className="text-white font-semibold">{getTipoNegocioText(tipoNegocio)}</span>
            </div>
          )}

          {desafios.length > 0 && (
            <div>
              <span className="text-gray-400">✓ Principais desafios:</span>
              <ul className="mt-2 space-y-1 ml-4">
                {desafios.slice(0, 5).map((desafio, index) => (
                  <li key={index} className="text-white">
                    • {getDesafioText(desafio)}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {prazo && (
            <div>
              <span className="text-gray-400">✓ Prazo ideal:</span>{' '}
              <span className="text-white font-semibold">{getPrazoText(prazo)}</span>
            </div>
          )}

          {historico && (
            <div>
              <span className="text-gray-400">✓ Histórico:</span>{' '}
              <span className="text-white font-semibold">{getHistoricoText(historico)}</span>
            </div>
          )}
        </div>
      </motion.div>

      {/* SEÇÃO 3: O QUE DEU ERRADO ANTES (Condicional) */}
      {jaTentou && jaTentou !== 'nao' && problemasAnteriores.problemas.length > 0 && (
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 sm:p-8 mb-8"
        >
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-2xl">💡</span> O QUE DEU ERRADO ANTES
            <span className="text-lg text-gray-400">(E Como Vamos Fazer Diferente)</span>
          </h2>
          <div className="space-y-4 text-gray-300">
            <p>
              Você disse que já {problemasAnteriores.contexto}
              {historico?.detalhes && ` e mencionou que ${historico.detalhes}`}.
            </p>
            <p className="font-semibold text-white">
              O problema mais comum quando se {problemasAnteriores.contexto}:
            </p>
            <ul className="space-y-2 ml-4">
              {problemasAnteriores.problemas.map((problema, index) => (
                <li key={index}>{problema}</li>
              ))}
            </ul>
            <div className="border-t border-yellow-500/30 pt-4 mt-4">
              <p className="font-semibold text-white mb-3">Como a Voglio faz diferente:</p>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span>Quem desenvolve e quem divulga trabalham juntos desde o dia 1</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span>Seu sistema já sai pronto para receber tráfego e converter</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span>Você não precisa coordenar nada, uma equipe cuida de tudo</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span>Entregas semanais para você acompanhar cada passo</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span>Zero retrabalho, zero refazer</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* SEÇÃO 4: NOSSA RECOMENDAÇÃO */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-br from-[#365eff]/20 to-[#4a6eff]/10 border border-[#365eff]/30 rounded-xl p-6 sm:p-8 mb-8"
      >
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <span className="text-2xl">💡</span> NOSSA RECOMENDAÇÃO PARA VOCÊ
        </h2>
        <div className="space-y-6 text-gray-300">
          <div>
            <p className="mb-4">Baseado no seu perfil, você precisa de:</p>
            <ul className="space-y-2 ml-4">
              {recomendacao.servicos.map((servico, index) => (
                <li key={index} className="text-white">{servico}</li>
              ))}
            </ul>
          </div>

          <div className="border-t border-[#365eff]/30 pt-4">
            <p className="font-semibold text-white mb-3">Por que essa combinação faz sentido para você?</p>
            <ul className="space-y-2 ml-4">
              {recomendacao.razoes.map((razao, index) => (
                <li key={index}>{razao}</li>
              ))}
            </ul>
          </div>

          <div className="border-t border-[#365eff]/30 pt-4">
            <p className="font-semibold text-white mb-3">Na consultoria vamos detalhar:</p>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#365eff] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                <span>Cronograma específico do seu projeto</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#365eff] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                <span>Equipe que vai trabalhar com você</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#365eff] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                <span>Investimento e formas de pagamento</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#365eff] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                <span>ROI esperado baseado em casos similares</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* SEÇÃO 5: CASOS SIMILARES */}
      {casesRelevantes.length > 0 && (
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
          className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 sm:p-8 mb-8"
        >
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-2xl">📊</span> QUEM JÁ ESTAVA NA SUA SITUAÇÃO
            <span className="text-lg text-gray-400">(E Hoje Está Crescendo)</span>
          </h2>
          <div className="space-y-4">
            {casesRelevantes.map((caso, index) => (
              <div key={index} className="bg-gray-900/50 rounded-lg p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <p className="text-white font-semibold text-lg">
                      💼 {caso.nome} - {caso.tipo}
                    </p>
                    <p className="text-gray-400 text-sm mt-1">
                      <strong>Situação antes:</strong> &quot;{caso.situacao_antes}&quot;
                    </p>
                  </div>
                  <div className="flex gap-1 ml-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" strokeWidth={0} />
                    ))}
                  </div>
                </div>
                <div className="mt-3 space-y-2 text-sm">
                  <p className="text-gray-300">
                    <strong className="text-[#365eff]">Solução Voglio:</strong> {caso.solucao}
                  </p>
                  <p className="text-white font-semibold">
                    <strong className="text-green-400">Resultado:</strong> {caso.resultado}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* SEÇÃO 7: PRÓXIMO PASSO (CTA Principal) */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 flex items-center justify-center gap-2">
          <span className="text-3xl">🎯</span> PRÓXIMO PASSO
        </h2>
        <div className="bg-gradient-to-br from-[#365eff]/20 to-[#4a6eff]/10 border border-[#365eff]/30 rounded-xl p-8 mb-8 max-w-2xl mx-auto">
          <p className="text-lg text-white font-semibold mb-6">
            Agende 30-45min com nosso especialista para receber:
          </p>
          <div className="space-y-3 text-left mb-8">
            <div className="flex items-start gap-2">
              <Check className="w-5 h-5 text-[#365eff] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
              <span className="text-gray-300">Proposta completa detalhada</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-5 h-5 text-[#365eff] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
              <span className="text-gray-300">Cronograma específico do seu projeto</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-5 h-5 text-[#365eff] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
              <span className="text-gray-300">Investimento e formas de pagamento</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-5 h-5 text-[#365eff] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
              <span className="text-gray-300">ROI esperado baseado em casos similares</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-5 h-5 text-[#365eff] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
              <span className="text-gray-300">Resposta para todas as suas dúvidas</span>
            </div>
          </div>
          <div className="border-t border-[#365eff]/30 pt-6">
            <p className="text-white font-semibold mb-4">A consultoria é:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-400" strokeWidth={2.5} />
                <span>100% gratuita e sem compromisso</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-400" strokeWidth={2.5} />
                <span>Online (Google Meet/Zoom)</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-400" strokeWidth={2.5} />
                <span>Gravada para você rever depois</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-400" strokeWidth={2.5} />
                <span>Com especialista sênior da Voglio</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <Button size="lg" onClick={handleSchedule} className="w-full sm:w-auto min-w-[300px] text-lg py-4">
            Agendar Minha Consultoria Gratuita →
          </Button>
          <div className="text-sm text-gray-400 space-y-1">
            <p>⏰ {vagas}</p>
            <p>💬 Resposta de confirmação em até 2h</p>
            <p>🔒 Sem compromisso • Totalmente gratuito</p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8">
          <p className="text-gray-400 mb-4">Prefere que entremos em contato com você?</p>
          <Button variant="outline" size="lg" onClick={handleContact} className="w-full sm:w-auto min-w-[300px]">
            Sim, Podem Me Ligar No WhatsApp
          </Button>
        </div>
      </motion.div>

      {/* SEÇÃO 9: FOOTER */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.6 }}
        className="border-t border-gray-800 pt-8 mt-8 text-center"
      >
        <div className="mb-8">
          <p className="text-gray-400 mb-4 font-semibold">💬 Dúvidas? Fale Conosco Agora</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" strokeWidth={2} />
              <span>WhatsApp: (11) XXXXX-XXXX</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" strokeWidth={2} />
              <span>contato@voglio.com.br</span>
            </div>
          </div>
          <p className="text-gray-500 text-xs mt-2">Horário: Segunda a Sexta, 9h às 18h • Resposta em até 2 horas</p>
        </div>

        <div className="border-t border-gray-800 pt-6 mt-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm text-gray-500 mb-4">
            <Check className="w-4 h-4 text-green-500" strokeWidth={2.5} />
            <span>Sua análise foi salva com segurança</span>
            <span className="hidden sm:inline">•</span>
            <Check className="w-4 h-4 text-green-500" strokeWidth={2.5} />
            <span>Proposta detalhada chegará no e-mail em até 2h</span>
            <span className="hidden sm:inline">•</span>
            <Check className="w-4 h-4 text-green-500" strokeWidth={2.5} />
            <span>Nossa equipe comercial já foi notificada</span>
            {prazo === 'urgente' && (
              <>
                <span className="hidden sm:inline">•</span>
                <Check className="w-4 h-4 text-yellow-500" strokeWidth={2.5} />
                <span className="text-yellow-500">Priorizamos seu atendimento por urgência</span>
              </>
            )}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="text-2xl font-bold text-white mb-2">VOGLIO</div>
          <p className="text-gray-500 text-xs">
            © 2025 Voglio • Política de Privacidade • Termos de Uso
          </p>
        </div>
      </motion.div>
    </div>
  )
}
