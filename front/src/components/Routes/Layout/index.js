import React from 'react'
import _ from 'lodash'

import withDragDropContext from 'src/utils/withDragDropContext'

import { Route, Switch, Redirect } from 'react-router'

import Navigation from './Navigation'
import Content from './Content'

import withStyles from './style'

import {
  compose,
  withProps,
  lifecycle,
  branch,
  renderComponent,
  toClass
} from 'recompose'

const enhance = compose(
  withStyles,
  withDragDropContext,
  toClass
)

export default enhance((props) => {
  const { styles } = props
  return (
    <div className={styles.Container}>
      <Navigation />
      <Content />
    </div>
  )
})
