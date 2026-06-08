import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowRight, Clock, Menu, X } from 'lucide-react'
import { useLondonTime } from '../hooks/useLondonTime'
import { MobileMenu } from './MobileMenu'
import { RotatingAvailability } from './RotatingAvailability'

const navLinks = [
  { label: 'Work', to: '/work' },
  { label: 'About', to: '/about' },
  { label: 'Process', to: '/process' },
  { label: 'Writing', to: '/writing' },
  { label: 'Contact', to: '/contact' },
]

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false)
  const londonTime = useLondonTime()
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full p-2 sm:p-3 transition-colors duration-300 ${
          isHome
            ? 'bg-[#EDF0ED]/80 backdrop-blur-lg'
            : 'bg-white/90 backdrop-blur-lg border-b border-gray-100'
        }`}
      >
        <nav className="max-w-[1440px] mx-auto relative z-50">
          <div className="bg-white rounded-full p-[5px] flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-4 sm:gap-6 pl-1 sm:pl-2">
              <Link
                to="/"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-900 rounded-full flex items-center justify-center ring-2 ring-[#3DDB84]/20 shrink-0"
              >
                <span className="text-white text-[10px] sm:text-[11px] font-bold tracking-tight">
                  AB
                </span>
              </Link>

              <div className="hidden md:flex items-center gap-6">
                {navLinks.map((link) => {
                  const active =
                    link.to === '/work'
                      ? pathname === '/work' || pathname.startsWith('/work/')
                      : pathname === link.to
                  return (
                    <Link
                      key={link.label}
                      to={link.to}
                      className={`text-[14px] transition-colors duration-300 ${
                        active ? 'text-[#32C876]' : 'text-gray-900 hover:text-[#32C876]'
                      }`}
                    >
                      {link.label}
                    </Link>
                  )
                })}
              </div>
            </div>

            <div className="hidden md:flex items-center gap-4 lg:gap-5 pr-1">
              <RotatingAvailability className="hidden lg:inline-flex text-[13px]" />

              <div className="flex items-center gap-1.5">
                <Clock size={14} className="text-gray-600" />
                <span className="text-[13px] text-gray-600">
                  {londonTime} in London
                </span>
              </div>

              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 bg-gray-900 text-white text-[13px] font-medium rounded-full pl-5 pr-2 py-2 shrink-0"
              >
                <span className="overflow-hidden h-[20px] flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-1/2">
                  <span>Book a discovery call</span>
                  <span>Book a discovery call</span>
                </span>
                <span className="flex items-center justify-center w-6 h-6 bg-[#3DDB84] rounded-full transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45">
                  <ArrowRight size={14} className="text-gray-900" />
                </span>
              </Link>
            </div>

            <button
              type="button"
              className="md:hidden w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center shrink-0"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? (
                <X size={18} className="text-white" />
              ) : (
                <Menu size={18} className="text-white" />
              )}
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
