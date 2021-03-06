import React from 'react'
import {
  compose,
  withHandlers,
  lifecycle
} from 'recompose'

import Navigation from './Navigation'
import withStyles from './style'
import connect from './connect'

import {
  onRouteChangeStart,
  onRouteChangeComplete
} from 'src/views/utils/router'

import withDragDropContext from 'src/views/utils/withDragDropContext'

import {
  isMobile,
  isTablet
} from 'src/views/utils/browser'

import storage from 'src/views/utils/storage'
import _ from 'lodash'

const enhance = compose(
  withStyles,
  connect,
  withDragDropContext,
  withHandlers(() => {
    let unlistenOnRouteChangeStart = _.noop
    let unlistenOnRouteChangeComplete = _.noop

    return {
      initialize: () => () => {
        unlistenOnRouteChangeStart = onRouteChangeStart(() => {
          // persist current pathname
          const currentPath = location.pathname
          storage.setItem('prev-path', currentPath)
        })

        unlistenOnRouteChangeComplete = onRouteChangeComplete(() => {
          // Emit page changes.
          window.analytics.page();
        })
      },

      destroy: () => () => {
        unlistenOnRouteChangeStart()
        unlistenOnRouteChangeComplete()
      }
    }
  }),
  withHandlers(() => {
    let ref = null
    let _Hammer = null

    const getHammer = async () => {
      if (!_Hammer) {
        _Hammer = await import('hammerjs')
      }
      return _Hammer
    }

    return {
      setRef: ({showMenu, hideMenu}) => async (_ref) => {
        if (!_ref) return
        if (!isMobile && !isTablet) return

        ref = _ref

        const Hammer = await getHammer()
        const mc = new Hammer.Manager(ref)

        mc.add(new Hammer.Swipe({
          direction: Hammer.DIRECTION_HORIZONTAL
        }))

        mc.on('swiperight', (e) => {
          showMenu()
        })

        mc.on('swipeleft', (e) => {
          hideMenu()
        })
      }
    }
  }),
  lifecycle({
    componentWillMount () {
      this.props.initialize()
    },

    componentWillUnmount () {
      this.props.destroy()
    }
  })
)

export default enhance((props) => {
  const {
    isShowMenu,
    setRef
  } = props

  let containerClass = props.styles.Container
  if (isShowMenu) {
    containerClass += ' is-show-menu'
  }

  return (
    <div
      className={containerClass}
      ref={setRef}
    >
      <Navigation/>
      {props.children}
    </div>
  )
})
