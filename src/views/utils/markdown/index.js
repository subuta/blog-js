import unified from 'unified'
import trough from 'trough'

// parser
import markdown from 'remark-parse'
import math from 'remark-math'

// transformer
import katex from 'rehype-katex'
import slug from 'remark-slug'
import highlight from './highlight'
import table from './table'

// parser & transformer
import emoji from './emoji'
import quoteUrl, {
  handler as quoteUrlHandler,
  upgradeDom as quoteUpgradeDom,
} from './quote-url'
import tag from './tag'
import kbd from './kbd'
import m2h from 'remark-rehype'
import stringify from 'rehype-stringify'

import sanitize from 'src/views/utils/sanitize'

const processor = unified()
  .use(markdown, {
    gfm: true,
    commonmark: true
  })
  .use(m2h, {
    allowDangerousHTML: true,
    commonmark: true,
    handlers: {
      'quoteUrl': quoteUrlHandler
    }
  })
  .use(math)
  .use(katex, {
    // ignore katex parser error.
    throwOnError: false
  })
  .use(slug)
  .use(highlight)
  .use(emoji)
  .use(quoteUrl)
  .use(tag)
  .use(table)
  .use(kbd)
  .use(stringify, {
    allowDangerousHTML: true
  })

export const tokenize = (markdown) => processor.parse(markdown)

export const sanitizeHtml = (html) => sanitize(html)

// The handlers used for upgrading dom.
const upgradeDomPipeline = trough()
  .use(quoteUpgradeDom)

export const upgradeDom = (node, done = _.noop) => upgradeDomPipeline.run(node, done)

export const toHtml = (markdown) => {
  const html = processor.processSync(markdown).toString()
  return sanitizeHtml(html)
}
