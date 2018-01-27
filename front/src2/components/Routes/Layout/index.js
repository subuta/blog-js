import React from 'react'
import _ from 'lodash'

import withDragDropContext from 'src/utils/withDragDropContext'

import { Route, Switch, Redirect } from 'react-router'

import Sidebar from './Sidebar'
import Channel from './Channel'

import classes from './style'

import {
  compose,
  withProps,
  lifecycle,
  branch,
  renderComponent,
  toClass
} from 'recompose'

const enhance = compose(
  withDragDropContext,
  toClass
)

export default enhance((props) => {
  return (
    <div className={classes.Container}>
      <Sidebar {...props} />

      <div className={classes.Content}>
        <Switch>
          <Route exact path='/:channelName?' component={Channel} />
        </Switch>
      </div>
    </div>
  )
})
