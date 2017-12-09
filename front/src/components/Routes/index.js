import React from 'react'
import _ from 'lodash'
import { Route, Switch, Redirect } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'
import history from 'src/utils/history'
import auth0 from 'src/utils/auth0'

import {
  branch,
  renderComponent
} from 'recompose'

import Login from './Login'

const ensureAuthorized = branch(
  () => !auth0.isAuthenticated(),
  renderComponent(() => <Redirect to='/login' />),
  _.identity
)

let routes = (
  <ConnectedRouter history={history}>
    <Switch>
      <Route exact path='/' component={() => <h1>top</h1>} />
      <Route path='/login' component={Login} />
      <Route exact path='/test' component={ensureAuthorized(() => <h1>authorized!!!</h1>)} />
      <Route component={() => <Redirect to='/' />} />
    </Switch>
  </ConnectedRouter>
)

export default routes
