import { absolutePath } from '../../config'

const proxyquire = require('proxyquire')

// allow inject knex instance via proxyquire
export default (knex) => {
  const model = proxyquire(absolutePath('src/model'), {
    'src/utils/knex': knex
  }).default

  const middleware = proxyquire(absolutePath('src/api/middlewares/models'), {
    'src/model': model
  }).default

  return proxyquire(absolutePath('src/api'), {
    './middleware/models': middleware
  }).default
}
