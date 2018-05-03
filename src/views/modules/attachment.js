import _ from 'lodash'
import {combineReducers} from 'redux'
import {createSelector} from 'reselect'
import {normalize} from 'normalizr'
import {attachment, attachmentList, denormalize} from 'src/views/utils/schema'
import api from 'src/views/utils/api'

import {SET_COMMENTS} from './comment'



// -------------
// Constants
// -------------
export const REQUEST_ATTACHMENTS = 'REQUEST_ATTACHMENTS'
export const REQUEST_ATTACHMENTS_FAILURE = 'REQUEST_ATTACHMENTS_FAILURE'
export const SET_ATTACHMENTS = 'SET_ATTACHMENTS'
export const SET_ATTACHMENT_IDS = 'SET_ATTACHMENT_IDS'



// -------------
// ActionCreators
// -------------
export const setAttachments = (attachments) => {
  return {
    type: SET_ATTACHMENTS,
    payload: attachments
  }
}

export const setAttachmentIds = (ids) => {
  return {
    type: SET_ATTACHMENT_IDS,
    payload: ids
  }
}

export const createAttachment = (params) => {
  return (dispatch) => {
    dispatch({type: REQUEST_ATTACHMENTS})
    return api.attachment.create(params).then((data) => {

      dispatch(setAttachments(normalize(data, attachment)))
      return data
    })
  }
}

/* mat Custom actionCreators [start] */
export const uploadAttachment = (file, signedRequest, url) => {
  return () => {
    return api.attachment.upload(file, signedRequest, url)
  }
}

export const signAttachment = (params) => {
  return () => {
    return api.attachment.sign(params)
  }
}
/* mat Custom actionCreators [end] */

// -------------
// Reducers
// -------------
export const entities = (state = {}, action) => {
  if (_.get(action, ['payload', 'entities', 'attachment'])) {
    return {...state, ...action.payload.entities.attachment}
  }
  return state
}

export const ids = (state = [], action) => {
  if (action.type === SET_ATTACHMENTS) {
    if (_.isArray(action.payload.result)) {
      return _.compact(_.uniq([...state, ...action.payload.result]))
    }
    return _.compact(_.uniq([...state, action.payload.result]))
  } else if (action.type === SET_ATTACHMENT_IDS) {
    return _.compact(_.uniq(action.payload))
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

let reducers = {
  entities,
  ids,
  isRequestProgress
}



export default combineReducers(reducers)

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


