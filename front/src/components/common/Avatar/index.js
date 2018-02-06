import React from 'react'

import MdFaceIcon from 'react-icons/lib/md/face'

import withStyles from './style'

export default withStyles(({size = 40, borderRadius = 4, avatar, nickname, styles, freeStyle}) => {
  if (!avatar) {
    // const Size = freeStyle.registerStyle({
    //   height: `${size}px !important`,
    //   width: `${size}px !important`,
    //   borderRadius,
    //
    //   '& > svg': {
    //     height: size - 16,
    //     width: size - 16
    //   }
    // })

    return (
      <div className={styles.Avatar}>
        <div className={`${styles.IconWrapper}`}>
          <MdFaceIcon />
        </div>
      </div>
    )
  }

  // const Size = freeStyle.registerStyle({
  //   '& > img': {
  //     height: size,
  //     width: size,
  //     borderRadius
  //   }
  // })

  return (
    <div className={`${styles.Avatar}`}>
      <img src={avatar} alt={nickname} />
    </div>
  )
}, true)
