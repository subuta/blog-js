import createWithStyles from 'src/utils/style'

import {
  NOISE_PATTERN,
  SIDEBAR_WIDTH
} from 'src/constants/style'

const Container = {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'flex-start'
}

const Content = {
  ...NOISE_PATTERN,
  minHeight: '100vh',
  flex: '1 0 auto',
  width: `calc(100% - ${SIDEBAR_WIDTH}px)`
}

export default createWithStyles({
  Container,
  Content
})
