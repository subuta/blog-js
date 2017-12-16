import test from 'ava'
import sinon from 'sinon'
import app from 'src'
import request from 'supertest'

// use mock from jwks-rsa tests.
import { jwksEndpoint } from 'jwks-rsa/tests/mocks/jwks'
import { publicKey, privateKey } from 'jwks-rsa/tests/mocks/keys'
import { createToken } from 'jwks-rsa/tests/mocks/tokens'

import { currentUser } from 'test/helper/user'

const sandbox = sinon.sandbox.create()

const proxyquire = require('proxyquire').noCallThru()

test.beforeEach(async (t) => {
  t.context = {
    request: request(app.listen(0))
  }
})

test.afterEach((t) => {
  sandbox.reset()
})

test('should true', async (t) => {
  const {request} = t.context

  const response = await request
    .get('/api')

  t.is(response.status, 404)
  t.deepEqual(response.body, {})
})
