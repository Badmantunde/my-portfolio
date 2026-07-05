import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  allSitemapPaths,
  buildPrerenderBodyHtml,
  buildSeoHeadHtml,
  getSeoForPath,
} from '../src/lib/seo.ts'

const rootDir = dirname(fileURLToPath(import.meta.url))
const distDir = resolve(rootDir, '../dist')
const template = readFileSync(resolve(distDir, 'index.html'), 'utf8')

const seoStart = '<!-- seo:start -->'
const seoEnd = '<!-- seo:end -->'
const bodyStart = '<!-- prerender-body:start -->'
const bodyEnd = '<!-- prerender-body:end -->'

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

function outputPathForRoute(path: string) {
  if (path === '/') return resolve(distDir, 'index.html')
  return resolve(distDir, `${path.slice(1)}/index.html`)
}

for (const path of allSitemapPaths()) {
  const seo = getSeoForPath(path)
  const html = replaceBetween(
    replaceBetween(template, seoStart, seoEnd, buildSeoHeadHtml(seo)),
    bodyStart,
    bodyEnd,
    buildPrerenderBodyHtml(seo)
  )
  const outputPath = outputPathForRoute(path)
  mkdirSync(dirname(outputPath), { recursive: true })
  writeFileSync(outputPath, html)
  console.log(`prerendered ${path} -> ${outputPath.replace(`${distDir}/`, '')}`)
}
