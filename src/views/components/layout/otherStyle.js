import createWithStyles from 'src/views/utils/style'

// load common css style.
import {commonCss} from './style'

import {
  GRAY_COLOR,
} from 'src/views/constants/style'

const Container = {
  padding: 32,
  position: 'relative',
  height: '100vh',
  width: '100vw',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}

export default createWithStyles({
  Container
}, commonCss)
