import createWithStyles from 'src/views/utils/style'

import {
  BORDER_COLOR,
  ACCENT4_COLOR,

  EASE_STANDARD
} from 'src/views/constants/style'

const TextField = {
  '& label': {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'baseline',

    '& > span': {
      margin: '0 8px 0 0',
      fontWeight: 'bold'
    },

    '& > input': {
      padding: '4px 0',
      minWidth: 200,
      appearance: 'none',
      border: 'none',
      borderBottom: `2px solid ${BORDER_COLOR}`,
      outline: 'none',
      transition: `all 0.3s ${EASE_STANDARD}`,

      '&:focus': {
        borderBottom: `2px solid ${ACCENT4_COLOR}`,
      }
    }
  }
}

export default createWithStyles({
  TextField
})
