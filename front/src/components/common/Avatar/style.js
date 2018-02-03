import createWithStyles from 'src/utils/style'

import {
  GRAY_COLOR
} from 'src/constants/style'

const Avatar = {
  '& > img': {
    height: 40,
    width: 40,
    borderRadius: 4
  }
}

const IconWrapper = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 40,
  width: 40,
  backgroundColor: GRAY_COLOR,
  borderRadius: 4,

  '& > svg': {
    height: 24,
    width: 24
  }
}

export default createWithStyles({
  Avatar,
  IconWrapper
})
