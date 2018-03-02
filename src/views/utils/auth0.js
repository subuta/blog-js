import Promise from 'bluebird'
import cookie from 'cookie'
import Cookie from 'js-cookie'
import _ from 'lodash'

import { ACCESS_TOKEN, AUTH0_EXPIRATION } from 'src/views/constants/config'

const isBrowser = typeof window !== 'undefined'
const origin = isBrowser ? window.location.origin : 'http://127.0.0.1'

export const redirectUri = `${origin}/auth/cb`

export const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID
export const AUTH0_API_IDENTIFIER = process.env.AUTH0_API_IDENTIFIER
export const AUTH0_AUDIENCE = process.env.AUTH0_AUDIENCE

const getAuth0Promise = (async function () {
  // skip while testing.
  if (process.env.NODE_ENV === 'test') return
  if (!isBrowser) return

  const Auth0 = await import('auth0-js')
  return new Auth0.WebAuth({
    redirectUri,
    domain: AUTH0_API_IDENTIFIER,
    audience: AUTH0_AUDIENCE,
    clientID: AUTH0_CLIENT_ID,
    responseType: 'token id_token',
    scope: 'openid profile email'
  })
})()

const authorize = async () => {
  const auth0 = await getAuth0Promise
  return auth0 && auth0.authorize()
}

// from https://github.com/zeit/next.js/blob/canary/examples/with-apollo-auth/lib/withData.js
const parseCookies = (ctx, options = {}) => {
  const cookieHeader = _.get(ctx, 'req.headers.cookie', '')
  return cookie.parse(isBrowser ? document.cookie : cookieHeader, options)
}

const parseHash = () =>
  new Promise(async (resolve, reject) => {
    const auth0 = await getAuth0Promise
    auth0 && auth0.parseHash({hash: window.location.hash}, (err, authResult) => {
      if (err) return reject(new Error(err.errorDescription))
      return resolve(authResult)
    })
  })

const setSession = ({accessToken, expiresIn}) => {
  // Set the time that the access token will expire at
  const expiresAt = JSON.stringify(expiresIn * 1000 + new Date().getTime())
  Cookie.set(ACCESS_TOKEN, accessToken)
  Cookie.set(AUTH0_EXPIRATION, expiresAt)
}

// called from both environment(server & browser)
const getSession = (ctx = null) => {
  const cookie = parseCookies(ctx)
  const accessToken = cookie[ACCESS_TOKEN] || null
  const expiresAt = JSON.parse(cookie[AUTH0_EXPIRATION] || null)
  return {accessToken, expiresAt}
}

const isAuthenticated = (ctx = null) => {
  const {expiresAt} = getSession(ctx)
  return expiresAt && new Date().getTime() < expiresAt || false
}

export default {
  authorize,
  parseHash,
  setSession,
  getSession,
  isAuthenticated
}
