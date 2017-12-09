import {
  registerStyles
} from 'src/utils/style'

import {
  ACCENT3_COLOR,
  PRIMARY_COLOR
} from 'src/constants/style'

const Container = {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'flex-start'
}

const Sidebar = {
  padding: 16,
  height: '100vh',
  flex: '0 0 204px',
  background: ACCENT3_COLOR,
  color: PRIMARY_COLOR
}

const Logo = {
  height: 72
}

const Content = {
  minHeight: '100vh',
  flex: 1,
  '& h1': {
    fontFamily: `"Noto Sans Japanese" !important`,
    fontWeight: 'bold'
    // fontFamily: `"Noto Serif Japanese"`,
  }
}

export default registerStyles({
  Container,
  Sidebar,
  Logo,
  Content
})
