import visit from 'unist-util-visit'
import _ from 'lodash'
import iframely from 'src/views/utils/iframely'
import unified from 'unified'
import parse from 'rehype-parse'

const parseHtml = (html) => {
  return unified()
    .use(parse, {
      fragment: true,
      position: false
    })
    .parse(html)
}

let cache = {}

export default function transformer (settings = {}) {
  return (tree) => new Promise((resolve) => {
    visit(tree, 'element', async (node) => {
      if (node.tagName !== 'blockquote' || !_.get(node, 'properties.data.isQuote')) return

      const url = _.get(node, 'properties.data.url')
      if (!url) return

      if (!cache[url]) {
        cache[url] = await iframely(url)
      }

      const response = cache[url]

      console.log('response = ', response)

      // Try to use parsed html from iframely first.
      let html = response.html
      if (!html) {
        const {
          title,
          site,
          author,
          author_url,
          media,
          description,
          keywords,
          shortlink,
          canonical
        } = response.meta

        const {
          icon,
          thumbnail
        } = response.links

        const themeColor = response.meta['theme-color']
        const thumbnailImage = _.find(thumbnail, (t) => _.includes(t.rel, 'thumbnail'))
        const iconImage = _.find(icon, (i) => i.type === 'image/x-icon')

        // "<div><div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.2493%;"><iframe src="https://www.youtube.com/embed/D-SQqppuGvc?feature=oembed" style="border: 0; top: 0; left: 0; width: 100%; height: 100%; position: absolute;" allowfullscreen scrolling="no"></iframe></div></div>"

        html = `
          <div style="color: ${themeColor};">
            <small>
              ${iconImage ? `<img src="${iconImage.href}" alt="" style="height: 16px; width: 16px;">` : ''}
              ${site}
            </small>
            
            ${thumbnailImage ? `<img src="${thumbnailImage.href}" alt="" style="max-width: 100%; width: 400px; height: auto;" />` : ''}
            <a href="${canonical}" target="_blank">${title}</a>
            <p>${description}</p>
            ${author ? '<small><a href="${author_url}">${author}</a></small>' : ''}
            ${shortlink ? '<a href="${canonical}" target="_blank">${shortlink}</a>' : ''}
          </div>
        `
      }

      node.tagName = 'div'
      node.properties = {
        className: 'quote-url',
        'data-quote-url': url
      }

      node.children = [parseHtml(html)]

      resolve()

      // Stop traverse this node.
      // SEE: https://github.com/syntax-tree/unist-util-visit
      return visit.SKIP
    })
  })
}
