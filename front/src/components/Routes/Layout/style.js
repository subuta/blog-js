import {
  registerStyles
} from 'src/utils/style'

import {
  NOISE_PATTERN
} from 'src/constants/style'

const Container = {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'flex-start'
}

const Content = {
  ...NOISE_PATTERN,
  minHeight: '100vh',
  flex: 1
}

export default registerStyles({
  Container,
  Content
})
