import test from 'ava'
import _ from 'lodash'
import sinon from 'sinon'
import request from 'supertest'
import {jwksEndpoint} from 'jwks-rsa/tests/mocks/jwks'
import {publicKey, privateKey} from 'jwks-rsa/tests/mocks/keys'
import {createToken} from 'jwks-rsa/tests/mocks/tokens'
import Koa from 'koa'
import importFresh from 'import-fresh'
import {absolutePath} from '../../config'
import {currentUser} from 'test/helper/user'
import runSeed, {runMigration} from 'test/helper/fixtures'
import proxyquire from 'proxyquire'

const sandbox = sinon.sandbox.create()

test.beforeEach(async (t) => {
  const knex = importFresh(absolutePath('src/utils/knex')).default

  await runMigration(knex)
  await runSeed(knex)

  const api = require('test/helper/mocked').api(knex)
  const models = require('test/helper/mocked').model(knex)

  const app = new Koa()
  // handle /api requests
  app.use(api.routes())
  app.use(api.allowedMethods())

  t.context = {
    ...models,
    request: request(app.listen(0))
  }
})

test.afterEach((t) => {
  sandbox.reset()
})

test('index should list tag', async (t) => {
  const {request} = t.context

  // mock jwks
  const token = createToken(privateKey, '123', currentUser)
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .get('/api/tags')
    .set('Authorization', `Bearer ${token}`)

  t.is(response.status, 200)
  t.deepEqual(response.body.length, 3)
  t.deepEqual(_.map(response.body, 'id').sort(), [10295, 89794, 91264])
})

/* mat Custom tests [start] */
/* mat Custom tests [end] */
