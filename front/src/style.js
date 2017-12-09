import Style, {
  registerRules
} from 'src/utils/style'

import {
  BLACK_COLOR
} from 'src/constants/style'

import WebFont from 'webfontloader'

WebFont.load({
  google: {
    families: ['Lato']
  }
})

const html = {
  fontSize: '1em'
}

const body = {
  backgroundColor: '#FFFFFF',
  fontFamily: `"Lato", serif`,
  fontWeight: 400,
  lineHeight: 1.45,
  color: BLACK_COLOR
}

const p = {
  marginBottom: '1.3em'
}

const headings = {
  margin: '1.414em 0 0.5em',
  fontFamily: `"Lato", serif`,
  fontWeight: 'inherit',
  lineHeight: 1.2
}

const h1 = {
  marginTop: 0,
  fontSize: '2.441em'
}

const h2 = {
  fontSize: '1.953em'
}

const h3 = {
  fontSize: '1.563em'
}

const h4 = {
  fontSize: '1.25em'
}

const small = {
  fontSize: '0.8em'
}

const button = {
  '-webkit-appearance': 'none !important'
}

Style.registerRule('@font-face', {
  fontFamily: '"Noto Serif Japanese"',
  src: `url("assets/fonts/WebNotoSerifCJKjp-Regular.otf?") format('otf'),
        url("assets/fonts/WebNotoSerifCJKjp-Regular.woff2") format('woff2'),
        url("assets/fonts/WebNotoSerifCJKjp-Regular.woff") format('woff')
  `
})

Style.registerRule('@font-face', {
  fontFamily: '"Noto Sans Japanese"',
  fontWeight: 'normal',
  src: `url("assets/fonts/WebNotoSansCJKjp-Regular.otf?") format('otf'),
        url("assets/fonts/WebNotoSansCJKjp-Regular.woff2") format('woff2'),
        url("assets/fonts/WebNotoSansCJKjp-Regular.woff") format('woff')
  `
})

Style.registerRule('@font-face', {
  fontFamily: '"Noto Sans Japanese"',
  fontWeight: 'bold',
  src: `url("assets/fonts/WebNotoSansCJKjp-Bold.otf?") format('otf'),
        url("assets/fonts/WebNotoSansCJKjp-Bold.woff2") format('woff2'),
        url("assets/fonts/WebNotoSansCJKjp-Bold.woff") format('woff')
  `
})

registerRules({
  html,
  body,
  p,
  h1,
  h2,
  h3,
  h4,
  small,
  'h1, h2, h3, h4': headings,
  [`button, html [type="button"], [type="reset"], [type="submit"]`]: button
})
