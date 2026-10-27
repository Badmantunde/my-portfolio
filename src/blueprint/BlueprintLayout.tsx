import { Outlet } from 'react-router-dom'
import { ScrollToTop } from '../components/ScrollToTop'
import { Seo } from '../components/Seo'
import { BlueprintFooter } from './components/BlueprintFooter'
import { BlueprintNavigation } from './components/BlueprintNavigation'
import { ScrollProgressIndicator } from './components/ScrollProgressIndicator'

/** Shell for every page. Inter is self-hosted (imported in main.tsx). */
export function BlueprintLayout() {
  return (
    <div className="bp min-h-screen">
      <ScrollToTop />
      <Seo />
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
