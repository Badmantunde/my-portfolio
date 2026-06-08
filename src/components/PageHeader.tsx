
interface PageHeaderProps {
  label: string
  title: string
  description?: string
}

export function PageHeader({ label, title, description }: PageHeaderProps) {
  return (
    <div className="bg-[#EDF0ED] pt-28 sm:pt-32 pb-8 sm:pb-10">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <span className="inline-block text-[12px] sm:text-[13px] font-medium border border-gray-200 bg-white rounded-full px-3 sm:px-4 py-1 sm:py-1.5 mb-6">
          {label}
        </span>
        <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-medium leading-[1.08] tracking-[-0.03em] text-gray-900">
          {title}
        </h1>
        {description && (
          <p className="mt-4 sm:mt-5 max-w-2xl text-[15px] sm:text-[16px] leading-[1.6] text-gray-600">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}
