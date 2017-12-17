import test from 'ava'
import _ from 'lodash'
import sinon from 'sinon'
import request from 'supertest'

// use mock from jwks-rsa tests.
import { jwksEndpoint } from 'jwks-rsa/tests/mocks/jwks'
import { publicKey, privateKey } from 'jwks-rsa/tests/mocks/keys'
import { createToken } from 'jwks-rsa/tests/mocks/tokens'

import Koa from 'koa'
import api from 'src/api'

import { currentUser } from 'test/helper/user'
import loadFixtures from 'test/helper/fixtures'
import { destroy } from 'src/utils/waterline'

const sandbox = sinon.sandbox.create()

const proxyquire = require('proxyquire').noCallThru()

test.before(async (t) => {
})

test.beforeEach(async (t) => {
  await loadFixtures()

  const app = new Koa()
  // handle /api requests
  app.use(api.routes())
  app.use(api.allowedMethods())

  t.context = {
    request: request(app.listen(0))
  }
})

test.afterEach((t) => {
  sandbox.reset()
})

test.after(async () => {
  await destroy()
})

test.serial('should return 401 with No Authorization header', async (t) => {
  const {request} = t.context

  const response = await request
    .get('/api/channels')

  t.is(response.status, 401)
  t.deepEqual(response.body, {})
})

test.serial('index should return channels', async (t) => {
  const {request} = t.context

  // mock jwks
  const token = createToken(privateKey, '123', currentUser)
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .get('/api/channels')
    .set('Authorization', `Bearer ${token}`)

  t.is(response.status, 200)
  t.deepEqual(response.body.length, 3)
})

test.serial('show should return channel', async (t) => {
  const {request} = t.context

  // mock jwks
  const token = createToken(privateKey, '123', currentUser)
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .get('/api/channels/1')
    .set('Authorization', `Bearer ${token}`)

  t.is(response.status, 200)
  t.deepEqual(response.body.id, 1)
})

test.serial('post should create channel', async (t) => {
  const {request} = t.context

  // mock jwks
  const token = createToken(privateKey, '123', currentUser)
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .post('/api/channels')
    .set('Authorization', `Bearer ${token}`)
    .send({
      channel: {id: 4, name: 'Manny'}
    })

  t.is(response.status, 200)
  t.deepEqual(response.body.id, 4)
})
