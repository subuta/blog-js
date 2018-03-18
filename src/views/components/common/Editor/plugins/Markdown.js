import React from 'react'
import unified from 'unified'
import markdown from 'remark-parse'
import _ from 'lodash'
import remarkKbd from 'remark-kbd'
import low, { hasRegistered } from 'src/views/utils/lowlight'

const tokenizer = unified()
  .use(markdown, {
    gfm: true,
    commonmark: true
  })
  .use(remarkKbd)

const renderMark = (props) => {
  const {children, mark} = props

  console.log('mark.type = ', mark.type)
  console.log(mark.data.toJSON())

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
        <span className='list'>
          {children}
        </span>
      )
    case 'listItem':
      return (
        <span className='list-item'>
          {children}
        </span>
      )
    case 'blockquote':
      return (
        <span className='blockquote'>
          {children}
        </span>
      )
    // code block
    case 'code':
      return (
        <span className='code'>
          {children}
        </span>
      )
    // inline-code block
    case 'inlineCode':
      // no lowlight style for inline code.
      return (
        <span className='inline-code'>
          {children}
        </span>
      )
    // lowlight node.
    case 'element':
      let elementClass = 'element'
      _.each(mark.data.get('properties').className || [], (className) => {
        elementClass += ` ${className}`
      })
      return (
        <span className={elementClass}>
          {children}
        </span>
      )
    case 'link':
      return <span className='link'>{children}</span>
    case 'image':
      return <span className='image'>{children}</span>
    case 'thematicBreak':
      return (
        <span className='hr'>
          <span>{children}</span>
        </span>
      )
    // html
    case 'html':
      return (
        <span className='html'>{children}</span>
      )
    // tables
    case 'table':
      return (
        <span className='table'>{children}</span>
      )
    case 'tableRow':
      return (
        <span className='tr'>{children}</span>
      )
    case 'tableCell':
      return (
        <span className='td'>{children}</span>
      )
    // via https://github.com/zestedesavoir/zmarkdown/tree/master/packages/remark-kbd
    case 'kbd':
      return (
        <span className='kbd'>{children}</span>
      )
    default:
    case 'paragraph':
      return <span className='paragraph'>{children}</span>
  }
}

// https://github.com/ianstormtaylor/slate/blob/514f3de1bef2dc7308e490148aa53ec5c30f7d46/packages/slate/src/models/node.js#L1561
// modified version of getTextAtOffset(with LineFeed count)
const getTextAtOffset = (node, offset, shouldCountLineFeed = true) => {
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

  const createDecoration = (tree) => {
    const {position, children, type, ...rest} = tree
    const {start, end} = position
    const anchorText = getTextAtOffset(document, start.offset)
    const focusText = getTextAtOffset(document, end.offset)

    if (anchorText && focusText) {
      return {
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
    }

    return null
  }

  // tree type for ignore.
  const typeToIgnore = [
    'text',
    'root',
    'paragraph'
  ]

  const processTree = (tree) => {
    // ignore if falsy value passed
    if (!tree) return

    if (_.isArray(tree)) {
      return tree.forEach(processTree)
    } else if (tree.children) {
      // dig leaf node first
      tree.children.forEach(processTree)
    }

    if (_.includes(typeToIgnore, tree.type)) return

    // handling code block.
    if (tree.type === 'code') {
      const {lang, value} = tree
      if (!lang || !hasRegistered(lang) || !value) return
      // call processTree for parsed result
      return parseLowlightValue(tree, low.highlight(lang, value).value)
    }

    return decorations.push(createDecoration(tree))
  }

  const parseLowlightValue = (codeTree, value) => {
    const {position} = codeTree
    const {start, end} = position

    const startCodeText = getTextAtOffset(document, start.offset)
    const endCodeText = getTextAtOffset(document, end.offset)
    const startCodeLength = startCodeText.text.length
    const endOffset = end.offset - start.offset

    if (!startCodeText || !endCodeText) return

    // forward offset by startCodeText
    let offset = startCodeLength
    let currentRowOffset = startCodeLength
    let currentRowText = document.getNextText(startCodeText.key)

    const processLowlightTree = (tree, parent) => {
      if (_.isArray(tree)) {
        return tree.forEach(child => processLowlightTree(child, tree))
      } else if (tree.children) {
        tree.children.forEach(child => processLowlightTree(child, tree))
      } else if (tree.value) {
        const current = offset
        offset += tree.value.length

        // skip root(that has no className attribute) node.
        if (_.isArray(parent)) return

        // check is current row includes tree.value to decorate.
        let isMatched = !currentRowText.text || _.includes(currentRowText.text, tree.value)
        while (!isMatched && offset < endOffset) {
          currentRowOffset += currentRowText.text.length + 1
          currentRowText = document.getNextText(currentRowText.key)
          isMatched = currentRowText.text && _.includes(currentRowText.text, tree.value)
        }

        decorations.push({
          anchorKey: currentRowText.key,
          anchorOffset: current - currentRowOffset,
          focusKey: currentRowText.key,
          focusOffset: offset - currentRowOffset,
          marks: [{
            type: parent.type,
            data: {
              tagName: parent.tagName,
              properties: parent.properties
            }
          }]
        })
      }
      return undefined
    }

    // Ignore errors for invalid code.
    try {
      processLowlightTree(value)
    } catch (e) {
      console.debug('LowlightTree[Parse error]', e)
    }
  }

  processTree(tokens)

  return _.compact(decorations)
}

export default function MarkdownPlugin (opts = {}) {
  return {
    decorateNode,
    renderMark
  }
}
