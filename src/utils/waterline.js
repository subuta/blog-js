import Promise from 'promise'
import Waterline from 'waterline'
import PostgresAdapter from 'sails-postgresql'
import InMemoryAdapter from 'sails-memory'
import env from 'src/utils/env'

import models, { DEFAULT_SETTING } from 'src/model'

const host = env.POSTGRES_HOST || 'localhost'
const database = env.POSTGRES_DB || 'blog-js-development'
const username = env.POSTGRES_USER || 'postgres'
const password = env.POSTGRES_PASSWORD || 'password' // for development

let databaseUrl = env.DATABASE_URL || `postgres://${username}:${password}@${host}:5432/${database}`

let adapters = {
  'sails-postgres': PostgresAdapter
}

let datastores = {
  'default': {
    url: databaseUrl,
    pool: false,
    ssl: false
  }
}

if (process.env.NODE_ENV === 'test') {
  adapters = {
    'sails-memory': InMemoryAdapter
  }

  datastores = {
    'default': {
      adapter: 'sails-memory'
    }
  }
}

let instance = null

// return current instance
export const getInstance = () => instance

// get model using current instance
export const getModel = (model) => Waterline.getModel(model, getInstance())

// start Waterline
export const start = () => new Promise((resolve, reject) => {
  if (getInstance()) return resolve(getInstance())

  const config = {
    adapters,
    datastores,
    models,
    defaultModelSettings: DEFAULT_SETTING
  }

  Waterline.start(config, function (err, orm) {
    if (err) return reject(err)
    instance = orm
    resolve(true)
  })
})

// stop Waterline
export const stop = () => new Promise((resolve, reject) => {
  if (!getInstance()) return resolve(true)
  Waterline.stop(getInstance(), function (err) {
    if (err) return reject(err)
    instance = null
    resolve(true)
  })
})
