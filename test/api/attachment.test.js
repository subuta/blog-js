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

test('post should create attachment', async (t) => {
  const {request} = t.context

  // mock jwks
  const token = createToken(privateKey, '123', currentUser)
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .post('/api/attachments')
    .set('Authorization', `Bearer ${token}`)
    .send({
      attachment: {
        name: 'hoge.png',
        type: 'image/png',
        url: 'http://localhost:9000/sub-labo.com/65502043-8fa4-4ef4-bd56-e001d719d21f.png'
      }
    })

  t.is(response.status, 200)
  t.truthy(response.body.id)
  t.is(response.body.name, 'hoge.png')
  t.is(response.body.type, 'image/png')
  t.is(response.body.url, 'http://localhost:9000/sub-labo.com/65502043-8fa4-4ef4-bd56-e001d719d21f.png')
})

test('sign should return signedUrl', async (t) => {
  const {request} = t.context

  // mock jwks
  const token = createToken(privateKey, '123', currentUser)
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .post('/api/attachments/sign')
    .set('Authorization', `Bearer ${token}`)
    .send({
      attachment: {
        name: 'hoge.png',
        type: 'image/png'
      }
    })

  t.is(response.status, 200)
  t.truthy(response.body.signedRequest)
  t.truthy(response.body.url)
  t.truthy(response.body.id)
})
