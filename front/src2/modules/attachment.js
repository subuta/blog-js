import _ from 'lodash'
import {combineReducers} from 'redux'
import {createSelector} from 'reselect'
import {denormalize} from 'src/utils/schema'
import api from 'src/utils/api'

import {SET_COMMENTS} from './comment'

// -------------
// Constants
// -------------
export const REQUEST_ATTACHMENTS = 'REQUEST_ATTACHMENTS'
export const REQUEST_ATTACHMENTS_FAILURE = 'REQUEST_ATTACHMENTS_FAILURE'
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
    return api.attachment.create(params).then((data) => {
      dispatch(setAttachments(data))
      return data
    })
  }
}

// -------------
// Reducers
// -------------
export const entities = (state = {}, action) => {
  if (action.type === SET_ATTACHMENTS || action.type === SET_COMMENTS) {
    return {...state, ...action.payload.entities.attachment}
  }
  return state
}

export const ids = (state = [], action) => {
  if (action.type === SET_ATTACHMENTS) {
    if (_.isArray(action.payload.result)) {
      return _.uniq([...state, ...action.payload.result])
    }
    return _.uniq([...state, action.payload.result])
  }
  return state
}

export const isRequestProgress = (state = false, action) => {
  if (action.type === REQUEST_ATTACHMENTS) {
    return true
  } else if (
    action.type === SET_ATTACHMENTS ||
    action.type === REQUEST_ATTACHMENTS_FAILURE
  ) {
    return false
  }
  return state
}

export default combineReducers({
  entities,
  ids,
  isRequestProgress
})

// -------------
// Selectors
// -------------
export const getEntities = (state) => state.attachment.entities
export const getIds = (state) => state.attachment.ids
export const getIsRequestProgress = (state) =>
  state.attachment.isRequestProgress
export const getAll = createSelector(
  getEntities,
  getIds,
  _.identity,
  (entities, ids, state) =>
    ids.map((id) => {
      return denormalize(entities[id], 'attachment', state)
    })
)
