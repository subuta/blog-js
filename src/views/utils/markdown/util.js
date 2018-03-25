import unified from 'unified'
import parse from 'rehype-parse'

export const html2hast = (html) => {
  return unified()
    .use(parse, {fragment: true})
    .parse(html)
}
