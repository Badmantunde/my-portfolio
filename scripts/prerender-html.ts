import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { buildSeoHeadHtml, getSeoForPath, prerenderPaths } from '../src/lib/seo.ts'

const rootDir = dirname(fileURLToPath(import.meta.url))
const distDir = resolve(rootDir, '../dist')
const ssrDir = resolve(rootDir, '../dist-ssr')
const template = inlineStylesheet(readFileSync(resolve(distDir, 'index.html'), 'utf8'))

const { render } = (await import(pathToFileURL(resolve(ssrDir, 'entry-server.js')).href)) as {
  render: (url: string) => Promise<string>
}

const seoStart = '<!-- seo:start -->'
const seoEnd = '<!-- seo:end -->'
const rootMarkup = '<div id="root"></div>'

function replaceBetween(
  html: string,
  startMarker: string,
  endMarker: string,
  replacement: string
) {
  const start = html.indexOf(startMarker)
  const end = html.indexOf(endMarker)
  if (start === -1 || end === -1) {
    throw new Error(`Missing prerender markers (${startMarker} / ${endMarker})`)
  }

  return `${html.slice(0, start + startMarker.length)}\n${replacement}\n    ${html.slice(end)}`
}

/**
 * Inlines the stylesheet (about 8 KB compressed) so first paint does not wait on a second request. Inter uses
 * font-display: swap, so text paints in the fallback font straight away and needs no preload competing with it.
 */
function inlineStylesheet(html: string) {
  const stylesheet = /<link rel="stylesheet" crossorigin href="\/assets\/([^"]+\.css)">/
  const match = html.match(stylesheet)
  if (!match) throw new Error('Missing the built stylesheet link in dist/index.html')
  const css = readFileSync(resolve(distDir, 'assets', match[1]), 'utf8')
  return html.replace(stylesheet, () => `<style>${css}</style>`)
}

function outputPathForRoute(path: string) {
  if (path === '/') return resolve(distDir, 'index.html')
  // Vercel serves dist/404.html with a 404 status for any unmatched URL.
  if (path === '/404') return resolve(distDir, '404.html')
  return resolve(distDir, `${path.slice(1)}/index.html`)
}

if (!template.includes(rootMarkup)) {
  throw new Error(`Missing ${rootMarkup} in dist/index.html`)
}

for (const path of prerenderPaths()) {
  const appHtml = await render(path)
  const html = replaceBetween(template, seoStart, seoEnd, buildSeoHeadHtml(getSeoForPath(path)))
    .replace(rootMarkup, `<div id="root">${appHtml}</div>`)
  const outputPath = outputPathForRoute(path)
  mkdirSync(dirname(outputPath), { recursive: true })
  writeFileSync(outputPath, html)
  console.log(`prerendered ${path} -> ${outputPath.replace(`${distDir}/`, '')}`)
}

rmSync(ssrDir, { recursive: true, force: true })
