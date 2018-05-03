import createWithStyles from 'src/views/utils/style'

import {
  NAVIGATION_WIDTH,
  SIDEBAR_WIDTH,
  SHADOW_COLOR,

  TABLET_MEDIA_QUERY
} from 'src/views/constants/style'

const Comments = {
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

export default createWithStyles({
  Comments,
  Comment
})
