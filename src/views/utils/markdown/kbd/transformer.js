import visit from 'unist-util-visit'
import _ from 'lodash'

export default function transformer (settings = {}) {
  return tree => {
    visit(tree, 'kbd', (node) => {
      console.log('b', node);

      node = {
        type: node.type,
        value: _.get(node, 'children.0.value'),
        data: {
          hName: 'kbd',
          hProperties: {},
          hChildren: [
            {
              type: 'text',
              value: _.get(node, 'children.0.value')
            }
          ]
        }
      }

      console.log('a', node);

      // node.data = {
      //   hName: 'kbd',
      //   hChildren: node.children
      // }
      return node
    })
  }
}
