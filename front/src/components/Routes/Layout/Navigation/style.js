import createWithStyles from 'src/utils/style'

import {
  BLACK_COLOR,
  DIMMED_BLACK_COLOR,

  CHAT_APP_COLOR
} from 'src/constants/style'

const Navigation = {
  height: '100vh',
  padding: '16px 12px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  background: BLACK_COLOR,
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

  '&:first-child': {
    margin: 0
  },

  '&.is-active': {
    opacity: 1,
    border: '4px solid currentColor',
    boxShadow: '1px 1px 1px 0px rgba(0, 0, 0, 0.5)'
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
    color: 'red'
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
