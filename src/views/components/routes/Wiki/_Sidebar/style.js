import createWithStyles from 'src/views/utils/style'

import {
  BLACK_COLOR,
  GRAY_COLOR,
  ACCENT4_COLOR
} from 'src/views/constants/style'

import {
  List as _List,
  Menus
} from 'src/views/components/layout/Sidebar/style'

const Sidebar = {
  background: `${GRAY_COLOR} !important`,
  color: `${BLACK_COLOR} !important`
}

const List = {
  ..._List,
  '& a': {
    ..._List['& a'],
    '&:hover': {
      color: ACCENT4_COLOR
    },

    '&.is-active': {
      color: ACCENT4_COLOR
    }
  }
}

export default createWithStyles({
  Sidebar,
  List,
  Menus
})
