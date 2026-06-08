import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import { SectionHeader } from './SectionHeader'
import { SECTION_PY } from '../lib/section'
import { faqs } from '../data/faqs'
import { AccentButton } from './AccentButton'

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className={`bg-white ${SECTION_PY}`}>
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <SectionHeader
              label="FAQ"
              heading="Common questions"
            />
            <p className="mt-4 text-[15px] sm:text-[16px] leading-[1.6] text-gray-600 max-w-sm">
              Answers on how I work, what I build, and how we can collaborate on
              your next product.
            </p>
            <AccentButton text="Book a discovery call" href="/contact" className="mt-6" />
          </div>

          <div className="lg:col-span-8 divide-y divide-gray-200 border-t border-gray-200">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index
              return (
                <div key={faq.question} className="py-5 sm:py-6">
                  <button
                    type="button"
                    className="w-full flex items-start justify-between gap-4 text-left group"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                  >
                    <span className="text-[15px] sm:text-[16px] font-medium text-gray-900 group-hover:text-[#28B866] transition-colors pr-4">
                      {faq.question}
                    </span>
                    <span className="shrink-0 w-8 h-8 rounded-full bg-[#F5F5F5] group-hover:bg-[#EDF5F0] flex items-center justify-center transition-colors">
                      {isOpen ? (
                        <Minus size={16} className="text-gray-700" />
                      ) : (
                        <Plus size={16} className="text-gray-700" />
                      )}
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                      isOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-[14px] sm:text-[15px] leading-[1.65] text-gray-600 pr-12">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
