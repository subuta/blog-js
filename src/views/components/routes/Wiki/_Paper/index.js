import React from 'react'
import {
  compose
} from 'recompose'

import withStyles from './style'

const enhance = compose(
  withStyles,
)

export default enhance((props) => {
  const {
    styles,
    children,
    className,
    ...rest
  } = props

  let paperClass = styles.Paper
  if (className) {
    paperClass += ` ${className}`
  }

  return (
    <div {...rest} className={paperClass}>
      {children}
    </div>
  )
})
