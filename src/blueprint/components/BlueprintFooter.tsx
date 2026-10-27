import { Link } from 'react-router-dom'
import { contact } from '../../data/contact'
import { site } from '../../data/site'
import { socialLinks } from '../../data/social'
import { SHEET } from '../lib/motion'

const pages = [
  { label: 'Work', to: '/work' },
  { label: 'About', to: '/about' },
  { label: 'Process', to: '/process' },
  { label: 'Writing', to: '/writing' },
  { label: 'Experiments', to: '/experiments' },
  { label: 'Contact', to: '/contact' },
]

/** Site index and the drawing's title block, closing every page. */
export function BlueprintFooter() {
  const titleBlock = [
    { label: 'Project', value: 'Portfolio' },
    { label: 'Drawn by', value: site.name },
    { label: 'Location', value: site.location },
    { label: 'Practice', value: 'Design & build' },
    { label: 'Scale', value: '1 : 1' },
    { label: 'Revision', value: '2026' },
  ]

  return (
    <footer className={`${SHEET} pb-2 pt-16`}>
      <div className="grid gap-12 pb-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="bp-label text-bp-text">{site.name}</p>
          <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-bp-muted">
            Product designer in Lagos who designs in Figma and builds in Webflow, Shopify, Next.js and Flutter.
          </p>
          <a href={`mailto:${contact.email}`} className="mt-6 inline-block text-[15px] text-bp-text transition-colors hover:text-bp-cyan">
            {contact.email}
          </a>
        </div>
        <nav aria-label="Footer" className="md:col-span-3 md:col-start-7">
          <h2 className="bp-label text-[9.5px] text-bp-cyan">Index</h2>
          <ul className="mt-4 space-y-2.5">
            {pages.map((page) => (
              <li key={page.to}>
                <Link to={page.to} className="text-[15px] text-bp-text/85 transition-colors hover:text-bp-cyan">
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="md:col-span-3">
          <h2 className="bp-label text-[9.5px] text-bp-cyan">Elsewhere</h2>
          <ul className="mt-4 space-y-2.5">
            {[...socialLinks, { label: 'WhatsApp', href: contact.whatsapp.href }].map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[15px] text-bp-text/85 transition-colors hover:text-bp-cyan"
                >
                  {link.label} <span aria-hidden="true" className="text-bp-cyan/70">↗</span>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-bp-cyan/30">
        <dl className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
          {titleBlock.map((cell) => (
            <div
              key={cell.label}
              className="border-b border-r border-bp-line px-4 py-4 [&:nth-child(2n)]:border-r-0 sm:[&:nth-child(2n)]:border-r sm:[&:nth-child(3n)]:border-r-0 lg:border-b-0 lg:[&:nth-child(3n)]:border-r lg:last:border-r-0"
            >
              <dt className="bp-label text-[9px]">{cell.label}</dt>
              <dd className="bp-num mt-1.5 text-[13px] text-bp-text/90">{cell.value}</dd>
            </div>
          ))}
        </dl>
        <p className="bp-label border-t border-bp-line py-6 text-[9.5px]">© 2026 {site.name}. All rights reserved.</p>
      </div>
    </footer>
  )
}
