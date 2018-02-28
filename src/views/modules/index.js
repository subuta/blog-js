import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import _ from 'lodash'
import channel from './channel'
import article from './article'
import comment from './comment'
import attachment from './attachment'
import tag from './tag'
import user from './user'

export const reset = (initialState) => ({
  type: '@@RESET',
  payload: initialState
})

const reducers = {
  routing: routerReducer,
  channel,
  article,
  comment,
  attachment,
  tag,
  user
}

const makeRootReducer = (injectedReducers) => {
  const appReducer = combineReducers({
    ...reducers,
    ...injectedReducers
  })

  return function rootReducer (state, action) {
    if (action.type === '@@RESET') {
      state = action.payload || undefined
    }

    return appReducer(state, action)
  }
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
