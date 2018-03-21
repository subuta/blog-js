import createWithStyles from 'src/views/utils/style'

import {
  PRIMARY_COLOR,
  ACCENT4_COLOR,
  TABLET_MEDIA_QUERY,
  BORDER_COLOR
} from 'src/views/constants/style'

import {
  headings,
  h1,
  h2,
  h3,
  h4,
  h5
} from 'src/views/components/layout/style'

const GrayFont = {
  color: '#888888',
  fontWeight: 'bold'
}

const CodeFont = {
  fontFamily: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace'
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

  '& .inline-code': {
    ...CodeFont,
    margin: '0 0 0 4px',
    padding: '0 4px',
    display: 'inline-block',
    borderRadius: 4,
    fontSize: 13,
    fontWeight: 'bold',
    backgroundColor: '#F4F4F4',
    border: '1px solid #DDDDDD',
    color: ACCENT4_COLOR
  },

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

  // // RWD idea from http://codepen.io/geoffyuen/pen/FCBEg?editors=1100
  // '& .table': {
  //   margin: `8px 0`,
  //   width: '100%',
  //   boxSizing: 'border-box',
  //
  //   '& .th': {
  //     fontWeight: 'bold',
  //     display: 'none'
  //   },
  //
  //   '& .tr': {
  //     borderTop: `1px solid ${BORDER_COLOR}`,
  //     borderBottom: `1px solid ${BORDER_COLOR}`,
  //     [TABLET_MEDIA_QUERY]: {
  //       borderTop: 'none'
  //     }
  //   },
  //
  //   '& .td': {
  //     display: 'block',
  //     '&:first-child': {
  //       padding: `4px 0`
  //     },
  //
  //     '&:before': {
  //       content: 'attr(data-th)": "', // who knew you could do this? The internet, that's who.
  //       fontWeight: 'bold',
  //
  //       [TABLET_MEDIA_QUERY]: {
  //         display: 'none'
  //       }
  //     }
  //   },
  //
  //   '& .th, & .td': {
  //     textAlign: 'left',
  //     padding: `0 0 4px`,
  //     [TABLET_MEDIA_QUERY]: {
  //       padding: `8px 8px 8px 0 !important`,
  //       display: 'table-cell'
  //     }
  //   }
  // },

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

  '& .kbd': {
    ...CodeFont,
    padding: '0.1em 0.6em',
    border: '1px solid #ccc',
    fontSize: 12,
    backgroundColor: '#f7f7f7',
    color: '#333',
    boxShadow: '0 1px 0px rgba(0, 0, 0, 0.2),0 0 0 2px #ffffff inset',
    borderRadius: 3,
    display: 'inline-block',
    margin: '0 4px',
    textShadow: '0 1px 0 #fff',
    lineHeight: 1.4,
    whiteSpace: 'nowrap'
  },

  '& .hr': {
    ...GrayFont,

    '& > span': {
      opacity: 0.2
    },

    '&:after': {
      content: '\'\'', // who knew you could do this? The internet, that's who.
      display: 'block',
      borderBottom: `3px solid ${BORDER_COLOR}`
    }
  }
}

const EmojiAutoComplete = {

}

export default createWithStyles({
  EditorWrapper,
  Editor,
  EmojiAutoComplete
})
