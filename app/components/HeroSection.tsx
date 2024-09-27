import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-20">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Manage Your Projects with Ease</h1>
        <p className="text-xl mb-8">Streamline your workflow and boost productivity</p>
        <Link href="/sign-up">
          <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
            Get Started
          </Button>
        </Link>
      </div>
    </section>
  )
}