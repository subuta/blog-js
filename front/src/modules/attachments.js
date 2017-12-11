import _ from 'lodash'
import { combineReducers } from 'redux'
import { createSelector } from 'reselect'
import { denormalize } from 'src/utils/schema'

import api from 'src/utils/api'
// -------------
// Constants
// -------------
export const REQUEST_ATTACHMENTS = 'REQUEST_ATTACHMENTS'
export const SET_ATTACHMENTS = 'SET_ATTACHMENTS'

// -------------
// ActionCreators
// -------------
export const setAttachments = (attachments) => {
  return {
    type: SET_ATTACHMENTS,
    payload: attachments
  }
}

export const createAttachment = (params) => {
  return (dispatch) => {
    dispatch({type: REQUEST_ATTACHMENTS})
    return api.attachments.create(params).then((data) => {
      dispatch(setAttachments(data.normalized))
      return data
    })
  }
}

export const uploadAttachment = (file, signedRequest, url) => {
  return (dispatch) => {
    return api.attachments.upload(file, signedRequest, url)
  }
}

// -------------
// Reducers
// -------------
const entities = (state = {}, action) => {
  if (action.type === SET_ATTACHMENTS) {
    return {...state, ...action.payload.entities.attachments}
  }
  return state
}

const ids = (state = [], action) => {
  if (action.type === SET_ATTACHMENTS) {
    if (_.isArray(action.payload.result)) {
      return _.uniq([...state, ...action.payload.result])
    }
    return _.uniq([...state, action.payload.result])
  }
  return state
}

const isProgress = (state = false, action) => {
  if (action.type === REQUEST_ATTACHMENTS) {
    return true
  } else if (action.type === SET_ATTACHMENTS) {
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
export const getEntities = state => state.attachments.entities
export const getIds = state => state.attachments.ids
export const getIsProgress = state => state.attachments.isProgress
export const getAll = createSelector(
  getEntities,
  getIds,
  _.identity,
  (entities, ids, state) => ids.map(id => {
    return denormalize(entities[id], 'attachments', state)
  })
)
