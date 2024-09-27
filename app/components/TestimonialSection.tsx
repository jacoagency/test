const testimonials = [
    { name: "John Doe", role: "CEO, TechCorp", text: "This tool has revolutionized how we manage projects!" },
    { name: "Jane Smith", role: "Project Manager, InnovateCo", text: "I can't imagine working without it now." },
    { name: "Alex Johnson", role: "Freelancer", text: "Perfect for keeping track of multiple client projects." }
  ]
  
  export default function TestimonialsSection() {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <p className="mb-4 italic">"{testimonial.text}"</p>
                <p className="font-bold">{testimonial.name}</p>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }