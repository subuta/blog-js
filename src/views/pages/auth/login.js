import React from 'react'
import _ from 'lodash'
import Cookie from 'js-cookie'

import auth0 from 'src/views/utils/auth0'

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

const Login = enhance(() => {
  return (
    <div>
      login!
    </div>
  )
})

export default Login
