'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { fadeInUp } from '@/lib/animations'

const faqs = [
  {
    question: 'Quais serviços vocês oferecem?',
    answer: 'Oferecemos 4 serviços principais: 1) Desenvolvimento de sistemas web/apps, 2) Criação de landing pages de alta conversão, 3) Estruturação completa de funis de vendas, e 4) Gestão de tráfego qualificado (Google Ads, Facebook Ads). Você pode contratar serviços pontuais ou o pacote completo.',
  },
  {
    question: 'Quanto custa para desenvolver meu projeto?',
    answer: 'O investimento varia de acordo com a complexidade e escopo do projeto. Após a consultoria gratuita, apresentamos um orçamento detalhado e personalizado. Nossos projetos geralmente variam de R$ 15k a R$ 150k, com opções de parcelamento.',
  },
  {
    question: 'Quanto tempo leva para ficar pronto?',
    answer: 'Landing page + funil básico: 30 dias. Sistema web completo: 45-60 dias. Solução completa (sistema + landing pages + funil + tráfego): 60-90 dias. Sempre com entregas semanais para você acompanhar o progresso.',
  },
  {
    question: 'Por que não contratar freelancers ou agências separadas?',
    answer: 'Freelancers baratos = dor de cabeça (atrasos, falta de suporte, código ruim). Agências separadas = falta de integração entre dev e marketing. Na Voglio, tudo funciona em sincronia: tecnologia + design + marketing + vendas. Resultado: mais rápido, mais barato e mais eficiente.',
  },
  {
    question: 'Vocês trabalham com qualquer tipo de negócio?',
    answer: 'Trabalhamos principalmente com: infoprodutos, SaaS, e-commerce, serviços B2B e startups digitais. Se seu negócio tem potencial de escala digital, provavelmente podemos ajudar. Na consultoria gratuita, analisamos seu caso específico.',
  },
  {
    question: 'E se eu não tiver tráfego ainda?',
    answer: 'Perfeito! Criamos a estratégia completa desde o zero: desenvolvimento do produto, criação do funil de vendas E geração de tráfego qualificado. Você não precisa se preocupar com nada técnico, focamos em trazer resultados.',
  },
  {
    question: 'Vocês oferecem garantia?',
    answer: 'Sim! Primeira consultoria 100% gratuita e sem compromisso. Contratos claros com escopo detalhado. Entregas semanais comprovadas. Revisões ilimitadas até sua satisfação. Suporte pós-lançamento incluso.',
  },
  {
    question: 'Como funciona o suporte após o lançamento?',
    answer: 'Todo projeto inclui 30 dias de suporte intensivo pós-lançamento. Depois disso, oferecemos planos de manutenção e otimização contínua. Você nunca fica desamparado - sempre terá nossa equipe disponível.',
  },
  {
    question: 'Preciso entender de tecnologia para trabalhar com vocês?',
    answer: 'Não! Traduzimos tudo para linguagem simples. Você foca no seu negócio, a gente cuida de toda a parte técnica, design e marketing. Nossa missão é tornar o processo o mais simples possível para você.',
  },
  {
    question: 'Vocês trabalham com empresas de qualquer tamanho?',
    answer: 'Sim! Trabalhamos desde startups até grandes empresas. Nosso processo se adapta ao tamanho e necessidade de cada cliente. O importante é ter um negócio com potencial de crescimento digital.',
  },
  {
    question: 'Como funciona o pagamento?',
    answer: 'Oferecemos opções flexíveis: pagamento à vista com desconto, parcelamento em até 12x, ou dividido em etapas conforme entregas. Sempre com transparência total e sem surpresas.',
  },
  {
    question: 'E se eu não ficar satisfeito?',
    answer: 'Nossa taxa de satisfação é de 95%. Trabalhamos com revisões ilimitadas dentro do escopo acordado até você ficar 100% satisfeito. Além disso, oferecemos suporte pós-lançamento para garantir que tudo funcione perfeitamente.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900/50 to-black">
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-[40px] font-bold mb-3 sm:mb-4 px-2">
            Perguntas{' '}
            <span className="text-primary">
              Frequentes
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 px-2">
            Tire suas dúvidas sobre nossos serviços e processos
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-gradient-to-br from-gray-900/80 to-gray-800/40 border border-gray-800/50 rounded-xl overflow-hidden hover:border-primary/30 transition-all duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between text-left focus:outline-none group min-h-[44px]"
              >
                <span className="text-sm sm:text-base md:text-lg font-semibold text-white pr-4 group-hover:text-primary transition-colors">
                  {faq.question}
                </span>
                <span
                  className={`text-xl sm:text-2xl text-primary transition-transform duration-300 flex-shrink-0 ${
                    openIndex === index ? 'rotate-45' : ''
                  }`}
                >
                  +
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-4 sm:px-6 pb-4 sm:pb-5 text-sm sm:text-base text-gray-400 leading-relaxed border-t border-gray-800/50 pt-3 sm:pt-4">
                  {faq.answer}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 mb-4">Ainda tem dúvidas?</p>
          <button
            onClick={() => {
              document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="text-primary hover:text-primary-300 font-semibold underline transition-colors"
          >
            Agende uma consultoria gratuita →
          </button>
        </motion.div>
      </div>
    </section>
  )
}

