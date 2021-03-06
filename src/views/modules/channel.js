import _ from 'lodash'
import {combineReducers} from 'redux'
import {createSelector} from 'reselect'
import {normalize} from 'normalizr'
import {channel, channelList, denormalize} from 'src/views/utils/schema'
import api from 'src/views/utils/api'

import {SET_COMMENTS} from './comment'



// -------------
// Constants
// -------------
export const REQUEST_CHANNELS = 'REQUEST_CHANNELS'
export const REQUEST_CHANNELS_FAILURE = 'REQUEST_CHANNELS_FAILURE'
export const SET_CHANNELS = 'SET_CHANNELS'
export const SET_CHANNEL_IDS = 'SET_CHANNEL_IDS'



// -------------
// ActionCreators
// -------------
export const setChannels = (channels) => {
  return {
    type: SET_CHANNELS,
    payload: channels
  }
}

export const setChannelIds = (ids) => {
  return {
    type: SET_CHANNEL_IDS,
    payload: ids
  }
}

export const requestChannels = (params) => {
  return (dispatch) => {
    dispatch({type: REQUEST_CHANNELS})
    return api.channel.index(params).then((data) => {

      dispatch(setChannels(normalize(data, channelList)))
      return data
    })
  }
}

export const requestChannel = (id) => {
  return (dispatch) => {
    dispatch({type: REQUEST_CHANNELS})
    return api.channel.show(id).then((data) => {

      dispatch(setChannels(normalize(data, channel)))
      return data
    })
  }
}

export const createChannel = (params) => {
  return (dispatch) => {
    dispatch({type: REQUEST_CHANNELS})
    return api.channel.create(params).then((data) => {

      dispatch(setChannels(normalize(data, channel)))
      return data
    })
  }
}

/* mat Custom actionCreators [start] */
export const requestChannelByName = (name) => {
  return (dispatch) => {
    dispatch({type: REQUEST_CHANNELS})
    return api.channel.showByName(name).then((data) => {
      dispatch(setChannels(normalize(data, channel)))
      return data
    })
  }
}
/* mat Custom actionCreators [end] */

// -------------
// Reducers
// -------------
export const entities = (state = {}, action) => {
  if (_.get(action, ['payload', 'entities', 'channel'])) {
    return {...state, ...action.payload.entities.channel}
  }
  return state
}

export const ids = (state = [], action) => {
  if (action.type === SET_CHANNELS) {
    if (_.isArray(action.payload.result)) {
      return _.compact(_.uniq([...state, ...action.payload.result]))
    }
    return _.compact(_.uniq([...state, action.payload.result]))
  } else if (action.type === SET_CHANNEL_IDS) {
    return _.compact(_.uniq(action.payload))
  }
  return state
}

export const isRequestProgress = (state = false, action) => {
  if (action.type === REQUEST_CHANNELS) {
    return true
  } else if (
    action.type === SET_CHANNELS ||
    action.type === REQUEST_CHANNELS_FAILURE
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
export const getEntities = (state) => state.channel.entities
export const getIds = (state) => state.channel.ids
export const getIsRequestProgress = (state) => state.channel.isRequestProgress
export const getAll = createSelector(
  getEntities,
  getIds,
  _.identity,
  (entities, ids, state) =>
    ids.map((id) => {
      return denormalize(entities[id], 'channel', state)
    })
)


