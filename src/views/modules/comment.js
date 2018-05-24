import _ from 'lodash'
import {combineReducers} from 'redux'
import {createSelector} from 'reselect'
import {normalize} from 'normalizr'
import {comment, commentList, denormalize} from 'src/views/utils/schema'
import api from 'src/views/utils/api'

import {SET_CHANNELS} from './channel'
import {SET_USERS} from './user'
import {SET_ATTACHMENTS} from './attachment'
import {SET_REACTIONS} from './reaction'



// -------------
// Constants
// -------------
export const REQUEST_COMMENTS = 'REQUEST_COMMENTS'
export const REQUEST_COMMENTS_FAILURE = 'REQUEST_COMMENTS_FAILURE'
export const SET_COMMENTS = 'SET_COMMENTS'
export const SET_COMMENT_IDS = 'SET_COMMENT_IDS'



// -------------
// ActionCreators
// -------------
export const setComments = (comments) => {
  return {
    type: SET_COMMENTS,
    payload: comments
  }
}

export const setCommentIds = (ids) => {
  return {
    type: SET_COMMENT_IDS,
    payload: ids
  }
}

export const requestComments = (params) => {
  return (dispatch) => {
    dispatch({type: REQUEST_COMMENTS})
    return api.comment.index(params).then((data) => {

      dispatch(setComments(normalize(data, commentList)))
      return data
    })
  }
}

export const createComment = (params) => {
  return (dispatch) => {
    dispatch({type: REQUEST_COMMENTS})
    return api.comment.create(params).then((data) => {

      dispatch(setComments(normalize(data, comment)))
      return data
    })
  }
}

export const updateComment = (id, params) => {
  return (dispatch) => {
    dispatch({type: REQUEST_COMMENTS})
    return api.comment.update(id, params).then((data) => {

      dispatch(setComments(normalize(data, comment)))
      return data
    })
  }
}

export const deleteComment = (id, params) => {
  return (dispatch, getState) => {
    dispatch({type: REQUEST_COMMENTS})
    return api.comment.destroy(id, params).then(() => {
      const state = getState()
      const nextIds = _.without(getIds(state), id)
      dispatch(setCommentIds(nextIds))
    })
  }
}

/* mat Custom actionCreators [start] */
export const addReaction = (id, params) => {
  return (dispatch) => {
    dispatch({type: REQUEST_COMMENTS})
    return api.comment.addReaction(id, params).then((data) => {
      dispatch(setComments(normalize(data, comment)))
      return data
    })
  }
}

export const removeReaction = (id, params) => {
  return (dispatch) => {
    dispatch({type: REQUEST_COMMENTS})
    return api.comment.removeReaction(id, params).then((data) => {
      dispatch(setComments(normalize(data, comment)))
    })
  }
}
/* mat Custom actionCreators [end] */

// -------------
// Reducers
// -------------
export const entities = (state = {}, action) => {
  if (_.get(action, ['payload', 'entities', 'comment'])) {
    return {...state, ...action.payload.entities.comment}
  }
  return state
}

export const ids = (state = [], action) => {
  if (action.type === SET_COMMENTS) {
    if (_.isArray(action.payload.result)) {
      return _.compact(_.uniq([...state, ...action.payload.result]))
    }
    return _.compact(_.uniq([...state, action.payload.result]))
  } else if (action.type === SET_COMMENT_IDS) {
    return _.compact(_.uniq(action.payload))
  }
  return state
}

export const isRequestProgress = (state = false, action) => {
  if (action.type === REQUEST_COMMENTS) {
    return true
  } else if (
    action.type === SET_COMMENTS ||
    action.type === REQUEST_COMMENTS_FAILURE
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
export const getEntities = (state) => state.comment.entities
export const getIds = (state) => state.comment.ids
export const getIsRequestProgress = (state) => state.comment.isRequestProgress
export const getAll = createSelector(
  getEntities,
  getIds,
  _.identity,
  (entities, ids, state) =>
    ids.map((id) => {
      return denormalize(entities[id], 'comment', state)
    })
)


