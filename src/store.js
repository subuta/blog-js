import {
  createStore,
  applyMiddleware,
  compose
} from 'redux'
import thunk from 'redux-thunk'

import reducers, { reset } from './reducers'

// pass-through reset as store exports (for ease of use).
export { reset }

const isBrowser = typeof window !== 'undefined'

const middlewares = [thunk]

// return createStore
export default (initialState = {}) => {
  const store = createStore(
    reducers,
    initialState,
    compose(
      applyMiddleware(...middlewares),
      // enable redux dev-tools
      isBrowser ? window.devToolsExtension() : (f) => f
    )
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    // https://github.com/reactjs/react-redux/releases/tag/v2.0.0
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}