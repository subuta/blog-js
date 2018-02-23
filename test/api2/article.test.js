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
  t.deepEqual(_.map(response.body, 'id'), [6898, 14780, 36084])
})
test('show should return article', async (t) => {
  const {request} = t.context

  // mock jwks
  const token = createToken(privateKey, '123', currentUser)
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .get('/api/articles/6898')
    .set('Authorization', `Bearer ${token}`)

  t.is(response.status, 200)

  t.deepEqual(response.body.id, 6898)
  t.deepEqual(response.body.title, 'Designer')
  t.deepEqual(
    response.body.content,
    'Nesciunt veritatis molestiae. Aut itaque nostrum. Voluptatem ex neque eligendi. Ad est dolores occaecati quis rerum ullam magni.'
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
        title: 'Gorgeous maroon Niger',
        content:
          'Sed facilis numquam ut nihil nesciunt fugit velit tempora. Totam ea fuga enim aut. Nostrum animi esse. Nemo quidem sed adipisci molestias quo est. Distinctio quaerat exercitationem pariatur ut molestiae. Molestiae perferendis voluptate velit.'
      }
    })

  t.is(response.status, 200)

  t.deepEqual(response.body.id, 56304)
  t.deepEqual(response.body.title, 'Gorgeous maroon Niger')
  t.deepEqual(
    response.body.content,
    'Sed facilis numquam ut nihil nesciunt fugit velit tempora. Totam ea fuga enim aut. Nostrum animi esse. Nemo quidem sed adipisci molestias quo est. Distinctio quaerat exercitationem pariatur ut molestiae. Molestiae perferendis voluptate velit.'
  )
})
test('update should update article', async (t) => {
  const {request} = t.context

  // mock jwks
  const token = createToken(privateKey, '123', currentUser)
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .put('/api/articles/6898')
    .set('Authorization', `Bearer ${token}`)
    .send({
      article: {
        id: 6898,
        title: 'Gorgeous maroon Niger',
        content:
          'Sed facilis numquam ut nihil nesciunt fugit velit tempora. Totam ea fuga enim aut. Nostrum animi esse. Nemo quidem sed adipisci molestias quo est. Distinctio quaerat exercitationem pariatur ut molestiae. Molestiae perferendis voluptate velit.'
      }
    })

  t.is(response.status, 200)

  t.deepEqual(response.body.id, 6898)
  t.deepEqual(response.body.title, 'Gorgeous maroon Niger')
  t.deepEqual(
    response.body.content,
    'Sed facilis numquam ut nihil nesciunt fugit velit tempora. Totam ea fuga enim aut. Nostrum animi esse. Nemo quidem sed adipisci molestias quo est. Distinctio quaerat exercitationem pariatur ut molestiae. Molestiae perferendis voluptate velit.'
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
    .delete('/api/articles/6898')
    .set('Authorization', `Bearer ${token}`)

  articles = await Article.query()
  t.deepEqual(articles.length, 2)

  t.is(response.status, 204)
  t.deepEqual(response.body, {})
})

/* mat Custom tests [start] */
/* mat Custom tests [end] */
