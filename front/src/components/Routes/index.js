import React from 'react'
import _ from 'lodash'
import { Route, Switch, Redirect } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'
import history from 'src/utils/history'

import {
  compose,
  branch,
  renderComponent
} from 'recompose'

import Login from './Login'

// const authorize = (nextState, replace, cb) => {
//   store.dispatch(me())
//     .then(() => cb())
//     .catch((err) => cb(err))
// }

// ルーティングで起こったエラー全般の管理
// const onError = (err) => {
//   if (err.status && err.status === 401 || err.status === 403) {
//     window.location.href = '/'
//   }
//   // それ以外
//   console.error('[router.onError]:', err)
// }

const ensureAuthorized = branch(
  (props) => false,
  renderComponent(() => <Redirect to='/' />),
  _.identity
)

let routes = (
  <ConnectedRouter history={history}>
    <Switch>
      <Route exact path='/' component={Login} />
      <Route exact path='/test' component={ensureAuthorized(() => <h1>authorized!!!</h1>)} />
      <Route component={() => <Redirect to='/' />} />
    </Switch>
  </ConnectedRouter>
)

export default routes
