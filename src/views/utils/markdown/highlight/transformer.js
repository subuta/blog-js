import { highlight, hasRegistered } from 'src/views/utils/highlight.js'
import visit from 'unist-util-visit'
import _ from 'lodash'

export default function transformer ({include, exclude} = {}) {
  function visitor (node) {
    const {lang} = node

    if (
      !lang ||
      !hasRegistered(lang) ||
      include && !~include.indexOf(lang) ||
      exclude && ~exclude.indexOf(lang)
    ) {
      return
    }

    let {data} = node

    if (!data) {
      node.data = data = {}
    }

    data.hChildren = highlight(lang, node.value)
    data.hProperties = data.hProperties || {}
    data.hProperties.className = [
      'hljs',
      ...data.hProperties.className || [],
      `language-${lang}`,
    ]
  }

  return tree => {
    visit(tree, 'code', visitor)
    visit(tree, 'inlineCode', (node) => {
      _.set(node, 'data.hProperties', {
        ..._.get(node, 'data.hProperties', {}),
        className: [
          ..._.get(node, 'data.hProperties.className', []),
          'inline'
        ]
      })
    })
  }
}
