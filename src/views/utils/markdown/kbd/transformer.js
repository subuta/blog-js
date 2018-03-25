import visit from 'unist-util-visit'
import _ from 'lodash'

const RE_KBD = /\|\|[\S\s ]+\|\|/g

export default function transformer (settings = {}) {
  return tree => {
    visit(tree, 'text', (node) => {
      if (!node.value.match(RE_KBD)) return
      node.type = 'element'
      node.tagName = 'kbd'
      node.children = [{
        type: 'text',
        value: _.trim(node.value.match(RE_KBD), '|')
      }]
    })
  }
}
