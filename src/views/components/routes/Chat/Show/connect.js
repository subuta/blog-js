import _ from 'lodash'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { normalize } from 'normalizr'

import { getEntities as getChannelEntities } from 'src/views/modules/channel'
import { denormalize } from 'src/views/utils/schema'

import { throw404 } from 'src/views/utils/next'

import { channel as channelSchema } from 'src/views/utils/schema'

import {
  showMenu,
  hideMenu
} from 'src/views/modules/ui'

import {
  getAll as getChannels,
  getIsRequestProgress as getIsChannelProgress,
  requestChannels,
  setChannels
} from 'src/views/modules/channel'

import {
  createComment,
  updateComment,
  addReaction,
  removeReaction,
  deleteComment as requestDeleteComment,
  getEntities as getCommentEntities
} from 'src/views/modules/comment'

import {
  signAttachment,
  createAttachment,
  uploadAttachment
} from 'src/views/modules/attachment'

// optimistic delete comment.
const deleteComment = (id, params) => {
  return (dispatch, getState) => {
    const state = getState()
    const entities = getChannelEntities(state)
    const channel = entities[params.channelId]
    const _channel = _.clone(channel)

    _channel.comments = _.without(channel.comments, id);

    // optimistic delete comments
    dispatch(setChannels(normalize(_channel, channelSchema)))

    // then try actual deletion for the server
    dispatch(requestDeleteComment(id, params)).catch(() => {
      // rollback changes if failed.
      dispatch(setChannels(normalize(channel, channelSchema)))
    })
  }
}

const getChannelComments = (name) => createSelector(
  getCommentEntities,
  getChannelEntities,
  _.identity,
  (commentEntities, channelEntities, state) => {
    const channel = _.find(channelEntities, {name})

    // throw nextjs Error if no valid channel found.
    if (!channel) return throw404()

    return _.reverse(channel.comments.map((id) => {
      return denormalize(commentEntities[id], 'comment', state)
    }))
  })

const mapStateToProps = (state, oldProps) => {
  const channelEntities = getChannelEntities(state)
  const name = _.get(oldProps, 'url.query.name', '')
  const channel = _.find(channelEntities, {name})
  return {
    channels: getChannels(state),
    channelComments: getChannelComments(name)(state),
    isChannelProgress: getIsChannelProgress(state),
    channel
  }
}

const mapDispatchToProps = {
  showMenu,
  hideMenu,
  createComment,
  updateComment,
  deleteComment,
  createAttachment,
  uploadAttachment,
  addReaction,
  removeReaction,
  signAttachment,
  requestChannels
}

export default connect(mapStateToProps, mapDispatchToProps)
