import createWithStyles from 'src/views/utils/style'

import {
  WIKI_HEADER_HEIGHT,
  WIKI_APP_COLOR,
  PRIMARY_COLOR,

  BLACK_COLOR,
  DIMMED_BLACK_COLOR,
  Z_INDEX_1,

  TABLET_MEDIA_QUERY
} from 'src/views/constants/style'

const Header = {
  backgroundColor: WIKI_APP_COLOR,
  height: WIKI_HEADER_HEIGHT,
  display: 'flex',
  padding: '32px 32px 32px 0',

  '& .logo': {
    margin: '0 8px 0 0',
    display: 'none',
    flex: '0 0 auto'
  },

  '& .action': {
    flex: '1 1 auto',
  },

  [TABLET_MEDIA_QUERY]: {
    padding: 16,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: PRIMARY_COLOR,

    '& .logo': {
      display: 'block'
    }
  }
}

const SearchBar = {
  ...Z_INDEX_1,
  padding: 8,
  backgroundColor: PRIMARY_COLOR,
  borderRadius: 2,
  opacity: 0,
  pointerEvents: 'none',

  '& svg': {
    margin: '0 4px 0 0',
    color: DIMMED_BLACK_COLOR,
    height: 24,
    width: 'auto'
  },

  '& input': {
    color: BLACK_COLOR,
    border: 'none',
    outline: 'none'
  }
}

export default createWithStyles({
  Header,
  SearchBar
})
