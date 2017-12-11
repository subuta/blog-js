import React from 'react'
import _ from 'lodash'
import { Route, Switch, Redirect } from 'react-router'
import classes from './style'
import Channel from './Channel'

export default (props) => {
  const {channel} = props
  return (
    <div className={classes.Content}>
      <Switch>
        <Route exact path='/:channelName?' component={() => <Channel channel={channel} />} />
      </Switch>
    </div>
  )
}
