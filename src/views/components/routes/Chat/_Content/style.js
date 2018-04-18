import createWithStyles from 'src/views/utils/style'

import {
  NAVIGATION_WIDTH,
  SIDEBAR_WIDTH,
  SHADOW_COLOR
} from 'src/views/constants/style'

const Content = {
  position: 'relative',
  minHeight: 'inherit',
  height: '100vh',
  flex: '1 0 auto',
  width: `calc(100% - ${SIDEBAR_WIDTH}px - ${NAVIGATION_WIDTH}px)`,
  boxShadow: `-4px 0px 12px 2px ${SHADOW_COLOR}`
}

const Mask = {
  position: 'absolute',
  display: 'none',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 1,
  backgroundColor: '#FFFFFF',
  opacity: 0.8,
  '.is-show-menu &': {
    display: 'block'
  }
}

export default createWithStyles({
  Content,
  Mask
})
