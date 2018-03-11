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
  margin: '16px 0 0',
  padding: 6,
  fontSize: 20,
  background: '#DDDDDD',
  borderRadius: '50%',
  opacity: 0.5,
  color: DIMMED_BLACK_COLOR,
  border: '4px solid #DDDDDD',
  transition: `all 0.3s ${EASE_STANDARD}`,

  '&:first-child': {
    margin: 0
  },

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

}

const Bottom = {

}

const User = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '16px 0 0',
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
  Top,
  Bottom,
  ChatApp,
  WikiApp
})
