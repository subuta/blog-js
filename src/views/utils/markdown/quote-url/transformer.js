import visit from 'unist-util-visit'
import _ from 'lodash'

const RE_QUOTE_URL = /{{ (https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]+(\.[a-z]{0,6})?\b([-a-zA-Z0-9@:%_+.~#?&//=]*)) }}/gi;

export default function transformer (settings = {}) {
  return tree => {
    visit(tree, 'element', (node) => {
      if (node.tagName !== 'blockquote' || !_.get(node, 'properties.data.isQuote')) return

      const url = _.get(node, 'properties.data.url')
      if (!url) return

      node.tagName = 'div'
      node.properties = {
        className: 'quote-url',
        href: url // link to articles(filtered by tag.)
      }
      node.children = [{
        type: 'text',
        value: url
      }]

      // Stop traverse this node.
      // SEE: https://github.com/syntax-tree/unist-util-visit
      return visit.SKIP
    })
  }
}
