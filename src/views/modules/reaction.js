import _ from 'lodash'
import {combineReducers} from 'redux'
import {createSelector} from 'reselect'
import {normalize} from 'normalizr'
import {reaction, reactionList, denormalize} from 'src/views/utils/schema'
import api from 'src/views/utils/api'

import {SET_USERS} from './user'

// -------------
// Constants
// -------------
export const REQUEST_REACTIONS = 'REQUEST_REACTIONS'
export const REQUEST_REACTIONS_FAILURE = 'REQUEST_REACTIONS_FAILURE'
export const SET_REACTIONS = 'SET_REACTIONS'
export const SET_REACTION_IDS = 'SET_REACTION_IDS'

/* mat Custom constants [start] */
/* mat Custom constants [end] */

// -------------
// ActionCreators
// -------------
export const setReactions = (reactions) => {
  return {
    type: SET_REACTIONS,
    payload: reactions
  }
}

export const setReactionIds = (ids) => {
  return {
    type: SET_REACTION_IDS,
    payload: ids
  }
}

/* mat Custom actionCreators [start] */
/* mat Custom actionCreators [end] */

// -------------
// Reducers
// -------------
export const entities = (state = {}, action) => {
  if (_.get(action, ['payload', 'entities', 'reaction'])) {
    return {...state, ...action.payload.entities.reaction}
  }
  return state
}

export const ids = (state = [], action) => {
  if (action.type === SET_REACTIONS) {
    if (_.isArray(action.payload.result)) {
      return _.compact(_.uniq([...state, ...action.payload.result]))
    }
    return _.compact(_.uniq([...state, action.payload.result]))
  } else if (action.type === SET_REACTION_IDS) {
    return _.compact(_.uniq(action.payload))
  }
  return state
}

export const isRequestProgress = (state = false, action) => {
  if (action.type === REQUEST_REACTIONS) {
    return true
  } else if (
    action.type === SET_REACTIONS ||
    action.type === REQUEST_REACTIONS_FAILURE
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
/* mat Custom reducers [end] */

export default combineReducers(reducers)

// -------------
// Selectors
// -------------
export const getEntities = (state) => state.reaction.entities
export const getIds = (state) => state.reaction.ids
export const getIsRequestProgress = (state) => state.reaction.isRequestProgress
export const getAll = createSelector(
  getEntities,
  getIds,
  _.identity,
  (entities, ids, state) =>
    ids.map((id) => {
      return denormalize(entities[id], 'reaction', state)
    })
)

/* mat Custom selectors [start] */
/* mat Custom selectors [end] */
