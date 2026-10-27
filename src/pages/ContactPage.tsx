import { useRef } from 'react'
import { blueprintContact } from '../data/blueprint'
import { contact } from '../data/contact'
import { audiences } from '../data/practice'
import { services } from '../data/services'
import { site } from '../data/site'
import { BlueprintPageHeader } from '../blueprint/components/BlueprintPageHeader'
import { CoordinateMarker } from '../blueprint/components/CoordinateMarker'
import { ContactForm } from '../blueprint/contact/ContactForm'
import { SHEET, useBlueprintMotion } from '../blueprint/lib/motion'

export function ContactPage() {
  const ref = useRef<HTMLElement>(null)
  useBlueprintMotion(ref, { start: 'top 80%', end: 'center 50%' })

  const channels = [
    { label: 'Email', value: contact.email, href: `mailto:${contact.email}`, external: false },
    { label: 'WhatsApp', value: contact.whatsapp.display, href: contact.whatsapp.href, external: true },
    ...blueprintContact.links
      .filter((link) => link.label !== 'Email' && link.label !== 'WhatsApp')
      .map((link) => ({
        label: link.label,
        value: link.href.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, ''),
        href: link.href,
        external: true,
      })),
  ]

  return (
    <>
      <BlueprintPageHeader
        index="06"
        label="Contact"
        meta="New project"
        title="Let’s build something meaningful."
        intro={
          <p>
            Based in Lagos, Nigeria and available for remote work worldwide. Tell me about your product, timeline, and
            goals. I will reply with a clear recommendation on scope and next steps.
          </p>
        }
      />

      <section ref={ref} aria-label="Contact" className={`${SHEET} pb-28 md:pb-40`}>
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <h2 className="bp-label text-bp-cyan">Send a message</h2>
            <p className="mt-3 text-[15px] text-bp-muted">Tell me about your project and I will follow up with next steps.</p>
            <div className="mt-10">
              <ContactForm />
            </div>
          </div>

          <div className="space-y-14 lg:col-span-4 lg:col-start-9">
            <div>
              <h2 className="bp-label text-bp-cyan">Direct lines</h2>
              <dl className="mt-6 border-t border-bp-line">
                {channels.map((channel) => (
                  <div key={channel.label} className="grid grid-cols-[88px_1fr] items-baseline gap-4 border-b border-bp-line py-4">
                    <dt className="bp-label text-[9.5px]">{channel.label}</dt>
                    <dd className="min-w-0">
                      <a
                        href={channel.href}
                        {...(channel.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        className="break-words text-[15px] text-bp-text transition-colors hover:text-bp-cyan"
                      >
                        {channel.value}
                        {channel.external && <span className="sr-only"> (opens in a new tab)</span>}
                      </a>
                    </dd>
                  </div>
                ))}
              </dl>
              <CoordinateMarker className="mt-6" label={`${site.location} · Remote worldwide`} />
            </div>

            <div>
              <h2 className="bp-label text-bp-cyan">Who I help</h2>
              <ul className="mt-6 border-t border-bp-line">
                {audiences.map((audience) => (
                  <li key={audience} data-reveal className="flex gap-3 border-b border-bp-line py-3 text-[14px] leading-relaxed text-bp-text/85">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 bg-bp-cyan" />
                    {audience}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="bp-label text-bp-cyan">What I build</h2>
              <ul className="mt-6 flex flex-wrap gap-2">
                {services.map((service) => (
                  <li key={service.title} className="border border-bp-line px-3 py-2 text-[13px] text-bp-text/85">
                    {service.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
