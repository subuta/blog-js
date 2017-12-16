import Sequelize from 'sequelize'
import _ from 'lodash'

import env from 'src/utils/env'

const host = env.POSTGRES_HOST || 'localhost'
const database = env.POSTGRES_DB || 'blog-js-development'
const username = env.POSTGRES_USER || 'postgres'
const password = env.POSTGRES_PASSWORD || 'password' // for development

let databaseUrl = env.DATABASE_URL || `postgres://${username}:${password}@${host}:5432/${database}`

if (process.env.NODE_ENV === 'test') {
  databaseUrl = `sqlite://test.sqlite`
}

export const fixSchema = (schema) => {
  // https://github.com/sequelize/sequelize/issues/3810
  // Workaround for sqlite autoIncrement issue.
  if (process.env.NODE_ENV === 'test') {
    schema = _.set(schema, 'id.autoIncrement', false)
  }
  return schema
}

export default new Sequelize(databaseUrl, {
  operatorsAliases: Sequelize.Op // https://github.com/sequelize/sequelize/issues/8417
})
