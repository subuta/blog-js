import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import channels from './channels'
import comments from './comments'

const reducers = {
  routing: routerReducer,
  channels,
  comments
}

const makeRootReducer = (injectedReducers) => {
  return combineReducers({
    ...reducers,
    ...injectedReducers
  })
}

// borrowed from https://github.com/davezuko/react-redux-starter-kit/blob/master/src/store/reducers.js
export const injectReducer = (store, key, reducer) => {
  store.injectedReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.injectedReducers))
}

export default makeRootReducer
