import React from 'react'
import { Provider, connect } from 'react-redux'
import _ from 'lodash'
import createStore, { reset } from '../store'

const isBrowser = typeof window !== 'undefined'

const store = createStore()
let isHydrated = false

// FIXME: `<Provider> does not support changing `store` on the fly` warning from react-redux(at HMR).
// `connext` stands for `connect (to) next.js`
export default function (...args) {
  return (Component) => {
    const Connected = connect.apply(this, args)(Component)

    let render = (props) => {
      if (!isHydrated) {
        // Grab the state from a props injected by next.js
        store.dispatch(reset(props.initialState))
        isHydrated = true
      }

      return (
        <Provider store={store}>
          <Connected {...props} />
        </Provider>
      )
    }

    render.getInitialProps = async (ctx) => {
      // reset store state at getInitialProps for SSR
      if (!isBrowser) {
        store.dispatch(reset())
      }

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