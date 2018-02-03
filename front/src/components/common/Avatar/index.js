import React from 'react'

import MdFaceIcon from 'react-icons/lib/md/face'

import withStyles from './style'

export default withStyles(({avatar, nickname, styles}) => {
  if (!avatar) {
    return (
      <div className={styles.Avatar}>
        <div className={styles.IconWrapper}>
          <MdFaceIcon />
        </div>
      </div>
    )
  }

  return (
    <div className={styles.Avatar}>
      <img src={avatar} alt={nickname} />
    </div>
  )
})
