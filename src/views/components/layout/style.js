import createWithStyles, { Style } from 'src/views/utils/style'
import { staticFolder } from 'src/views/constants/config'

import { source } from 'common-tags'

import {
  ACCENT4_COLOR,
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
  'text-rendering': 'optimizeLegibility',

  // nextjs entrypoint
  '#__next': {
    zIndex: 0
  }
}

const p = {
  margin: '0 0 16px 0',
  lineHeight: '1.5rem',
  minHeight: '1.5rem',
  [TABLET_MEDIA_QUERY]: {
    letterSpacing: '0.2px',
  }
}

const a = {
  margin: 0,
  color: ACCENT4_COLOR,
  fontWeight: 'bold',
  wordBreak: 'break-all',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline'
  }
}

export const headings = {
  margin: '8px 0 16px',
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

export const blockquote = {
  margin: `8px 0 !important`,
  padding: `8px 0 8px 16px`,
  position: 'relative',
  fontStyle: 'italic',
  fontWeight: 'bold',
  lineHeight: '1em',
  color: '#888888',

  '& p': {
    margin: 0
  },

  '&:after': {
    content: '\'\'',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    borderLeft: `4px solid ${BORDER_COLOR}`
  }
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
  whiteSpace: 'nowrap',
  textTransform: 'capitalize',
  fontWeight: 'bold'
}

export const hr = {
  border: 'none',
  '&:after': {
    content: '\'\'', // who knew you could do this? The internet, that's who.
    display: 'block',
    borderBottom: `3px solid ${BORDER_COLOR}`
  }
}

export const code = {
  padding: 8,
  backgroundColor: '#F4F4F4',
  overflowX: 'scroll'
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
    padding: `8px 0`,
    display: 'table-cell',
    fontWeight: 'bold',

    [TABLET_MEDIA_QUERY]: {
      display: 'none',
      padding: `8px 8px 8px 0 !important`
    }
  },

  '& tr': {
    borderTop: 'none',
    borderBottom: `1px solid ${BORDER_COLOR}`,
    [TABLET_MEDIA_QUERY]: {
      borderTop: `1px solid ${BORDER_COLOR}`
    },

    '&:first-of-type': {
      borderTop: `1px solid ${BORDER_COLOR}`
    }
  },

  '& td': {
    padding: `8px 0`,
    display: 'table-cell',

    [TABLET_MEDIA_QUERY]: {
      display: 'flex',
      textAlign: 'left',
      padding: `8px 8px 8px 0 !important`
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
  overflow: 'scroll',
  zIndex: 1
}

export const commonCss = {
  css: {
    html,
    body,
    p,
    a,
    h1,
    h2,
    h3,
    h4,
    h5,
    small,
    table,
    kbd,
    hr,
    code,
    blockquote,
    'code.inline': inlineCode,
    'h1, h2, h3, h4, h5': headings,
    [`button, html [type="button"], [type="reset"], [type="submit"]`]: button
  },
  rules: [
    ['@font-face', FontFaceNotoSerifJapanese],
    ['@font-face', FontFaceNotoSansJapanese],
    ['@font-face', FontFaceNotoSansJapaneseBold]
  ]
}

export default createWithStyles({
  Container
}, commonCss)
