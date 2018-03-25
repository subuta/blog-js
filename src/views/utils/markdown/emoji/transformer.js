import visit from 'unist-util-visit'
import { getData } from 'emoji-mart/dist/utils'
import _ from 'lodash'
import { staticFolder } from 'src/views/constants/config'
import isRetina from 'src/views/utils/isRetina'
import { html2hast } from 'src/views/utils/markdown/util'

const RE_EMOJI = /:[\w+\-1-:]+:/g

// borrowed from https://github.com/missive/emoji-mart/blob/master/src/components/emoji.js
const SHEET_COLUMNS = 52
const multiply = 100 / (SHEET_COLUMNS - 1)

// TODO: Fix prop did not match (if SSR(32/non-retina) -> Front(64/retina))
export const SHEET_URL = isRetina() ? `${staticFolder}/assets/images/emoji-datasource-v4_0_2/sheet_apple_64.png` : `${staticFolder}/assets/images/emoji-datasource-v4_0_2/sheet_apple_64.png`

const round = (value, precision) => {
  const multiplier = Math.pow(10, precision || 0)
  return Math.round(value * multiplier) / multiplier
}

const decorate = (_short_name, emoji) => {
  if (!emoji) return
  const short_name = _.trim(_short_name, ':')
  const colons = `:${short_name}:`

  return {
    ...emoji,
    short_name,
    colons,
    sheet_x: `${round(multiply * emoji.sheet_x, 2)}%`,
    sheet_y: `${round(multiply * emoji.sheet_y, 2)}%`
  }
}

export default function transformer (settings) {
  function getEmoji (match) {
    const emoji = decorate(match, getData(_.trim(match, ':'), 1, 'apple'))
    const style = `background: url(${SHEET_URL});background-position: ${emoji.sheet_x} ${emoji.sheet_y};background-size: ${100 * SHEET_COLUMNS}% ${100 * SHEET_COLUMNS}%`
    return `<span class="emoji-outer emoji-sizer x2"><span class="emoji-inner" style="${style}" title="${emoji.short_name}" data-codepoints="${emoji.unified}">${emoji.short_name}</span></span>`
  }

  function transformer (tree) {
    visit(tree, 'text', (node) => {
      // ignore if not matched.
      const match = node.value.match(RE_EMOJI)
      if (!match || !getData(_.trim(match, ':'), 1, 'apple')) return

      // transform emoji HTML to HAST.
      const root = html2hast(node.value.replace(RE_EMOJI, getEmoji))

      node.type = root.type
      node.tagName = root.tagName
      node.children = root.children
    })
  }

  return transformer
}
