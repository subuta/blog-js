import React from 'react'
import _ from 'lodash'

import withStyles from './style'

import { Route, Switch, Redirect } from 'react-router'

import Channel from './Channel'
import Wiki from './Wiki'

export default withStyles(({styles}) => {
  return (
    <div className={styles.Content}>
      <Switch>
        <Route exact path='/chat/:channelName?' component={Channel} />
        <Route exact path='/wiki/:articleName?' component={Wiki} />
      </Switch>
    </div>
  )
})
