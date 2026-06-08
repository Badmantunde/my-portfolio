import { PageHeader } from '../components/PageHeader'
import { WritingSection } from '../components/WritingSection'

export function WritingPage() {
  return (
    <>
      <PageHeader
        label="Writing & insights"
        title="Thinking in public"
        description="Essays on product strategy, engineering craft, design systems, and AI-native development."
      />
      <WritingSection hideHeader />
    </>
  )
}
