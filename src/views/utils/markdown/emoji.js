import visit from 'unist-util-visit'
import { emojiIndex, Emoji } from 'emoji-mart'
import _ from 'lodash'

const RE_EMOJI = /:\+1:|:-1:|:[\w-]+:/g

export default function plugin (settings) {
  const pad = (settings || {}).padSpaceAfter

  // TODO: Fix SSR of emoji-mart or use js-emoji directly(for SSR)
  function getEmoji (match) {
    const emoji = _.find(emojiIndex.emojis, {colons: match})
    console.log('emoji = ', emoji);
    if (!emoji) return match

    const got = Emoji({
      html: true,
      set: 'apple',
      emoji: '+1',
      size: 24
    })
    console.log('got = ', got);
    if (!pad || got === match) {
      return got
    }

    return got + ' '
  }

  function transformer (tree) {
    visit(tree, 'text', function (node) {
      node.value = node.value.replace(RE_EMOJI, getEmoji)
    })
  }

  return transformer
}
