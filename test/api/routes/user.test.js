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
import {currentUser, createPayload} from 'test/helper/user'
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

test('get me should return user', async (t) => {
  const {request} = t.context

  // mock jwks
  const token = createToken(privateKey, '123', currentUser)
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .get('/api/users/me')
    .set('Authorization', `Bearer ${token}`)

  t.is(response.status, 200)

  t.deepEqual(response.body.id, 92666)
  t.deepEqual(response.body.auth0Id, 'e376dc36-3072-45e7-84b0-8109641881ca')
  t.deepEqual(response.body.locale, 'vi')
  t.deepEqual(response.body.nickname, 'Tiffany.Erdman')
  t.deepEqual(response.body.status, 'turquoise revolutionize override')
  t.deepEqual(
    response.body.avatar,
    'https://s3.amazonaws.com/uifaces/faces/twitter/reetajayendra/128.jpg'
  )
})

test('put me should update user if exists', async (t) => {
  const {request, User} = t.context

  const user = await User.query().findOne({
    auth0Id: 'e376dc36-3072-45e7-84b0-8109641881ca'
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
        id: 92666,
        auth0Id: 'e376dc36-3072-45e7-84b0-8109641881ca',
        locale: 'es',
        nickname: 'Georgette84',
        status: 'card copying',
        avatar:
          'https://s3.amazonaws.com/uifaces/faces/twitter/reabo101/128.jpg'
      }
    })

  t.is(response.status, 200)

  t.deepEqual(response.body.id, 92666)
  t.deepEqual(response.body.auth0Id, 'e376dc36-3072-45e7-84b0-8109641881ca')
  t.deepEqual(response.body.locale, 'es')
  t.deepEqual(response.body.nickname, 'Georgette84')
  t.deepEqual(response.body.status, 'card copying')
  t.deepEqual(
    response.body.avatar,
    'https://s3.amazonaws.com/uifaces/faces/twitter/reabo101/128.jpg'
  )
})

test('put me should create user if not exists', async (t) => {
  const {request, User} = t.context

  const user = await User.query().findOne({
    auth0Id: '6b4d5350-a44a-467c-ae9d-5738e1efbaf2'
  })
  t.is(user, undefined)

  // mock jwks
  const token = createToken(
    privateKey,
    '123',
    createPayload('6b4d5350-a44a-467c-ae9d-5738e1efbaf2')
  )
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .put('/api/users/me')
    .set('Authorization', `Bearer ${token}`)
    .send({
      user: {
        id: 38169,
        auth0Id: '6b4d5350-a44a-467c-ae9d-5738e1efbaf2',
        locale: 'es',
        nickname: 'Georgette84',
        status: 'card copying',
        avatar:
          'https://s3.amazonaws.com/uifaces/faces/twitter/reabo101/128.jpg'
      }
    })

  t.is(response.status, 200)

  // should ignore invalid id param
  t.not(response.body.id, 38169)

  // other props should persisted.
  t.deepEqual(response.body.auth0Id, '6b4d5350-a44a-467c-ae9d-5738e1efbaf2')
  t.deepEqual(response.body.locale, 'es')
  t.deepEqual(response.body.nickname, 'Georgette84')
  t.deepEqual(response.body.status, 'card copying')
  t.deepEqual(
    response.body.avatar,
    'https://s3.amazonaws.com/uifaces/faces/twitter/reabo101/128.jpg'
  )
})
