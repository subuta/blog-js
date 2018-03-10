import createWithStyles from 'src/views/utils/style'

import {
  BLACK_COLOR,
  ACCENT4_COLOR,
  EASE_STANDARD,
  DIMMED_BLACK_COLOR
} from 'src/views/constants/style'

const Articles = {
  margin: '24px 0 0',
  padding: 0,
  listStyle: 'none',

  'li': {
    position: 'relative',
    margin: '0 0 16px 0',
    padding: 0,
    color: BLACK_COLOR,

    'a': {
      textDecoration: 'none',
      transition: `background-color 0.2s ${EASE_STANDARD}`,
      color: BLACK_COLOR,

      '&:hover': {
        color: ACCENT4_COLOR
      }
    },

    'h4': {
      margin: 0
    },

    '& p': {
      margin: 0,
      color: DIMMED_BLACK_COLOR
    },

    '.created-at': {
      position: 'absolute',
      top: 0,
      right: 0
    }
  }
}

export default createWithStyles({
  Articles
})
