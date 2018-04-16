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

test('get me should return user', async (t) => {
  const {request} = t.context

  // mock jwks
  const token = createToken(privateKey, '123', currentUser)
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .get('/api/users/me')
    .set('Authorization', `Bearer ${token}`)

  t.is(response.status, 200)

  t.deepEqual(response.body.id, 83)
  t.deepEqual(response.body.auth0Id, '3b0b2519-d80d-430a-8688-9cc37b09c36b')
  t.deepEqual(response.body.locale, 'pt_BR')
  t.deepEqual(response.body.nickname, 'Frida37')
  t.deepEqual(response.body.status, 'clicks-and-mortar')
  t.deepEqual(
    response.body.avatar,
    'https://s3.amazonaws.com/uifaces/faces/twitter/rob_thomas10/128.jpg'
  )
})

test('put me should update user if exists', async (t) => {
  const {request, User} = t.context

  const user = await User.query().findOne({
    auth0Id: '3b0b2519-d80d-430a-8688-9cc37b09c36b'
  })
  t.not(user, undefined)

  // mock jwks
  const token = createToken(privateKey, '123', createPayload(user.auth0Id))
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .put('/api/users/me')
    .set('Authorization', `Bearer ${token}`)
    .send({
      user: {
        id: 83,
        auth0Id: '3b0b2519-d80d-430a-8688-9cc37b09c36b',
        locale: 'fa',
        nickname: 'Murphy.Kunze31',
        status: 'Metal',
        avatar:
          'https://s3.amazonaws.com/uifaces/faces/twitter/coreyginnivan/128.jpg'
      }
    })

  t.is(response.status, 200)

  t.deepEqual(response.body.id, 83)
  t.deepEqual(response.body.auth0Id, '3b0b2519-d80d-430a-8688-9cc37b09c36b')
  t.deepEqual(response.body.locale, 'fa')
  t.deepEqual(response.body.nickname, 'Murphy.Kunze31')
  t.deepEqual(response.body.status, 'Metal')
  t.deepEqual(
    response.body.avatar,
    'https://s3.amazonaws.com/uifaces/faces/twitter/coreyginnivan/128.jpg'
  )
})

test('put me should create user if not exists', async (t) => {
  const {request, User} = t.context

  const user = await User.query().findOne({
    auth0Id: '0f2e7bf5-369b-473a-9d2d-c2ac5d61cad9'
  })
  t.is(user, undefined)

  // mock jwks
  const token = createToken(
    privateKey,
    '123',
    createPayload('0f2e7bf5-369b-473a-9d2d-c2ac5d61cad9')
  )
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .put('/api/users/me')
    .set('Authorization', `Bearer ${token}`)
    .send({
      user: {
        id: 90598,
        auth0Id: '0f2e7bf5-369b-473a-9d2d-c2ac5d61cad9',
        locale: 'fa',
        nickname: 'Murphy.Kunze31',
        status: 'Metal',
        avatar:
          'https://s3.amazonaws.com/uifaces/faces/twitter/coreyginnivan/128.jpg'
      }
    })

  t.is(response.status, 200)

  // should ignore invalid id param
  t.not(response.body.id, 90598)

  // other props should persisted.
  t.deepEqual(response.body.auth0Id, '0f2e7bf5-369b-473a-9d2d-c2ac5d61cad9')
  t.deepEqual(response.body.locale, 'fa')
  t.deepEqual(response.body.nickname, 'Murphy.Kunze31')
  t.deepEqual(response.body.status, 'Metal')
  t.deepEqual(
    response.body.avatar,
    'https://s3.amazonaws.com/uifaces/faces/twitter/coreyginnivan/128.jpg'
  )
})
