import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { primaryNav } from '../../data/blueprint'
import { cn } from '../lib/motion'

/** Drawing-legend style navigation: name on the left, page links on the right. */
export function BlueprintNavigation() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-24 bg-gradient-to-b from-[#071A2D]/90 via-[#071A2D]/50 to-transparent"
      />
      <nav
        aria-label="Primary"
        className="relative mx-auto flex h-14 max-w-[1440px] items-center justify-between px-5 md:h-16 md:px-10"
      >
        <Link to="/" className="bp-label text-[11px] text-bp-text transition-colors hover:text-bp-cyan">
          Abiola Babatunde
        </Link>

        <ul className="hidden items-center lg:flex">
          {primaryNav.map((item, i) => (
            <li key={item.to} className="flex items-center">
              {i > 0 && <span aria-hidden="true" className="h-3 w-px bg-bp-cyan/25" />}
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'bp-label relative px-4 py-2 transition-colors hover:text-bp-cyan',
                    isActive ? 'text-bp-cyan' : 'text-bp-muted'
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    {isActive && <span aria-hidden="true" className="absolute inset-x-4 -bottom-0.5 h-px bg-bp-cyan" />}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="bp-label -mr-2 flex items-center gap-2 px-2 py-2 text-bp-text lg:hidden"
          aria-expanded={open}
          aria-controls="bp-mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span>{open ? 'Close' : 'Index'}</span>
          <span aria-hidden="true" className="relative block h-2.5 w-4">
            <span
              className={cn(
                'absolute left-0 top-0 h-px w-4 bg-bp-cyan transition-transform',
                open && 'translate-y-[5px] rotate-45'
              )}
            />
            <span
              className={cn(
                'absolute bottom-0 left-0 h-px w-4 bg-bp-cyan transition-transform',
                open && '-translate-y-[4px] -rotate-45'
              )}
            />
          </span>
        </button>
      </nav>
      <div aria-hidden="true" className="relative mx-5 h-px bg-gradient-to-r from-transparent via-bp-cyan/20 to-transparent md:mx-10" />

      <div id="bp-mobile-menu" hidden={!open} className="relative border-b border-bp-cyan/15 bg-bp-ink px-5 pb-6 pt-2 lg:hidden">
        <ul>
          {primaryNav.map((item) => (
            <li key={item.to} className="border-t border-bp-cyan/10 first:border-t-0">
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'flex items-baseline justify-between py-4 text-2xl font-light tracking-tight',
                    isActive ? 'text-bp-cyan' : 'text-bp-text'
                  )
                }
              >
                {item.label}
                <span className="bp-label bp-num text-bp-cyan/70">{item.index}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
