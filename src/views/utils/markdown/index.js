import unified from 'unified'
import xss from 'xss'

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
import kbd from './kbd'
import m2h from 'remark-rehype'
import stringify from 'rehype-stringify'

const processor = unified()
  .use(markdown, {
    gfm: true,
    commonmark: true
  })
  .use(m2h, {allowDangerousHTML: true})
  .use(math)
  .use(katex, {
    // ignore katex parser error.
    throwOnError: false
  })
  .use(slug)
  .use(highlight)
  .use(emoji)
  .use(table)
  .use(stringify, {
    allowDangerousHTML: true
  })
  .use(kbd)

export const tokenize = (markdown) => processor.parse(markdown)

export const sanitizeHtml = (html) => xss(html, {
  stripIgnoreTag: true,
  // just ignore script tag.
  stripIgnoreTagBody: ['script'],
  whiteList: {
    // extends default whiteList of xss.
    ...xss.whiteList,

    // Add embed emoji html
    span: [
      'class',
      'style',
      'title',
      'data-codepoints'
    ],

    // Allow including embedly card in the Markdown.
    blockquote: [
      'cite',
      'class',
      'data-card-key',
      'data-card-align',
      'data-card-controls'
    ],

    code: [
      'class'
    ],

    // for Responsive table.
    td: [
      ...xss.whiteList.td,
      'data-th'
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

export const toHtml = (markdown) => {
  const html = processor.processSync(markdown).toString()
  return sanitizeHtml(html)
}
