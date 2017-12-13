import React from 'react'
import { Redirect } from 'react-router'
import auth0 from 'src/utils/auth0'

import {
  compose,
  lifecycle
} from 'recompose'

import connect from './connect'

const enhance = compose(
  connect,
  lifecycle({
    componentWillMount () {
      const {history, requestUpdateUser} = this.props
      auth0.parseHash().then((result) => {
        const {email, locale, nickname, picture, sub} = result.idTokenPayload
        auth0.setSession(result)
        requestUpdateUser({email, locale, nickname, auth0Id: sub, avatar: picture})
          .then(() => history.push('/login'))
      })
    }
  })
)

export default enhance(() => <span>callback...</span>)
