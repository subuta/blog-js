import createWithStyles from 'src/views/utils/style'

import {
  ACCENT4_COLOR,
  PRIMARY_COLOR,
  PRIMARY2_COLOR,
  LATO_WITH_SANS_FONT,
  EASE_STANDARD,
  SIDEBAR_WIDTH,
  SANS_FONT,
  BLACK_COLOR,
  GRAY_COLOR,

  WIKI_HEADER_HEIGHT,

  CHAT_APP_COLOR,
  WIKI_APP_COLOR
} from 'src/views/constants/style'

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

  '&.is-chat': {
    background: CHAT_APP_COLOR,
  },

  '&.is-wiki': {
    background: GRAY_COLOR,
    color: BLACK_COLOR
  },

  '& h4': {
    fontFamily: 'inherit',
    fontWeight: '900'
  }
}

export const List = {
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
      alignItems: 'flex-start',
      lineHeight: 1,
      textDecoration: 'none',
      color: 'inherit',
      transition: `background-color 0.2s ${EASE_STANDARD}`,

      '& .list-icon': {
        margin: '0px 4px 0 0'
      },

      '& .name': {
        margin: '1px 0 0 0'
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
  '.is-wiki &': {
    margin: '-16px -16px 0',
    padding: 16,
    height: WIKI_HEADER_HEIGHT,
    background: WIKI_APP_COLOR,
    color: PRIMARY_COLOR,
  },
}

export const Menus = {
  width: '100%'
}

export default createWithStyles({
  Sidebar,
  Logo,
  List,
  Menus
})
