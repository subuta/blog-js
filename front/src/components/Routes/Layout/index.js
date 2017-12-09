import React from 'react'
import { Route, Switch, Redirect } from 'react-router'

import classes from './style'

import SvgIcon from 'src/components/common/SvgIcon'

export default () => {
  return (
    <div className={classes.Container}>
      <div className={classes.Sidebar}>
        <div className={classes.Logo}>
          <SvgIcon name="logo-white"/>
        </div>

        <h4>Channels</h4>

        <ul>
          <li># i_subuta</li>
          <li># react</li>
        </ul>
      </div>

      <div className={classes.Content}>
        <Switch>
          <Route exact path='/test' component={() => <h1>日本語のテスト</h1>} />
          <Route component={() => <Redirect to='/' />} /> {/* 404 */}
        </Switch>
      </div>
    </div>
  )
}
