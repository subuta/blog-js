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
import {currentUser} from 'test/api/helper/user'
import runSeed, {runMigration} from 'test/api/helper/fixtures'
import proxyquire from 'proxyquire'

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

test('index should list article', async (t) => {
  const {request} = t.context

  // mock jwks
  const token = createToken(privateKey, '123', currentUser)
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .get('/api/articles')
    .set('Authorization', `Bearer ${token}`)

  t.is(response.status, 200)
  t.deepEqual(response.body.length, 3)
  t.deepEqual(_.map(response.body, 'id').sort(), [14780, 36084, 6898])
})

test('show should return article', async (t) => {
  const {request} = t.context

  // mock jwks
  const token = createToken(privateKey, '123', currentUser)
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .get('/api/articles/36084')
    .set('Authorization', `Bearer ${token}`)

  t.is(response.status, 200)

  t.deepEqual(response.body.id, 36084)
  t.deepEqual(response.body.title, 'Pound Sterling User-centric')
  t.deepEqual(
    response.body.content,
    'Enim aliquam hic aut porro quisquam repudiandae nemo. Fugiat placeat unde. Et assumenda alias voluptatem qui delectus eius. Et ad non asperiores cum molestias.'
  )
})

test('post should create article', async (t) => {
  const {request, Article} = t.context

  // mock jwks
  const token = createToken(privateKey, '123', currentUser)
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .post('/api/articles')
    .set('Authorization', `Bearer ${token}`)
    .send({
      article: {
        id: 56304,
        title: 'Brunei Dollar coherent',
        content:
          'Odit veniam adipisci reprehenderit unde facilis sint eos. Facilis numquam ut nihil. Fugit velit tempora suscipit. Ea fuga enim aut eaque nostrum. Esse et nemo quidem sed adipisci molestias.'
      }
    })

  t.is(response.status, 200)

  t.deepEqual(response.body.id, 56304)
  t.deepEqual(response.body.title, 'Brunei Dollar coherent')
  t.deepEqual(
    response.body.content,
    'Odit veniam adipisci reprehenderit unde facilis sint eos. Facilis numquam ut nihil. Fugit velit tempora suscipit. Ea fuga enim aut eaque nostrum. Esse et nemo quidem sed adipisci molestias.'
  )
})

test('update should update article', async (t) => {
  const {request} = t.context

  // mock jwks
  const token = createToken(privateKey, '123', currentUser)
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .put('/api/articles/36084')
    .set('Authorization', `Bearer ${token}`)
    .send({
      article: {
        id: 36084,
        title: 'Brunei Dollar coherent',
        content:
          'Odit veniam adipisci reprehenderit unde facilis sint eos. Facilis numquam ut nihil. Fugit velit tempora suscipit. Ea fuga enim aut eaque nostrum. Esse et nemo quidem sed adipisci molestias.'
      }
    })

  t.is(response.status, 200)

  t.deepEqual(response.body.id, 36084)
  t.deepEqual(response.body.title, 'Brunei Dollar coherent')
  t.deepEqual(
    response.body.content,
    'Odit veniam adipisci reprehenderit unde facilis sint eos. Facilis numquam ut nihil. Fugit velit tempora suscipit. Ea fuga enim aut eaque nostrum. Esse et nemo quidem sed adipisci molestias.'
  )
})

test('delete should delete article', async (t) => {
  const {request, Article} = t.context

  let articles = await Article.query()
  t.deepEqual(articles.length, 3)

  // mock jwks
  const token = createToken(privateKey, '123', currentUser)
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .delete('/api/articles/36084')
    .set('Authorization', `Bearer ${token}`)

  articles = await Article.query()
  t.deepEqual(articles.length, 2)

  t.is(response.status, 204)
  t.deepEqual(response.body, {})
})

/* mat Custom tests [start] */
/* mat Custom tests [end] */
