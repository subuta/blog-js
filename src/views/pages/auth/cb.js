import React from 'react'
import _ from 'lodash'
import { withRouter } from 'next/router'

import connext from 'src/views/hoc/connext'
import auth0 from 'src/views/utils/auth0'

import {
  requestUpdateUser
} from 'src/views/modules/user'

import {
  compose,
  lifecycle
} from 'recompose'

const enhance = compose(
  lifecycle({
    componentWillMount () {
      const {requestUpdateUser, router} = this.props
      auth0.parseHash().then((result) => {
        const {locale, nickname, picture, sub} = result.idTokenPayload
        auth0.setSession(result)
        requestUpdateUser({locale, nickname, auth0Id: sub, avatar: picture})
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
  requestUpdateUser
}

export default withRouter(connext(mapStateToProps, mapDispatchToProps)(Login))
