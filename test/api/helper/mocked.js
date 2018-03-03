import proxyquire from 'proxyquire'
import {absolutePath} from '../../../config'

// knex injected modules.

export const model = (knex) => {
  return proxyquire(absolutePath('src/model'), {
    'src/api/utils/knex': knex
  }).default
}

export const api = (knex) => {
  const middleware = proxyquire(absolutePath('src/api/middlewares/models'), {
    'src/api/model': model(knex)
  }).default

  return proxyquire(absolutePath('src/api/routes'), {
    'src/api/middleware/models': middleware
  }).default
}
