import xss from 'xss'
import _ from 'lodash'

import {
  svg,
  svgFilters,
  mathMl
} from './tags'

import {
  svg as svgAttrs,
  mathMl as mathMlAttrs,
  xml as xmlAttrs
} from './attrs'

const svgAttrsWhiteList = [
  ...svgAttrs,
  ...xmlAttrs
]

const svgWhiteList = _.zipObject(svg, _.times(svg.length, () => svgAttrsWhiteList))

const svgFiltersAttrsWhiteList = [
  ...svgAttrs,
  ...xmlAttrs
]

const svgFiltersWhiteList = _.zipObject(svgFilters, _.times(svgFilters.length, () => svgFiltersAttrsWhiteList))

const mathMlAttrsWhiteList = [
  ...svgAttrs,
  ...xmlAttrs
]

const mathMlWhiteList = _.zipObject(mathMl, _.times(mathMl.length, () => mathMlAttrsWhiteList))

let whiteList = {
  ...svgWhiteList,
  ...svgFiltersWhiteList,
  ...mathMlWhiteList
}

// Match src="xxx" style url.
const SRC_URL_REGEX = /src="(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]+(\.[a-z]{0,6})?\b([-a-zA-Z0-9@:%_+.~#?&//=]*))"/

// 3rd party scripts that allowed to load into our app.
const whitelistedScripts = [
  'https://platform.twitter.com/widgets.js'
]

export default (html) => {
  let ignoredScripts = []

  const sanitized = xss(html, {
    onIgnoreTag (tag, html, options) {
      if (tag === 'script' && html.match(SRC_URL_REGEX)) {
        const url = html.match(SRC_URL_REGEX)[1]
        if (!_.includes(whitelistedScripts, url)) return ''
        ignoredScripts.push(url)
      }
      // Just ignore others.
      return ''
    },

    safeAttrValue (tag, name, value) {
      // pass-through style attribute for katex.
      if (name === 'style') return value
      return xss.safeAttrValue(tag, name, value)
    },

    whiteList: {
      // extends default whiteList of xss.
      ...whiteList,
      ...xss.whiteList,

      // Add embed emoji html
      span: [
        'class',
        'style',
        'title',
        'data-codepoints'
      ],

      // Allow including embedly card in the Markdown.
      blockquote: [
        'cite',
        'class',
        'align',
        'charset',
        'data-card-key',
        'data-card-align',
        'data-card-controls',
        'data-lang'
      ],

      code: [
        'class'
      ],

      a: [
        ...xss.whiteList.a,
        'class'
      ],

      p: [
        ...xss.whiteList.p,
        'class',
        'lang',
        'dir'
      ],

      small: [
        ...xss.whiteList.small,
        'class'
      ],

      // for add class
      div: [
        ...xss.whiteList.div,
        'class',
        'style',
        'data-quote-url'
      ],

      // for quote-url
      img: [
        ...xss.whiteList.img,
        'class',
        'style'
      ],

      // for quote-url
      // SEE: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe
      iframe: [
        'src',
        'style',
        'allowfullscreen',
        'scrolling',
        'height',
        'name',
        'referrerpolicy',
        'sandbox',
        'srcdoc',
        'width'
      ],

      // for Responsive table.
      td: [
        ...xss.whiteList.td,
        'data-th'
      ],

      // allow id for remark-slug
      h1: [
        'id'
      ],

      h2: [
        'id'
      ],

      h3: [
        'id'
      ],

      h4: [
        'id'
      ],

      h5: [
        'id'
      ],

      h6: [
        'id'
      ],

      kbd: []
    }
  })

  return {
    ignoredScripts,
    html: sanitized
  }
}
