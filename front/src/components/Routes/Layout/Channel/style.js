import createWithStyles from 'src/utils/style'

import {
  BORDER_COLOR,
  DIMMED_BLACK_COLOR,
  PRIMARY_COLOR,
  ACCENT_COLOR,
  LIGHT_ACCENT3_COLOR,
  BLACK_COLOR,
  GRAY_COLOR,
  LATO_WITH_SANS_FONT,
  SANS_FONT,

  EASE_STANDARD,
  HEADER_HEIGHT
} from 'src/constants/style'

const MIN_TEXT_AREA_HEIGHT = 40

const Channels = {
  position: 'relative'
}

const DropTarget = {
  display: 'none',
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  backgroundColor: DIMMED_BLACK_COLOR,
  color: PRIMARY_COLOR,
  fontWeight: '900',
  zIndex: 100,
  '.can-drop > &': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}

const Header = {
  height: HEADER_HEIGHT,
  padding: '8px 16px',
  borderBottom: `1px solid ${BORDER_COLOR}`,
  fontFamily: SANS_FONT
}

const Title = {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  margin: '0 0 4px 0',
  padding: 0,
  fontFamily: LATO_WITH_SANS_FONT,
  fontSize: 16,
  fontWeight: 'bold',
  lineHeight: 1,
  '& .list-icon': {
    margin: '1px 4px 0 0'
  }
}

const Description = {
  fontSize: 13,
  color: BLACK_COLOR,
  opacity: 0.8,
  lineHeight: 0,
  '& > *': {
    margin: 0,
    lineHeight: 1
  }
}

const Content = {
  position: 'relative'
}

const CenteredContent = {
  position: 'relative',
  height: `calc(100vh - ${HEADER_HEIGHT}px)`,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontFamily: LATO_WITH_SANS_FONT,
  fontWeight: 900
}

const Comments = {
  padding: `16px 16px ${MIN_TEXT_AREA_HEIGHT + 24 + 16}px`, // plus padding
  height: `calc(100vh - ${HEADER_HEIGHT}px)`,
  overflowY: 'scroll',
}

const Comment = {
  position: 'relative',

  '& > p': {
    whiteSpace: 'pre',
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
    maxWidth: '100%'
  }
}

const Footer = {
  padding: '0 16px 16px',
  position: 'absolute',
  right: 0,
  bottom: 0,
  left: 0,
  minHeight: MIN_TEXT_AREA_HEIGHT,
  background: PRIMARY_COLOR
}

const TextAreaWrapper = {
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  '& > button': {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    border: `2px solid ${DIMMED_BLACK_COLOR}`,
    borderRight: 0,
    borderRadius: '4px 0 0 4px',
    padding: '8px',
    outline: 'none',
    color: DIMMED_BLACK_COLOR,
    width: 40,
    flex: '0 0 auto',
    lineHeight: 0,
    transition: `all 0.2s ${EASE_STANDARD}`,
    cursor: 'pointer',
    '&:hover': {
      border: `2px solid ${ACCENT_COLOR}`,
      backgroundColor: ACCENT_COLOR,
      color: PRIMARY_COLOR
    }
  },

  '& > .textarea': {
    margin: '0 0 0 40px',
    position: 'relative',
    flex: '1 1 auto',
    minHeight: MIN_TEXT_AREA_HEIGHT,
    lineHeight: 0,
    border: `2px solid ${DIMMED_BLACK_COLOR}`,
    borderLeft: 0,
    borderRadius: '0 4px 4px 0',
    '&:before': {
      content: '\"\"',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      width: 1,
      display: 'block',
      borderLeft: `2px solid ${DIMMED_BLACK_COLOR}`,
    }
  }
}

const TextArea = {
  minHeight: MIN_TEXT_AREA_HEIGHT,
  padding: '8px',
  height: '100%',
  width: '100%',
  border: 'none',
  resize: 'none',
  outline: 'none',
  lineHeight: 1.4,
  fontFamily: SANS_FONT,
  fontSize: 14
}

const AddIcon = {
  height: 24,
  width: 24
}

export default createWithStyles({
  Channels,
  DropTarget,
  Header,
  Title,
  Description,
  Content,
  CenteredContent,
  Comments,
  Comment,
  Footer,
  TextAreaWrapper,
  TextArea,
  AddIcon
})
