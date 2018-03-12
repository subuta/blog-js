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
  DIMMED_BLACK_COLOR,

  Z_INDEX_3,

  EASE_DECELERATION,
  EASE_ACCELERATION,

  NAVIGATION_WIDTH,
  TABLET_MEDIA_QUERY,

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
  minHeight: 'inherit',
  height: '100vh',
  width: SIDEBAR_WIDTH,
  flex: '0 0 auto',
  color: PRIMARY_COLOR,
  fontFamily: LATO_WITH_SANS_FONT,
  background: CHAT_APP_COLOR,

  '& h4': {
    fontFamily: 'inherit',
    fontWeight: '900'
  },

  [TABLET_MEDIA_QUERY]: {
    ...Z_INDEX_3,
    position: 'fixed',
    left: -1000 + NAVIGATION_WIDTH,
    top: 0,
    bottom: 0,
    zIndex: 100,
    transition: `all 0.5s ${EASE_DECELERATION}`,

    '.is-show-menu &': {
      left: NAVIGATION_WIDTH,
      transition: `all 0.5s ${EASE_ACCELERATION}`,
    }
  }
}

export const List = {
  margin: 0,
  padding: 0,
  listStyle: 'none',

  '& > li': {
    margin: '0 0 8px 0',
    padding: 0,
    fontWeight: 'bold'
  },

  '& a': {
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
    }
  }
}

const Logo = {
  'a': {
    textDecoration: 'none',
    color: 'inherit'
  },

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
