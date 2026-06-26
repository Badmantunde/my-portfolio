import { writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { generateSitemapXml } from '../src/lib/seo.ts'

const rootDir = dirname(fileURLToPath(import.meta.url))

writeFileSync(resolve(rootDir, '../public/sitemap.xml'), generateSitemapXml())
