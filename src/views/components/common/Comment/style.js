import createWithStyles from 'src/views/utils/style'

import color from 'color'

import {
  DIMMED_BLACK_COLOR,
  SANS_FONT,
  LATO_WITH_SANS_FONT,
  GRAY_COLOR,
  BORDER_COLOR,
  BLACK_COLOR,
  PRIMARY_COLOR,

  EASE_STANDARD,

  TABLET_MEDIA_QUERY
} from 'src/views/constants/style'

const MIN_TEXT_AREA_HEIGHT = 40

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
    backgroundColor: color(GRAY_COLOR).fade(0.6).string()
  },

  '&.is-editing': {
    backgroundColor: '#FFF5CC',
    alignItems: 'stretch'
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

  '& > button': {
    display: 'inline-flex',
    margin: '4px 4px 0 0',
    padding: '2px 4px',
    backgroundColor: 'transparent',
    borderRadius: 4,
    border: `1px solid transparent`,
    justifyContent: 'center',
    alignItems: 'center',
    transition: `all 0.1s ${EASE_STANDARD}`,
    outline: 'none',
    fontSize: 13,

    '& > kbd': {
      marginLeft: '0'
    },

    '&:hover': {
      border: `1px solid ${DIMMED_BLACK_COLOR}`,
    },

    '&:last-of-type': {
      margin: '4px 0 0'
    }
  },

  '& .text': {
    display: 'inline-block',

    '& p': {
      margin: 0
    }
  },

  '& .edited': {
    margin: '0 0 0 4px',
    display: 'inline-block',
    color: '#A1A1A3',
    fontSize: 13,
    fontWeight: 600
  },

  '& .editor': {
    padding: 8,
    position: 'relative',
    height: '100%',
    backgroundColor: PRIMARY_COLOR,
    minHeight: MIN_TEXT_AREA_HEIGHT,
    border: `1px solid ${DIMMED_BLACK_COLOR}`,
    borderRadius: 4
  },

  '& .reactions': {
    display: 'none',
    margin: '0 0 4px 0',

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
