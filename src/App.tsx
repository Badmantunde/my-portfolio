import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { WorkPage } from './pages/WorkPage'
import { CaseStudyPage } from './pages/CaseStudyPage'
import { AboutPage } from './pages/AboutPage'
import { ProcessPage } from './pages/ProcessPage'
import { WritingPage } from './pages/WritingPage'
import { ArticlePage } from './pages/ArticlePage'
import { ContactPage } from './pages/ContactPage'

function App() {
  return (
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
  )
}

export default App
