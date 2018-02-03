import React from 'react'
import _ from 'lodash'

import withDragDropContext from 'src/utils/withDragDropContext'

import { Route, Switch, Redirect } from 'react-router'

import Sidebar from './Sidebar'
import Channel from './Channel'

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
      <Sidebar {...props} />

      <div className={styles.Content}>
        <Switch>
          <Route exact path='/:channelName?' component={Channel} />
        </Switch>
      </div>
    </div>
  )
})
