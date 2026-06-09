import { PageHeader } from '../components/PageHeader'
import { WritingSection } from '../components/WritingSection'

export function WritingPage() {
  return (
    <>
      <PageHeader
        label="Writing & insights"
        title="Thinking in public"
        description="Guides on product design, hiring Webflow and WordPress developers, UI/UX, frontend development, and building startups in Nigeria."
      />
      <WritingSection hideHeader />
    </>
  )
}
