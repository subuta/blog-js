import React from 'react'
import _ from 'lodash'
import { Route, Switch, Redirect } from 'react-router'

import Sidebar from './Sidebar'
import Channel from './Channel'

import classes from './style'

import {
  compose,
  withProps,
  lifecycle,
  branch,
  renderComponent
} from 'recompose'

const enhance = compose(
)

export default enhance((props) => {
  const {
    channel
  } = props

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
