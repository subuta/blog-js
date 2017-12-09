import * as auth0 from 'auth0-js'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import store from './store'
import Routes from './components/Routes'
import { wrap } from 'src/utils/style'

import './style'

let App = () => {
  return (
    <div>
      <Provider store={store}>
        {Routes}
      </Provider>
    </div>
  )
}

// styleを注入する。
App = wrap(App)

let render = () => {
  const appNode = document.getElementById('app')
  ReactDOM.render(<App />, appNode)
}

// Native
// Check if the DOMContentLoaded has already been completed
if (document.readyState === 'complete' || document.readyState !== 'loading') {
  render()
} else {
  document.addEventListener('DOMContentLoaded', render)
}

// make browserify-hmr work.
if (module.hot) {
  module.hot.accept()
}
