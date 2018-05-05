import React from 'react'

import withStyles from './style'

export default withStyles(({styles, children, className}) => {
  let badgeClass = styles.Badge
  if (className) {
    badgeClass += ` ${className}`
  }

  return (
    <span className={badgeClass}>
      {children}
    </span>
  )
})
