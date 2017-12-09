import {
  registerRules
} from 'src/utils/style'

import {
  BLACK_COLOR
} from 'src/constants/style'

const body = {
  backgroundColor: '#FFFFFF',
  color: BLACK_COLOR
}

const button = {
  '-webkit-appearance': 'none !important'
}

registerRules({
  body,
  [`button, html [type="button"], [type="reset"], [type="submit"]`]: button
})
