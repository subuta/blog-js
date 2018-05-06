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
  lifecycle,
  withHandlers
} from 'recompose'

import CustomLoader from 'src/views/components/common/CustomLoader'
import withStyles from 'src/views/components/layout/otherStyle'

import storage from 'src/views/utils/storage'

const isBrowser = typeof window !== 'undefined'

const enhance = compose(
  withStyles,
  withRouter,
  lifecycle({
    componentWillMount () {
      const prevPath = storage.getItem('prev-path')

      auth0.revokeSession()
      // force reload browser
      if (isBrowser && location) {
        location.href = prevPath ? prevPath : '/'
      }

      storage.removeItem('prev-path')
    }
  })
)

const Logout = enhance(({styles}) => {
  return (
    <div className={styles.Container}>
      <CustomLoader
        label="Log out from sub-labo.com ;)"
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
  requestUpdateUser
}

export default connext(mapStateToProps, mapDispatchToProps)(Logout)
