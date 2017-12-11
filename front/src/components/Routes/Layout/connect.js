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

const mapStateToProps = (state) => {
  return {
    channels: getChannels(state),
    isChannelProgress: getIsChannelProgress(state)
  }
}

const mapDispatchToProps = {
  requestChannels,
  createChannel
}

export default connect(mapStateToProps, mapDispatchToProps)
