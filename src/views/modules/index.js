import {combineReducers} from 'redux'
import _ from 'lodash'
import channel from './channel'
import article from './article'
import comment from './comment'
import attachment from './attachment'
import tag from './tag'
import reaction from './reaction'
import user from './user'

/* mat Custom imports [start] */
import ui from './ui'
/* mat Custom imports [end] */

let reducers = {
  channel,
  article,
  comment,
  attachment,
  tag,
  reaction,
  user
}

/* mat Custom reducers [start] */
reducers = {
  ...reducers,
  ui
}
/* mat Custom reducers [end] */

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
