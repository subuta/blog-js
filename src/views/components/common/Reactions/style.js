import createWithStyles from 'src/views/utils/style'

import {
  EASE_STANDARD,
  DIMMED_BLACK_COLOR,
  BLACK_COLOR,
  GRAY_COLOR,
  BORDER_COLOR
} from 'src/views/constants/style'

const Reactions = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',

  '& > *': {
    lineHeight: '1 !important'
  }
}

const ReactionButton = {
  margin: '0 8px 0 0',
  minHeight: 30,
  padding: '2px 4px',
  display: 'inline-flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderRadius: 2,
  border: `1px solid ${BORDER_COLOR}`,
  cursor: 'pointer',
  transition: `all 0.1s ${EASE_STANDARD}`,
  color: DIMMED_BLACK_COLOR,
  '-webkit-appearance': 'none !important',
  '-moz-appearance': 'none !important',
  appearance: 'none !important',
  outline: 'none',

  '.is-mini &': {
    minHeight: 'auto',
    fontSize: 12
  },

  '.is-embedded &': {
    minHeight: 'auto',
    border: 'none',

    '&:hover': {
      boxShadow: 'none',
      color: 'inherit'
    },
  },

  '&.add-reaction': {
    margin: 0
  },

  '& svg': {
    height: 20,
    width: 'auto',

    '.is-mini &': {
      height: 16
    },

    '.is-embedded &': {
      height: 16
    }
  },

  '& > .counter': {
    display: 'inline-block',
    margin: '0 0 0 4px'
  },

  '&:hover': {
    boxShadow: '2px 2px 1px 0px rgba(0, 0, 0, 0.2)',
    color: BLACK_COLOR
  },

  '.is-disabled &': {
    background: GRAY_COLOR,

    '.emoji-mart-emoji': {
      opacity: 0.5
    }
  }
}

export default createWithStyles({
  Reactions,
  ReactionButton
})
