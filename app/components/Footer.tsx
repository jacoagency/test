import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <p>&copy; 2024 ProjectManager. All rights reserved.</p>
        </div>
        <div className="flex space-x-4 mb-4 md:mb-0">
          <Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link>
          <Link href="/terms-of-service" className="hover:underline">Terms of Service</Link>
        </div>
        <div className="flex space-x-4">
          <Link href="#" aria-label="Facebook"><Facebook /></Link>
          <Link href="#" aria-label="Twitter"><Twitter /></Link>
          <Link href="#" aria-label="Instagram"><Instagram /></Link>
          <Link href="#" aria-label="LinkedIn"><Linkedin /></Link>
        </div>
      </div>
    </footer>
  )
}