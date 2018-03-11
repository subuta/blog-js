import React from 'react'
import { compose } from 'recompose'

import Navigation from './Navigation'
import withStyles from './style'
import connect from './connect'

import withDragDropContext from 'src/views/utils/withDragDropContext'

const enhance = compose(
  withStyles,
  connect,
  withDragDropContext
)

export default enhance((props) => {
  const {
    isShowMenu
  } = props

  let containerClass = props.styles.Container
  if (isShowMenu) {
    containerClass += ' is-show-menu'
  }

  return (
    <div className={containerClass}>
      <Navigation/>
      {props.children}
    </div>
  )
})
