import _ from 'lodash'
import {combineReducers} from 'redux'
import {createSelector} from 'reselect'
import {normalize} from 'normalizr'
import {user, userList, denormalize} from 'src/views/utils/schema'
import api from 'src/views/utils/api'

import {SET_COMMENTS} from './comment'

// -------------
// Constants
// -------------
export const REQUEST_USERS = 'REQUEST_USERS'
export const REQUEST_USERS_FAILURE = 'REQUEST_USERS_FAILURE'
export const SET_USERS = 'SET_USERS'
export const SET_USER_IDS = 'SET_USER_IDS'

/* mat Custom constants [start] */
export const SET_CURRENT_USER = 'SET_CURRENT_USER'
/* mat Custom constants [end] */

// -------------
// ActionCreators
// -------------
export const setUsers = (users) => {
  return {
    type: SET_USERS,
    payload: users
  }
}

export const setUserIds = (ids) => {
  return {
    type: SET_USER_IDS,
    payload: ids
  }
}

/* mat Custom actionCreators [start] */
export const setCurrentUser = (user) => {
  return {
    type: SET_CURRENT_USER,
    payload: user
  }
}

export const requestUpdateUser = (user) => {
  return (dispatch) => {
    dispatch({type: REQUEST_USERS})
    return api.user.update(user).then((data) => {
      dispatch(setUsers(data))
    })
  }
}

export const requestMe = () => {
  return (dispatch) => {
    dispatch({type: REQUEST_USERS})
    return api.user.me().then((data) => {
      if (!data) return
      dispatch(setCurrentUser(data))
    })
  }
}
/* mat Custom actionCreators [end] */

// -------------
// Reducers
// -------------
export const entities = (state = {}, action) => {
  if (_.get(action, ['payload', 'entities', 'user'])) {
    return {...state, ...action.payload.entities.user}
  }
  return state
}

export const ids = (state = [], action) => {
  if (action.type === SET_USERS) {
    if (_.isArray(action.payload.result)) {
      return _.compact(_.uniq([...state, ...action.payload.result]))
    }
    return _.compact(_.uniq([...state, action.payload.result]))
  } else if (action.type === SET_USER_IDS) {
    return _.compact(_.uniq(action.payload))
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

let reducers = {
  entities,
  ids,
  isRequestProgress
}

/* mat Custom reducers [start] */
const currentUserId = (state = null, action) => {
  if (action.type === SET_CURRENT_USER) {
    return action.payload.result
  }
  return state
}

reducers = {
  ...reducers,
  currentUserId
}
/* mat Custom reducers [end] */

export default combineReducers(reducers)

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

/* mat Custom selectors [start] */
export const getCurrentUserId = state => state.user.currentUserId
export const getCurrentUser = createSelector(
  getEntities,
  getCurrentUserId,
  (entities, currentUserId) => entities[currentUserId]
)
/* mat Custom selectors [end] */
