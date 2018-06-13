import React from 'react'
import _ from 'lodash'
import { withRouter } from 'next/router'

import Head from 'next/head'

import connext from 'src/views/hoc/connext'
import auth0 from 'src/views/utils/auth0'
import storage from 'src/views/utils/storage'

import CustomLoader from 'src/views/components/common/CustomLoader'
import withStyles from 'src/views/components/layout/otherStyle'

import {
  requestCreateUser
} from 'src/views/modules/user'

import {
  compose,
  lifecycle
} from 'recompose'

const enhance = compose(
  withStyles,
  withRouter,
  lifecycle({
    componentWillMount () {
      const {requestCreateUser, router} = this.props
      const prevPath = storage.getItem('prev-path')
      auth0.parseHash().then((result) => {
        auth0.setSession(result)
        const {locale, nickname, picture, sub} = result.idTokenPayload
        requestCreateUser({locale, nickname, auth0Id: sub, avatar: picture})
          .then(() => {
            router.push(prevPath ? prevPath : '/')
            storage.removeItem('prev-path')
          })
      })
    }
  })
)

const LoginCallback = enhance(({styles}) => {
  const title = 'Auth callback | sub-labo'
  return (
    <div className={styles.Container}>
      <Head>
        <title>{title}</title>
      </Head>

      <CustomLoader
        label="Auth0 login succeeded :) Redirect back to sub-labo.com ..."
        isShow={true}
        size={80}
      />
    </div>
  )
})

const mapStateToProps = () => {
  return {}
}
const mapDispatchToProps = {
  requestCreateUser
}

export default connext(mapStateToProps, mapDispatchToProps)(LoginCallback)
