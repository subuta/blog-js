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

// The html response for these sites will be ignored,
// And constructed from oembed data by ourself for performant react
const ignoredHtmlSites = [
  'GIPHY',
  'Twitter'
]

const parseResponse = (response) => {
  // Try to use parsed html from iframely first.
  let html = response.html
  const site = _.get(response, 'meta.site', '')

  if (!html || _.includes(ignoredHtmlSites, site)) {
    const {
      title,
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
      image,
      thumbnail
    } = response.links

    const themeColor = response.meta['theme-color'] || 'inherit'

    let thumbnailImage = _.find(thumbnail, (t) => _.includes(t.rel, 'thumbnail'))
    if (site === 'GIPHY') {
      thumbnailImage = _.find(image, (t) => _.includes(t.rel, 'image'))
    }

    const iconImage = _.find(icon, (i) => _.includes(i.rel, 'shortcut')) || _.find(icon, (i) => _.includes(i.rel, 'apple-touch-icon'))

    html = `
          <blockquote class="quote-url">
            <span class="site">
              ${iconImage ? `<img src="${iconImage.href}" alt="">` : ''}
              <span style="color: ${themeColor};">${site}</span>
            </span>
            
            <a class="title" href="${canonical}" target="_blank">${title}</a>
            ${description ? `<p class="description">${description.length > 140 ? `${description.substring(0, 140)}...` : description}</p>` : ''}
            ${thumbnailImage ? `<img class="thumbnail" src="${thumbnailImage.href}" alt="" />` : ''}
            ${shortlink ? `<a class="shortlink" href="${canonical}" target="_blank">${shortlink}</a>` : ''}
            ${author ? `<small class="author">by <a href="${author_url}">${author}</a></small>` : ''}
          </blockquote>
        `
  }

  return html
}

let htmlCache = {}

export default function transformer (settings = {}) {
  return (tree) => new Promise((resolve) => {
    let promises = []

    visit(tree, 'element', (node, index, parent) => {
      const isLast = parent.type === 'root' && index === tree.children.length - 1

      const finalize = () => {
        if (!isLast) return
        // Resolve root promise with rendered tree.
        Promise.all(promises).then(() => resolve(tree))
      }

      if (node.tagName !== 'blockquote' || !_.get(node, 'properties.data.isQuote')) return finalize()

      const url = _.get(node, 'properties.data.url')
      if (!url) return finalize()

      // Push render promise to promises.
      promises.push(new Promise(async (resolveRender) => {
        // FIXME: Enable here If rendering oembed looks too slow ;)
        // if (!htmlCache[url]) {
        //   const response = await iframely(url)
        //   const html = parseResponse(response)
        //   htmlCache[url] = parseHtml(html)
        // }

        const response = await iframely(url)
        const html = parseResponse(response)
        // htmlCache[url] = parseHtml(html)

        node.tagName = 'div'
        node.properties = {
          className: 'quote-url',
          'data-quote-url': url
        }

        node.children = [parseHtml(html)]

        resolveRender(node)
      }))

      // Stop traverse this node.
      // SEE: https://github.com/syntax-tree/unist-util-visit
      return finalize()
    })
  })
}
