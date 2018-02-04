import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import _ from 'lodash'
import channel from './channel'
import article from './article'
import articleTag from './articleTag'
import comment from './comment'
import attachment from './attachment'
import tag from './tag'
import user from './user'

const reducers = {
  routing: routerReducer,
  channel,
  article,
  articleTag,
  comment,
  attachment,
  tag,
  user
}

const makeRootReducer = (injectedReducers) => {
  return combineReducers({
    ...reducers,
    ...injectedReducers
  })
}

// extract entities from reducers.
export const fetchEntities = (state) => {
  return _.transform(
    state,
    (result, s, key) => {
      if (!s.entities) return
      result[key] = _.get(s, 'entities', {})
    },
    {}
  )
}

// borrowed from https://github.com/davezuko/react-redux-starter-kit/blob/master/src/store/reducers.js
export const injectReducer = (store, key, reducer) => {
  store.injectedReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.injectedReducers))
}

export default makeRootReducer
