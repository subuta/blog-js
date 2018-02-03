import _ from 'lodash'
import { combineReducers } from 'redux'
import { createSelector } from 'reselect'
import { denormalize } from 'src/utils/schema'

import api from 'src/utils/api'

import {
  getEntities as getCommentEntities,
  createComment
} from 'src/modules/comment'

import {
  getEntities as getChannelEntities,
  requestChannel
} from 'src/modules/channel'

// -------------
// Constants
// -------------
export const MODULE_NAME = 'channelRoute'
export const SET_CHANNEL_COMMENT_IDS = 'SET_CHANNEL_COMMENT_IDS'

// -------------
// ActionCreators
// -------------
export const setChannelCommentIds = (ids) => {
  return {
    type: SET_CHANNEL_COMMENT_IDS,
    payload: ids
  }
}

export const fetchChannelComments = (channelId) => {
  return (dispatch, getState) => {
    return dispatch(requestChannel(channelId)).then(() => {
      const channelEntities = getChannelEntities(getState())
      const channel = channelEntities[channelId]
      dispatch(setChannelCommentIds(channel.comments))
    })
  }
}

export const createChannelComment = (channelId, params) => {
  return (dispatch, getState) => {
    return dispatch(createComment(channelId, params)).then((data) => {
      const ids = getIds(getState())
      dispatch(setChannelCommentIds([...ids, data.result]))
    })
  }
}

// -------------
// Reducers
// -------------
const ids = (state = [], action) => {
  if (action.type === SET_CHANNEL_COMMENT_IDS) {
    return _.uniq(action.payload)
  }
  return state
}

export default combineReducers({
  ids
})

// -------------
// Selectors
// -------------
export const getIds = state => state[MODULE_NAME].ids
export const getAll = createSelector(
  getCommentEntities,
  getIds,
  _.identity,
  (entities, ids, state) => ids.map(id => {
    return denormalize(entities[id], 'comments', state)
  })
)
