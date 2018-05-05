import visit from 'unist-util-visit'
import _ from 'lodash'

const RE_TAG = /#([\w+!@\-1-:]+)/

export default function transformer (settings = {}) {
  return tree => {
    visit(tree, 'text', (node) => {
      if (!node.value.match(RE_TAG)) return
      const tag = node.value.match(RE_TAG)[0]

      node.type = 'element'
      node.tagName = 'a'
      node.properties = {
        href: 'http://www.example.com'
      }
      node.children = [{
        type: 'text',
        value: _.trim(tag, '#')
      }]
    })
  }
}
