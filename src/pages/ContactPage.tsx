import { Mail, MapPin, MessageCircle } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { ContactForm } from '../components/ContactForm'
import { AnimateIn } from '../components/AnimateIn'
import { SECTION_PY } from '../lib/section'
import { contact } from '../data/contact'
import { services } from '../data/services'

const audiences = [
  'Startups launching an MVP or first product version',
  'Founders who need one person across design and development',
  'Product teams needing UI/UX design or frontend engineering support',
  'Businesses upgrading a marketing site, Webflow build, or WordPress site',
  'Fintech, SaaS, community, and AgriTech products',
]

export function ContactPage() {
  return (
    <>
      <PageHeader
        label="Contact"
        title="Hire a product designer, developer, or website designer"
        description="Based in Lagos, Nigeria and available for remote work worldwide. Tell me about your product, timeline, and goals. I will reply with a clear recommendation on scope and next steps."
      />

      <section className={`bg-white ${SECTION_PY}`}>
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5 space-y-10">
              <AnimateIn variant="fade-up">
                <h2 className="text-[20px] sm:text-[22px] font-medium text-gray-900 tracking-[-0.02em] mb-4">
                  Who I help
                </h2>
                <p className="text-[15px] sm:text-[16px] leading-[1.7] text-gray-600 mb-5">
                  I partner with founders, product managers, and small teams who
                  need a UI/UX designer, software developer, or website designer
                  they can trust to move fast without sacrificing quality.
                </p>
                <ul className="space-y-3">
                  {audiences.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-[14px] sm:text-[15px] leading-[1.6] text-gray-700"
                    >
                      <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-[#3DDB84] mt-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </AnimateIn>

              <AnimateIn variant="fade-up" delay={100}>
                <h2 className="text-[20px] sm:text-[22px] font-medium text-gray-900 tracking-[-0.02em] mb-4">
                  What I build
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {services.map((service) => (
                    <li
                      key={service.title}
                      className="text-[14px] font-medium text-gray-900 bg-[#F5F5F5] rounded-xl px-4 py-3"
                    >
                      {service.title}
                    </li>
                  ))}
                </ul>
              </AnimateIn>

              <AnimateIn variant="fade-up" delay={160} className="space-y-5 pt-2">
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="shrink-0 mt-0.5 text-[#32C876]" />
                  <p className="text-[14px] sm:text-[15px] leading-[1.6] text-gray-600">
                    Lagos, Nigeria. Available for remote projects across Africa,
                    Europe, and North America.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={16} className="shrink-0 text-[#32C876]" />
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-[14px] sm:text-[15px] text-gray-700 hover:text-[#32C876] transition-colors"
                  >
                    {contact.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <MessageCircle size={16} className="shrink-0 text-[#32C876]" />
                  <a
                    href={contact.whatsapp.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[14px] sm:text-[15px] text-gray-700 hover:text-[#32C876] transition-colors"
                  >
                    {contact.whatsapp.display}
                  </a>
                </div>
              </AnimateIn>
            </div>

            <AnimateIn variant="slide-right" delay={120} className="lg:col-span-7">
              <ContactForm />
            </AnimateIn>
          </div>
        </div>
      </section>
    </>
  )
}
