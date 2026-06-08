import { Link } from 'react-router-dom'
import { ArrowRight, Clock } from 'lucide-react'
import { useLondonTime } from '../hooks/useLondonTime'

const navLinks = [
  { label: 'Work', to: '/work' },
  { label: 'About', to: '/about' },
  { label: 'Process', to: '/process' },
  { label: 'Writing', to: '/writing' },
  { label: 'Contact', to: '/contact' },
]

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const londonTime = useLondonTime()

  return (
    <div
      className={`fixed inset-0 z-50 md:hidden transition-opacity duration-500 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className={`absolute bottom-0 left-0 right-0 mx-3 mb-3 bg-white rounded-2xl p-6 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 mb-8">
          <Clock size={14} className="text-gray-600" />
          <span className="text-[13px] text-gray-600">
            {londonTime} in London
          </span>
        </div>

        <nav className="flex flex-col gap-6 mb-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="text-[28px] sm:text-[32px] font-medium text-gray-900"
              onClick={onClose}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/contact"
          onClick={onClose}
          className="group w-full inline-flex items-center justify-between bg-gray-900 text-white text-[14px] font-medium rounded-full pl-6 pr-2 py-3"
        >
          <span className="overflow-hidden h-[20px] flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-1/2">
            <span>Book a discovery call</span>
            <span>Book a discovery call</span>
          </span>
          <span className="flex items-center justify-center w-8 h-8 bg-[#3DDB84] rounded-full transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45">
            <ArrowRight size={16} className="text-gray-900" />
          </span>
        </Link>
      </div>
    </div>
  )
}
