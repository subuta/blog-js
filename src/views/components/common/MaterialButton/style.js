import createWithStyles from 'src/views/utils/style'

import {
  PRIMARY_COLOR,
  EASE_STANDARD,
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

  '&.is-ghost': {
    boxShadow: 'none'
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
