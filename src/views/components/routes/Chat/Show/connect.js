import _ from 'lodash'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import { getEntities as getChannelEntities } from 'src/views/modules/channel'
import { denormalize } from 'src/views/utils/schema'

import { throw404 } from 'src/views/utils/next'

import {
  showMenu,
  hideMenu
} from 'src/views/modules/ui'

import {
  getAll as getChannels,
  getIsRequestProgress as getIsChannelProgress,
  requestChannels
} from 'src/views/modules/channel'

import {
  createComment,
  getEntities as getCommentEntities
} from 'src/views/modules/comment'

import {
  signAttachment,
  createAttachment,
  uploadAttachment
} from 'src/views/modules/attachment'

const getChannelComments = (channelId) => createSelector(
  getCommentEntities,
  getChannelEntities,
  _.identity,
  (commentEntities, channelEntities, state) => {
    const channel = channelEntities[channelId]

    // throw nextjs Error if no valid channel found.
    if (!channel) return throw404();

    return channel.comments.map((id) => {
      return denormalize(commentEntities[id], 'comment', state)
    })
  })

const mapStateToProps = (state, oldProps) => {
  const channelEntities = getChannelEntities(state)
  const channelId = _.get(oldProps, 'url.query.id', '')
  return {
    channels: getChannels(state),
    channelComments: getChannelComments(channelId)(state),
    isChannelProgress: getIsChannelProgress(state),
    channel: channelEntities[channelId]
  }
}

const mapDispatchToProps = {
  showMenu,
  hideMenu,
  createComment,
  createAttachment,
  uploadAttachment,
  signAttachment,
  requestChannels
}

export default connect(mapStateToProps, mapDispatchToProps)
