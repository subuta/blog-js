import React from 'react'
import { Route, Switch, Redirect } from 'react-router'

import Channels from './Channels'

import classes from './style'

import SvgIcon from 'src/components/common/SvgIcon'

export default () => {
  return (
    <div className={classes.Container}>
      <div className={classes.Sidebar}>
        <div className={classes.Logo}>
          <SvgIcon name="logo-white" />
        </div>

        <h4>Channels</h4>

        <ul className={classes.Channels}>
          <li>
            <span className="list-icon">#</span>
            <span>i_subuta</span>
          </li>

          <li>
            <span className="list-icon">#</span>
            <span>react</span>
          </li>
        </ul>

        <h4>Note</h4>

        <ul className={classes.Notes}>
          <li>
            <span className="list-icon"><SvgIcon name="note" /></span>
            <span>ReactでHOCを作るのに必要なものほげほげほげほげ</span>
          </li>
        </ul>
      </div>

      <div className={classes.Content}>
        <Switch>
          <Route exact path='/' component={Channels} />
          <Route component={() => <Redirect to='/' />} /> {/* 404 */}
        </Switch>
      </div>
    </div>
  )
}
