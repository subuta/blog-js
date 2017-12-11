import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import _ from 'lodash'

import attachments from './attachments'
import channels from './channels'
import comments from './comments'

const reducers = {
  routing: routerReducer,
  attachments,
  channels,
  comments
}

const makeRootReducer = (injectedReducers) => {
  return combineReducers({
    ...reducers,
    ...injectedReducers
  })
}

// extract entities from reducers.
export const fetchEntities = (state) => {
  return _.transform(state, (result, s, key) => {
    if (_.isEmpty(_.get(s, 'entities', {}))) return
    result[key] = _.get(s, 'entities', {})
  }, {})
}

// borrowed from https://github.com/davezuko/react-redux-starter-kit/blob/master/src/store/reducers.js
export const injectReducer = (store, key, reducer) => {
  store.injectedReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.injectedReducers))
}

export default makeRootReducer
