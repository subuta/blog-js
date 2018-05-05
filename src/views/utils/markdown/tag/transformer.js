import visit from 'unist-util-visit'
import _ from 'lodash'

const RE_TAG = /#([\w+!@\-1-:]+)/

export default function transformer (settings = {}) {
  return tree => {
    visit(tree, 'text', (node) => {
      if (!node.value.match(RE_TAG)) return
      const tag = node.value.match(RE_TAG)

      node.type = 'element'
      node.tagName = 'a'
      node.properties = {
        href: `/w?tag=${tag[1]}` // link to articles(filtered by tag.)
      }
      node.children = [{
        type: 'text',
        value: tag[0]
      }]

      // Stop traverse this node.
      // SEE: https://github.com/syntax-tree/unist-util-visit
      return visit.SKIP
    })
  }
}
