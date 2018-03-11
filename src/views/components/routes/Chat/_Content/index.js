import React from 'react'
import {
  compose
} from 'recompose'

import connect from './connect'
import withStyles from './style'

const enhance = compose(
  withStyles,
  connect
)

export default enhance((props) => {
  const {
    styles,
    children,
    hideMenu,
    ...rest
  } = props

  return (
    <div {...rest} className={styles.Content}>
      <div
        onClick={() => hideMenu()}
        className={styles.Mask}
      />
      {children}
    </div>
  )
})
