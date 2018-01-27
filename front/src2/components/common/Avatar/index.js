import React from 'react'

import MdFaceIcon from 'react-icons/lib/md/face'

import classes from './style'

export default ({avatar, nickname}) => {
  if (!avatar) {
    return (
      <div className={classes.Avatar}>
        <div className={classes.IconWrapper}>
          <MdFaceIcon />
        </div>
      </div>
    )
  }

  return (
    <div className={classes.Avatar}>
      <img src={avatar} alt={nickname} />
    </div>
  )
}
