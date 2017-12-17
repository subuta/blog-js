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

const sandbox = sinon.sandbox.create()

const proxyquire = require('proxyquire')

test.beforeEach(async (t) => {
  const knex = importFresh(absolutePath('src/utils/knex')).default

  await runMigration(knex)
  await runSeed(knex)

  const api = require('test/helper/mocked').api(knex)

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

test.serial('index should return comments', async (t) => {
  const {request} = t.context

  // mock jwks
  const token = createToken(privateKey, '123', currentUser)
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .get('/api/comments')
    .set('Authorization', `Bearer ${token}`)

  t.is(response.status, 200)
  t.deepEqual(response.body.length, 2)
  t.deepEqual(response.body[1].attachment.id, 'xxxx-xxxx-xxxx-xxxx')
})

test('post should create comment', async (t) => {
  const {request} = t.context

  // mock jwks
  const token = createToken(privateKey, '123', currentUser)
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .post('/api/comments')
    .set('Authorization', `Bearer ${token}`)
    .send({
      comment: {text: 'Hoge'}
    })

  t.is(response.status, 200)
  t.deepEqual(response.body.text, 'Hoge')
  t.deepEqual(response.body.commentedBy.id, 1)
})
