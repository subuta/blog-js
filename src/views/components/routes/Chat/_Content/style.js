import createWithStyles from 'src/views/utils/style'

import {
  NAVIGATION_WIDTH,
  SIDEBAR_WIDTH,
  NOISE_PATTERN,
  SHADOW_COLOR
} from 'src/views/constants/style'

const Content = {
  ...NOISE_PATTERN,
  minHeight: 'inherit',
  height: '100vh',
  flex: '1 0 auto',
  width: `calc(100% - ${SIDEBAR_WIDTH}px - ${NAVIGATION_WIDTH}px)`,
  boxShadow: `-4px 0px 12px 2px ${SHADOW_COLOR}`
}

export default createWithStyles({
  Content
})
