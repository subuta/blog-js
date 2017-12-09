import React from 'react'
import { Route, Switch } from 'react-router'

import Callback from './Callback'
import Login from './Login'

export default () => {
  return (
    <Switch>
      <Route exact path='/login' component={Login} />
      <Route exact path='/login/cb' component={Callback} />
    </Switch>
  )
}
