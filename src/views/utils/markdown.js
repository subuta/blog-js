import unified from 'unified'
import xss from 'xss'

// parser
import markdown from 'remark-parse'
import remarkKbd from 'remark-kbd'
import remarkMath from 'remark-math'

// transformer
import katexHtml from 'remark-html-katex'
import html from 'remark-html'

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
  .use(html)

export const tokenize = (markdown) => processor.parse(markdown)

// sanitize tags
// const html = xss(mark.data.get('value'), {
//   stripIgnoreTag: true,
//   whiteList: {
//     // SEE: https://github.com/remarkjs/remark/issues/326
//     // only allow kbd tag inside div or span or html
//     kbd: []
//   }
// })

export const toHtml = (markdown) => processor.processSync(markdown).toString()
