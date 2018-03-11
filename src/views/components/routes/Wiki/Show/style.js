import createWithStyles from 'src/views/utils/style'

import {
} from 'src/views/constants/style'
import { PRIMARY_COLOR, WIKI_APP_COLOR } from '../../../../constants/style'

const Paper = {
  '& .button-fab': {
    backgroundColor: WIKI_APP_COLOR,
    color: PRIMARY_COLOR,
    '&:hover': {
      backgroundColor: WIKI_APP_COLOR
    }
  },

  'h4': {
    margin: '0 !important'
  },

  '.article-content': {
    margin: '16px 0 0'
  }
}

export default createWithStyles({
  Paper
})
