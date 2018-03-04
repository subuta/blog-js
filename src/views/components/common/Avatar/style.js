import createWithStyles from 'src/views/utils/style'

import {
  GRAY_COLOR
} from 'src/views/constants/style'

const avatarSize = 40

const Avatar = {
  '& > img': {
    height: avatarSize,
    width: avatarSize,
    borderRadius: 4
  },

  '&.is-rounded > img': {
    borderRadius: '50%'
  }
}

const IconWrapper = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: GRAY_COLOR,
  height: avatarSize,
  width: avatarSize,
  borderRadius: 4,

  '& > svg': {
    height: avatarSize - 16,
    width: avatarSize - 16
  }
}

export default createWithStyles({
  Avatar,
  IconWrapper
})
