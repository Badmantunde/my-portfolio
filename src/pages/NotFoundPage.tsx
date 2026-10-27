import { Link } from 'react-router-dom'
import { BlueprintPageHeader } from '../blueprint/components/BlueprintPageHeader'

export function NotFoundPage() {
  return (
    <BlueprintPageHeader
      index="404"
      label="Sheet missing"
      title="This drawing isn’t in the set."
      intro={
        <div className="flex flex-col gap-3">
          <p>The page you’re looking for has moved or never existed.</p>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            <Link to="/" className="bp-label text-bp-cyan">
              ← Home
            </Link>
            <Link to="/work" className="bp-label text-bp-text hover:text-bp-cyan">
              View work →
            </Link>
          </div>
        </div>
      }
    />
  )
}
