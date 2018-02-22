import _ from 'lodash'
import {combineReducers} from 'redux'
import {createSelector} from 'reselect'
import {normalize} from 'normalizr'
import {articleTag, articleTagList, denormalize} from 'src/utils/schema'
import api from 'src/utils/api'

import {SET_TAGS} from './tag'
import {SET_ARTICLES} from './article'

// -------------
// Constants
// -------------
export const REQUEST_ARTICLE_TAGS = 'REQUEST_ARTICLE_TAGS'
export const REQUEST_ARTICLE_TAGS_FAILURE = 'REQUEST_ARTICLE_TAGS_FAILURE'
export const SET_ARTICLE_TAGS = 'SET_ARTICLE_TAGS'

/* mat Custom constants [start] */
/* mat Custom constants [end] */

// -------------
// ActionCreators
// -------------
export const setArticleTags = (article_tags) => {
  return {
    type: SET_ARTICLE_TAGS,
    payload: article_tags
  }
}

/* mat Custom actionCreators [start] */
/* mat Custom actionCreators [end] */

// -------------
// Reducers
// -------------
export const entities = (state = {}, action) => {
  if (_.get(action, ['payload', 'entities', 'articleTag'])) {
    return {...state, ...action.payload.entities.articleTag}
  }
  return state
}

export const ids = (state = [], action) => {
  if (action.type === SET_ARTICLE_TAGS) {
    if (_.isArray(action.payload.result)) {
      return _.uniq([...state, ...action.payload.result])
    }
    return _.uniq([...state, action.payload.result])
  }
  return state
}

export const isRequestProgress = (state = false, action) => {
  if (action.type === REQUEST_ARTICLE_TAGS) {
    return true
  } else if (
    action.type === SET_ARTICLE_TAGS ||
    action.type === REQUEST_ARTICLE_TAGS_FAILURE
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
export const getEntities = (state) => state.articleTag.entities
export const getIds = (state) => state.articleTag.ids
export const getIsRequestProgress = (state) =>
  state.articleTag.isRequestProgress
export const getAll = createSelector(
  getEntities,
  getIds,
  _.identity,
  (entities, ids, state) =>
    ids.map((id) => {
      return denormalize(entities[id], 'articleTag', state)
    })
)

/* mat Custom selectors [start] */
/* mat Custom selectors [end] */
