import createWithStyles from 'src/views/utils/style'

import {
  GRAY_COLOR,
  PRIMARY_COLOR,
  BLACK_COLOR,
  ACCENT4_COLOR,
  Z_INDEX_2,

  EASE_STANDARD
} from 'src/views/constants/style'

const Menu = {
  ...Z_INDEX_2,
  position: 'absolute',
  zIndex: 1010,
  display: 'none',
  backgroundColor: PRIMARY_COLOR,
  color: BLACK_COLOR,
  borderRadius: 2,
  '&.is-show': {
    display: 'block'
  },

  '& ul': {
    margin: 0,
    padding: '4px 0',
    listStyle: 'none',
    fontSize: 14,

    '& > li': {
      padding: '8px 16px',
      transition: `all 0.1s ${EASE_STANDARD}`,
      backgroundColor: PRIMARY_COLOR,
      userSelect: 'none',
      fontWeight: 'bold',

      '&:hover': {
        backgroundColor: ACCENT4_COLOR,
        color: PRIMARY_COLOR
      },

      '& a': {
        textDecoration: 'none',
        color: 'inherit'
      }
    }
  }
}

const Backdrop = {
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 1001,
  background: 'transparent',
  display: 'none',
  '&.is-show': {
    display: 'block'
  }
}

export default createWithStyles({
  Menu,
  Backdrop
})
