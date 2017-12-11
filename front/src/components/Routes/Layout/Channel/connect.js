import { connect } from 'react-redux'
import { injectReducer } from 'src/modules'
import store from 'src/store'
import { push } from 'react-router-redux'
import _ from 'lodash'

import { denormalize } from 'src/utils/schema'

import {
  createComment
} from 'src/modules/comments'

import {
  getAll as getChannels,
  getIsProgress as getIsChannelProgress,
  requestChannel
} from 'src/modules/channels'

const mapStateToProps = (state) => {
  return {
    channels: getChannels(state),
    isChannelProgress: getIsChannelProgress(state)
  }
}

const mapDispatchToProps = {
  requestChannel,
  createComment
}

export default connect(mapStateToProps, mapDispatchToProps)
