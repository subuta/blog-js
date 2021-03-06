import _ from 'lodash'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { normalize } from 'normalizr'

import { getEntities as getChannelEntities } from 'src/views/modules/channel'
import { denormalize } from 'src/views/utils/schema'

import { throw404 } from 'src/views/utils/next'

import {
  channel as channelSchema,
  comment as commentSchema,
  commentList as commentListSchema,
} from 'src/views/utils/schema'

import {
  showMenu,
  hideMenu,
  setUnreadComment,
  removeUnreadComment,
  setEditingUsers,
  removeEditingUser,
  getEditingUsers,
  getUnreadComments
} from 'src/views/modules/ui'

import {
  getCurrentUser,
} from 'src/views/modules/user'

import {
  getAll as getChannels,
  getIsRequestProgress as getIsChannelProgress,
  requestChannels,
  setChannels
} from 'src/views/modules/channel'

import {
  updateComment,
  addReaction,
  removeReaction,
  setComments,
  createComment,
  getIsRequestProgress as getIsCommentProgress,
  requestComments as _requestComments,
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

    _channel.comments = _.without(channel.comments, id)

    // optimistic delete comments
    dispatch(setChannels(normalize(_channel, channelSchema)))

    // then try actual deletion for the server
    dispatch(requestDeleteComment(id, params)).catch(() => {
      // rollback changes if failed.
      dispatch(setChannels(normalize(channel, channelSchema)))
    })
  }
}

// create comment.
const appendChannelComment = (comment) => {
  return (dispatch, getState) => {
    const state = getState()
    const entities = getChannelEntities(state)
    const channel = _.clone(entities[comment.channelId])

    dispatch(setComments(normalize(comment, commentSchema)))

    if (!_.get(channel, 'comments')) return

    // update channel comment.
    channel.comments = _.uniq([comment.id, ...channel.comments])
    dispatch(setChannels(normalize(channel, channelSchema)))
  }
}

const removeChannelComment = (comment) => {
  return (dispatch, getState) => {
    const state = getState()
    const entities = getChannelEntities(state)
    const channel = _.clone(entities[comment.channelId])

    dispatch(setComments(normalize(comment, commentSchema)))

    if (!_.get(channel, 'comments')) return

    // update channel comment.
    channel.comments = _.without(channel.comments, comment.id)
    dispatch(setChannels(normalize(channel, channelSchema)))
  }
}

const setChannelComment = (comment) => {
  return (dispatch) => {
    dispatch(setComments(normalize(comment, commentSchema)))
  }
}

const requestComments = (params) => {
  return (dispatch, getState) => {
    const state = getState()
    const entities = getChannelEntities(state)
    const channel = _.clone(entities[params.channelId])

    return dispatch(_requestComments(params)).then((data) => {
      // update channel comment.
      const normalized = normalize(data.results, commentListSchema)
      // prepend commentIds to channel.comments
      channel.comments = _.uniq([...channel.comments, ...normalized.result])
      dispatch(setComments(normalized))
      dispatch(setChannels(normalize(channel, channelSchema)))
      return data
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

    const comments = channel.comments || []

    return _.reverse(comments.map((id) => {
      return denormalize(commentEntities[id], 'comment', state)
    }))
  })

const mapStateToProps = (state, oldProps) => {
  const channelEntities = getChannelEntities(state)
  const name = _.get(oldProps, 'url.query.name', '')
  const channel = _.find(channelEntities, {name})
  const unreadCommentIds = getUnreadComments(state)
  const unreadCommentId = unreadCommentIds[channel.id]
  const channelComments = getChannelComments(name)(state)
  const unreadCommentIndex = _.findIndex(channelComments, ['id', unreadCommentId])
  const unreadComments = unreadCommentIndex > -1 ? _.slice(channelComments, unreadCommentIndex) : []
  const channelEditingUsers = getEditingUsers(state)

  return {
    channelComments,
    channel,
    unreadComments,
    unreadCommentIndex,
    channels: getChannels(state),
    currentUser: getCurrentUser(state),
    editingUsers: channelEditingUsers[channel.id] || [],
    isChannelProgress: getIsChannelProgress(state),
    isCommentProgress: getIsCommentProgress(state),
    channelId: channel.id
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
  setUnreadComment,
  removeUnreadComment,
  setEditingUsers,
  removeEditingUser,
  requestComments,
  setChannelComment,
  appendChannelComment,
  removeChannelComment,
  requestChannels
}

export default connect(mapStateToProps, mapDispatchToProps)
