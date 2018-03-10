import createWithStyles from 'src/views/utils/style'

import {
  PRIMARY_COLOR,
  BLACK_COLOR,

  Z_INDEX_1
} from 'src/views/constants/style'

const Paper = {
  ...Z_INDEX_1,
  margin: '-32px 32px 0 0',
  padding: 32,
  position: 'relative',
  backgroundColor: PRIMARY_COLOR,
  color: BLACK_COLOR,
  borderRadius: 2,

  '& h4': {
    margin: ' 0 0 16px',
    fontFamily: 'inherit',
    fontWeight: '900'
  }
}

export default createWithStyles({
  Paper
})
