export function AvailabilityBadge() {
  return (
    <div className="inline-flex items-center gap-2 sm:gap-3 bg-white rounded-[4px] px-3 sm:px-4 py-2 shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-shadow">
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3DDB84] opacity-40" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#3DDB84] shadow-[0_0_6px_rgba(61,219,132,0.45)]" />
      </span>
      <span className="text-[13px] sm:text-[14px] font-medium text-gray-900">
        Available for Q2 2026
      </span>
    </div>
  )
}
