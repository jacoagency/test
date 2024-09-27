import { CheckCircle } from 'lucide-react'

const features = [
  "Task Management",
  "Team Collaboration",
  "Time Tracking",
  "Project Analytics"
]

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-3 bg-white p-6 rounded-lg shadow-md">
              <CheckCircle className="text-green-500" />
              <span className="text-lg font-semibold">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}