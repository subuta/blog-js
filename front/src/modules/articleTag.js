import _ from 'lodash'
import {combineReducers} from 'redux'
import {createSelector} from 'reselect'
import {normalize} from 'normalizr'
import {articlesTag, articlesTagList, denormalize} from 'src/utils/schema'
import api from 'src/utils/api'

import {SET_TAGS} from './tag'
import {SET_ARTICLES} from './article'

// -------------
// Constants
// -------------
export const REQUEST_ARTICLES_TAGS = 'REQUEST_ARTICLES_TAGS'
export const REQUEST_ARTICLES_TAGS_FAILURE = 'REQUEST_ARTICLES_TAGS_FAILURE'
export const SET_ARTICLES_TAGS = 'SET_ARTICLES_TAGS'

/* mat Custom constants [start] */
/* mat Custom constants [end] */

// -------------
// ActionCreators
// -------------
export const setArticlesTags = (articles_tags) => {
  return {
    type: SET_ARTICLES_TAGS,
    payload: articles_tags
  }
}

/* mat Custom actionCreators [start] */
/* mat Custom actionCreators [end] */

// -------------
// Reducers
// -------------
export const entities = (state = {}, action) => {
  if (_.get(action, ['payload', 'entities', 'articlesTag'])) {
    return {...state, ...action.payload.entities.articlesTag}
  }
  return state
}

export const ids = (state = [], action) => {
  if (action.type === SET_ARTICLES_TAGS) {
    if (_.isArray(action.payload.result)) {
      return _.uniq([...state, ...action.payload.result])
    }
    return _.uniq([...state, action.payload.result])
  }
  return state
}

export const isRequestProgress = (state = false, action) => {
  if (action.type === REQUEST_ARTICLES_TAGS) {
    return true
  } else if (
    action.type === SET_ARTICLES_TAGS ||
    action.type === REQUEST_ARTICLES_TAGS_FAILURE
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
export const getEntities = (state) => state.articlesTag.entities
export const getIds = (state) => state.articlesTag.ids
export const getIsRequestProgress = (state) =>
  state.articlesTag.isRequestProgress
export const getAll = createSelector(
  getEntities,
  getIds,
  _.identity,
  (entities, ids, state) =>
    ids.map((id) => {
      return denormalize(entities[id], 'articlesTag', state)
    })
)

/* mat Custom selectors [start] */
/* mat Custom selectors [end] */
