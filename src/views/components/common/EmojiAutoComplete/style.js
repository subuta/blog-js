import createWithStyles from 'src/views/utils/style'

import {
  EASE_SHARP,
  Z_INDEX_2
} from 'src/views/constants/style'

const EmojiAutoComplete = {
  position: 'absolute',
  zIndex: 1,
  display: 'none',
  '&.is-show': {
    display: 'block'
  },

  '& .emoji-mart': {
    ...Z_INDEX_2,
    transition: `all 0.1s ${EASE_SHARP}`
  }
}

export default createWithStyles({
  EmojiAutoComplete,
})
