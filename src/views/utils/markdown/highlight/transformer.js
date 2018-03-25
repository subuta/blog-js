import { highlight, hasRegistered } from 'src/views/utils/highlight.js'
import visit from 'unist-util-visit'
import _ from 'lodash'
import toString from 'hast-util-to-string'

export default function attacher (options) {
  let settings = options || {}
  let detect = settings.subset !== false
  let prefix = settings.prefix
  let ignoreMissing = settings.ignoreMissing
  let plainText = settings.plainText || []
  let name = 'hljs'
  let pos

  if (prefix) {
    pos = prefix.indexOf('-')
    name = pos === -1 ? prefix : prefix.slice(0, pos)
  }

  return transformer

  function transformer (tree) {
    visit(tree, 'element', visitor)
  }

  function visitor (node, index, parent) {
    let props = node.properties
    if (!props.className) {
      props.className = []
    }

    // treat as inline code(eg: `hoge`)
    if (parent && parent.tagName !== 'pre' && node.tagName === 'code') {
      props.className.push('inline')
      return
    }

    if (!parent || parent.tagName !== 'pre' || node.tagName !== 'code') {
      return
    }

    const lang = language(node)

    if (lang === false || (!lang && !detect) || !hasRegistered(lang) || plainText.indexOf(lang) !== -1) {
      return
    }

    if (props.className.indexOf(name) === -1) {
      props.className.unshift(name)
    }

    props.className.push('language-' + lang)
    node.children = highlight(lang, toString(node))
  }
}

/* Get the programming language of `node`. */
function language (node) {
  let className = node.properties.className || []
  let length = className.length
  let index = -1
  let value

  while (++index < length) {
    value = className[index]

    if (value === 'no-highlight' || value === 'nohighlight') {
      return false
    }

    if (value.slice(0, 5) === 'lang-') {
      return value.slice(5)
    }

    if (value.slice(0, 9) === 'language-') {
      return value.slice(9)
    }
  }

  return null
}
