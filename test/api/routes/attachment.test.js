import test from 'ava'
import _ from 'lodash'
import sinon from 'sinon'
import request from 'supertest'
import {jwksEndpoint} from 'jwks-rsa/tests/mocks/jwks'
import {publicKey, privateKey} from 'jwks-rsa/tests/mocks/keys'
import {createToken} from 'jwks-rsa/tests/mocks/tokens'
import Koa from 'koa'
import importFresh from 'import-fresh'
import {absolutePath} from '../../../config'
import {currentUser, createPayload} from 'test/api/helper/user'
import runSeed, {runMigration} from 'test/api/helper/fixtures'
import proxyquire from 'proxyquire'



const sandbox = sinon.sandbox.create()

test.beforeEach(async (t) => {
  const knex = importFresh(absolutePath('src/api/utils/knex')).default

  await runMigration(knex)
  await runSeed(knex)

  const api = require('test/api/helper/mocked').api(knex)
  const models = require('test/api/helper/mocked').model(knex)

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

test('post should create attachment', async (t) => {
  const {request, Attachment} = t.context

  // mock jwks
  const token = createToken(privateKey, '123', currentUser)
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .post('/api/attachments')
    .set('Authorization', `Bearer ${token}`)
    .send({
      attachment: {
        id: '52de2f81-2dc8-4f0a-9bfc-93aec9461bd7',
        name: 'bottom-line Metal',
        type: 'input Way',
        imageUrl: 'http://lorempixel.com/640/480/transport'
      }
    })

  t.is(response.status, 200)

  t.deepEqual(response.body.id, '52de2f81-2dc8-4f0a-9bfc-93aec9461bd7')
  t.deepEqual(response.body.name, 'bottom-line Metal')
  t.deepEqual(response.body.type, 'input Way')
  t.deepEqual(response.body.imageUrl, 'http://lorempixel.com/640/480/transport')
})

/* mat Custom tests [start] */
test('sign should return signedUrl', async (t) => {
  const {request} = t.context

  // mock jwks
  const token = createToken(privateKey, '123', currentUser)
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .post('/api/attachments/sign')
    .set('Authorization', `Bearer ${token}`)
    .send({
      attachment: {
        name: 'hoge.png',
        type: 'image/png'
      }
    })

  t.is(response.status, 200)
  t.truthy(response.body.signedRequest)
  t.truthy(response.body.url)
  t.truthy(response.body.id)
})
/* mat Custom tests [end] */
