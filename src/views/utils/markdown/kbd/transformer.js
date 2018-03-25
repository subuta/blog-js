import visit from 'unist-util-visit'
import _ from 'lodash'

// TODO: この辺を参考にしつつ、kbdタグをparseできるようにする。
// https://github.com/rehypejs/rehype-highlight/blob/master/index.js
export default function transformer (settings = {}) {
  return tree => {
    // console.log(tree);
    visit(tree, 'kbd', (node) => {
      // node = {
      //   type: node.type,
      //   value: _.get(node, 'children.0.value'),
      //   data: {
      //     hName: 'kbd',
      //     hProperties: {},
      //     hChildren: [
      //       {
      //         type: 'text',
      //         value: _.get(node, 'children.0.value')
      //       }
      //     ]
      //   }
      // }
      // node.data = {
      //   hName: 'kbd',
      //   hChildren: node.children
      // }
      return node
    })
  }
}
