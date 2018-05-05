import createWithStyles from 'src/views/utils/style'

import {
  PRIMARY_COLOR,
  ACCENT4_COLOR,
  TABLET_MEDIA_QUERY,
  BORDER_COLOR,
  CODE_FONT
} from 'src/views/constants/style'

import {
  headings,
  h1,
  h2,
  h3,
  h4,
  h5,
  kbd,
  hr,
  blockquote,
  inlineCode
} from 'src/views/components/layout/style'

const GrayFont = {
  color: '#888888',
  fontWeight: 'bold'
}

const EditorWrapper = {
  position: 'relative',
  overflow: 'scroll',
}

const Editor = {
  '& .image': GrayFont,

  '& .heading': {
    ...headings,
    display: 'inline-block',

    '&.d-1': h1,
    '&.d-2': h2,
    '&.d-3': h3,
    '&.d-4': h4,
    '&.d-5': h5,
  },

  '& .list': {
    ...GrayFont,
    lineHeight: 1
  },

  '& .inline-code': inlineCode,

  '& .link': {
    margin: 0,
    color: ACCENT4_COLOR,
    fontWeight: 'bold',
    wordBreak: 'break-all',
    '&:hover': {
      textDecoration: 'underline'
    }
  },

  '& .tag': {
    margin: 0,
    color: ACCENT4_COLOR,
    fontWeight: 'bold',
    wordBreak: 'break-all',
    '&:hover': {
      textDecoration: 'underline'
    }
  },

  '& .blockquote': {
    ...GrayFont,
    ...blockquote
  },

  // RWD idea from http://codepen.io/geoffyuen/pen/FCBEg?editors=1100
  '& .table': {
    ...GrayFont
  },

  '& .html': {
    ...GrayFont,
  },

  '& .math': {
    ...GrayFont,
  },

  '& .inline-math': {
    ...GrayFont,
  },

  '& .emoji': {
    ...GrayFont,
  },

  '& .kbd': kbd,

  '& .hr': {
    ...hr,
    ...GrayFont,
    '& > span': {
      opacity: 0.2
    }
  }
}

export default createWithStyles({
  EditorWrapper,
  Editor
})
