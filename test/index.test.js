import test from 'ava'
import sinon from 'sinon'
import app from 'src'
import request from 'supertest'
import { Channel } from 'src/model'

// use mock from jwks-rsa tests.
import { jwksEndpoint } from 'jwks-rsa/tests/mocks/jwks'
import { publicKey, privateKey } from 'jwks-rsa/tests/mocks/keys'
import { createToken } from 'jwks-rsa/tests/mocks/tokens'

import { currentUser } from 'test/helper/user'
import runSeed, { runMigration } from 'test/helper/fixtures'

const sandbox = sinon.sandbox.create()

const proxyquire = require('proxyquire').noCallThru()

test.before(async () => {
  await runMigration()
})

test.beforeEach(async (t) => {
  await runSeed()
  t.context = {
    request: request(app.listen(0))
  }
})

test.afterEach((t) => {
  sandbox.reset()
})

test('should return 401 with No Authorization header', async (t) => {
  const {request} = t.context

  const response = await request
    .get('/api/channels')

  t.is(response.status, 401)
  t.deepEqual(response.body, {})
})

test('index should return channels', async (t) => {
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
