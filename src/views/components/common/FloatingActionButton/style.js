import createWithStyles from 'src/views/utils/style'

import {
  PRIMARY_COLOR,

  TABLET_MEDIA_QUERY,

  EASE_STANDARD,
  Z_INDEX_1
} from 'src/views/constants/style'

const FloatingActionButtonWrapper = {
  position: 'fixed !important',
  right: 32,
  bottom: 16,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  [TABLET_MEDIA_QUERY]: {
    right: 16
  }
}

const FloatingActionButton = {
  ...Z_INDEX_1,
  padding: 0,
  height: 56,
  width: 56,
  backgroundColor: PRIMARY_COLOR,
  borderRadius: '50% !important',

  '&.is-sub': {
    opacity: 0,
    margin: '0 0 8px',
    height: 48,
    width: 48,
    pointerEvents: 'none',
    transition: `all 0.3s ${EASE_STANDARD}`,

    '.is-hovered &': {
      opacity: 1,
      pointerEvents: 'auto'
    }
  }
}

export default createWithStyles({
  FloatingActionButtonWrapper,
  FloatingActionButton
})
