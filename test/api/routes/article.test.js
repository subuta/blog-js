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
  t.deepEqual(_.map(response.body, 'id').sort(), [68018, 68554, 96438])
})

test('show should return article', async (t) => {
  const {request} = t.context

  // mock jwks
  const token = createToken(privateKey, '123', currentUser)
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .get('/api/articles/68554')
    .set('Authorization', `Bearer ${token}`)

  t.is(response.status, 200)

  t.deepEqual(response.body.id, 68554)
  t.deepEqual(response.body.title, 'China Salad eyeballs')
  t.deepEqual(response.body.summary, 'Avon Wooden Designer')
  t.deepEqual(
    response.body.content,
    'Inventore nostrum deserunt quae deleniti nulla aut est accusamus aspernatur. Inventore praesentium officiis occaecati necessitatibus occaecati nulla voluptatem minima ea. Consequuntur cum neque est.'
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
        id: 68360,
        title: 'payment',
        summary: 'New Hampshire neural',
        content:
          'Asperiores et occaecati similique alias voluptatibus molestiae corrupti nostrum odit. Ipsam ipsam magni eius et perferendis sed placeat iste dolores. Ea assumenda quod. Repudiandae numquam omnis quia voluptas sapiente iusto molestiae. Qui doloribus vero repellendus.'
      }
    })

  t.is(response.status, 200)

  t.deepEqual(response.body.id, 68360)
  t.deepEqual(response.body.title, 'payment')
  t.deepEqual(response.body.summary, 'New Hampshire neural')
  t.deepEqual(
    response.body.content,
    'Asperiores et occaecati similique alias voluptatibus molestiae corrupti nostrum odit. Ipsam ipsam magni eius et perferendis sed placeat iste dolores. Ea assumenda quod. Repudiandae numquam omnis quia voluptas sapiente iusto molestiae. Qui doloribus vero repellendus.'
  )
})

test('update should update article', async (t) => {
  const {request} = t.context

  // mock jwks
  const token = createToken(privateKey, '123', currentUser)
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .put('/api/articles/68554')
    .set('Authorization', `Bearer ${token}`)
    .send({
      article: {
        id: 68554,
        title: 'payment',
        summary: 'New Hampshire neural',
        content:
          'Asperiores et occaecati similique alias voluptatibus molestiae corrupti nostrum odit. Ipsam ipsam magni eius et perferendis sed placeat iste dolores. Ea assumenda quod. Repudiandae numquam omnis quia voluptas sapiente iusto molestiae. Qui doloribus vero repellendus.'
      }
    })

  t.is(response.status, 200)

  t.deepEqual(response.body.id, 68554)
  t.deepEqual(response.body.title, 'payment')
  t.deepEqual(response.body.summary, 'New Hampshire neural')
  t.deepEqual(
    response.body.content,
    'Asperiores et occaecati similique alias voluptatibus molestiae corrupti nostrum odit. Ipsam ipsam magni eius et perferendis sed placeat iste dolores. Ea assumenda quod. Repudiandae numquam omnis quia voluptas sapiente iusto molestiae. Qui doloribus vero repellendus.'
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
    .delete('/api/articles/68554')
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
    .query({tagId: 91264})
    .set('Authorization', `Bearer ${token}`)

  t.is(response.status, 200)
  t.deepEqual(response.body.length, 1)
  t.deepEqual(_.map(response.body, 'id').sort(), [49471])
})
/* mat Custom tests [end] */
