import Link from 'next/link'
import { Button } from '@/components/ui/button'
import HeroSection from '@/app/components/HeroSection'
import FeaturesSection from '@/app/components/FeaturesSection'
import PricingSection from '@/app/components/PricingSection'
import TestimonialsSection from '@/app/components/TestimonialSection'
import Footer from "@/app/components/Footer"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  )
}