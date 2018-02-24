import React from 'react'

import MdFaceIcon from 'react-icons/lib/md/face'

import withStyles from './style'

export default withStyles(({avatar, nickname, styles, rounded}) => {
  let avatarClass = styles.Avatar
  if (rounded) {
    avatarClass += ' is-rounded'
  }

  if (!avatar) {
    return (
      <div className={avatarClass}>
        <div className={`${styles.IconWrapper}`}>
          <MdFaceIcon />
        </div>
      </div>
    )
  }

  return (
    <div className={avatarClass}>
      <img src={avatar} alt={nickname} />
    </div>
  )
})
