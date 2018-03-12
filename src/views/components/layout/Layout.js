import React from 'react'
import {
  compose,
  withHandlers
} from 'recompose'

import Navigation from './Navigation'
import withStyles from './style'
import connect from './connect'

import withDragDropContext from 'src/views/utils/withDragDropContext'

const enhance = compose(
  withStyles,
  connect,
  withDragDropContext,
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
      setRef: ({ showMenu, hideMenu }) => async (_ref) => {
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
