import Header from '@/components/Header'
import Hero from '@/components/Hero'
import TrustBar from '@/components/TrustBar'
import ClientLogos from '@/components/ClientLogos'
import Problem from '@/components/Problem'
import About from '@/components/About'
import Technologies from '@/components/Technologies'
import CaseStudies from '@/components/CaseStudies'
import BeforeAfter from '@/components/BeforeAfter'
import Services from '@/components/Services'
import Pricing from '@/components/Pricing'
import Process from '@/components/Process'
import Team from '@/components/Team'
import NicheBenefits from '@/components/NicheBenefits'
import Testimonials from '@/components/Testimonials'
import FAQ from '@/components/FAQ'
import Guarantee from '@/components/Guarantee'
import ContactForm from '@/components/ContactForm'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'
import SocialProofBar from '@/components/SocialProofBar'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <ClientLogos />
      <TrustBar />
      <Problem />
      <Technologies />
      <CaseStudies />
      <BeforeAfter />
      <Services />
      <Pricing />
      <Process />
      <Team />
      <NicheBenefits />
      <Testimonials />
      <FAQ />
      <Guarantee />
      <ContactForm />
      <CTA />
      <Footer />
      <SocialProofBar />
    </main>
  )
}

