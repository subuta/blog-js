import React from 'react'
import _ from 'lodash'
import {ConnectedRouter} from 'react-router-redux'
import history from 'src/utils/history'

/* mat Custom imports [start] */
import { Route, Switch, Redirect } from 'react-router'
import auth0 from 'src/utils/auth0'

import {
  branch,
  renderComponent
} from 'recompose'

import Layout from './Layout'
import Login from './Login'
/* mat Custom imports [end] */

let routes = null

/* mat Custom routes [start] */
const ensureAuthorized = branch(
  () => !auth0.isAuthenticated(),
  renderComponent(() => <Redirect to='/login' />),
  _.identity
)

const AuthorizedRoutes = ensureAuthorized(Layout)

routes = (
  <ConnectedRouter history={history}>
    <Switch>
      <Route path='/login' component={Login} />
      <Route path='/:channelName?' component={AuthorizedRoutes} />
      <Route component={() => <Redirect to='/' />} /> {/* 404 */}
    </Switch>
  </ConnectedRouter>
)
/* mat Custom routes [end] */

export default routes
