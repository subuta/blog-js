import React from 'react'
import _ from 'lodash'

import auth0 from 'src/views/utils/auth0'
import storage from 'src/views/utils/storage'

import CustomLoader from 'src/views/components/common/CustomLoader'
import withStyles from 'src/views/components/layout/otherStyle'

import {
  compose,
  lifecycle
} from 'recompose'

import { withRouter } from 'next/router'

const enhance = compose(
  withStyles,
  withRouter,
  lifecycle({
    componentWillMount () {
      const {router} = this.props

      if (!auth0.isAuthenticated()) {
        return auth0.authorize()
      }

      const prevPath = storage.getItem('prev-path')
      router.push(prevPath ? prevPath : '/')
    }
  })
)

const Login = enhance(({styles}) => {
  return (
    <div className={styles.Container}>
      <CustomLoader
        label="Log in to sub-labo.com ..."
        isShow={true}
        size={80}
      />
    </div>
  )
})

export default Login
