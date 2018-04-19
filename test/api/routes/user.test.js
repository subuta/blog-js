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

  t.deepEqual(response.body.id, 75900)
  t.deepEqual(response.body.locale, 'sk')
  t.deepEqual(response.body.nickname, 'Ransom_Harris')
  t.deepEqual(response.body.status, 'Avon')
  t.deepEqual(response.body.isAdmin, true)
  t.deepEqual(
    response.body.avatar,
    'https://s3.amazonaws.com/uifaces/faces/twitter/robbschiller/128.jpg'
  )
})

test('put me should update user if exists', async (t) => {
  const {request, User} = t.context

  const user = await User.query().findOne({
    auth0Id: 'e57308da-b81c-4e24-af84-6b963ccb8375'
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
        id: 75900,
        auth0Id: 'e57308da-b81c-4e24-af84-6b963ccb8375',
        locale: 'az',
        nickname: 'Loren27',
        status: 'UAE Dirham Wyoming Berkshire',
        isAdmin: false,
        avatar:
          'https://s3.amazonaws.com/uifaces/faces/twitter/miguelmendes/128.jpg'
      }
    })

  t.is(response.status, 200)

  t.deepEqual(response.body.id, 75900)
  t.deepEqual(response.body.locale, 'az')
  t.deepEqual(response.body.nickname, 'Loren27')
  t.deepEqual(response.body.status, 'UAE Dirham Wyoming Berkshire')
  t.deepEqual(response.body.isAdmin, false)
  t.deepEqual(
    response.body.avatar,
    'https://s3.amazonaws.com/uifaces/faces/twitter/miguelmendes/128.jpg'
  )
})

test('put me should create user if not exists', async (t) => {
  const {request, User} = t.context

  const user = await User.query().findOne({
    auth0Id: '0a4a4c5f-eb77-4819-8da8-6e5b8bdd06f9'
  })
  t.is(user, undefined)

  // mock jwks
  const token = createToken(
    privateKey,
    '123',
    createPayload('0a4a4c5f-eb77-4819-8da8-6e5b8bdd06f9')
  )
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .put('/api/users/me')
    .set('Authorization', `Bearer ${token}`)
    .send({
      user: {
        id: 40843,
        auth0Id: '0a4a4c5f-eb77-4819-8da8-6e5b8bdd06f9',
        locale: 'az',
        nickname: 'Loren27',
        status: 'UAE Dirham Wyoming Berkshire',
        isAdmin: false,
        avatar:
          'https://s3.amazonaws.com/uifaces/faces/twitter/miguelmendes/128.jpg'
      }
    })

  t.is(response.status, 200)

  // should ignore invalid id param
  t.not(response.body.id, 40843)

  // other props should persisted.
  t.deepEqual(response.body.locale, 'az')
  t.deepEqual(response.body.nickname, 'Loren27')
  t.deepEqual(response.body.status, 'UAE Dirham Wyoming Berkshire')
  t.deepEqual(response.body.isAdmin, false)
  t.deepEqual(
    response.body.avatar,
    'https://s3.amazonaws.com/uifaces/faces/twitter/miguelmendes/128.jpg'
  )
})
