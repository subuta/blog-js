import createWithStyles from 'src/views/utils/style'

import {
  BORDER_COLOR,
  ACCENT4_COLOR,
  NEGATIVE_COLOR,
  DIMMED_BLACK_COLOR,

  EASE_STANDARD
} from 'src/views/constants/style'

const TextArea = {
  '& label': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',

    '& > span': {
      flex: '0 0 120px',
      margin: '0 8px 0 0',
      fontWeight: 'bold',
      textAlign: 'right'
    },

    '& > .input': {
      flex: '1 1 100%',
    },

    '& textarea': {
      padding: '4px 0',
      width: '100%',
      minHeight: 120,
      appearance: 'none',
      border: 'none',
      borderBottom: `2px solid ${BORDER_COLOR}`,
      outline: 'none',
      transition: `border-bottom 0.3s ${EASE_STANDARD}`,
      resize: 'none',

      '&:focus': {
        borderBottom: `2px solid ${ACCENT4_COLOR}`,
      }
    }
  },

  '& small': {
    margin: '4px 0 0 0',
    display: 'block',
    textAlign: 'right',
    fontWeight: 'bold',
    color: DIMMED_BLACK_COLOR,
    transition: `color 0.3s ${EASE_STANDARD}`,
  },

  '&.has-error small': {
    color: NEGATIVE_COLOR
  }
}

export default createWithStyles({
  TextArea
})
