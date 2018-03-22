import createWithStyles from 'src/views/utils/style'

import {
  PRIMARY_COLOR,
  EASE_SHARP,
  BORDER_COLOR,
  ACCENT4_COLOR,
  EASE_STANDARD,
  Z_INDEX_1
} from 'src/views/constants/style'

const AutoCompleteRoot = {
  position: 'inherit'
}

const AutoComplete = {
  position: 'absolute',
  zIndex: 10,
  display: 'none',
  '&.is-show': {
    display: 'block'
  }
}

const Backdrop = {
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 1,
  background: 'transparent',
  display: 'none',
  '&.is-show': {
    display: 'block'
  }
}

const Emojis = {
  ...Z_INDEX_1,
  margin: 0,
  padding: 0,
  listStyle: 'none',
  backgroundColor: PRIMARY_COLOR,
  border: `1px solid ${BORDER_COLOR}`
}

const Emoji = {
  margin: 0,
  padding: '4px 12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  borderBottom: `1px solid ${BORDER_COLOR}`,
  transition: `backgroundColor 0.1s ${EASE_STANDARD}`,

  '& > b': {
    display: 'inline-block',
    margin: '0 0 0 8px'
  },

  '&:last-of-type': {
    borderBottom: 'none'
  },

  '&.is-active, &:hover': {
    backgroundColor: ACCENT4_COLOR,
    color: PRIMARY_COLOR
  }
}

export default createWithStyles({
  AutoCompleteRoot,
  AutoComplete,
  Backdrop,
  Emojis,
  Emoji
})
