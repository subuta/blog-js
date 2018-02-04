import { connect } from 'react-redux'
import { injectReducer } from 'src/modules'
import store from 'src/store'
import { push } from 'react-router-redux'
import _ from 'lodash'

import {
  createChannel
} from 'src/modules/channel'

import {
  requestMe,
  getCurrentUser,
} from 'src/modules/user'

const mapStateToProps = (state) => {
  return {
    currentUser: getCurrentUser(state)
  }
}

const mapDispatchToProps = {
  requestMe
}

export default connect(mapStateToProps, mapDispatchToProps)
