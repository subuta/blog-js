import createWithStyles from 'src/views/utils/style'

import {
  PRIMARY_COLOR,

  Z_INDEX_1
} from 'src/views/constants/style'

const FloatingActionButton = {
  ...Z_INDEX_1,
  position: 'fixed',
  padding: 0,
  right: 32,
  bottom: 16,
  height: 56,
  width: 56,
  textAlign: 'center',
  border: 'none',
  borderRadius: '50%',
  backgroundColor: PRIMARY_COLOR,
  outline: 'none',

  '& svg': {
    height: 24,
    width: 'auto'
  },

  '&:hover': {
    backgroundColor: PRIMARY_COLOR
  }
}

export default createWithStyles({
  FloatingActionButton
})
