import Router from 'next/router'
import _ from 'lodash'

// SEE: https://github.com/zeit/next.js/issues/2033
let listeners = {}

const EVENTS = [
  'onRouteChangeStart',
  'onRouteChangeComplete',
  'onRouteChangeError',
  'onBeforeHistoryChange'
]

_.each(EVENTS, (event) => {
  Router[event] = (...args) => _.each(listeners[event] || [], (fn) => fn.apply(null, args))
})

const createListener = (event) => (fn) => {
  if (!listeners[event]) {
    listeners[event] = []
  }
  listeners[event].push(fn)
  // return unlistener.
  return () => {
    listeners[event].splice(_.indexOf(listeners[event], fn) , 1)
  }
}

export const onRouteChangeStart = createListener('onRouteChangeStart')
export const onRouteChangeComplete = createListener('onRouteChangeComplete')
export const onRouteChangeError = createListener('onRouteChangeError')
export const onBeforeHistoryChange = createListener('onBeforeHistoryChange')
