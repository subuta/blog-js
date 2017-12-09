import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import history from 'src/utils/history'
import { routerMiddleware } from 'react-router-redux'
import makeRootReducer from './modules'

const middlewares = [thunk, routerMiddleware(history)]

const store = createStore(
  makeRootReducer(),
  compose(
    applyMiddleware(...middlewares),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

store.injectedReducers = {};

if (module.hot) {
  module.hot.accept('./modules', () => {
    const makeRootReducer = require('./modules').default
    store.replaceReducer(makeRootReducer(store.injectedReducers))
  })
}

export default store
