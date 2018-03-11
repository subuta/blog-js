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
    children
  } = props

  return (
    <div className={styles.Header}>
      {children}
    </div>
  )
})