import visit from 'unist-util-visit'
import _ from 'lodash'

const RE_QUOTE_URL = /{{ (https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]+(\.[a-z]{0,6})?\b([-a-zA-Z0-9@:%_+.~#?&//=]*)) }}/gi;

export default function transformer (settings = {}) {
  return tree => {
    console.log('tree = ', tree)
    visit(tree, 'text', (node) => {
      console.log('node.value = ', node.value)
      if (!node.value.match(RE_QUOTE_URL)) return
      const url = node.value.match(RE_QUOTE_URL)

      node.type = 'element'
      node.tagName = 'a'
      node.properties = {
        href: url[1] // link to articles(filtered by tag.)
      }
      node.children = [{
        type: 'text',
        value: url[1]
      }]

      // Stop traverse this node.
      // SEE: https://github.com/syntax-tree/unist-util-visit
      return visit.SKIP
    })
  }
}
