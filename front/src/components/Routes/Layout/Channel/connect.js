import { connect } from 'react-redux'
import { injectReducer } from 'src/modules'
import store from 'src/store'
import { push } from 'react-router-redux'
import _ from 'lodash'

import { denormalize } from 'src/utils/schema'

import reducer, {
  createChannelComment,
  fetchChannelComments,
  getAll as getChannelComments,
  MODULE_NAME
} from './module'

injectReducer(store, MODULE_NAME, reducer);

import {
  getAll as getChannels,
  getIsProgress as getIsChannelProgress,
  requestChannel
} from 'src/modules/channels'

import {
  getIsProgress as getIsAttachmentProgress,
  createAttachment,
  uploadAttachment
} from 'src/modules/attachments'

const mapStateToProps = (state) => {
  return {
    channels: getChannels(state),
    channelComments: getChannelComments(state),
    isChannelProgress: getIsChannelProgress(state)
  }
}

const mapDispatchToProps = {
  fetchChannelComments,
  createChannelComment,
  createAttachment,
  uploadAttachment
}

export default connect(mapStateToProps, mapDispatchToProps)
