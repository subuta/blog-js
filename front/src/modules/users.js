import _ from 'lodash'
import { combineReducers } from 'redux'
import { createSelector } from 'reselect'
import { denormalize } from 'src/utils/schema'

import api from 'src/utils/api'

// import {
//   SET_CHANNELS
// } from './channels'

// -------------
// Constants
// -------------
export const REQUEST_USERS = 'REQUEST_USERS'
export const SET_USERS = 'SET_USERS'
export const SET_CURRENT_USER = 'SET_CURRENT_USER'

// -------------
// ActionCreators
// -------------
export const setUsers = (users) => {
  return {
    type: SET_USERS,
    payload: users
  }
}

export const setCurrentUser = (user) => {
  return {
    type: SET_CURRENT_USER,
    payload: user
  }
}

export const requestUpdateUser = (user) => {
  return (dispatch) => {
    dispatch({type: REQUEST_USERS})
    return api.users.update(user).then((data) => {
      dispatch(setUsers(data))
    })
  }
}

export const requestMe = () => {
  return (dispatch) => {
    dispatch({type: REQUEST_USERS})
    return api.users.me().then((data) => {
      if (!data) return
      dispatch(setCurrentUser(data))
    })
  }
}

// -------------
// Reducers
// -------------
const entities = (state = {}, action) => {
  if (action.type === SET_USERS ||
    action.type === SET_CURRENT_USER) {
    return {...state, ...action.payload.entities.users}
  }
  return state
}

const ids = (state = [], action) => {
  if (action.type === SET_USERS ||
    action.type === SET_CURRENT_USER) {
    if (_.isArray(action.payload.result)) {
      return _.uniq([...state, ...action.payload.result])
    }
    return _.uniq([...state, action.payload.result])
  }
  return state
}

const currentUserId = (state = null, action) => {
  if (action.type === SET_CURRENT_USER) {
    return action.payload.result
  }
  return state
}

const isProgress = (state = false, action) => {
  if (action.type === REQUEST_USERS) {
    return true
  } else if (action.type === SET_USERS) {
    return false
  }
  return state
}

export default combineReducers({
  entities,
  ids,
  currentUserId,
  isProgress
})

// -------------
// Selectors
// -------------
export const getEntities = state => state.users.entities
export const getIds = state => state.users.ids
export const getCurrentUserId = state => state.users.currentUserId
export const getIsProgress = state => state.users.isProgress
export const getCurrentUser = createSelector(
  getEntities,
  getCurrentUserId,
  (entities, currentUserId) => entities[currentUserId]
)

export const getAll = createSelector(
  getEntities,
  getIds,
  _.identity,
  (entities, ids, state) => ids.map(id => {
    return denormalize(entities[id], 'users', state)
  })
)
