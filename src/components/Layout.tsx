import { Outlet, useLocation } from 'react-router-dom'
import { Navigation } from './Navigation'
import { ScrollToTop } from './ScrollToTop'
import { FinalCTASection } from './FinalCTASection'
import { Footer } from './Footer'

export function Layout() {
  const { pathname } = useLocation()
  const showCTA = pathname !== '/contact'

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Navigation />
      <main className="flex-1">
        <Outlet />
      </main>
      {showCTA && <FinalCTASection />}
      <Footer />
    </div>
  )
}
