import React from 'react'
import { Redirect } from 'react-router'
import auth0 from 'src/utils/auth0'

import {
  compose,
  lifecycle
} from 'recompose'

const enhance = compose(
  lifecycle({
    componentWillMount () {
      const {history} = this.props
      auth0.parseHash().then((result) => {
        auth0.setSession(result)
        window.requestAnimationFrame(() => history.push('/login'))
      })
    }
  })
)

export default enhance(() => <span>callback...</span>)
