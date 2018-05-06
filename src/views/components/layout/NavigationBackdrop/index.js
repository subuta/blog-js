import React from 'react'
import _ from 'lodash'

import {
  compose,
  withHandlers,
  lifecycle
} from 'recompose'

import connect from './connect'
import withStyles from './style'

import { onRouteChangeStart } from 'src/views/utils/router'

const enhance = compose(
  withStyles,
  connect,
  withHandlers(({hideMenu}) => {
    let unlisten = _.noop

    return {
      initialize: () => () => {
        // hideMenu on routeChange.
        unlisten = onRouteChangeStart(() => hideMenu())
      },

      destroy: () => () => unlisten()
    }
  }),
  lifecycle({
    componentDidMount () {
      this.props.initialize()
    },

    componentWillUnmount () {
      this.props.destroy()
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
