import _ from 'lodash'
import {combineReducers} from 'redux'
import {createSelector} from 'reselect'
import {normalize} from 'normalizr'
import {tag, tagList, denormalize} from 'src/views/utils/schema'
import api from 'src/views/utils/api'

import {SET_ARTICLES} from './article'

// -------------
// Constants
// -------------
export const REQUEST_TAGS = 'REQUEST_TAGS'
export const REQUEST_TAGS_FAILURE = 'REQUEST_TAGS_FAILURE'
export const SET_TAGS = 'SET_TAGS'
export const SET_TAG_IDS = 'SET_TAG_IDS'

/* mat Custom constants [start] */
/* mat Custom constants [end] */

// -------------
// ActionCreators
// -------------
export const setTags = (tags) => {
  return {
    type: SET_TAGS,
    payload: tags
  }
}

export const setTagIds = (ids) => {
  return {
    type: SET_TAG_IDS,
    payload: ids
  }
}

export const requestTags = () => {
  return (dispatch) => {
    dispatch({type: REQUEST_TAGS})
    return api.tag.index().then((data) => {
      /* mat Index data transform [start] */
      /* mat Index data transform [end] */
      dispatch(setTags(normalize(data, tagList)))
      return data
    })
  }
}

/* mat Custom actionCreators [start] */
/* mat Custom actionCreators [end] */

// -------------
// Reducers
// -------------
export const entities = (state = {}, action) => {
  if (_.get(action, ['payload', 'entities', 'tag'])) {
    return {...state, ...action.payload.entities.tag}
  }
  return state
}

export const ids = (state = [], action) => {
  if (action.type === SET_TAGS) {
    if (_.isArray(action.payload.result)) {
      return _.compact(_.uniq([...state, ...action.payload.result]))
    }
    return _.compact(_.uniq([...state, action.payload.result]))
  } else if (action.type === SET_TAG_IDS) {
    return _.compact(_.uniq(action.payload))
  }
  return state
}

export const isRequestProgress = (state = false, action) => {
  if (action.type === REQUEST_TAGS) {
    return true
  } else if (action.type === SET_TAGS || action.type === REQUEST_TAGS_FAILURE) {
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
export const getEntities = (state) => state.tag.entities
export const getIds = (state) => state.tag.ids
export const getIsRequestProgress = (state) => state.tag.isRequestProgress
export const getAll = createSelector(
  getEntities,
  getIds,
  _.identity,
  (entities, ids, state) =>
    ids.map((id) => {
      return denormalize(entities[id], 'tag', state)
    })
)

/* mat Custom selectors [start] */
/* mat Custom selectors [end] */
