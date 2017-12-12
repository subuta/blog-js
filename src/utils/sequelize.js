import Sequelize from 'sequelize'

import env from 'src/utils/env'

const host = env.POSTGRES_HOST || 'localhost'
const database = env.POSTGRES_DB || 'blog-js-development'
const username = env.POSTGRES_USER || 'postgres'
const password = env.POSTGRES_PASSWORD || 'password' // for development

const databaseUrl = env.DATABASE_URL || `postgres://${username}:${password}@${host}:5432/${database}`

export default new Sequelize(databaseUrl, {
  operatorsAliases: Sequelize.Op // https://github.com/sequelize/sequelize/issues/8417
})
