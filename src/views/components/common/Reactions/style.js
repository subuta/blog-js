import createWithStyles from 'src/views/utils/style'

import {
  EASE_STANDARD,
  DIMMED_BLACK_COLOR,
  BLACK_COLOR
} from 'src/views/constants/style'

const Reactions = {

}

const ReactionButton = {
  borderRadius: 2,
  cursor: 'pointer',
  boxShadow: '1px 1px 1px 0px rgba(0, 0, 0, 0.1)',
  transition: `all 0.3s ${EASE_STANDARD}`,
  color: DIMMED_BLACK_COLOR,
  outline: 'none',

  '& svg': {
    height: 20,
    width: 'auto'
  },

  '.is-hovered &': {
    boxShadow: '2px 2px 1px 0px rgba(0, 0, 0, 0.2)',
    color: BLACK_COLOR
  }
}

export default createWithStyles({
  Reactions,
  ReactionButton
})
