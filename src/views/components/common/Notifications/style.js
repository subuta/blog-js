import createWithStyles from 'src/views/utils/style'

import {
  BLACK_COLOR,
  PRIMARY_COLOR,
  SUCCESS_COLOR,
  NEGATIVE_COLOR,

  Z_INDEX_2,
  EASE_STANDARD,
  EASE_DECELERATION,
  EASE_ACCELERATION
} from 'src/views/constants/style'

const Notifications = {
  position: 'fixed',
  right: 32,
  top: 16
}

const Notification = {
  ...Z_INDEX_2,
  margin: '8px 0 0 0',
  position: 'relative',
  padding: '8px 16px',
  maxWidth: 400,
  backgroundColor: BLACK_COLOR,
  color: PRIMARY_COLOR,
  borderRadius: 4,
  transition: `all 0.3s ${EASE_DECELERATION}`,
  transform: 'translate3d(0, 0, 0)',
  opacity: 1,
  fontSize: 14,
  fontWeight: 'bold',

  '&.fade-enter': {
    opacity: 0,
    transform: 'translate3d(200px, 0, 0)'
  },

  '&.fade-exit': {
    opacity: 0,
    transform: 'translate3d(200px, 0, 0)',
    transition: `all 0.3s ${EASE_ACCELERATION}`
  },

  '& footer': {
    margin: '8px 0 0 0',
    textAlign: 'right'
  }
}

const Button = {
  margin: '0 8px 0 0',
  padding: '2px 12px',
  borderRadius: 4,
  fontWeight: 'bold',
  backgroundColor: 'transparent',
  border: `2px solid ${PRIMARY_COLOR}`,
  color: PRIMARY_COLOR,
  transition: `all 0.3s ${EASE_STANDARD}`,
  outline: 'none',

  '&:last-of-type': {
    margin: 0
  }
}

const ButtonYes = {
  ...Button,
  border: `2px solid ${SUCCESS_COLOR}`,
  color: SUCCESS_COLOR,
  '&:hover': {
    backgroundColor: SUCCESS_COLOR,
    color: PRIMARY_COLOR,
  }
}

const ButtonNo = {
  ...Button,
  '&:hover': {
    border: `2px solid ${NEGATIVE_COLOR}`,
    color: NEGATIVE_COLOR
  }
}

export default createWithStyles({
  Notifications,
  Notification,
  ButtonYes,
  ButtonNo
})
