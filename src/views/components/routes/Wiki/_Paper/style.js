import createWithStyles from 'src/views/utils/style'

import {
  PRIMARY_COLOR,
  BLACK_COLOR,

  Z_INDEX_1,

  TABLET_MEDIA_QUERY
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
  },

  [TABLET_MEDIA_QUERY]: {
    margin: 0,
    padding: 16,
    boxShadow: 'none',
    borderRadius: 0,

    '& h4': {
      margin: '16px 0'
    }
  }
}

export default createWithStyles({
  Paper
})
