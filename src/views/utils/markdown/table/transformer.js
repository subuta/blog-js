import visit from 'unist-util-visit'

import _ from 'lodash'

export default function transformer (settings = {}) {
  function visitor (node) {
    if (node.type !== 'table') return

    let th = []

    node.children.forEach((tr, i) => {
      if (i === 0) {
        th = tr
        return
      }

      tr.children.forEach((td, i) => {
        _.set(td, 'data', {
          ..._.get(td, 'data', {}),
          hName: 'td',
          // wrap td child text as span for better styling.
          hChildren: [{
            type: 'element',
            tagName: 'span',
            properties: {},
            children: td.children
          }]
        })
        _.set(td, 'data.hProperties', {
          ..._.get(td, 'data.hProperties', {}),
          dataTh: _.get(th, ['children', i, 'children', 0, 'value'])
        })
      })
    })
  }

  return tree => visit(tree, 'table', visitor)
}
