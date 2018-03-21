import getConfig from 'next/config'

const config = getConfig()
const {
  staticFolder
} = config.publicRuntimeConfig

export const ACCESS_TOKEN = 'ACCESS_TOKEN'
export const AUTH0_EXPIRATION = 'AUTH0_EXPIRATION'

// export next/config directly from module
export {
  staticFolder
}
