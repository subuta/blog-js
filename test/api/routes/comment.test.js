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
import {currentUser} from 'test/helper/user'
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

test('index should list comment', async (t) => {
  const {request} = t.context

  // mock jwks
  const token = createToken(privateKey, '123', currentUser)
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .get('/api/channels/31156/comments')
    .set('Authorization', `Bearer ${token}`)

  t.is(response.status, 200)
  t.deepEqual(response.body.length, 1)
  t.deepEqual(_.map(response.body, 'id').sort(), [54783])
})

test('post should create comment', async (t) => {
  const {request, Comment} = t.context

  // mock jwks
  const token = createToken(privateKey, '123', currentUser)
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .post('/api/channels/undefined/comments')
    .set('Authorization', `Bearer ${token}`)
    .send({
      comment: {
        id: 45801,
        text:
          'Quis alias et. Assumenda aut aut autem atque soluta accusamus reiciendis assumenda necessitatibus. Consequatur quam exercitationem sint et iste aut tempore. Possimus fugit sequi voluptatibus natus illum exercitationem voluptates.'
      }
    })

  t.is(response.status, 200)

  t.deepEqual(response.body.id, 45801)
  t.deepEqual(
    response.body.text,
    'Quis alias et. Assumenda aut aut autem atque soluta accusamus reiciendis assumenda necessitatibus. Consequatur quam exercitationem sint et iste aut tempore. Possimus fugit sequi voluptatibus natus illum exercitationem voluptates.'
  )
})

test('delete should delete comment', async (t) => {
  const {request, Comment} = t.context

  let comments = await Comment.query()
  t.deepEqual(comments.length, 3)

  // mock jwks
  const token = createToken(privateKey, '123', currentUser)
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .delete('/api/channels/31156/comments/54783')
    .set('Authorization', `Bearer ${token}`)

  comments = await Comment.query()
  t.deepEqual(comments.length, 2)

  t.is(response.status, 204)
  t.deepEqual(response.body, {})
})

/* mat Custom tests [start] */
/* mat Custom tests [end] */
