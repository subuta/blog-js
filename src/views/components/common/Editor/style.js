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
  inlineCode
} from 'src/views/components/layout/style'

const GrayFont = {
  color: '#888888',
  fontWeight: 'bold'
}

const EditorWrapper = {
  position: 'relative'
}

const Editor = {
  '& .image': GrayFont,

  '& .heading': {
    ...headings,
    display: 'inline-block',
    margin: '16px 0 8px',

    '&.d-1': {
      ...h1,
      margin: '16px 0 16px !important',
      padding: '0 0 8px 0'
    },
    '&.d-2': {
      ...h2,
      padding: '0 0 8px 0'
    },

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

  '& .blockquote': {
    ...GrayFont,
    margin: `8px 0 !important`,
    padding: `0 0 0 8px`,
    position: 'relative',
    fontStyle: 'italic',
    '&:after': {
      content: '\'\'',
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      borderLeft: `4px solid ${BORDER_COLOR}`
    }
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
