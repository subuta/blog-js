import createWithStyles from 'src/views/utils/style'

import {
  EASE_SHARP,
  Z_INDEX_2
} from 'src/views/constants/style'

const PickerRoot = {
  position: 'inherit'
}

const PickerWrapper = {
  position: 'inherit',
  zIndex: 10,
  display: 'none',
  '&.is-show': {
    display: 'block'
  },

  '& .emoji-mart': {
    ...Z_INDEX_2,
    transition: `all 0.1s ${EASE_SHARP}`,
    zIndex: 20,
  }
}

const Backdrop = {
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 1,
  background: 'transparent',
  display: 'none',
  '&.is-show': {
    display: 'block'
  }
}

export default createWithStyles({
  PickerRoot,
  PickerWrapper,
  Backdrop,
})
