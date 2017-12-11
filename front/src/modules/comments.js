import _ from 'lodash'
import { combineReducers } from 'redux'
import { createSelector } from 'reselect'
import { denormalize } from 'src/utils/schema'

import api from 'src/utils/api'

import {
  SET_CHANNELS
} from './channels'

// -------------
// Constants
// -------------
export const REQUEST_COMMENTS = 'REQUEST_COMMENTS'
export const SET_COMMENTS = 'SET_COMMENTS'

// -------------
// ActionCreators
// -------------
export const setComments = (comments) => {
  return {
    type: SET_COMMENTS,
    payload: comments
  }
}

export const requestChannelComments = (channelId) => {
  return (dispatch) => {
    dispatch({type: REQUEST_COMMENTS})
    return api.comments.indexByChannel(channelId).then((data) => {
      dispatch(setComments(data))
    })
  }
}

export const createComment = (channelId, params) => {
  return (dispatch) => {
    dispatch({type: REQUEST_COMMENTS})
    return api.comments.create(channelId, params).then((data) => {
      dispatch(setComments(data))
      return data
    })
  }
}

// -------------
// Reducers
// -------------
const entities = (state = {}, action) => {
  if (action.type === SET_COMMENTS ||
      action.type === SET_CHANNELS) {
    return {...state, ...action.payload.entities.comments}
  }
  return state
}

const ids = (state = [], action) => {
  if (action.type === SET_COMMENTS) {
    if (_.isArray(action.payload.result)) {
      return _.uniq([...state, ...action.payload.result])
    }
    return _.uniq([...state, action.payload.result])
  }
  return state
}

const isProgress = (state = false, action) => {
  if (action.type === REQUEST_COMMENTS) {
    return true
  } else if (action.type === SET_COMMENTS) {
    return false
  }
  return state
}

export default combineReducers({
  entities,
  ids,
  isProgress
})

// -------------
// Selectors
// -------------
export const getEntities = state => state.comments.entities
export const getIds = state => state.comments.ids
export const getIsProgress = state => state.comments.isProgress
export const getAll = createSelector(
  getEntities,
  getIds,
  _.identity,
  (entities, ids, state) => ids.map(id => {
    return denormalize(entities[id], 'comments', state)
  })
)
