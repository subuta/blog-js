import test from 'ava'
import _ from 'lodash'
import sinon from 'sinon'
import request from 'supertest'

// use mock from jwks-rsa tests.
import { jwksEndpoint } from 'jwks-rsa/tests/mocks/jwks'
import { publicKey, privateKey } from 'jwks-rsa/tests/mocks/keys'
import { createToken } from 'jwks-rsa/tests/mocks/tokens'

import Koa from 'koa'

import importFresh from 'import-fresh'
import { absolutePath } from '../../config'

import { currentUser } from 'test/helper/user'
import runSeed, { runMigration } from 'test/helper/fixtures'
import { destroy } from '../helper/fixtures'

const sandbox = sinon.sandbox.create()

const proxyquire = require('proxyquire')

test.beforeEach(async (t) => {
  const knex = importFresh(absolutePath('src/utils/knex')).default

  await runMigration(knex)

  const api = require('test/helper/mocked').api(knex)
  const models = require('test/helper/mocked').model(knex)

  const app = new Koa()
  // handle /api requests
  app.use(api.routes())
  app.use(api.allowedMethods())

  t.context = {
    ...models,
    knex,
    request: request(app.listen(0))
  }
})

test.afterEach(async (t) => {
  sandbox.reset()
})

test('get me should return user', async (t) => {
  const {knex, request} = t.context
  await runSeed(knex)

  // mock jwks
  const token = createToken(privateKey, '123', currentUser)
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .get('/api/users/me')
    .set('Authorization', `Bearer ${token}`)

  t.is(response.status, 200)
  t.deepEqual(response.body.id, 1)
})

test('put me should not update user if exists', async (t) => {
  const {knex, request, User} = t.context
  await runSeed(knex)

  const user = await User.query().first({auth0Id: 'google-oauth2|dummy'})

  // mock jwks
  const token = createToken(privateKey, '123', currentUser)
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .put('/api/users/me')
    .set('Authorization', `Bearer ${token}`)
    .send({
      user: {status: 'Hoge'}
    })

  t.is(response.status, 200)
  t.deepEqual(response.body.id, user.id)
  t.deepEqual(response.body.status, user.status)
})

test('put me should create user if not exists', async (t) => {
  const {knex, request, User} = t.context
  await runSeed(knex)

  let user = await User.query().findFirst({auth0Id: 'google-oauth2|another'})
  t.is(user, undefined)

  const anotherUser = {
    'iss': 'https://xxx.com/',
    'sub': 'google-oauth2|another',
    'aud': [
      'https://xxx.com/api',
      'https://xxx.auth0.com/userinfo'
    ],
    'scope': 'openid profile email'
  }

  // mock jwks
  const token = createToken(privateKey, '123', anotherUser)
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .put('/api/users/me')
    .set('Authorization', `Bearer ${token}`)
    .send({
      user: {
        status: 'Hoge',
        nickname: 'another',
        avatar: ''
      }
    })

  t.is(response.status, 200)
  t.deepEqual(response.body.status, 'Hoge')
})
