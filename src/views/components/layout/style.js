import createWithStyles, { Style } from 'src/views/utils/style'
import { staticFolder } from 'src/views/constants/config'

import { source } from 'common-tags'

import {
  ACCENT3_COLOR,
  PRIMARY_COLOR,
  BLACK_COLOR,
  SANS_FONT,
  PAGE_MIN_HEIGHT,
  NOISE_PATTERN,
  NAVIGATION_WIDTH,
  SIDEBAR_WIDTH,

  TABLET_MEDIA_QUERY,

  CODE_FONT,
  BORDER_COLOR
} from 'src/views/constants/style'
import { ACCENT4_COLOR } from '../../constants/style'

const isBrowser = typeof window !== 'undefined'

if (isBrowser) {
  import('webfontloader').then((WebFont) => {
    WebFont.load({
      google: {
        families: ['Lato:400,700,900']
      }
    })
  })
}

const html = {
  fontSize: '1em'
}

const body = {
  margin: 0,
  backgroundColor: '#FFFFFF',
  fontFamily: SANS_FONT,
  fontWeight: 400,
  lineHeight: 1.45,
  color: BLACK_COLOR,
  '-webkit-font-smoothing': 'antialiased',
  'text-rendering': 'optimizeLegibility'
}

const p = {
  marginBottom: '1.3em'
}

export const headings = {
  margin: '32px 0 16px',
  fontFamily: SANS_FONT,
  fontWeight: 'inherit',
  lineHeight: 1.2
}

export const h1 = {
  marginTop: 0,
  fontSize: '2.441em'
}

export const h2 = {
  fontSize: '1.953em'
}

export const h3 = {
  fontSize: '1.563em'
}

export const h4 = {
  fontSize: '1.25em'
}

export const h5 = {
  fontSize: '1em'
}

export const small = {
  fontSize: '0.8em'
}

export const button = {
  '-webkit-appearance': 'none !important'
}

export const kbd = {
  fontFamily: CODE_FONT,
  padding: '0.1em 0.6em',
  border: '1px solid #ccc',
  fontSize: 12,
  backgroundColor: '#f7f7f7',
  color: '#333',
  boxShadow: '0 1px 0px rgba(0, 0, 0, 0.2),0 0 0 2px #ffffff inset',
  borderRadius: 3,
  display: 'inline-block',
  margin: '0 4px',
  textShadow: '0 1px 0 #fff',
  lineHeight: 1.4,
  whiteSpace: 'nowrap'
}

export const hr = {
  border: 'none',
  '&:after': {
    content: '\'\'', // who knew you could do this? The internet, that's who.
    display: 'block',
    borderBottom: `3px solid ${BORDER_COLOR}`
  }
}

export const inlineCode = {
  fontFamily: CODE_FONT,
  margin: '0 4px',
  padding: '0 4px',
  display: 'inline-block',
  borderRadius: 4,
  fontSize: 13,
  fontWeight: 'bold',
  backgroundColor: '#F4F4F4',
  border: '1px solid #DDDDDD',
  color: ACCENT4_COLOR
}

export const table = {
  // RWD idea from http://codepen.io/geoffyuen/pen/FCBEg?editors=1100
  margin: `8px 0`,
  width: '100%',
  boxSizing: 'border-box',

  '& th': {
    padding: `0 0 4px`,
    display: 'table-cell',
    fontWeight: 'bold',

    [TABLET_MEDIA_QUERY]: {
      display: 'none',
      padding: `8px 8px 8px 0 !important`
    }
  },

  '& tr': {
    borderTop: 'none',
    [TABLET_MEDIA_QUERY]: {
      borderTop: `1px solid ${BORDER_COLOR}`,
      borderBottom: `1px solid ${BORDER_COLOR}`
    }
  },

  '& td': {
    padding: `0 0 4px`,
    display: 'table-cell',

    [TABLET_MEDIA_QUERY]: {
      display: 'flex',
      textAlign: 'left',
      padding: `8px 8px 8px 0 !important`,

      '&:first-child': {
        padding: `4px 0`
      }
    },

    '&:before': {
      margin: '0 4px 0 0',
      display: 'none',

      [TABLET_MEDIA_QUERY]: {
        display: 'inline-block',
        fontWeight: 'bold',
        content: 'attr(data-th)\": \"', // who knew you could do this? The internet, that's who.
      }
    }
  }
}

const FontFaceNotoSerifJapanese = {
  fontFamily: '"Noto Serif Japanese"',
  src: source`
    url("${staticFolder}/assets/fonts/WebNotoSerifCJKjp-Regular.otf?") format('otf'),
    url("${staticFolder}/assets/fonts/WebNotoSerifCJKjp-Regular.woff2") format('woff2'),
    url("${staticFolder}/assets/fonts/WebNotoSerifCJKjp-Regular.woff") format('woff')
  `
}

const FontFaceNotoSansJapanese = {
  fontFamily: '"Noto Sans Japanese"',
  fontWeight: 'normal',
  src: source`
    url("${staticFolder}/assets/fonts/WebNotoSansCJKjp-Regular.otf?") format('otf'),
    url("${staticFolder}/assets/fonts/WebNotoSansCJKjp-Regular.woff2") format('woff2'),
    url("${staticFolder}/assets/fonts/WebNotoSansCJKjp-Regular.woff") format('woff')
  `
}

const FontFaceNotoSansJapaneseBold = {
  fontFamily: '"Noto Sans Japanese"',
  fontWeight: 'bold',
  src: source`
    url("${staticFolder}/assets/fonts/WebNotoSansCJKjp-Bold.otf?") format('otf'),
    url("${staticFolder}/assets/fonts/WebNotoSansCJKjp-Bold.woff2") format('woff2'),
    url("${staticFolder}/assets/fonts/WebNotoSansCJKjp-Bold.woff") format('woff')
  `
}

const Container = {
  position: 'relative',
  minHeight: PAGE_MIN_HEIGHT,
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  overflow: 'scroll'
}

export default createWithStyles({
  Container
}, {
  css: {
    html,
    body,
    p,
    h1,
    h2,
    h3,
    h4,
    h5,
    small,
    table,
    kbd,
    hr,
    'code.inline': inlineCode,
    'h1, h2, h3, h4': headings,
    [`button, html [type="button"], [type="reset"], [type="submit"]`]: button
  },
  rules: [
    ['@font-face', FontFaceNotoSerifJapanese],
    ['@font-face', FontFaceNotoSansJapanese],
    ['@font-face', FontFaceNotoSansJapaneseBold]
  ]
})
