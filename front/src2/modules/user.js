import _ from 'lodash'
import {combineReducers} from 'redux'
import {createSelector} from 'reselect'
import {denormalize} from 'src/utils/schema'
import api from 'src/utils/api'

import {SET_COMMENTED_BIES} from './commentedBy'

// -------------
// Constants
// -------------
export const REQUEST_USERS = 'REQUEST_USERS'
export const REQUEST_USERS_FAILURE = 'REQUEST_USERS_FAILURE'
export const SET_USERS = 'SET_USERS'

// -------------
// ActionCreators
// -------------
export const setUsers = (users) => {
  return {
    type: SET_USERS,
    payload: users
  }
}

// -------------
// Reducers
// -------------
export const entities = (state = {}, action) => {
  if (action.type === SET_USERS || action.type === SET_COMMENTED_BIES) {
    return {...state, ...action.payload.entities.user}
  }
  return state
}

export const ids = (state = [], action) => {
  if (action.type === SET_USERS) {
    if (_.isArray(action.payload.result)) {
      return _.uniq([...state, ...action.payload.result])
    }
    return _.uniq([...state, action.payload.result])
  }
  return state
}

export const isRequestProgress = (state = false, action) => {
  if (action.type === REQUEST_USERS) {
    return true
  } else if (
    action.type === SET_USERS ||
    action.type === REQUEST_USERS_FAILURE
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
export const getEntities = (state) => state.user.entities
export const getIds = (state) => state.user.ids
export const getIsRequestProgress = (state) => state.user.isRequestProgress
export const getAll = createSelector(
  getEntities,
  getIds,
  _.identity,
  (entities, ids, state) =>
    ids.map((id) => {
      return denormalize(entities[id], 'user', state)
    })
)
