import low from 'lowlight/lib/core'
import js from 'highlight.js/lib/languages/javascript'
import xml from 'highlight.js/lib/languages/xml'
import markdown from 'highlight.js/lib/languages/markdown'
import css from 'highlight.js/lib/languages/css'

import _ from 'lodash'

// only register expected languages.
const languages = {
  'javascript': js,
  'xml': xml,
  'html': xml,
  'markdown': markdown,
  'css': css
}

export const hasRegistered = (lang) => !!languages[lang]

_.each(languages, (m, lang) => low.registerLanguage(lang, m))

export default low
