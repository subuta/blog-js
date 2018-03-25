import visit from 'unist-util-visit'
import find from 'unist-util-find'
import _ from 'lodash'

const filter = (node, condition) => _.filter(node.children, condition)

export default function transformer (settings = {}) {
  function visitor (node) {
    if (node.tagName !== 'table') return

    const thead = find(node, {tagName: 'thead'})
    const ths = filter(find(thead, {tagName: 'tr'}), {tagName: 'th'})
    const columns = _.map(ths, (th) => _.get(th, 'children.0.value'))

    const tbody = find(node, {tagName: 'tbody'})
    const trs = filter(tbody, {tagName: 'tr'})
    _.each(trs, (tr) => {
      _.each(filter(tr, {tagName: 'td'}), (td, i) => {
        td.properties = {
          ...td.properties,
          dataTh: columns[i]
        }
        td.children = [{
          type: 'element',
          tagName: 'span',
          properties: {},
          children: td.children
        }]
      })
    })
  }

  return tree => {
    visit(tree, 'element', visitor)
  }
}
