'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { fadeInUp } from '@/lib/animations'
import Button from './ui/Button'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: '',
  })

  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você pode integrar com seu backend ou serviço de email
    console.log('Form submitted:', formData)
    setSubmitted(true)
    
    // Redirecionar para WhatsApp com dados do formulário
    const whatsappNumber = '5511999999999'
    const message = encodeURIComponent(
      `Olá! Preenchi o formulário da Voglio.\n\n` +
      `Nome: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Telefone: ${formData.phone}\n` +
      `Tipo de Projeto: ${formData.projectType}\n` +
      `Mensagem: ${formData.message || 'Sem mensagem adicional'}`
    )
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Vamos Conversar Sobre Seu <span className="text-primary">Projeto</span>?
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
            Preencha o formulário e receba uma proposta personalizada em até 24 horas
          </p>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/40 border border-gray-800/50 rounded-2xl p-6 md:p-8 lg:p-12">
            {submitted ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-2xl font-bold mb-2 text-white">Formulário Enviado!</h3>
                <p className="text-gray-400 mb-6">
                  Redirecionando para o WhatsApp...
                </p>
                <p className="text-sm text-gray-500">
                  Se não abrir automaticamente, entre em contato pelo WhatsApp
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                      placeholder="Seu nome"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                      WhatsApp *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                      placeholder="(11) 99999-9999"
                    />
                  </div>

                  <div>
                    <label htmlFor="projectType" className="block text-sm font-medium text-gray-300 mb-2">
                      Tipo de Projeto *
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      required
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg text-white focus:outline-none focus:border-primary transition-colors"
                    >
                      <option value="">Selecione...</option>
                      <option value="landing-page">Landing Page</option>
                      <option value="sistema-web">Sistema Web</option>
                      <option value="app-mobile">App Mobile</option>
                      <option value="ecommerce">E-commerce</option>
                      <option value="funil-vendas">Funil de Vendas</option>
                      <option value="marketing">Marketing Completo</option>
                      <option value="outro">Outro</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Conte-nos sobre seu projeto (opcional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors resize-none"
                    placeholder="Descreva brevemente o que você precisa..."
                  />
                </div>

                <div className="pt-4">
                  <Button type="submit" size="lg" className="w-full">
                    Enviar Formulário e Falar no WhatsApp
                  </Button>
                </div>

                <p className="text-xs text-center text-gray-500">
                  Ao enviar, você será redirecionado para o WhatsApp para continuar a conversa
                </p>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

