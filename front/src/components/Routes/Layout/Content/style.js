import createWithStyles from 'src/utils/style'

import {
  NOISE_PATTERN,
  NAVIGATION_WIDTH
} from 'src/constants/style'

const Content = {
  ...NOISE_PATTERN,
  minHeight: '100vh',
  flex: '1 0 auto',
  width: `calc(100% - ${NAVIGATION_WIDTH}px)`
}

export default createWithStyles({
  Content
})
