import React from 'react'
import unified from 'unified'
import markdown from 'remark-parse'
import _ from 'lodash'

const tokenizer = unified().use(markdown)

const renderMark = (props) => {
  const {children, mark} = props

  console.log('mark.type = ', mark.type)
  // console.log(mark.data.toJSON())

  // TODO: ここを色んなtypeで試して描画するやつを作る。
  switch (mark.type) {
    case 'strong':
      return <strong>{children}</strong>
    case 'emphasis':
      return <em>{children}</em>
    case 'heading':
      return (
        <span
          className={`heading d-${mark.data.get('depth')}`}
          style={{
            fontSize: 36 - (mark.data.get('depth') * 4)
          }}
        >
          {children}
        </span>
      )
    case 'list':
      // FIXME: handling of indent
      // SEE: https://github.com/remarkjs/remark/issues/315
      // const position = mark.data.get('position')
      // console.log('position.indent = ', position.indent)
      return (
        <span
          className='list'
          style={{
            paddingLeft: 10,
            lineHeight: 1,
            fontSize: 14
          }}
        >
          {children}
        </span>
      )
    case 'listItem':
      return (
        <span
          className='list-item'
        >
          {children}
        </span>
      )
    case 'blockquote':
      return (
        <span className='blockquote'>
          {children}
        </span>
      )
    default:
    case 'paragraph':
      return <span className='paragraph'>{children}</span>
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

// https://github.com/ianstormtaylor/slate/blob/514f3de1bef2dc7308e490148aa53ec5c30f7d46/packages/slate/src/models/node.js#L1561
// modified version of getTextAtOffset(with LineFeed count)
const getTextAtOffset = (node, offset) => {
  // we should count line feed only for document
  const shouldCountLineFeed = node.object === 'document'

  let lineFeed = ''
  if (shouldCountLineFeed) {
    lineFeed = '\n'
  }

  const texts = node.getTexts()

  const length = shouldCountLineFeed ? (
    texts.reduce((acc, {text}) => acc + text + lineFeed, '')
  ) : node.text.length

  if (offset === 0) return node.getFirstText()
  if (offset === length) return node.getLastText()
  if (offset < 0 || offset > length) return null

  let position = 0

  return texts.find((n) => {
    // plus line feed.
    position += n.text.length + lineFeed.length
    return position > offset
  })
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
      // dig leaf node first
      tree.children.forEach(child => processTree(child, tree))

      if (tree.type === 'root' || tree.type === 'paragraph') return

      const {position, children, type, ...rest} = tree
      const {start, end} = position
      const anchorText = getTextAtOffset(document, start.offset)
      const focusText = getTextAtOffset(document, end.offset)

      console.log('type = ', tree)
      // console.log(anchorText && anchorText.text)
      // console.log(focusText && focusText.text)

      if (anchorText && focusText) {
        const range = {
          anchorKey: anchorText.key,
          anchorOffset: start.column - 1,
          focusKey: focusText.key,
          focusOffset: end.column - 1,
          marks: [{
            type: tree.type,
            data: {
              ...rest,
              position
            }
          }]
        }
        decorations.push(range)
      }
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
