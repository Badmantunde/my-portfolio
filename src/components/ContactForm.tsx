import { useState, type FormEvent } from 'react'
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react'
import { contact } from '../data/contact'
import { services } from '../data/services'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

const budgetOptions = [
  'Not sure yet',
  'Under $2,000',
  '$2,000 – $5,000',
  '$5,000 – $10,000',
  '$10,000+',
]

const timelineOptions = [
  'ASAP',
  'Within 1 month',
  '1 – 3 months',
  'Flexible',
]

const inputClass =
  'w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[14px] text-gray-900 placeholder:text-gray-400 outline-none transition-colors focus:border-[#3DDB84] focus:ring-2 focus:ring-[#3DDB84]/20'

const labelClass = 'block text-[13px] font-medium text-gray-900 mb-1.5'

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [form, setForm] = useState({
    name: '',
    email: '',
    service: '',
    budget: '',
    timeline: '',
    message: '',
  })

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${contact.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
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
      setForm({
        name: '',
        email: '',
        service: '',
        budget: '',
        timeline: '',
        message: '',
      })
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-[#EDF5F0] border border-[#3DDB84]/20 rounded-2xl p-8 sm:p-10 text-center">
        <CheckCircle2 size={40} className="text-[#32C876] mx-auto mb-4" />
        <h3 className="text-[18px] sm:text-[20px] font-semibold text-gray-900">
          Message sent
        </h3>
        <p className="mt-2 text-[14px] sm:text-[15px] leading-[1.6] text-gray-600 max-w-sm mx-auto">
          Thanks for reaching out. I will review your project details and get back
          to you within 24 hours.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-6 text-[13px] font-medium text-[#32C876] hover:text-[#28B866] transition-colors"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[#F5F5F5] rounded-2xl p-6 sm:p-8 space-y-5">
      <div>
        <h2 className="text-[18px] sm:text-[20px] font-semibold text-gray-900">
          Send a message
        </h2>
        <p className="mt-1 text-[13px] sm:text-[14px] text-gray-600">
          Tell me about your project and I will follow up with next steps.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            Name
          </label>
          <input
            id="contact-name"
            type="text"
            required
            autoComplete="name"
            className={inputClass}
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className={labelClass}>
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            required
            autoComplete="email"
            className={inputClass}
            placeholder="you@company.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-service" className={labelClass}>
          What do you need help with?
        </label>
        <select
          id="contact-service"
          className={inputClass}
          value={form.service}
          onChange={(e) => setForm({ ...form, service: e.target.value })}
        >
          <option value="">Select a service</option>
          {services.map((service) => (
            <option key={service.title} value={service.title}>
              {service.title}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-budget" className={labelClass}>
            Budget range
          </label>
          <select
            id="contact-budget"
            className={inputClass}
            value={form.budget}
            onChange={(e) => setForm({ ...form, budget: e.target.value })}
          >
            <option value="">Select budget</option>
            {budgetOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="contact-timeline" className={labelClass}>
            Timeline
          </label>
          <select
            id="contact-timeline"
            className={inputClass}
            value={form.timeline}
            onChange={(e) => setForm({ ...form, timeline: e.target.value })}
          >
            <option value="">Select timeline</option>
            {timelineOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClass}>
          Project details
        </label>
        <textarea
          id="contact-message"
          required
          rows={5}
          className={`${inputClass} resize-y min-h-[120px]`}
          placeholder="Share your goals, timeline, and any links to existing designs or products."
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
      </div>

      {status === 'error' && (
        <p className="text-[13px] text-red-600">
          Something went wrong. Please try again or email{' '}
          <a href={`mailto:${contact.email}`} className="underline">
            {contact.email}
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="group inline-flex items-center gap-2 bg-[#2ECF73] hover:bg-[#28B866] disabled:opacity-70 disabled:cursor-not-allowed text-white text-[13px] sm:text-[14px] font-medium rounded-full pl-5 sm:pl-6 pr-2 py-2 transition-all duration-300"
      >
        <span>
          {status === 'submitting' ? 'Sending...' : 'Send message'}
        </span>
        <span className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full transition-transform duration-500 group-enabled:group-hover:-rotate-45">
          {status === 'submitting' ? (
            <Loader2 size={16} className="text-[#2ECF73] animate-spin" />
          ) : (
            <ArrowRight size={16} className="text-[#2ECF73]" />
          )}
        </span>
      </button>
    </form>
  )
}
