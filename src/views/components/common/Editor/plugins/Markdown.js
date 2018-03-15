import React from 'react'
import unified from 'unified'
import markdown from 'remark-parse'
import _ from 'lodash'

const tokenizer = unified().use(markdown)

const renderMark = (props) => {
  const {children, mark} = props

  // TODO: ここを色んなtypeで試して描画するやつを作る。
  switch (mark.type) {
    case 'paragraph':
      return <span className="paragraph">{children}</span>
    case 'strong':
      return <strong>{children}</strong>
    case 'emphasis':
      return <em>{children}</em>
    case 'heading':
      const depth = mark.data.get('depth') || 4
      return React.createElement(
        `h${depth}`,
        {},
        children
      )
    // case 'underlined':
    //   return <u>{children}</u>
    // case 'title': {
    //   return (
    //     <span
    //       style={{
    //         fontWeight: 'bold',
    //         fontSize: '20px',
    //         margin: '20px 0 10px 0',
    //         display: 'inline-block',
    //       }}
    //     >
    //         {children}
    //       </span>
    //   )
    // }
    // case 'punctuation': {
    //   return <span style={{opacity: 0.2}}>{children}</span>
    // }
    // case 'list': {
    //   return (
    //     <span
    //       style={{
    //         paddingLeft: '10px',
    //         lineHeight: '10px',
    //         fontSize: '20px',
    //       }}
    //     >
    //         {children}
    //       </span>
    //   )
    // }
    // case 'hr': {
    //   return (
    //     <span
    //       style={{
    //         borderBottom: '2px solid #000',
    //         display: 'block',
    //         opacity: 0.2,
    //       }}
    //     >
    //         {children}
    //       </span>
    //   )
    // }
  }
}

const decorateNode = (document) => {
  if (document.object !== 'document') return

  const texts = document.getTexts().toArray()
  const decorations = []

  // concat string
  const string = texts.reduce((acc, {text}) => acc + text + '\n', '')
  const tokens = tokenizer.parse(string)

  const processTree = (tree) => {
    if (_.isArray(tree)) {
      return tree.forEach(child => processTree(child, tree))
    } else if (tree.children) {
      if (tree.type === 'root') {
        return tree.children.forEach(child => processTree(child, tree))
      }

      const {position, _children, _type, ...rest} = tree
      const {start, end} = position
      const text = document.getTextAtOffset(start.offset)

      const range = {
        anchorKey: text.key,
        anchorOffset: start.column - 1,
        focusKey: text.key,
        focusOffset: end.column - 1,
        marks: [{
          type: tree.type,
          data: rest
        }],
      }

      decorations.push(range)

      tree.children.forEach(child => processTree(child, tree))
    } else {
      if (tree.type === 'text') return
    }
    return undefined
  }

  processTree(tokens)

  return decorations
}

export default function MarkdownPlugin (opts = {}) {
  return {
    decorateNode,
    renderMark
  }
}
