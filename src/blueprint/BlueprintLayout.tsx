import { Outlet } from 'react-router-dom'
import { ScrollToTop } from '../components/ScrollToTop'
import { Seo } from '../components/Seo'
import { BlueprintFooter } from './components/BlueprintFooter'
import { BlueprintNavigation } from './components/BlueprintNavigation'
import { ScrollProgressIndicator } from './components/ScrollProgressIndicator'

/** Shell for every page of the blueprint version (/blueprint/*). */
export function BlueprintLayout() {
  return (
    <div className="bp min-h-screen">
      <ScrollToTop />
      <Seo />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap" />
      <a
        href="#bp-main"
        className="bp-label sr-only z-[60] bg-bp-ink px-4 py-3 text-bp-cyan focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <BlueprintNavigation />
      <ScrollProgressIndicator />
      <main id="bp-main">
        <Outlet />
      </main>
      <BlueprintFooter />
    </div>
  )
}
