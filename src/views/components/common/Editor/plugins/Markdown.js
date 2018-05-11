import React from 'react'
import _ from 'lodash'
import { hasRegistered, highlight } from 'src/views/utils/highlight'
import { tokenize } from 'src/views/utils/markdown'

const renderMark = (props) => {
  const {children, mark, attributes} = props

  switch (mark.type) {
    case 'strong':
      return (
        <strong {...attributes}>
          {children}
        </strong>
      )
    case 'emphasis':
      return (
        <em {...attributes}>
          {children}
        </em>
      )
    case 'heading':
      return (
        <span
          {...attributes}
          className={`heading d-${mark.data.get('depth')}`}
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
          {...attributes}
          className='list'
        >
          {children}
        </span>
      )
    case 'listItem':
      return (
        <span
          {...attributes}
          className='list-item'
        >
          {children}
        </span>
      )
    case 'blockquote':
      return (
        <span
          {...attributes}
          className='blockquote'
        >
          {children}
        </span>
      )
    // code block
    case 'code':
      return (
        <span
          {...attributes}
          className='code'
        >
          {children}
        </span>
      )
    // inline-code block
    case 'inlineCode':
      // no lowlight style for inline code.
      return (
        <span
          {...attributes}
          className='inline-code'
        >
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
        <span
          {...attributes}
          className={elementClass}
        >
          {children}
        </span>
      )
    case 'link':
      return (
        <span
          {...attributes}
          className='link'
        >
          {children}
        </span>
      )
    case 'image':
      return (
        <span
          {...attributes}
          className='image'
        >
          {children}
          </span>
      )
    case 'thematicBreak':
      return (
        <span
          {...attributes}
          className='hr'
        >
          <span>{children}</span>
        </span>
      )
    // html
    case 'html':
      return (
        <span
          {...attributes}
          className='html'
        >
          {children}
        </span>
      )
    // quote-url
    case 'quote-url':
      return (
        <span
          {...attributes}
          className='quote-url'
        >
          {children}
        </span>
      )
    // tables
    case 'table':
      return (
        <span
          {...attributes}
          className='table'
        >
          {children}
        </span>
      )
    case 'tableRow':
      return (
        <span
          {...attributes}
          className='tr'
        >
          {children}
        </span>
      )
    case 'tableCell':
      return (
        <span
          {...attributes}
          className='td'
        >
          {children}
        </span>
      )
    // via https://github.com/zestedesavoir/zmarkdown/tree/master/packages/remark-kbd
    case 'kbd':
      return (
        <span
          {...attributes}
          className='kbd'
        >
          {children}
        </span>
      )
    case 'tag':
      return (
        <span
          {...attributes}
          className='tag'
        >
          {children}
        </span>
      )
    // via https://github.com/zestedesavoir/zmarkdown/tree/master/packages/remark-kbd
    case 'math':
      return (
        <span
          {...attributes}
          className='math'
        >
          {children}
        </span>
      )
    case 'inlineMath':
      return (
        <span
          {...attributes}
          className='inline-math'
        >
          {children}
        </span>
      )
    // custom decoration for type="text"
    case 'emoji':
      return (
        <span
          {...attributes}
          className='emoji'
        >
          {mark.data.get('value')}
        </span>
      )
    default:
    case 'paragraph':
      console.log('[default] mark.type = ', mark.type)
      console.log('[default] data = ', mark.data.toJSON())
      return (
        <span
          {...attributes}
          className='paragraph'
        >
          {children}
        </span>
      )
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

  const tokens = tokenize(string)

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
      return parseLowlightValue(tree, highlight(lang, value))
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

    // mark start & end line as code
    decorations.push({
      anchorKey: startCodeText.key,
      anchorOffset: 0,
      focusKey: startCodeText.key,
      focusOffset: startCodeText.text.length,
      marks: [{
        type: 'code',
        kind: 'start'
      }]
    })

    decorations.push({
      anchorKey: endCodeText.key,
      anchorOffset: 0,
      focusKey: endCodeText.key,
      focusOffset: endCodeText.text.length,
      marks: [{
        type: 'code',
        kind: 'end'
      }]
    })

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

          decorations.push({
            anchorKey: currentRowText.key,
            anchorOffset: 0,
            focusKey: currentRowText.key,
            focusOffset: currentRowText.text.length,
            marks: [{
              type: 'code',
              kind: 'row'
            }]
          })

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
