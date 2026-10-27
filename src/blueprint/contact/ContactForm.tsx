import { useState, type FormEvent } from 'react'
import { contact } from '../../data/contact'
import { services } from '../../data/services'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

const budgetOptions = ['Not sure yet', 'Under $2,000', '$2,000 to $5,000', '$5,000 to $10,000', '$10,000+']
const timelineOptions = ['ASAP', 'Within 1 month', '1 to 3 months', 'Flexible']

const emptyForm = { name: '', email: '', service: '', budget: '', timeline: '', message: '' }

const field =
  'w-full border-0 border-b border-bp-cyan/30 bg-transparent px-0 py-3 text-[16px] text-bp-text placeholder:text-bp-muted/50 outline-none transition-colors focus:border-bp-cyan focus:ring-0'
const label = 'bp-label block text-[9.5px]'

/** Project enquiry form; submissions are delivered to the site email through FormSubmit. */
export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [form, setForm] = useState(emptyForm)
  const set = (key: keyof typeof emptyForm) => (event: { target: { value: string } }) =>
    setForm((current) => ({ ...current, [key]: event.target.value }))

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('submitting')
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${contact.email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          service: form.service || 'Not specified',
          budget: form.budget || 'Not specified',
          timeline: form.timeline || 'Not specified',
          message: form.message,
          _subject: `Portfolio inquiry from ${form.name}`,
          _template: 'table',
        }),
      })
      if (!response.ok) throw new Error('Submission failed')
      setStatus('success')
      setForm(emptyForm)
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div role="status" className="border border-bp-cyan/40 bg-bp-deep/40 px-6 py-12 text-center md:px-10">
        <span className="bp-label text-bp-cyan">Received</span>
        <h3 className="mt-4 text-3xl font-light tracking-tight text-bp-text">Message sent.</h3>
        <p className="mx-auto mt-4 max-w-sm text-[15px] leading-relaxed text-bp-muted">
          Thanks for reaching out. I will review your project details and get back to you within 24 hours.
        </p>
        <button type="button" onClick={() => setStatus('idle')} className="bp-label mt-8 text-bp-text transition-colors hover:text-bp-cyan">
          Send another message →
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate={false}>
      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={label}>Name</label>
          <input id="contact-name" type="text" required autoComplete="name" placeholder="Your name" value={form.name} onChange={set('name')} className={field} />
        </div>
        <div>
          <label htmlFor="contact-email" className={label}>Email</label>
          <input id="contact-email" type="email" required autoComplete="email" placeholder="you@company.com" value={form.email} onChange={set('email')} className={field} />
        </div>
      </div>
      <div>
        <label htmlFor="contact-service" className={label}>What do you need?</label>
        <select id="contact-service" value={form.service} onChange={set('service')} className={`${field} [&>option]:bg-bp-ink`}>
          <option value="">Select a service</option>
          {services.map((service) => (
            <option key={service.title} value={service.title}>{service.title}</option>
          ))}
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-budget" className={label}>Budget</label>
          <select id="contact-budget" value={form.budget} onChange={set('budget')} className={`${field} [&>option]:bg-bp-ink`}>
            <option value="">Select a range</option>
            {budgetOptions.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="contact-timeline" className={label}>Timeline</label>
          <select id="contact-timeline" value={form.timeline} onChange={set('timeline')} className={`${field} [&>option]:bg-bp-ink`}>
            <option value="">Select a timeline</option>
            {timelineOptions.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="contact-message" className={label}>Project details</label>
        <textarea
          id="contact-message"
          required
          rows={5}
          placeholder="Share your goals, timeline, and any links to existing designs or products."
          value={form.message}
          onChange={set('message')}
          className={`${field} resize-y`}
        />
      </div>

      {status === 'error' && (
        <p role="alert" className="text-sm text-[#ff9a9a]">
          Something went wrong. Please try again or email{' '}
          <a href={`mailto:${contact.email}`} className="underline">{contact.email}</a>.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="group relative inline-flex items-center gap-4 border border-bp-cyan/60 px-8 py-4 transition-colors hover:border-bp-cyan hover:bg-bp-cyan/10 disabled:opacity-60"
      >
        <span aria-hidden="true" className="absolute -left-px -top-px h-2 w-2 border-l border-t border-bp-cyan" />
        <span aria-hidden="true" className="absolute -bottom-px -right-px h-2 w-2 border-b border-r border-bp-cyan" />
        <span className="bp-label text-[11px] text-bp-text">{status === 'submitting' ? 'Sending…' : 'Send message'}</span>
        <span aria-hidden="true" className="text-bp-cyan transition-transform group-hover:translate-x-1">→</span>
      </button>
    </form>
  )
}
