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

/* mat Custom imports [start] */
import { ids as userIds } from '../fixtures/006_user'
/* mat Custom imports [end] */

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

test('index should list channel', async (t) => {
  const {request} = t.context

  // mock jwks
  const token = createToken(privateKey, '123', currentUser)
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .get('/api/channels')
    .set('Authorization', `Bearer ${token}`)

  t.is(response.status, 200)
  t.deepEqual(response.body.length, 3)
  t.deepEqual(_.map(response.body, 'id').sort(), [17648, 76939, 93290])
})

test('show should return channel', async (t) => {
  const {request} = t.context

  // mock jwks
  const token = createToken(privateKey, '123', currentUser)
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .get('/api/channels/93290')
    .set('Authorization', `Bearer ${token}`)

  t.is(response.status, 200)

  t.deepEqual(response.body.id, 93290)
  t.deepEqual(response.body.name, 'holistic')
  t.deepEqual(response.body.description, 'Central')
})

test('post should create channel', async (t) => {
  const {request, Channel} = t.context

  // mock jwks
  const token = createToken(privateKey, '123', currentUser)
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .post('/api/channels')
    .set('Authorization', `Bearer ${token}`)
    .send({
      channel: {id: 53932, name: 'sql', description: 'digital'}
    })

  t.is(response.status, 200)

  t.deepEqual(response.body.id, 53932)
  t.deepEqual(response.body.name, 'sql')
  t.deepEqual(response.body.description, 'digital')
})

/* mat Custom tests [start] */
test('show should return channel with correct comments order', async (t) => {
  const {request, Comment, User} = t.context
  const Promise = require('bluebird')

  const adminUser = await User.query().findFirst({id: userIds.user})

  // insert 50 comment
  const comments = _.times(50, (i) => `comment ${i}`);

  // should preserve order.
  await Promise.each(comments, async (comment) => {
    await Comment.query()
      .insert({
        channelId: 93290,
        commentedById: adminUser.id,
        text: comment
      })
  })

  // mock jwks
  const token = createToken(privateKey, '123', currentUser)
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .get('/api/channels/93290')
    .set('Authorization', `Bearer ${token}`)

  t.is(response.status, 200)

  t.deepEqual(response.body.id, 93290)
  t.deepEqual(response.body.name, 'holistic')
  t.deepEqual(response.body.description, 'Central')

  // should return `latest 30 comments`
  t.deepEqual(_.map(response.body.comments, 'text'), _.reverse(_.takeRight(comments, 30)))
})
/* mat Custom tests [end] */
