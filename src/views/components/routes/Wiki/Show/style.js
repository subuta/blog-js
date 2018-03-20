import createWithStyles from 'src/views/utils/style'

import {
  BLACK_COLOR,
  GRAY_COLOR,
  PRIMARY_COLOR,
  WIKI_APP_COLOR
} from 'src/views/constants/style'

const Paper = {
  '& .button-fab': {
    backgroundColor: WIKI_APP_COLOR,
    color: PRIMARY_COLOR,
    '&:hover': {
      backgroundColor: WIKI_APP_COLOR
    }
  },

  'h4': {
    margin: '0 !important'
  },

  '.created-at': {
    display: 'inline-block'
  },

  '.article-content': {
    margin: '16px 0 0'
  }
}

const ScrollContainer = {
  position: 'relative',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  overflow: 'scroll',
  flex: '1 0 0',
  minHeight: 'inherit',
  height: '100vh',
  background: `${GRAY_COLOR} !important`,
  color: `${BLACK_COLOR} !important`
}

export default createWithStyles({
  Paper,
  ScrollContainer
})
