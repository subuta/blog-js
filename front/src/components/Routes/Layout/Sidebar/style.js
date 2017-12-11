import {
  registerStyles
} from 'src/utils/style'

import {
  NOISE_PATTERN,
  GRAY_COLOR,
  ACCENT3_COLOR,
  ACCENT4_COLOR,
  PRIMARY_COLOR,
  PRIMARY2_COLOR,
  LATO_WITH_SANS_FONT,
  EASE_STANDARD,
  SANS_FONT
} from 'src/constants/style'

const Sidebar = {
  padding: 16,
  height: '100vh',
  flex: '0 0 204px',
  background: ACCENT3_COLOR,
  color: PRIMARY_COLOR,
  fontFamily: LATO_WITH_SANS_FONT,

  '& > h4': {
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
      alignItems: 'flex-start',
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

const Notes = {
  margin: 0,
  padding: 0,
  listStyle: 'none',

  '& > li': {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    margin: '0 0 8px 0',
    padding: 0,
    fontWeight: 'bold',
    fontFamily: SANS_FONT,
    lineHeight: 1,

    '& > div': {
      marginTop: -2,
      lineHeight: 1.3
    },

    '& .list-icon': {
      margin: '0 4px 0 0',
      padding: 4,
      display: 'inline-block',
      backgroundColor: PRIMARY2_COLOR,
      borderRadius: 4,
      lineHeight: 1,
      // boxShadow: '0 2px 2px 0 rgba(0,0,0,0.24)',
      '& > .svg-icon': {
        height: 16,
        width: 16,
        color: ACCENT3_COLOR
      }
    },
    '&:last-of-type': {
      margin: 0
    }
  }
}

const Logo = {
  height: 72
}

export default registerStyles({
  Sidebar,
  Logo,
  Channels,
  Notes
})
