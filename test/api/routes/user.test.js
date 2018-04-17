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

  t.deepEqual(response.body.id, 65979)
  t.deepEqual(response.body.locale, 'de_CH')
  t.deepEqual(response.body.nickname, 'Marilyne.Ward')
  t.deepEqual(response.body.status, 'e-services')
  t.deepEqual(
    response.body.avatar,
    'https://s3.amazonaws.com/uifaces/faces/twitter/manekenthe/128.jpg'
  )
})

test('put me should update user if exists', async (t) => {
  const {request, User} = t.context

  const user = await User.query().findOne({
    auth0Id: 'a699f07d-803c-4ede-8625-156c632fa035'
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
        id: 65979,
        auth0Id: 'a699f07d-803c-4ede-8625-156c632fa035',
        locale: 'sk',
        nickname: 'Kirsten_OConnell34',
        status: 'Tactics',
        avatar:
          'https://s3.amazonaws.com/uifaces/faces/twitter/josevnclch/128.jpg'
      }
    })

  t.is(response.status, 200)

  t.deepEqual(response.body.id, 65979)
  t.deepEqual(response.body.locale, 'sk')
  t.deepEqual(response.body.nickname, 'Kirsten_OConnell34')
  t.deepEqual(response.body.status, 'Tactics')
  t.deepEqual(
    response.body.avatar,
    'https://s3.amazonaws.com/uifaces/faces/twitter/josevnclch/128.jpg'
  )
})

test('put me should create user if not exists', async (t) => {
  const {request, User} = t.context

  const user = await User.query().findOne({
    auth0Id: 'd2216917-901c-4732-9610-3e6a8a474c82'
  })
  t.is(user, undefined)

  // mock jwks
  const token = createToken(
    privateKey,
    '123',
    createPayload('d2216917-901c-4732-9610-3e6a8a474c82')
  )
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .put('/api/users/me')
    .set('Authorization', `Bearer ${token}`)
    .send({
      user: {
        id: 66697,
        auth0Id: 'd2216917-901c-4732-9610-3e6a8a474c82',
        locale: 'sk',
        nickname: 'Kirsten_OConnell34',
        status: 'Tactics',
        avatar:
          'https://s3.amazonaws.com/uifaces/faces/twitter/josevnclch/128.jpg'
      }
    })

  t.is(response.status, 200)

  // should ignore invalid id param
  t.not(response.body.id, 66697)

  // other props should persisted.
  t.deepEqual(response.body.locale, 'sk')
  t.deepEqual(response.body.nickname, 'Kirsten_OConnell34')
  t.deepEqual(response.body.status, 'Tactics')
  t.deepEqual(
    response.body.avatar,
    'https://s3.amazonaws.com/uifaces/faces/twitter/josevnclch/128.jpg'
  )
})
