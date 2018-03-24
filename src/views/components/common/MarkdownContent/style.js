import createWithStyles from 'src/views/utils/style'

import {
  PRIMARY_COLOR,
  ACCENT4_COLOR,
  TABLET_MEDIA_QUERY,
  BORDER_COLOR
} from 'src/views/constants/style'

const MarkdownContent = {
  // RWD idea from http://codepen.io/geoffyuen/pen/FCBEg?editors=1100
  '& .table': {
    margin: `8px 0`,
    width: '100%',
    boxSizing: 'border-box',

    '& .th': {
      fontWeight: 'bold',
      display: 'none'
    },

    '& .tr': {
      borderTop: `1px solid ${BORDER_COLOR}`,
      borderBottom: `1px solid ${BORDER_COLOR}`,
      [TABLET_MEDIA_QUERY]: {
        borderTop: 'none'
      }
    },

    '& .td': {
      display: 'block',
      '&:first-child': {
        padding: `4px 0`
      },

      '&:before': {
        content: 'attr(data-th)": "', // who knew you could do this? The internet, that's who.
        fontWeight: 'bold',

        [TABLET_MEDIA_QUERY]: {
          display: 'none'
        }
      }
    },

    '& .th, & .td': {
      textAlign: 'left',
      padding: `0 0 4px`,
      [TABLET_MEDIA_QUERY]: {
        padding: `8px 8px 8px 0 !important`,
        display: 'table-cell'
      }
    }
  },
}

export default createWithStyles({
  MarkdownContent
})
