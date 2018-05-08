import createWithStyles from 'src/views/utils/style'

import {
  CHAT_APP_COLOR,
  ACCENT4_COLOR,
  EASE_STANDARD,
  PRIMARY_COLOR,
  DIMMED_PRIMARY_COLOR
} from 'src/views/constants/style'

import {
  List as _List,
  Menus
} from 'src/views/components/layout/Sidebar/style'

const Sidebar = {
  background: `${CHAT_APP_COLOR} !important`,
}

const List = {
  ..._List,
  '& a': {
    ..._List['& a'],
    '&:hover': {
      textDecoration: 'underline'
    },

    '&.is-active': {
      margin: '-4px -16px !important',
      padding: '4px 16px',
      backgroundColor: ACCENT4_COLOR
    },
  }
}

const ChannelLink = {
  fontWeight: 'normal',
  color: `${DIMMED_PRIMARY_COLOR} !important`,

  '&.has-unread': {
    fontWeight: 900,
    color: `${PRIMARY_COLOR} !important`
  }
}

export default createWithStyles({
  Sidebar,
  List,
  ChannelLink,
  Menus
})
