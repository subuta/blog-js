import React from 'react'
import {
  compose,
  lifecycle
} from 'recompose'

import connect from './connect'
import withStyles from './style'
import Router from 'next/router'

const enhance = compose(
  withStyles,
  connect,
  lifecycle({
    componentDidMount () {
      // hideMenu on routeChange.
      const {hideMenu} = this.props
      Router.onRouteChangeStart = () => hideMenu()
    },

    componentWillUnmount () {
      Router.onRouteChangeStart = null
    }
  })
)

export default enhance((props) => {
  const {
    styles,
    hideMenu
  } = props

  return (
    <div
      onClick={() => hideMenu()}
      className={styles.Mask}
    />
  )
})
