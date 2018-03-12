import React from 'react'
import _ from 'lodash'

import withStyles from './style'

import SvgIcon from 'src/views/components/common/SvgIcon'
import ActiveLink from 'src/views/components/common/ActiveLink'

import {
  compose
} from 'recompose'

const enhance = compose(
  withStyles
)

// getBaseRoute from app
const getBaseRoute = (app) => {
  let route = { href: '/channels', as: '/c' }
  if (app === 'wiki') {
    route = { href: '/articles', as: '/w' }
  }
  return route
}

export default enhance((props) => {
  const {
    styles,
    className,
    children,
    app
  } = props

  let sidebarClass = styles.Sidebar
  if (className) {
    sidebarClass += ` ${className}`
  }

  if (app) {
    sidebarClass += ` is-${app}`
  }

  return (
    <div className={sidebarClass}>
      <div className={styles.Menus}>
        <div className={styles.Logo}>
          <ActiveLink {...getBaseRoute(app)}>
            <SvgIcon name="logo"/>
          </ActiveLink>
        </div>

        {children}
      </div>
    </div>
  )
})
