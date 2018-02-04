import createWithStyles from 'src/utils/style'

import {
  DIMMED_BLACK_COLOR
} from 'src/constants/style'

const Navigation = {
  height: '100vh',
  padding: '0 8px',
  display: 'flex',
  flexDirection: 'column',
  background: DIMMED_BLACK_COLOR
}

const Item = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '16px 0 0',
  padding: 8,
  fontSize: 20,
  background: '#DDDDDD',
  borderRadius: '50%',

  '& > *': {
    color: DIMMED_BLACK_COLOR
  },

  '&:first-child': {
    margin: '16px 0 0'
  }
}

export default createWithStyles({
  Navigation,
  Item
})
