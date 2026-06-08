import { useRotatingText } from '../hooks/useRotatingText'

const roles = [
  'product engineering roles',
  'UI/UX design roles',
  'Flutter mobile app development',
  'Webflow development',
  'WordPress development',
  'software development',
  'website design',
]

export function RotatingAvailability({ className = '' }: { className?: string }) {
  const role = useRotatingText(roles)

  return (
    <span className={`flex items-center min-w-0 ${className}`}>
      <span className="text-gray-600 shrink-0">Open to&nbsp;</span>
      <span className="relative block overflow-hidden h-[18px] min-w-0 flex-1 lg:min-w-[240px]">
        <span
          key={role}
          className="absolute left-0 top-0 max-w-full truncate whitespace-nowrap text-gray-900 font-medium animate-[slideUp_0.5s_cubic-bezier(0.25,0.1,0.25,1)_forwards]"
        >
          {role}
        </span>
      </span>
    </span>
  )
}
