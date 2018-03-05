import createWithStyles from 'src/views/utils/style'

import {
  NAVIGATION_WIDTH,
  NOISE_PATTERN
} from 'src/views/constants/style'

const ChatContent = {
  ...NOISE_PATTERN,
  minHeight: '100vh',
  flex: '1 0 auto',
  width: `calc(100% - ${NAVIGATION_WIDTH}px)`
}

export default createWithStyles({
  ChatContent
})
