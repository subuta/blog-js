import createWithStyles from 'src/views/utils/style'

import {
  DIMMED_BLACK_COLOR,
  SANS_FONT,
  LATO_WITH_SANS_FONT,

  TABLET_MEDIA_QUERY
} from 'src/views/constants/style'

const CommentWrapper = {
  margin: '0 0 16px 0',
  position: 'relative',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  '&:last-of-type': {
    margin: 0
  }
}

const Comment = {
  margin: '0 0 0 8px',

  '& > p': {
    whiteSpace: 'pre-wrap',
    fontSize: 14,
    fontFamily: SANS_FONT,
    wordWrap: 'break-word',
    overflowWrap: 'break-word',

    '&:first-of-type': {
      margin: '0 !important'
    },
    '&:last-of-type': {
      margin: '16px 0 0'
    }
  },

  '& > img': {
    display: 'block',
    height: 'auto',
    maxWidth: 400,

    [TABLET_MEDIA_QUERY]: {
      maxWidth: '100%'
    }
  }
}

const Nickname = {
  fontSize: 13,
  fontWeight: 'bold',
  fontFamily: LATO_WITH_SANS_FONT,
}

const CommentedAt = {
  display: 'inline-block',
  margin: '0 0 0 4px',
  fontSize: 11,
  fontWeight: 'bold',
  color: DIMMED_BLACK_COLOR
}

export default createWithStyles({
  CommentWrapper,
  Comment,
  Nickname,
  CommentedAt
})
