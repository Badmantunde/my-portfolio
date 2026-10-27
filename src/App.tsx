import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { BlueprintLayout } from './blueprint/BlueprintLayout'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'

const WorkPage = lazy(() => import('./pages/WorkPage').then((module) => ({ default: module.WorkPage })))
const ProjectPage = lazy(() => import('./pages/ProjectPage').then((module) => ({ default: module.ProjectPage })))
const AboutPage = lazy(() => import('./pages/AboutPage').then((module) => ({ default: module.AboutPage })))
const ProcessPage = lazy(() => import('./pages/ProcessPage').then((module) => ({ default: module.ProcessPage })))
const WritingPage = lazy(() => import('./pages/WritingPage').then((module) => ({ default: module.WritingPage })))
const ArticlePage = lazy(() => import('./pages/ArticlePage').then((module) => ({ default: module.ArticlePage })))
const ExperimentsPage = lazy(() =>
  import('./pages/ExperimentsPage').then((module) => ({ default: module.ExperimentsPage }))
)
const ContactPage = lazy(() => import('./pages/ContactPage').then((module) => ({ default: module.ContactPage })))

function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route element={<BlueprintLayout />}>
          <Route index element={<HomePage />} />
          <Route path="work" element={<WorkPage />} />
          <Route path="work/:slug" element={<ProjectPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="process" element={<ProcessPage />} />
          <Route path="writing" element={<WritingPage />} />
          <Route path="writing/:slug" element={<ArticlePage />} />
          <Route path="experiments" element={<ExperimentsPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
