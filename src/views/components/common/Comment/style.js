import createWithStyles from 'src/views/utils/style'

import color from 'color'

import {
  DIMMED_BLACK_COLOR,
  SANS_FONT,
  LATO_WITH_SANS_FONT,
  GRAY_COLOR,
  BORDER_COLOR,
  PRIMARY_COLOR,

  EASE_STANDARD,

  TABLET_MEDIA_QUERY
} from 'src/views/constants/style'

const CommentWrapper = {
  padding: '4px 16px',
  position: 'relative',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  transition: `all 0.1s ${EASE_STANDARD}`,

  '&:last-of-type': {
    margin: 0
  },

  '&.is-hovered': {
    background: color(GRAY_COLOR).fade(0.6).string()
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

const Actions = {
  position: 'absolute',
  top: 0,
  right: 16,
  borderRadius: 4,
  border: `1px solid ${BORDER_COLOR}`,
  background: PRIMARY_COLOR,
  transform: 'translate3d(0, -50%, 0)',

  '& > span': {
    borderRight: `1px solid ${BORDER_COLOR}`,
    '&:last-of-type': {
      borderRight: 'none',
    }
  }
}

const Action = {
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 24,
  width: 32,
  lineHeight: 1,
  color: DIMMED_BLACK_COLOR,

  '& > svg': {
    height: 'auto',
    width: 16
  }
}

export default createWithStyles({
  CommentWrapper,
  Comment,
  Nickname,
  CommentedAt,
  Actions,
  Action
})
