import Promise from 'promise'
import Waterline from 'waterline'
import PostgresAdapter from 'sails-postgresql'
import DiskAdapter from 'sails-disk'
import env from 'src/utils/env'
import uuid from 'uuid/v4'

const host = env.POSTGRES_HOST || 'localhost'
const database = env.POSTGRES_DB || 'blog-js-development'
const username = env.POSTGRES_USER || 'postgres'
const password = env.POSTGRES_PASSWORD || 'password' // for development

let databaseUrl = env.DATABASE_URL || `postgres://${username}:${password}@${host}:5432/${database}`

let adapters = {
  'sails-postgresql': PostgresAdapter
}

let datastores = {
  default: {
    adapter: 'sails-postgresql',
    url: databaseUrl,
    pool: false,
    ssl: false
  }
}

// default setting for model.
let defaultModelSettings = {
  primaryKey: 'id',
  migrate: 'safe',
  attributes: {
    id: {
      type: 'number',
      required: true
    },

    createdAt: {
      type: 'number',
      autoCreatedAt: true
    },

    updatedAt: {
      type: 'number',
      autoUpdatedAt: true
    },
  }
}

const waterline = new Waterline()
let instance = null

// override datastore setting for parallel test
if (process.env.NODE_ENV === 'test') {
  // generate unique key for each parallel process
  const dataStoreKey = `in-memory-${uuid()}`

  // update adapter
  adapters = {
    'sails-disk': DiskAdapter
  }

  // update datastore
  defaultModelSettings['datastore'] = dataStoreKey
  datastores = {
    [dataStoreKey]: {
      adapter: 'sails-disk',
      inMemoryOnly: true
    }
  }
}

// set collection
export const loadCollection = (model) => {
  waterline.registerModel(Waterline.Collection.extend({
    ...defaultModelSettings,
    ...model,
    attributes: { // merge attributes.
      ...defaultModelSettings.attributes,
      ...model.model || {}
    }
  }))
}

// initialize waterline and get `ontology`
export const initialize = () => new Promise((resolve, reject) => {
  if (instance) return resolve(instance)

  waterline.initialize({adapters, datastores}, function (err, ontology) {
    if (err) return reject(err)
    instance = ontology
    resolve(ontology)
  })
})
