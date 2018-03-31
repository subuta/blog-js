import createWithStyles from 'src/views/utils/style'

import {
  BLACK_COLOR,
  DIMMED_BLACK_COLOR,

  TABLET_MEDIA_QUERY,

  EASE_DECELERATION,
  EASE_ACCELERATION,

  EASE_STANDARD,
  CHAT_APP_COLOR,
  WIKI_APP_COLOR
} from 'src/views/constants/style'

import { avatarSize } from 'src/views/components/common/Avatar/style'
import { GRAY_COLOR } from '../../../constants/style'

const Navigation = {
  minHeight: 'inherit',
  height: '100vh',
  padding: '16px 12px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  background: BLACK_COLOR,

  [TABLET_MEDIA_QUERY]: {
    position: 'fixed',
    left: -1000,
    top: 0,
    bottom: 0,
    zIndex: 1000,
    transition: `all 0.5s ${EASE_DECELERATION}`,

    '.is-show-menu &': {
      left: 0,
      transition: `all 0.5s ${EASE_ACCELERATION}`,
    }
  }
}

const Item = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 6,
  fontSize: 20,
  background: '#DDDDDD',
  borderRadius: '50%',
  opacity: 0.5,
  color: DIMMED_BLACK_COLOR,
  border: '4px solid #DDDDDD',
  transition: `all 0.3s ${EASE_STANDARD}`,

  '&.is-active': {
    opacity: 1,
    border: '4px solid currentColor',
    boxShadow: '1px 1px 1px 0px rgba(0, 0, 0, 0.5)'
  },

  '&:hover': {
    opacity: 1
  },

  '& > *': {
    color: 'inherit'
  }
}

const Top = {
  display: 'flex',
  flexDirection: 'column',

  '& > *': {
    margin: '16px 0 0',

    '&:first-child': {
      margin: 0
    },
  }
}

const Bottom = {

}

const User = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '16px 0 0',
  cursor: 'pointer'
}

const IconWrapper = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: GRAY_COLOR,
  height: avatarSize,
  width: avatarSize,
  borderRadius: 4,
  color: DIMMED_BLACK_COLOR,
  transition: `all 0.3s ${EASE_STANDARD}`,
  cursor: 'pointer',

  '& > svg': {
    height: avatarSize - 16,
    width: avatarSize - 16
  },

  '&:hover': {
    color: BLACK_COLOR
  }
}

const ChatApp = {
  ...Item,
  '&.is-active': {
    ...Item['&.is-active'],
    color: CHAT_APP_COLOR
  }
}

const WikiApp = {
  ...Item,
  '&.is-active': {
    ...Item['&.is-active'],
    color: WIKI_APP_COLOR
  }
}

export default createWithStyles({
  Navigation,
  Item,
  User,
  IconWrapper,
  Top,
  Bottom,
  ChatApp,
  WikiApp
})
