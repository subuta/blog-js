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
  t.deepEqual(_.map(response.body, 'id').sort(), [14129, 73427, 85002])
})

test('show should return article', async (t) => {
  const {request} = t.context

  // mock jwks
  const token = createToken(privateKey, '123', currentUser)
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .get('/api/articles/14129')
    .set('Authorization', `Bearer ${token}`)

  t.is(response.status, 200)

  t.deepEqual(response.body.id, 14129)
  t.deepEqual(response.body.title, 'Plastic Shoes expedite')
  t.deepEqual(response.body.summary, 'Auto Loan Account')
  t.deepEqual(response.body.isPublished, false)
  t.deepEqual(
    response.body.content,
    'Veniam fuga provident. Et consequuntur qui iure quam cumque impedit. Sed quidem dolorem deleniti assumenda earum suscipit sed sapiente rerum. Eius optio nostrum. Doloremque ut dolores ullam sunt occaecati unde hic.'
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
        id: 90778,
        title: 'Shoes Nakfa',
        summary: 'Mews channels',
        isPublished: true,
        content:
          'Veritatis beatae est velit et voluptatem provident vero. Harum doloremque labore. Ea aut quo alias et explicabo voluptas. Corporis ex voluptatum deleniti rerum laborum. Ex quia qui itaque iure totam molestiae earum. Distinctio et laborum consequatur autem sequi hic in.'
      }
    })

  t.is(response.status, 200)

  t.deepEqual(response.body.id, 90778)
  t.deepEqual(response.body.title, 'Shoes Nakfa')
  t.deepEqual(response.body.summary, 'Mews channels')
  t.deepEqual(response.body.isPublished, true)
  t.deepEqual(
    response.body.content,
    'Veritatis beatae est velit et voluptatem provident vero. Harum doloremque labore. Ea aut quo alias et explicabo voluptas. Corporis ex voluptatum deleniti rerum laborum. Ex quia qui itaque iure totam molestiae earum. Distinctio et laborum consequatur autem sequi hic in.'
  )
})

test('update should update article', async (t) => {
  const {request} = t.context

  // mock jwks
  const token = createToken(privateKey, '123', currentUser)
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .put('/api/articles/14129')
    .set('Authorization', `Bearer ${token}`)
    .send({
      article: {
        id: 14129,
        title: 'Shoes Nakfa',
        summary: 'Mews channels',
        isPublished: true,
        content:
          'Veritatis beatae est velit et voluptatem provident vero. Harum doloremque labore. Ea aut quo alias et explicabo voluptas. Corporis ex voluptatum deleniti rerum laborum. Ex quia qui itaque iure totam molestiae earum. Distinctio et laborum consequatur autem sequi hic in.'
      }
    })

  t.is(response.status, 200)

  t.deepEqual(response.body.id, 14129)
  t.deepEqual(response.body.title, 'Shoes Nakfa')
  t.deepEqual(response.body.summary, 'Mews channels')
  t.deepEqual(response.body.isPublished, true)
  t.deepEqual(
    response.body.content,
    'Veritatis beatae est velit et voluptatem provident vero. Harum doloremque labore. Ea aut quo alias et explicabo voluptas. Corporis ex voluptatum deleniti rerum laborum. Ex quia qui itaque iure totam molestiae earum. Distinctio et laborum consequatur autem sequi hic in.'
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
    .delete('/api/articles/14129')
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
  t.deepEqual(_.map(response.body, 'id').sort(), [14129])
})
/* mat Custom tests [end] */
