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
  withRouter,
  lifecycle({
    componentWillMount () {
      const {router} = this.props
      auth0.revokeSession()
      // force reload browser
      location.href = '/'
    }
  })
)

const Logout = enhance(() => {
  return (
    <div>
      logout...
    </div>
  )
})

const mapStateToProps = () => {
  return {}
}
const mapDispatchToProps = {
  requestUpdateUser
}

export default connext(mapStateToProps, mapDispatchToProps)(Logout)
