import { PageHeader } from '../components/PageHeader'
import { ProcessSection } from '../components/ProcessSection'
import { AIWorkflowSection } from '../components/AIWorkflowSection'
import { CapabilityMatrixSection } from '../components/CapabilityMatrixSection'

export function ProcessPage() {
  return (
    <>
      <PageHeader
        label="How I work"
        title="Product engineering process"
        description="From discovery to scale: strategy, design, engineering, and AI systems owned end to end."
      />
      <ProcessSection hideHeader />
      <AIWorkflowSection />
      <CapabilityMatrixSection hideHeader />
    </>
  )
}
