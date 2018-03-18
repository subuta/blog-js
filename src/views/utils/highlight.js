import low from 'lowlight/lib/core'
import js from 'highlight.js/lib/languages/javascript'
import xml from 'highlight.js/lib/languages/xml'
import markdown from 'highlight.js/lib/languages/markdown'
import css from 'highlight.js/lib/languages/css'

import refractor from 'refractor/core.js'
import refJsx from 'refractor/lang/jsx.js'

import _ from 'lodash'

// only register expected languages for lowlight.
const lowLanguages = {
  'javascript': js,
  'js': js,
  'xml': xml,
  'html': xml,
  'markdown': markdown,
  'css': css
}

// only register expected languages for refractor.
const refLanguages = {
  'jsx': refJsx,
}

_.each(lowLanguages, (m, lang) => low.registerLanguage(lang, m))
_.each(refLanguages, (m) => refractor.register(m))

// check lang is registered to low or refractor.
export const hasRegistered = (lang) => !!lowLanguages[lang] || !!refLanguages[lang]

export const highlight = (lang, value) => {
  // use refractor(prism.js) for jsx
  // FIXME: remove here if JSX support of highlight.js become stable.
  if (lang === 'jsx') {
    return refractor.highlight(value, lang)
  }
  // use lowlight(highlight.js) by default.
  return low.highlight(lang, value).value
}
