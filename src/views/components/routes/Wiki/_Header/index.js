import React from 'react'
import {
  compose
} from 'recompose'

import connect from './connect'
import withStyles from './style'

import SvgIcon from 'src/views/components/common/SvgIcon'

const enhance = compose(
  withStyles,
  connect
)

export default enhance((props) => {
  const {
    styles,
    showMenu,
    children
  } = props

  return (
    <div className={styles.Header}>
      <div>
        <i onClick={() => showMenu()}><SvgIcon name="logo-small"/></i>
      </div>
      <div>{children}</div>
    </div>
  )
})
