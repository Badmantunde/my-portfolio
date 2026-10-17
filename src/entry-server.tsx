import { StrictMode } from 'react'
import { PassThrough } from 'node:stream'
import { renderToPipeableStream } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from './App.tsx'

/** Renders a route to HTML at build time, waiting for lazy routes and sections to resolve. */
export function render(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    let html = ''
    const stream = new PassThrough()
    stream.on('data', (chunk) => {
      html += chunk
    })
    stream.on('end', () => resolve(html))
    stream.on('error', reject)

    const { pipe } = renderToPipeableStream(
      <StrictMode>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </StrictMode>,
      {
        onAllReady() {
          pipe(stream)
        },
        onShellError: reject,
        onError: reject,
      }
    )
  })
}
