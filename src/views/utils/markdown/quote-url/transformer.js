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

        const themeColor = response.meta['theme-color'] || 'inherit'
        const thumbnailImage = _.find(thumbnail, (t) => _.includes(t.rel, 'thumbnail'))
        const iconImage = _.find(icon, (i) => _.includes(i.rel, 'shortcut'))

        html = `
          <blockquote class="quote-url">
            <span class="site">
              ${iconImage ? `<img src="${iconImage.href}" alt="">` : ''}
              <span style="color: ${themeColor};">${site}</span>
            </span>
            
            <a class="title" href="${canonical}" target="_blank">${title}</a>
            <p class="description">${description.length > 140 ? `${description.substring(0, 140)}...` : description}</p>
            ${thumbnailImage ? `<img class="thumbnail" src="${thumbnailImage.href}" alt="" />` : ''}
            ${shortlink ? `<a class="shortlink" href="${canonical}" target="_blank">${shortlink}</a>` : ''}
            ${author ? `<small class="author">by <a href="${author_url}">${author}</a></small>` : ''}
          </blockquote>
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
