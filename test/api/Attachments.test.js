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
import runSeed, { runMigration, destroy } from 'test/helper/fixtures'

const sandbox = sinon.sandbox.create()

const proxyquire = require('proxyquire')

test.beforeEach(async (t) => {
  const knex = importFresh(absolutePath('src/utils/knex')).default

  await runMigration(knex)

  const api = require('test/helper/mocked').api(knex)

  const app = new Koa()
  // handle /api requests
  app.use(api.routes())
  app.use(api.allowedMethods())

  t.context = {
    knex,
    request: request(app.listen(0))
  }
})

test.afterEach(async (t) => {
  sandbox.reset()
})

test('post should create attachment', async (t) => {
  const {knex, request} = t.context
  await runSeed(knex)

  // mock jwks
  const token = createToken(privateKey, '123', currentUser)
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .post('/api/attachments')
    .set('Authorization', `Bearer ${token}`)
    .send({
      attachment: {
        name: 'hoge.png',
        type: 'image/png'
      }
    })

  t.is(response.status, 200)
  t.truthy(response.body.result.signedRequest, 4)
  t.truthy(response.body.result.url, 4)
  t.truthy(response.body.attachment.id)
  t.is(response.body.attachment.name, 'hoge.png')
  t.is(response.body.attachment.type, 'image/png')
})
