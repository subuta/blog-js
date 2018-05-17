import _ from 'lodash'

const isBrowser = typeof window !== 'undefined'
const head = isBrowser ? document.head : null
const body = isBrowser ? document.body : null
const dataBlogJs = 'data-blog-js'

// SEE: https://github.com/nefe/You-Dont-Need-jQuery#1.6
const closest = (el, selector) => {
  const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector

  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el
    } else {
      el = el.parentElement
    }
  }
  return null
}

// findInput from anchorNode
const findInput = (node) => {
  if (node.tagName && node.tagName.toLowerCase() === 'textarea') return node
  if (node.tagName && node.tagName.toLowerCase() === 'input') return node
  return closest(node, '[contenteditable="true"], input, textarea')
}

// bind event to nearest node.
export const bindOnClosestInput = (node, event, fn) => {
  // skip at SSR
  if (!isBrowser) return _.noop

  const input = findInput(node)
  if (!input) return _.noop
  input.addEventListener(event, fn)
  return () => input.removeEventListener(event, fn)
}

export const appendPortalNode = (portalClass) => {
  // skip at SSR
  if (!isBrowser) return

  // portal node to render
  if (!document.querySelector(`.${portalClass}`)) {
    let portal = document.createElement('div')
    portal.className = portalClass
    portal.style.cssText = 'z-index: 1;'
    body.appendChild(portal)
  }

  return document.querySelector(`.${portalClass}`)
}

export const removePortalNode = (portalClass) => {
  // skip at SSR
  if (!isBrowser) return
  if (!document.querySelector(`.${portalClass}`)) return

  return body.removeChild(document.querySelector(`.${portalClass}`));
}

// return style node.
export const findOrInsertScriptNode = (url, cb = _.noop) => {
  // skip at SSR
  if (!isBrowser) return

  if (!head.querySelector(`script[${dataBlogJs}="true"][src="${url}"]`)) {
    const scriptElement = document.createElement('script')
    scriptElement.setAttribute('async', 'true')
    scriptElement.setAttribute('src', url)
    scriptElement.setAttribute(dataBlogJs, 'true')
    // Do callback onload.
    scriptElement.onload = (url) => cb(url)
    head.appendChild(scriptElement)
  } else {
    cb(url)
  }

  return head.querySelector(`script[${dataBlogJs}="true"][src="${url}"]`)
}
