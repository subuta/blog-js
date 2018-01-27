import { connect } from 'react-redux'
import { injectReducer } from 'src/modules'
import store from 'src/store'
import { push } from 'react-router-redux'
import _ from 'lodash'

import {
  getAll as getChannels,
  getIsProgress as getIsChannelProgress,
  requestChannels,
  createChannel
} from 'src/modules/channels'

import {
  requestMe,
  getCurrentUser,
} from 'src/modules/users'

const mapStateToProps = (state) => {
  return {
    channels: getChannels(state),
    currentUser: getCurrentUser(state),
    isChannelProgress: getIsChannelProgress(state)
  }
}

const mapDispatchToProps = {
  requestChannels,
  requestMe,
  createChannel
}

export default connect(mapStateToProps, mapDispatchToProps)
