import {
  registerStyles
} from 'src/utils/style'

import {
  BORDER_COLOR,
  PRIMARY_COLOR,
  BLACK_COLOR,
  GLAY_COLOR,
  LATO_WITH_SANS_FONT,
  SANS_FONT
} from 'src/constants/style'

const Channels = {
}

const Header = {
  padding: '8px 16px',
  background: PRIMARY_COLOR,
  borderBottom: `1px solid ${BORDER_COLOR}`,
  fontFamily: SANS_FONT
}

const Title = {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  margin: '0 0 4px 0',
  padding: 0,
  fontFamily: LATO_WITH_SANS_FONT,
  fontSize: 16,
  fontWeight: 'bold',
  lineHeight: 1,
  '& .list-icon': {
    margin: '1px 4px 0 0'
  }
}

const Description = {
  margin: 0,
  fontSize: 13,
  color: BLACK_COLOR,
  opacity: 0.8
}

const Content = {
  padding: '8px 16px'
}

export default registerStyles({
  Channels,
  Header,
  Title,
  Description,
  Content
})
