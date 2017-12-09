import React from 'react'
import _ from 'lodash'
import { Route } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'
import history from 'src/utils/history'

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

let routes = (
  <ConnectedRouter history={history}>
    <Route exact path="/" component={() => (<h1>home</h1>)}/>
  </ConnectedRouter>
)

export default routes
