import _ from 'lodash'
import Promise from 'bluebird'

import { combineReducers } from 'redux'
import { createSelector } from 'reselect'

import api from 'src/utils/api'
import { withWait } from 'src/utils/wait'

// -------------
// Constants
// -------------
const REQUEST_CHANNELS = 'REQUEST_CHANNELS'
const SET_CHANNELS = 'SET_CHANNELS'

// -------------
// ActionCreators
// -------------
export const setChannels = (channels) => {
  return {
    type: SET_CHANNELS,
    payload: channels
  }
}

export const requestChannels = () => {
  return (dispatch) => {
    dispatch({type: REQUEST_CHANNELS})
    return withWait(api.channels.index()).then((data) => {
      dispatch(setChannels(data))
    })
  }
}

export const requestChannel = (id) => {
  return (dispatch) => {
    dispatch({type: REQUEST_CHANNELS})
    return withWait(api.channels.show(id)).then((data) => {
      dispatch(setChannels(data))
    })
  }
}

export const createChannel = (params) => {
  return (dispatch) => {
    dispatch({type: REQUEST_CHANNELS})
    return api.channels.create(params).then((data) => {
      dispatch(setChannels(data))
    })
  }
}

// -------------
// Reducers
// -------------
const entities = (state = {}, action) => {
  if (action.type === SET_CHANNELS) {
    return {...state, ...action.payload.entities.channels}
  }
  return state
}

const ids = (state = [], action) => {
  if (action.type === SET_CHANNELS) {
    if (_.isArray(action.payload.result)) {
      return _.uniq([...state, ...action.payload.result])
    }
    return _.uniq([...state, action.payload.result])
  }
  return state
}

// start with true for initial loading view.
const isProgress = (state = true, action) => {
  if (action.type === REQUEST_CHANNELS) {
    return true
  } else if (action.type === SET_CHANNELS) {
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
export const getEntities = state => state.channels.entities
export const getIds = state => state.channels.ids
export const getIsProgress = state => state.channels.isProgress
export const getAll = createSelector(
  getEntities,
  getIds,
  (entities, ids) => ids.map(id => entities[id])
)
