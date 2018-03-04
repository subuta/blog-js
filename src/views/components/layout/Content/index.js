import React from 'react'

import withStyles from './style'

import {
  compose
} from 'recompose'

const enhance = compose(
  withStyles
)

export default enhance((props) => {
  const {
    styles,
    children
  } = props

  return (
    <div className={styles.Content}>
      {children}
    </div>
  )
})
