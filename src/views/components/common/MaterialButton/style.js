import createWithStyles from 'src/views/utils/style'

import {
  PRIMARY_COLOR,
  EASE_STANDARD,
  GRAY_COLOR,
  Z_INDEX_1
} from 'src/views/constants/style'

const MaterialButton = {
  ...Z_INDEX_1,
  padding: 8,
  textAlign: 'center',
  border: 'none',
  borderRadius: 2,
  outline: 'none',
  transition: `all 0.3s ${EASE_STANDARD}`,
  fontWeight: 'bold',

  '&.is-ghost': {
    boxShadow: 'none',

    '&:hover': {
      backgroundColor: GRAY_COLOR
    }
  },

  '&.is-secondary': {
    opacity: 0.6,

    '&:hover': {
      opacity: 1
    }
  },

  '& svg': {
    height: 24,
    width: 'auto'
  },

  'a': {
    color: 'inherit'
  },

  '&:hover': {
    backgroundColor: PRIMARY_COLOR
  }
}

export default createWithStyles({
  MaterialButton
})
