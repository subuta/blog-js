import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import reducers from './modules'

const isBrowser = typeof window !== 'undefined'

const middlewares = [thunk]

let devtools = (f) => f
if (isBrowser && window.devToolsExtension) {
  devtools = window.devToolsExtension()
}

// return createStore
export default (initialState = {}) => {
  const store = createStore(
    reducers,
    initialState,
    compose(
      applyMiddleware(...middlewares),
      // enable redux dev-tools
      isBrowser ? devtools : (f) => f
    )
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    // https://github.com/reactjs/react-redux/releases/tag/v2.0.0
    if (module.hot) {
      module.hot.accept('./modules', () => {
        store.replaceReducer(require('./modules').default)
      })
    }
  }

  return store
}
