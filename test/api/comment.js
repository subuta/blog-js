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

test.serial('index should return comments', async (t) => {
  const {request} = t.context

  // mock jwks
  const token = createToken(privateKey, '123', currentUser)
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .get('/api/channels/1/comments')
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
    .post('/api/channels/1/comments')
    .set('Authorization', `Bearer ${token}`)
    .send({
      comment: {text: 'Hoge'}
    })

  t.is(response.status, 200)
  t.deepEqual(response.body.text, 'Hoge')
  t.deepEqual(response.body.commentedBy.id, 1)
})

test('delete should delete comment', async (t) => {
  const {request, Comment} = t.context

  let comments  = await Comment.query()
  t.deepEqual(comments.length, 2)

  // mock jwks
  const token = createToken(privateKey, '123', currentUser)
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .delete('/api/channels/1/comments/1')
    .set('Authorization', `Bearer ${token}`)

  comments = await Comment.query()
  t.deepEqual(comments.length, 1)
  t.deepEqual(comments[0].id, 2)

  t.is(response.status, 204)
  t.deepEqual(response.body, {})
})
