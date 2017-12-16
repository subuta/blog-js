require('babel-register')

const env = require('./src/utils/env')
const { SOURCE_DIR } = require('./config')

const host = env.POSTGRES_HOST || 'localhost'
const database = env.POSTGRES_DB || 'blog-js-development'
const username = env.POSTGRES_USER || 'postgres'
const password = env.POSTGRES_PASSWORD || 'password' // for development

let databaseUrl = env.DATABASE_URL || `postgres://${username}:${password}@${host}:5432/${database}`

const opts = {
  client: 'pg',
  connection: databaseUrl,
  debug: true,
  migrations: {
    directory: `${SOURCE_DIR}/migrations`
  },

  seeds: {
    directory: `${SOURCE_DIR}/seeds`
  }
}

module.exports = {
  development: opts,
  production: opts,
  test: opts
}
