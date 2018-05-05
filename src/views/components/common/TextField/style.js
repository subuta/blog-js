import createWithStyles from 'src/views/utils/style'

import {
  BORDER_COLOR,
  ACCENT4_COLOR,
  NEGATIVE_COLOR,

  EASE_STANDARD
} from 'src/views/constants/style'

const TextField = {
  'label': {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'baseline',

    '& > span': {
      flex: '0 0 120px',
      margin: '0 8px 0 0',
      fontWeight: 'bold',
      textAlign: 'right'
    },

    '& > .input': {
      flex: '1 1 100%',
    },

    'input': {
      padding: '4px 0',
      width: '100%',
      appearance: 'none',
      border: 'none',
      borderBottom: `2px solid ${BORDER_COLOR}`,
      outline: 'none',
      transition: `all 0.3s ${EASE_STANDARD}`,

      '&:focus': {
        borderBottom: `2px solid ${ACCENT4_COLOR}`
      }
    },

    '.error': {
      color: NEGATIVE_COLOR,
      fontWeight: 'bold',
      fontSize: 13
    }
  },

  '&.has-error input': {
    borderBottom: `2px solid ${NEGATIVE_COLOR}`
  },
}

export default createWithStyles({
  TextField
})
