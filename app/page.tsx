import Header from '@/components/Header'
import Hero from '@/components/Hero'
import TrustBar from '@/components/TrustBar'
import ClientLogos from '@/components/ClientLogos'
import Problem from '@/components/Problem'
import About from '@/components/About'
import SalesExpertise from '@/components/SalesExpertise'
import Technologies from '@/components/Technologies'
import CaseStudies from '@/components/CaseStudies'
import Services from '@/components/Services'
import WhoWeServe from '@/components/WhoWeServe'
import Process from '@/components/Process'
import Team from '@/components/Team'
import Guarantee from '@/components/Guarantee'
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
      <Problem />
      <SalesExpertise />
      <Technologies />
      <CaseStudies />
      <Services />
      <WhoWeServe />
      <Process />
      <Team />
      <Guarantee />
      <CTA />
      <Footer />
      <SocialProofBar />
    </main>
  )
}

