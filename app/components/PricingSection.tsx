import { Button } from '@/components/ui/button'

const pricingPlans = [
  { name: "Basic", price: "$9.99", features: ["5 Projects", "10 Team Members", "Basic Analytics"] },
  { name: "Pro", price: "$19.99", features: ["Unlimited Projects", "Unlimited Team Members", "Advanced Analytics"] },
  { name: "Enterprise", price: "Custom", features: ["Custom Solutions", "Dedicated Support", "On-premise Option"] }
]

export default function PricingSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Pricing Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div key={index} className="border rounded-lg p-6 text-center">
              <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
              <p className="text-4xl font-bold mb-6">{plan.price}</p>
              <ul className="mb-6 space-y-2">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex}>{feature}</li>
                ))}
              </ul>
              <Button className="w-full">Choose Plan</Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}