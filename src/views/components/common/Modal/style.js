import createWithStyles from 'src/views/utils/style'

import {
  PRIMARY_COLOR,
  DIMMED_BLACK_COLOR,
  BORDER_COLOR,

  EASE_ACCELERATION,
  EASE_DECELERATION,
  EASE_STANDARD,

  Z_INDEX_2
} from 'src/views/constants/style'

const Modal = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}

const Body = {
  ...Z_INDEX_2,
  background: PRIMARY_COLOR,
  zIndex: 10,
  transition: `all 0.3s ${EASE_DECELERATION}`,
  transform: 'translate3d(0, 0, 0)',
  opacity: 1,
  borderRadius: 2,

  '.modal-enter &': {
    transform: 'translate3d(0, -24px, 0)',
    opacity: 0,
  },

  '.modal-leave &': {
    transform: 'translate3d(0, -24px, 0)',
    opacity: 0,
    transition: `all 0.3s ${EASE_DECELERATION}`,
  },

  '.modal-content': {
    padding: '32px 16px',
    minWidth: 200,
  },

  '& header': {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '8px 16px',
    borderBottom: `1px solid ${BORDER_COLOR}`,
    fontWeight: 'bold'
  },

  '& footer': {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: '4px 8px',
    borderTop: `1px solid ${BORDER_COLOR}`,

    '& > button': {
      margin: '0 8px 0 0',
      padding: '8px 12px',

      '&:last-of-type': {
        margin: 0
      }
    }
  }
}

const Backdrop = {
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 1,
  background: DIMMED_BLACK_COLOR,
  display: 'block',
  transition: `all 0.3s ${EASE_STANDARD}`,
  opacity: 0.8,

  '.modal-enter &': {
    opacity: 0
  },

  '.modal-leave &': {
    opacity: 0
  }
}

export default createWithStyles({
  Modal,
  Body,
  Backdrop
})
