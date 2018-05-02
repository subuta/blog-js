import createWithStyles from 'src/views/utils/style'

import {
  BLACK_COLOR,
  GRAY_COLOR,
  BORDER_COLOR,
  PRIMARY_COLOR,
  WIKI_APP_COLOR,
  TABLET_MEDIA_QUERY
} from 'src/views/constants/style'

const Paper = {
  margin: '-32px 32px 32px 0',

  '& .button-fab': {
    backgroundColor: WIKI_APP_COLOR,
    color: PRIMARY_COLOR,
    '&:hover': {
      backgroundColor: WIKI_APP_COLOR
    }
  },

  '& > h4': {
    margin: 0,
    cursor: 'text'
  },

  '.created-at': {
    display: 'inline-block',
    cursor: 'text'
  },

  '.published': {
    margin: '-1px 0 0 4px',
    display: 'inline-block',
    textDecoration: 'underline'
  },

  '.author': {
    margin: '0 0 0 4px',
    display: 'inline-block'
  },

  '.editor, .content': {
    margin: '16px 0 0 !important',
    wordWrap: 'break-word',
    overflowWrap: 'break-word',
    cursor: 'text',

    '&:first-child': {
      marginTop: 0
    }
  }
}

const UpdateArticleModal = {
  '& .input': {
    margin: '0 0 16px 0',
    '&:last-of-type': {
      margin: 0
    }
  }
}

const Title = {
  margin: '0 !important'
}

const SubTitle = {
  margin: '4px 0 0',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center'
}

const ScrollContainer = {
  position: 'relative',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  overflow: 'scroll',
  flex: '1 0 0',
  minHeight: 'inherit',
  height: '100vh',
  background: `${GRAY_COLOR} !important`,
  color: `${BLACK_COLOR} !important`
}

const EditorArea = {
  display: 'flex',

  '& > .editor-wrapper': {
    paddingRight: 8,
    flex: '0 0 auto',
    width: '50%',
    borderRight: `3px solid ${BORDER_COLOR}`,

    [TABLET_MEDIA_QUERY]: {
      width: '100%',
      borderRight: 'none',
    }
  },

  '& > .content': {
    paddingLeft: 8,
    flex: '0 0 auto',
    width: '50%',

    [TABLET_MEDIA_QUERY]: {
      display: 'none'
    }
  }
}

const MenuButton = {
  position: 'absolute',
  top: 32,
  right: 24,
  borderRadius: '50% !important',
  display: 'none',

  '&.is-show': {
    display: 'block'
  },

  [TABLET_MEDIA_QUERY]: {
    top: 16,
    right: 16
  }
}

export default createWithStyles({
  Paper,
  UpdateArticleModal,
  Title,
  SubTitle,
  ScrollContainer,
  EditorArea,
  MenuButton
})
