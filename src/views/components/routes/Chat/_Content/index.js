import React from 'react'
import {
  compose
} from 'recompose'

import NavigationBackdrop from 'src/views/components/layout/NavigationBackdrop'
import withStyles from './style'

const enhance = compose(
  withStyles
)

export default enhance((props) => {
  const {
    styles,
    children,
    ...rest
  } = props

  return (
    <div {...rest} className={styles.Content}>
      <NavigationBackdrop/>
      {children}
    </div>
  )
})
