import React from 'react'
import { Provider, connect } from 'react-redux'
import _ from 'lodash'
import createStore from 'src/views/store'
import { inject, extract } from 'src/views/utils/next'

const isBrowser = typeof window !== 'undefined'
const STORE_KEY = '__CONNEXT_STORE__'

const fetchStore = (initialState = undefined, ctx = {}) => {
  // If server
  if (!isBrowser) {
    if (!extract(ctx, 'store')) {
      inject(ctx, 'store', createStore(initialState))
    }
    return extract(ctx, 'store')
  }

  // Otherwise(browser)
  if (!window[STORE_KEY]) {
    window[STORE_KEY] = createStore(initialState)
  }

  return window[STORE_KEY]
}

// FIXME: `<Provider> does not support changing `store` on the fly` warning from react-redux(at HMR).
// `connext` stands for `connect (to) next.js`
export default function (...args) {
  return (Component) => {
    const Connected = connect.apply(this, args)(Component)

    let render = (props) => {
      return (
        <Provider store={fetchStore(props.initialState, {})}>
          <Connected {...props} />
        </Provider>
      )
    }

    render.getInitialProps = async (ctx) => {
      const store = fetchStore(undefined, ctx)

      const fn = Component.getInitialProps || _.noop

      // inject redux methods to ctx
      ctx.getState = store.getState
      ctx.dispatch = store.dispatch

      const props = await fn(ctx)

      const initialState = store.getState()

      // return final props.
      return {
        ...props,
        initialState
      }
    }

    return render
  }
}
