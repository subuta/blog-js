import createWithStyles from 'src/views/utils/style'

import {
  BLACK_COLOR,
  GRAY_COLOR,
  BORDER_COLOR,
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

  '& > h4': {
    margin: 0
  },

  '.created-at': {
    display: 'inline-block'
  },

  '.editor, .content': {
    margin: '16px 0 0 !important',
    wordWrap: 'break-word',
    overflowWrap: 'break-word',

    '& > *:first-of-type': {
      marginTop: 0
    }
  }
}

const Title = {
  margin: '0 !important'
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

const EditorArea = {
  display: 'flex',

  '& > .editor': {
    paddingRight: 8,
    flex: '0 0 auto',
    width: '50%',
    borderRight: `3px solid ${BORDER_COLOR}`
  },
  '& > .content': {
    paddingLeft: 8,
    flex: '0 0 auto',
    width: '50%'
  }
}

export default createWithStyles({
  Paper,
  Title,
  ScrollContainer,
  EditorArea
})
