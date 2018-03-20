import unified from 'unified'
import xss from 'xss'

// parser
import markdown from 'remark-parse'
import remarkKbd from 'remark-kbd'
import remarkMath from 'remark-math'

// transformer
import katexHtml from 'remark-html-katex'
import html from 'remark-html'
import slug from 'remark-slug'
import emoji from './emoji'

const processor = unified()
  .use(markdown, {
    gfm: true,
    commonmark: true
  })
  .use(remarkKbd)
  .use(remarkMath)
  .use(katexHtml, {
    // ignore katex parser error.
    throwOnError: false
  })
  .use(slug)
  .use(emoji, {
    padSpaceAfter: true
  })
  .use(html)

export const tokenize = (markdown) => processor.parse(markdown)

export const toHtml = (markdown) => {
  const html = processor.processSync(markdown).toString()
  return xss(html, {
    stripIgnoreTag: true,
    // just ignore script tag.
    stripIgnoreTagBody: ['script'],
    whiteList: {
      // extends default whiteList of xss.
      ...xss.whiteList,
      // Allow including embedly card in the Markdown.
      blockquote: [
        'cite',
        'class',
        'data-card-key'
      ],

      // allow id for remark-slug
      h1: [
        'id'
      ],

      h2: [
        'id'
      ],

      h3: [
        'id'
      ],

      h4: [
        'id'
      ],

      h5: [
        'id'
      ],

      h6: [
        'id'
      ],
    }
  })
}
