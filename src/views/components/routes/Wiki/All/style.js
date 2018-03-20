import createWithStyles from 'src/views/utils/style'

import {
  BLACK_COLOR,
  PRIMARY_COLOR,
  ACCENT4_COLOR,
  EASE_STANDARD,
  GRAY_COLOR,
  DIMMED_BLACK_COLOR,

  TABLET_MEDIA_QUERY,

  WIKI_APP_COLOR,

  Z_INDEX_1
} from 'src/views/constants/style'

const Paper = {
  '& .button-fab': {
    backgroundColor: WIKI_APP_COLOR,
    color: PRIMARY_COLOR,
    '&:hover': {
      backgroundColor: WIKI_APP_COLOR
    }
  }
}

const Articles = {
  margin: '24px 0 0',
  padding: 0,
  listStyle: 'none',

  'li': {
    position: 'relative',
    margin: '0 0 16px 0',
    padding: 0,
    color: BLACK_COLOR,

    'a': {
      textDecoration: 'none',
      transition: `background-color 0.2s ${EASE_STANDARD}`,
      color: BLACK_COLOR,

      '&:hover': {
        color: ACCENT4_COLOR
      }
    },

    'h4': {
      margin: 0
    },

    '& p': {
      margin: 0,
      color: DIMMED_BLACK_COLOR
    },

    '.created-at': {
      position: 'absolute',
      display: 'block',
      top: 0,
      right: 0,
      lineHeight: 1
    }
  },

  [TABLET_MEDIA_QUERY]: {
    'li': {
      margin: '0 0 24px 0',

      '.created-at': {
        margin: '4px 0 0',
        position: 'relative'
      }
    }
  }
}

const ScrollContainer = {
  position: 'relative',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  overflow: 'scroll',
  flex: '1 0 auto',
  minHeight: 'inherit',
  height: '100vh',
  background: `${GRAY_COLOR} !important`,
  color: `${BLACK_COLOR} !important`
}

export default createWithStyles({
  Paper,
  ScrollContainer,
  Articles
})
