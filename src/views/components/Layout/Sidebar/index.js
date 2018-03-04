import React from 'react'
import _ from 'lodash'

import withStyles from './style'

import SvgIcon from 'src/views/components/common/SvgIcon'

import {
  compose
} from 'recompose'

const enhance = compose(
  withStyles
)

export default enhance((props) => {
  const {
    styles,
    sidebarClass,
    children
  } = props

  let className = styles.Sidebar
  if (sidebarClass) {
    className += ` ${sidebarClass}`
  }

  return (
    <div className={className}>
      <div className={styles.Menus}>
        <div className={styles.Logo}>
          <SvgIcon name="logo-white"/>
        </div>

        {children}
      </div>
    </div>
  )
})
