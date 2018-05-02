import React from 'react'
import _ from 'lodash'
import { withRouter } from 'next/router'

import connext from 'src/views/hoc/connext'
import auth0 from 'src/views/utils/auth0'

import {
  requestCreateUser
} from 'src/views/modules/user'

import {
  compose,
  lifecycle
} from 'recompose'

const enhance = compose(
  withRouter,
  lifecycle({
    componentWillMount () {
      const {requestCreateUser, router} = this.props
      auth0.parseHash().then((result) => {
        auth0.setSession(result)
        const {locale, nickname, picture, sub} = result.idTokenPayload
        requestCreateUser({locale, nickname, auth0Id: sub, avatar: picture})
          .then(() => router.push('/'))
      })
    }
  })
)

const Login = enhance(() => {
  return (
    <div>
      cb!
    </div>
  )
})

const mapStateToProps = () => {
  return {}
}
const mapDispatchToProps = {
  requestCreateUser
}

export default connext(mapStateToProps, mapDispatchToProps)(Login)
