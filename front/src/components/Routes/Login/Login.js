import React from 'react'
import { Redirect } from 'react-router'
import auth0 from 'src/utils/auth0'
import _ from 'lodash'

import {
  compose,
  lifecycle,
  branch,
  renderComponent
} from 'recompose'

const withLoader = branch(
  () => !auth0.isAuthenticated(),
  renderComponent(() => (
    <span>loading...</span>
  )),
  _.identity
)

const enhance = compose(
  lifecycle({
    componentWillMount () {
      if (!auth0.isAuthenticated()) {
        auth0.authorize()
      }
    }
  }),
  withLoader
)

export default enhance(() => <Redirect to='/' />)
