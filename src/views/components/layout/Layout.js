import React from 'react'
import { compose } from 'recompose'

import Navigation from './Navigation'
import withStyles from './style'

import withDragDropContext from 'src/views/utils/withDragDropContext'

const enhance = compose(
  withStyles,
  withDragDropContext
)

export default enhance((props) => (
  <div className={props.styles.Container}>
    <Navigation/>
    {props.children}
  </div>
))
