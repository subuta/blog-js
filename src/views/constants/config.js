import getConfig from 'next/config'
import _ from 'lodash'

const config = getConfig()
const {
  staticFolder = '/static',
  baseUrl,
  fbAppId,
  twitterSite
} = _.get(config, 'publicRuntimeConfig', {})

export const ACCESS_TOKEN = 'ACCESS_TOKEN'
export const AUTH0_EXPIRATION = 'AUTH0_EXPIRATION'

// export next/config directly from module
export {
  staticFolder,
  baseUrl,
  fbAppId,
  twitterSite
}
