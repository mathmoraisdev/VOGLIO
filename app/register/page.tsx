import AuthLayout from '@/components/auth/AuthLayout'
import RegisterForm from '@/components/auth/RegisterForm'
import { Rocket, Check } from 'lucide-react'

export default function RegisterPage() {
  const leftContent = (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
          <Rocket className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold">Voglio</h2>
      </div>
      
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
        Comece a acompanhar seus projetos hoje
      </h1>
      
      <p className="text-lg md:text-xl text-white/90 leading-relaxed">
        Crie sua conta e tenha acesso completo ao desenvolvimento do seu projeto, com transparência total e atualizações em tempo real.
      </p>

      <div className="space-y-4 mt-8">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mt-0.5">
            <Check className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="font-semibold text-white">Acesso imediato</p>
            <p className="text-white/80 text-sm">Crie sua conta em segundos</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mt-0.5">
            <Check className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="font-semibold text-white">Segurança garantida</p>
            <p className="text-white/80 text-sm">Seus dados protegidos com criptografia</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mt-0.5">
            <Check className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="font-semibold text-white">Suporte completo</p>
            <p className="text-white/80 text-sm">Equipe pronta para ajudar quando precisar</p>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <AuthLayout leftContent={leftContent}>
      <RegisterForm />
    </AuthLayout>
  )
}

