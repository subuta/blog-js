import _ from 'lodash'
import {combineReducers} from 'redux'
import {createSelector} from 'reselect'
import {normalize} from 'normalizr'
import {article, articleList, denormalize} from 'src/views/utils/schema'
import api from 'src/views/utils/api'

import {SET_TAGS} from './tag'
import {SET_USERS} from './user'
import {SET_REACTIONS} from './reaction'

// -------------
// Constants
// -------------
export const REQUEST_ARTICLES = 'REQUEST_ARTICLES'
export const REQUEST_ARTICLES_FAILURE = 'REQUEST_ARTICLES_FAILURE'
export const SET_ARTICLES = 'SET_ARTICLES'
export const SET_ARTICLE_IDS = 'SET_ARTICLE_IDS'

/* mat Custom constants [start] */
/* mat Custom constants [end] */

// -------------
// ActionCreators
// -------------
export const setArticles = (articles) => {
  return {
    type: SET_ARTICLES,
    payload: articles
  }
}

export const setArticleIds = (ids) => {
  return {
    type: SET_ARTICLE_IDS,
    payload: ids
  }
}

export const requestArticles = () => {
  return (dispatch) => {
    dispatch({type: REQUEST_ARTICLES})
    return api.article.index().then((data) => {
      /* mat Index data transform [start] */
      /* mat Index data transform [end] */
      dispatch(setArticles(normalize(data, articleList)))
      return data
    })
  }
}

export const requestArticle = (id) => {
  return (dispatch) => {
    dispatch({type: REQUEST_ARTICLES})
    return api.article.show(id).then((data) => {
      /* mat Show data transform [start] */
      /* mat Show data transform [end] */
      dispatch(setArticles(normalize(data, article)))
      return data
    })
  }
}

export const createArticle = (params) => {
  return (dispatch) => {
    dispatch({type: REQUEST_ARTICLES})
    return api.article.create(params).then((data) => {
      /* mat Create data transform [start] */
      /* mat Create data transform [end] */
      dispatch(setArticles(normalize(data, article)))
      return data
    })
  }
}

export const updateArticle = (id, params) => {
  return (dispatch) => {
    dispatch({type: REQUEST_ARTICLES})
    return api.article.update(id, params).then((data) => {
      /* mat Update data transform [start] */
      /* mat Update data transform [end] */
      dispatch(setArticles(normalize(data, article)))
      return data
    })
  }
}

export const deleteArticle = (id) => {
  return (dispatch, getState) => {
    dispatch({type: REQUEST_ARTICLES})
    return api.article.destroy(id).then(() => {
      const state = getState()
      const nextIds = _.without(getIds(state), id)
      dispatch(setArticleIds(nextIds))
    })
  }
}

/* mat Custom actionCreators [start] */
export const requestArticlesByTagId = (params) => {
  return (dispatch) => {
    dispatch({type: REQUEST_ARTICLES})
    return api.article.filterByTagId(params).then((data) => {
      /* mat Index data transform [start] */
      /* mat Index data transform [end] */
      dispatch(setArticles(normalize(data, articleList)))
      return data
    })
  }
}

export const requestArticleBySlug = (slug) => {
  return (dispatch) => {
    dispatch({type: REQUEST_ARTICLES})
    return api.article.showBySlug(slug).then((data) => {
      /* mat Index data transform [start] */
      /* mat Index data transform [end] */
      dispatch(setArticles(normalize(data, article)))
      return data
    })
  }
}

export const addReaction = (id, params) => {
  return (dispatch) => {
    dispatch({type: REQUEST_ARTICLES})
    return api.article.addReaction(id, params).then((data) => {
      dispatch(setArticles(normalize(data, article)))
      return data
    })
  }
}

export const removeReaction = (id, params) => {
  return (dispatch) => {
    dispatch({type: REQUEST_ARTICLES})
    return api.article.removeReaction(id, params).then((data) => {
      dispatch(setArticles(normalize(data, article)))
    })
  }
}
/* mat Custom actionCreators [end] */

// -------------
// Reducers
// -------------
export const entities = (state = {}, action) => {
  if (_.get(action, ['payload', 'entities', 'article'])) {
    return {...state, ...action.payload.entities.article}
  }
  return state
}

export const ids = (state = [], action) => {
  if (action.type === SET_ARTICLES) {
    if (_.isArray(action.payload.result)) {
      return _.compact(_.uniq([...state, ...action.payload.result]))
    }
    return _.compact(_.uniq([...state, action.payload.result]))
  } else if (action.type === SET_ARTICLE_IDS) {
    return _.compact(_.uniq(action.payload))
  }
  return state
}

export const isRequestProgress = (state = false, action) => {
  if (action.type === REQUEST_ARTICLES) {
    return true
  } else if (
    action.type === SET_ARTICLES ||
    action.type === REQUEST_ARTICLES_FAILURE
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
export const getEntities = (state) => state.article.entities
export const getIds = (state) => state.article.ids
export const getIsRequestProgress = (state) => state.article.isRequestProgress
export const getAll = createSelector(
  getEntities,
  getIds,
  _.identity,
  (entities, ids, state) =>
    ids.map((id) => {
      return denormalize(entities[id], 'article', state)
    })
)

/* mat Custom selectors [start] */
/* mat Custom selectors [end] */
