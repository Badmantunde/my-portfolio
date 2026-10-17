import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="bg-[#EDF0ED] px-5 sm:px-8 lg:px-12 pt-40 pb-32 text-center">
      <h1 className="text-2xl font-medium text-gray-900">Page not found</h1>
      <p className="mt-3 text-[15px] text-gray-600">
        This page does not exist or has moved.
      </p>
      <div className="mt-6 flex justify-center gap-6 text-sm font-medium">
        <Link to="/" className="text-[#32C876]">
          ← Home
        </Link>
        <Link to="/work" className="text-[#32C876]">
          See case studies
        </Link>
      </div>
    </div>
  )
}
