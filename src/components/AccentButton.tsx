import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'

interface AccentButtonProps {
  text: string
  className?: string
  icon?: ReactNode
  href?: string
}

const baseClass =
  'group inline-flex items-center gap-2 bg-[#2ECF73] hover:bg-[#28B866] text-white text-[13px] sm:text-[14px] rounded-full pl-5 sm:pl-6 pr-2 py-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]'

function ButtonContent({ text, icon }: { text: string; icon?: ReactNode }) {
  return (
    <>
      <span className="overflow-hidden h-[20px] flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-1/2">
        <span>{text}</span>
        <span>{text}</span>
      </span>
      <span className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45">
        {icon ?? <ArrowRight size={16} className="text-[#2ECF73]" />}
      </span>
    </>
  )
}

function isExternal(href: string) {
  return href.startsWith('http') || href.startsWith('mailto:')
}

export function AccentButton({ text, className = '', icon, href }: AccentButtonProps) {
  if (href) {
    if (isExternal(href) || href.startsWith('#')) {
      return (
        <a href={href} className={`${baseClass} ${className}`}>
          <ButtonContent text={text} icon={icon} />
        </a>
      )
    }
    return (
      <Link to={href} className={`${baseClass} ${className}`}>
        <ButtonContent text={text} icon={icon} />
      </Link>
    )
  }

  return (
    <button type="button" className={`${baseClass} ${className}`}>
      <ButtonContent text={text} icon={icon} />
    </button>
  )
}
