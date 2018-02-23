import proxyquire from 'proxyquire'
import {absolutePath} from '../../config'

// knex injected modules.

export const model = (knex) => {
  return proxyquire(absolutePath('src/model'), {
    'src/utils/knex': knex
  }).default
}

export const api = (knex) => {
  const middleware = proxyquire(absolutePath('src/api/middlewares/models'), {
    'src/model': model(knex)
  }).default

  return proxyquire(absolutePath('src/api'), {
    './middleware/models': middleware
  }).default
}
