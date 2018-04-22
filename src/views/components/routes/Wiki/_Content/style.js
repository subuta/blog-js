import createWithStyles from 'src/views/utils/style'

import {
  NAVIGATION_WIDTH,
  SIDEBAR_WIDTH,
  NOISE_PATTERN,
  GRAY_COLOR,
} from 'src/views/constants/style'

const Content = {
  position: 'relative',
  minHeight: 'inherit',
  height: '100vh',
  flex: '1 0 auto',
  width: `calc(100vw - ${SIDEBAR_WIDTH}px - ${NAVIGATION_WIDTH}px)`,
  backgroundColor: GRAY_COLOR
}

export default createWithStyles({
  Content
})
