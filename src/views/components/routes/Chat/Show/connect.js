import _ from 'lodash'
import { connect } from 'react-redux'
import { getEntities as getChannelEntities } from 'src/views/modules/channel'

// import reducer, {
//   createChannelComment,
//   fetchChannelComments,
//   getAll as getChannelComments,
//   MODULE_NAME
// } from './module'

import {
  getAll as getChannels,
  getIsRequestProgress as getIsChannelProgress,
  requestChannels
} from 'src/views/modules/channel'

import {
  signAttachment,
  createAttachment,
  uploadAttachment
} from 'src/views/modules/attachment'

const mapStateToProps = (state, oldProps) => {
  const entities = getChannelEntities(state)
  const channelId = _.get(oldProps, 'url.query.id', '')
  return {
    channels: getChannels(state),
    // channelComments: getChannelComments(state),
    isChannelProgress: getIsChannelProgress(state),
    channel: entities[channelId]
  }
}

const mapDispatchToProps = {
  // fetchChannelComments,
  // createChannelComment,
  createAttachment,
  uploadAttachment,
  signAttachment,
  requestChannels
}

export default connect(mapStateToProps, mapDispatchToProps)
