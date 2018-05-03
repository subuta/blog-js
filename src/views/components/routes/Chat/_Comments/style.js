import createWithStyles from 'src/views/utils/style'

import {
  NAVIGATION_WIDTH,
  SIDEBAR_WIDTH,
  SHADOW_COLOR,
  PRIMARY_COLOR,

  TABLET_MEDIA_QUERY
} from 'src/views/constants/style'

const Comments = {
  position: 'relative',
  overflow: 'hidden',
  '.ReactVirtualized__List': {
    outline: 'none'
  }
}

const Comment = {
  position: 'relative',

  '& table': {
    maxWidth: '40vw'
  },

  '& > img': {
    display: 'block',
    height: 'auto',
    maxWidth: '100%'
  },

  [TABLET_MEDIA_QUERY]: {
    '& table': {
      maxWidth: '100%'
    },
  }
}

const PullToFetch = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 10,
  backgroundColor: PRIMARY_COLOR
}

const Loader = {
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.5)'
}

export default createWithStyles({
  Comments,
  Comment,
  PullToFetch,
  Loader
})
