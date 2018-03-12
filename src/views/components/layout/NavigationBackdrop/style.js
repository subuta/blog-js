import createWithStyles from 'src/views/utils/style'

import {
  TABLET_MEDIA_QUERY
} from 'src/views/constants/style'

const Mask = {
  position: 'absolute',
  display: 'none',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 1,
  backgroundColor: '#FFFFFF',
  opacity: 0.8,

  [TABLET_MEDIA_QUERY]: {
    '.is-show-menu &': {
      display: 'block'
    }
  }
}

export default createWithStyles({
  Mask
})
