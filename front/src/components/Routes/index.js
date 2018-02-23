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



export default routes
