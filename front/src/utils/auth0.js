import * as Auth0 from 'auth0-js'
import Promise from 'bluebird'
import {
  ACCESS_TOKEN,
  AUTH0_EXPIRATION
} from 'src/constants/config'

export const redirectUri = `${window.location.origin}/login/cb`

export const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID
export const AUTH0_API_IDENTIFIER = process.env.AUTH0_API_IDENTIFIER
export const AUTH0_AUDIENCE = process.env.AUTH0_AUDIENCE

const storage = window.localStorage

const auth0 = new Auth0.WebAuth({
  redirectUri,
  domain: AUTH0_API_IDENTIFIER,
  audience: AUTH0_AUDIENCE,
  clientID: AUTH0_CLIENT_ID,
  responseType: 'token id_token',
  scope: 'openid profile email'
})

const authorize = () => auth0.authorize()

const parseHash = () => new Promise((resolve, reject) => {
  auth0.parseHash({hash: window.location.hash}, (err, authResult) => {
    if (err) return reject(new Error(err.errorDescription))
    return resolve(authResult)
  })
})

const setSession = ({accessToken, expiresIn}) => {
  // Set the time that the access token will expire at
  const expiresAt = JSON.stringify((expiresIn * 1000) + new Date().getTime())
  storage.setItem(ACCESS_TOKEN, accessToken)
  storage.setItem(AUTH0_EXPIRATION, expiresAt)
}

const getSession = () => {
  const accessToken = storage.getItem(ACCESS_TOKEN) || null
  const expiresAt = JSON.parse(storage.getItem(AUTH0_EXPIRATION) || null)
  return {accessToken, expiresAt}
}

const isAuthenticated = () => {
  const {expiresAt} = getSession()
  return expiresAt && (new Date().getTime() < expiresAt)
}

export default {
  authorize,
  parseHash,
  setSession,
  getSession,
  isAuthenticated
}
