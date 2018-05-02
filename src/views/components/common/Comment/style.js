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
  flex: '1 1 auto',
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
  },

  '& .text': {
    '& p': {
      margin: 0
    }
  },

  '& .reactions': {
    display: 'none',
    margin: '4px 0 0 0',

    '&.has-reaction': {
      display: 'flex',

      '.add-reaction': {
        opacity: 0,
      }
    },

    '.is-hovered &.has-reaction': {
      '.add-reaction': {
        opacity: 1
      }
    },
  }
}

const Placeholder = {
  display: 'inline-block',
  height: '0.6rem',
  width: 40,
  backgroundColor: GRAY_COLOR,
  borderRadius: 20
}

const CommentPlaceholder = {
  ...Comment,

  '.nickname': {
    ...Placeholder,
    width: 80
  },

  '.commentedAt': {
    ...Placeholder,
    margin: '0 0 0 4px',
    width: 40
  },

  '.comment': {
    ...Placeholder,
    margin: '4px 0 0',
    width: 200
  },

  '.attachment': {
    ...Placeholder,
    margin: '4px 0 0',
    borderRadius: 8,
    height: 400,
    width: 400
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
  display: 'none',

  '.is-hovered &': {
    display: 'block'
  },

  '& .reactions': {
    display: 'inline-flex',
    justifyContent: 'center'
  },

  '& > *': {
    borderRight: `1px solid ${BORDER_COLOR}`,
    '&:last-child': {
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
  CommentPlaceholder,
  Nickname,
  CommentedAt,
  Actions,
  Action
})
