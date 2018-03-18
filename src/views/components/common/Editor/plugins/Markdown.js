import React from 'react'
import unified from 'unified'
import markdown from 'remark-parse'
import _ from 'lodash'
import low, { hasRegistered } from 'src/views/utils/lowlight'

const tokenizer = unified()
  .use(markdown, {
    gfm: true,
    commonmark: true
  })

const renderMark = (props) => {
  const {children, mark} = props

  // console.log('mark.type = ', mark.type)
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
    case 'code':
      return (
        <span className='code'>
          {children}
        </span>
      )
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
    case 'hr':
      return (
        <span
          style={{
            borderBottom: '2px solid #000',
            display: 'block',
            opacity: 0.2,
          }}
        >
          {children}
        </span>
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

    if (!startCodeText || !endCodeText) return

    // forward offset by startCodeText
    let offset = startCodeLength
    let currentRowOffset = startCodeLength
    let currentRowText = document.getNextText(startCodeText.key)
    let nextRowOffset = startCodeLength + currentRowText.text.length

    const processLowlightTree = (tree, parent) => {
      if (_.isArray(tree)) {
        return tree.forEach(child => processLowlightTree(child, tree))
      } else if (tree.children) {
        tree.children.forEach(child => processLowlightTree(child, tree))
      } else if (tree.value) {
        console.log('======')

        // ignore line feed at this time.
        if (tree.value.match(/(\r?\n+)/)) {
          // Workaround for things like '\n\n'(blank line)
          const lineFeeds = tree.value.match(/(\r?\n+)/)[1]
          console.log('lineFeeds = ', JSON.stringify(lineFeeds));
          currentRowOffset += lineFeeds.length
          nextRowOffset += lineFeeds.length
        }

        const current = offset
        offset += tree.value.length

        console.log('tree.value = ', tree.value)
        console.log('nexgRowOffset = ', nextRowOffset)
        console.log('currentRowText.text = ', JSON.stringify(currentRowText.text))
        console.log('currentRowOffset = ', currentRowOffset)
        console.log('current = ', current)
        console.log('offset = ', offset)

        // ignore root node
        const isNotRoot = !_.isArray(parent)
        const isMatched = currentRowText.text && _.includes(currentRowText.text, tree.value)

        if (isNotRoot && isMatched) {
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

        // TODO: Markdownが含まれてない行をskipする処理を足す。
        // get current row length
        if (offset >= nextRowOffset) {
          currentRowText = document.getNextText(currentRowText.key)
          currentRowOffset = nextRowOffset
          // TODO: skip non matched
          // then retrieve next row length
          // FIXME: Text.textには改行文字が含まれてない問題
          nextRowOffset += currentRowText.text.length
        }
      }
      return undefined
    }

    processLowlightTree(value)
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
