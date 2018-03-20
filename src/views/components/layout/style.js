import createWithStyles, { Style } from 'src/views/utils/style'
import getConfig from 'next/config'
import { source } from 'common-tags'

const config = getConfig()
const {
  staticFolder
} = config.publicRuntimeConfig

import {
  ACCENT3_COLOR,
  PRIMARY_COLOR,
  BLACK_COLOR,
  SANS_FONT,
  PAGE_MIN_HEIGHT,
  NOISE_PATTERN,
  NAVIGATION_WIDTH,
  SIDEBAR_WIDTH
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

const button = {
  '-webkit-appearance': 'none !important'
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
    'h1, h2, h3, h4': headings,
    [`button, html [type="button"], [type="reset"], [type="submit"]`]: button
  },
  rules: [
    ['@font-face', FontFaceNotoSerifJapanese],
    ['@font-face', FontFaceNotoSansJapanese],
    ['@font-face', FontFaceNotoSansJapaneseBold]
  ]
})
