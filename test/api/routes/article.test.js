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
  t.deepEqual(_.map(response.body, 'id').sort(), [52552, 75213, 76958])
})

test('show should return article', async (t) => {
  const {request} = t.context

  // mock jwks
  const token = createToken(privateKey, '123', currentUser)
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .get('/api/articles/76958')
    .set('Authorization', `Bearer ${token}`)

  t.is(response.status, 200)

  t.deepEqual(response.body.id, 76958)
  t.deepEqual(response.body.title, 'HDD cross-platform core')
  t.deepEqual(response.body.summary, 'Cambridgeshire')
  t.deepEqual(response.body.slug, 'accusantium-non-fugiat')
  t.deepEqual(response.body.isPublished, true)
  t.deepEqual(
    response.body.content,
    'Doloremque eveniet aut corporis sunt autem nihil quia. Velit modi mollitia sit nulla. Corrupti est deserunt sed dolores deserunt. Ut corporis qui. Sunt dolor culpa corporis error.'
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
        id: 7034,
        title: 'Yemeni Rial',
        summary: 'Open-architected Avon',
        slug: 'ex-corporis-quia',
        isPublished: false,
        content:
          'Laboriosam tenetur recusandae. Quia similique ut. Sapiente eligendi maiores nam. Non velit ducimus dignissimos vel voluptatem animi. Dolorem velit alias eveniet.'
      }
    })

  t.is(response.status, 200)

  t.deepEqual(response.body.id, 7034)
  t.deepEqual(response.body.title, 'Yemeni Rial')
  t.deepEqual(response.body.summary, 'Open-architected Avon')
  t.deepEqual(response.body.slug, 'ex-corporis-quia')
  t.deepEqual(response.body.isPublished, false)
  t.deepEqual(
    response.body.content,
    'Laboriosam tenetur recusandae. Quia similique ut. Sapiente eligendi maiores nam. Non velit ducimus dignissimos vel voluptatem animi. Dolorem velit alias eveniet.'
  )
})

test('update should update article', async (t) => {
  const {request} = t.context

  // mock jwks
  const token = createToken(privateKey, '123', currentUser)
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .put('/api/articles/76958')
    .set('Authorization', `Bearer ${token}`)
    .send({
      article: {
        id: 76958,
        title: 'Yemeni Rial',
        summary: 'Open-architected Avon',
        slug: 'ex-corporis-quia',
        isPublished: false,
        content:
          'Laboriosam tenetur recusandae. Quia similique ut. Sapiente eligendi maiores nam. Non velit ducimus dignissimos vel voluptatem animi. Dolorem velit alias eveniet.'
      }
    })

  t.is(response.status, 200)

  t.deepEqual(response.body.id, 76958)
  t.deepEqual(response.body.title, 'Yemeni Rial')
  t.deepEqual(response.body.summary, 'Open-architected Avon')
  t.deepEqual(response.body.slug, 'ex-corporis-quia')
  t.deepEqual(response.body.isPublished, false)
  t.deepEqual(
    response.body.content,
    'Laboriosam tenetur recusandae. Quia similique ut. Sapiente eligendi maiores nam. Non velit ducimus dignissimos vel voluptatem animi. Dolorem velit alias eveniet.'
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
    .delete('/api/articles/76958')
    .set('Authorization', `Bearer ${token}`)

  articles = await Article.query()
  t.deepEqual(articles.length, 2)

  t.is(response.status, 204)
  t.deepEqual(response.body, {})
})

/* mat Custom tests [start] */
test('index should list article and filter by tag', async (t) => {
  const {request} = t.context

  // mock jwks
  const token = createToken(privateKey, '123', currentUser)
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .get('/api/articles')
    .query({tagId: 82337})
    .set('Authorization', `Bearer ${token}`)

  t.is(response.status, 200)
  t.deepEqual(response.body.length, 1)
  t.deepEqual(_.map(response.body, 'id').sort(), [76958])
})
/* mat Custom tests [end] */
