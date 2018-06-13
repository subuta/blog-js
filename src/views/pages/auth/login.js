import React from 'react'
import _ from 'lodash'

import Head from 'next/head'

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

      // User not yet read agreement.
      if (!storage.getItem('auth.is-agreed')) {
        return router.replace('/auth/agreement')
      }

      if (!auth0.isAuthenticated()) {
        return auth0.authorize()
      }

      const prevPath = storage.getItem('prev-path')
      router.push(prevPath ? prevPath : '/')
    }
  })
)

const Login = enhance(({styles}) => {
  const title = 'Login | sub-labo'
  return (
    <div className={styles.Container}>
      <Head>
        <title>{title}</title>
      </Head>

      <CustomLoader
        label="Log in to sub-labo.com ..."
        isShow={true}
        size={80}
      />
    </div>
  )
})

export default Login
