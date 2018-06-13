import createWithStyles from 'src/views/utils/style'

// load common css style.
import {commonCss} from './style'

import {
  SUCCESS_COLOR,
  PRIMARY_COLOR,
  BLACK_COLOR,
  GRAY_COLOR,
  BORDER_COLOR,
  EASE_STANDARD,

  TABLET_MEDIA_QUERY
} from 'src/views/constants/style'

const Container = {
  padding: 32,
  position: 'relative',
  minHeight: 400,
  height: '100vh',
  width: '100vw',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',

  [TABLET_MEDIA_QUERY]: {
    padding: '8px 16px'
  }
}

const NestedContainer = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '& pre': {
    padding: 8,
    whiteSpace: 'pre-wrap',
    backgroundColor: '#eaeaea'
  },

  [TABLET_MEDIA_QUERY]: {
    flexDirection: 'column',
    alignItems: 'flex-start'
  }
}

const FakeSidebar = {
  flex: '0 0 auto',
  width: 268,
}

const Content = {
  margin: '16px 0',
  padding: '32px 0',
  flex: '1 1 auto',
  maxHeight: '80vh',
  overflow: 'scroll',

  [TABLET_MEDIA_QUERY]: {
    padding: '0 8px',
    border: `1px solid ${BORDER_COLOR}`
  }
}

const Actions = {
  margin: '16px 0',

  '& button': {
    margin: '0 16px 0 0',

    '&.is-success': {
      backgroundColor: SUCCESS_COLOR,
      color: PRIMARY_COLOR
    }
  },

  [TABLET_MEDIA_QUERY]: {
    margin: 0,
    textAlign: 'center',

    '& button': {
      margin: '0 0 8px',
    }
  }
}

export default createWithStyles({
  Container,
  NestedContainer,
  FakeSidebar,
  Content,
  Actions
}, commonCss)
