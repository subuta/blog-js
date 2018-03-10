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

  t.deepEqual(response.body.id, 54551)
  t.deepEqual(response.body.auth0Id, '4be76d72-37c6-4af4-9b6d-5cf3cb62d63a')
  t.deepEqual(response.body.locale, 'en_au_ocker')
  t.deepEqual(response.body.nickname, 'Juana5')
  t.deepEqual(response.body.status, 'New Israeli Sheqel')
  t.deepEqual(
    response.body.avatar,
    'https://s3.amazonaws.com/uifaces/faces/twitter/devankoshal/128.jpg'
  )
})

test('put me should update user if exists', async (t) => {
  const {request, User} = t.context

  const user = await User.query().findOne({
    auth0Id: '4be76d72-37c6-4af4-9b6d-5cf3cb62d63a'
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
        id: 54551,
        auth0Id: '4be76d72-37c6-4af4-9b6d-5cf3cb62d63a',
        locale: 'en_CA',
        nickname: 'Matteo.Hills50',
        status: 'Chair Soap',
        avatar:
          'https://s3.amazonaws.com/uifaces/faces/twitter/billyroshan/128.jpg'
      }
    })

  t.is(response.status, 200)

  t.deepEqual(response.body.id, 54551)
  t.deepEqual(response.body.auth0Id, '4be76d72-37c6-4af4-9b6d-5cf3cb62d63a')
  t.deepEqual(response.body.locale, 'en_CA')
  t.deepEqual(response.body.nickname, 'Matteo.Hills50')
  t.deepEqual(response.body.status, 'Chair Soap')
  t.deepEqual(
    response.body.avatar,
    'https://s3.amazonaws.com/uifaces/faces/twitter/billyroshan/128.jpg'
  )
})

test('put me should create user if not exists', async (t) => {
  const {request, User} = t.context

  const user = await User.query().findOne({
    auth0Id: '8a7a4d7c-d980-462d-9986-fb2f25daee50'
  })
  t.is(user, undefined)

  // mock jwks
  const token = createToken(
    privateKey,
    '123',
    createPayload('8a7a4d7c-d980-462d-9986-fb2f25daee50')
  )
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .put('/api/users/me')
    .set('Authorization', `Bearer ${token}`)
    .send({
      user: {
        id: 20643,
        auth0Id: '8a7a4d7c-d980-462d-9986-fb2f25daee50',
        locale: 'en_CA',
        nickname: 'Matteo.Hills50',
        status: 'Chair Soap',
        avatar:
          'https://s3.amazonaws.com/uifaces/faces/twitter/billyroshan/128.jpg'
      }
    })

  t.is(response.status, 200)

  // should ignore invalid id param
  t.not(response.body.id, 20643)

  // other props should persisted.
  t.deepEqual(response.body.auth0Id, '8a7a4d7c-d980-462d-9986-fb2f25daee50')
  t.deepEqual(response.body.locale, 'en_CA')
  t.deepEqual(response.body.nickname, 'Matteo.Hills50')
  t.deepEqual(response.body.status, 'Chair Soap')
  t.deepEqual(
    response.body.avatar,
    'https://s3.amazonaws.com/uifaces/faces/twitter/billyroshan/128.jpg'
  )
})
