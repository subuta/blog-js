import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'

// pass-through reset from modules for ease-of-use
import makeRootReducer, { reset } from './modules'
export { reset }

const isBrowser = typeof window !== 'undefined'

const middlewares = [thunk]

// store.injectedReducers = {}

// return createStore
export default (initialState = {}) => {
  const store = createStore(
    makeRootReducer(),
    compose(
      applyMiddleware(...middlewares),
      // enable redux dev-tools
      isBrowser ? window.devToolsExtension() : (f) => f
    )
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
