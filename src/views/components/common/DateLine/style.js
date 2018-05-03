import createWithStyles from 'src/views/utils/style'

import {
  BORDER_COLOR,
  PRIMARY_COLOR,

  TABLET_MEDIA_QUERY
} from 'src/views/constants/style'

const DateLine = {
  margin: '8px 0',
  position: 'relative',

  '&:before': {
    display: 'block',
    content: '\'\'',
    width: '100%',
    borderTop: `1px solid ${BORDER_COLOR}`
  },

  '& > b': {
    padding: '4px 16px',
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translate3d(-50%, -50%, 0)',
    borderRadius: 4,
    backgroundColor: PRIMARY_COLOR,
    fontSize: 14
  },

  [TABLET_MEDIA_QUERY]: {
    '& > b': {
      padding: '0 16px',
      fontSize: 12
    }
  }
}

export default createWithStyles({
  DateLine
})
