// SEE: https://github.com/syntax-tree/mdast-util-to-hast/tree/master/lib/handlers for examples.
export default (h, node) => {
  const props = {
    className: 'quote-url',
    data: node.data
  }
  return h(node, 'blockquote', props, [])
}
