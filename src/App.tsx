import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'

const WorkPage = lazy(() =>
  import('./pages/WorkPage').then((module) => ({ default: module.WorkPage }))
)
const CaseStudyPage = lazy(() =>
  import('./pages/CaseStudyPage').then((module) => ({ default: module.CaseStudyPage }))
)
const AboutPage = lazy(() =>
  import('./pages/AboutPage').then((module) => ({ default: module.AboutPage }))
)
const ProcessPage = lazy(() =>
  import('./pages/ProcessPage').then((module) => ({ default: module.ProcessPage }))
)
const WritingPage = lazy(() =>
  import('./pages/WritingPage').then((module) => ({ default: module.WritingPage }))
)
const ArticlePage = lazy(() =>
  import('./pages/ArticlePage').then((module) => ({ default: module.ArticlePage }))
)
const ContactPage = lazy(() =>
  import('./pages/ContactPage').then((module) => ({ default: module.ContactPage }))
)

function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="work" element={<WorkPage />} />
          <Route path="work/:slug" element={<CaseStudyPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="process" element={<ProcessPage />} />
          <Route path="writing" element={<WritingPage />} />
          <Route path="writing/:slug" element={<ArticlePage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
