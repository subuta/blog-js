import Sequelize from 'sequelize'

const host = process.env.POSTGRES_HOST || 'localhost'
const database = process.env.POSTGRES_DB || 'blog-js-development'
const username = process.env.POSTGRES_USER || 'postgres'
const password = process.env.POSTGRES_PASSWORD || 'password' // for development

const databaseUrl = process.env.DATABASE_URL || `postgres://${username}:${password}@${host}:5432/${database}`

export default new Sequelize(databaseUrl, {
  operatorsAliases: Sequelize.Op // https://github.com/sequelize/sequelize/issues/8417
})
