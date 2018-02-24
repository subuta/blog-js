import createWithStyles from 'src/utils/style'

import {
  ACCENT4_COLOR,
  PRIMARY_COLOR,
  PRIMARY2_COLOR,
  LATO_WITH_SANS_FONT,
  EASE_STANDARD,
  SIDEBAR_WIDTH,
  SANS_FONT,

  CHAT_APP_COLOR,
} from 'src/constants/style'

const Sidebar = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  flexDirection: 'column',
  padding: 16,
  height: '100vh',
  width: SIDEBAR_WIDTH,
  flex: '0 0 auto',
  color: PRIMARY_COLOR,
  fontFamily: LATO_WITH_SANS_FONT,
  transition: `all 0.3s ${EASE_STANDARD}`,
  background: CHAT_APP_COLOR,

  '& h4': {
    fontFamily: 'inherit',
    fontWeight: '900'
  }
}

const Channels = {
  margin: 0,
  padding: 0,
  listStyle: 'none',

  '& > li': {
    margin: '0 0 8px 0',
    padding: 0,
    fontWeight: 'bold',

    '& > a': {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'baseline',
      lineHeight: 1,
      textDecoration: 'none',
      color: 'inherit',
      transition: `background-color 0.2s ${EASE_STANDARD}`,

      '& .list-icon': {
        margin: '1px 4px 0 0'
      },
      '&:last-of-type': {
        margin: 0
      },

      '&.is-active': {
        margin: '-4px -16px !important',
        padding: '4px 16px',
        backgroundColor: ACCENT4_COLOR
      }
    }
  }
}

const Logo = {
  height: 72
}

const Menus = {
  width: '100%'
}

export default createWithStyles({
  Sidebar,
  Logo,
  Channels,
  Menus
})
