import React from 'react'
import _ from 'lodash'

import { DragDropContext, DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import { Route, Switch, Redirect } from 'react-router'

import Sidebar from './Sidebar'
import Channel from './Channel'

import classes from './style'

import {
  compose,
  withProps,
  lifecycle,
  branch,
  renderComponent,
  toClass
} from 'recompose'

const enhance = compose(
  DragDropContext(HTML5Backend),
  toClass
)

export default enhance((props) => {
  return (
    <DragDropContextProvider backend={HTML5Backend}>
      <div className={classes.Container}>
        <Sidebar {...props} />

        <div className={classes.Content}>
          <Switch>
            <Route exact path='/:channelName?' component={Channel} />
          </Switch>
        </div>
      </div>
    </DragDropContextProvider>
  )
})
