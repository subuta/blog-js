import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'

import makeRootReducer from './modules'

const isBrowser = typeof window !== 'undefined'

const middlewares = [thunk]

let devtools = (f) => f
if (isBrowser && window.devToolsExtension) {
  devtools = window.devToolsExtension()
}

// store.injectedReducers = {}

// return createStore
export default (initialState = {}) => {
  const store = createStore(
    makeRootReducer(),
    initialState,
    compose(
      applyMiddleware(...middlewares),
      // enable redux dev-tools
      isBrowser ? devtools : (f) => f
    ),
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    // https://github.com/reactjs/react-redux/releases/tag/v2.0.0
    if (module.hot) {
      module.hot.accept('./modules', () => {
        const makeRootReducer = require('./modules').default
        store.replaceReducer(makeRootReducer({}))
        // store.replaceReducer(makeRootReducer(store.injectedReducers))
      })
    }
  }

  return store
}
