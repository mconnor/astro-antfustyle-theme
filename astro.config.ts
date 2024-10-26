import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import { defineConfig } from 'astro/config'
import astroExpressiveCode from 'astro-expressive-code'
import robotsTxt from 'astro-robots-txt'
import Unocss from 'unocss/astro'

import { SITE } from '#config.ts'

import { rehypePlugins, remarkPlugins } from './plugins'

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site: SITE.website,
  base: SITE.base,
  integrations: [
    sitemap(),
    robotsTxt(),
    Unocss({
      // https://unocss.dev/integrations/astro#style-reset
      injectReset: true,
    }),
    astroExpressiveCode(),
    mdx(),
  ],
  markdown: {
    syntaxHighlight: false,
    remarkPlugins: remarkPlugins,
    rehypePlugins,
  },
  experimental: {
    contentLayer: true,
    contentIntellisense: true,
    directRenderScript: true,
  },
  vite: {
    build: { chunkSizeWarningLimit: 1200 },
  },
})
