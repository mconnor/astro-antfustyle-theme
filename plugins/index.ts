import { rehypeHeadingIds } from '@astrojs/markdown-remark'
import type { RehypePlugins, RemarkPlugins } from 'astro'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeCallouts from 'rehype-callouts'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeKatex from 'rehype-katex'
import remarkDirective from 'remark-directive'
import remarkImgattr from 'remark-imgattr'
import remarkMath from 'remark-math'
import { visit } from 'unist-util-visit'

import { FEATURES } from '#config.ts'

import remarkDirectiveSugar from './remark-directive-sugar'
import remarkGenerateOgImage from './remark-generate-og-image'
import remarkImageContainer from './remark-image-container'
import remarkReadingTime from './remark-reading-time'

export const remarkPlugins: RemarkPlugins = [
  // https://github.com/remarkjs/remark-directive
  remarkDirective,
  remarkDirectiveSugar,
  remarkImageContainer,
  // https://github.com/OliverSpeir/remark-imgattr
  remarkImgattr,
  // https://github.com/remarkjs/remark-math/tree/main/packages/remark-math
  remarkMath,
  remarkReadingTime,
  ...(Array.isArray(FEATURES.ogImage) && FEATURES.ogImage[0]
    ? [remarkGenerateOgImage]
    : []),
]

export const rehypePlugins: RehypePlugins = [
  // https://docs.astro.build/en/guides/markdown-content/#heading-ids-and-plugins
  rehypeHeadingIds,
  // https://github.com/remarkjs/remark-math/tree/main/packages/rehype-katex
  rehypeKatex,
  // https://github.com/lin-stephanie/rehype-callouts
  [
    rehypeCallouts,
    {
      theme: 'vitepress',
    },
  ],

  // https://github.com/rehypejs/rehype-external-links
  [
    rehypeExternalLinks,
    {
      target: '_blank',
      rel: 'noopener noreferrer',

      properties: (node) => {
        let content = ''
        visit(node, 'text', (textNode) => {
          content += textNode.value
        })
        return {
          ariaLabel: `Link to: ${content} (external link)`,
        }
      },
    },
  ],

  // https://github.com/rehypejs/rehype-autolink-headings
  [
    rehypeAutolinkHeadings,
    {
      behavior: 'append',

      properties: (node) => {
        let content = ''
        visit(node, 'text', (textNode) => {
          content += textNode.value
        })
        return {
          'class': 'header-anchor',
          'tabIndex': 0,
          'ariaHidden': 'false',
          'ariaLabel': `Link to heading: ${content}`,
          'data-pagefind-ignore': true,
        }
      },
      content: {
        type: 'text',
        value: '#',
      },
    },
  ],
]
