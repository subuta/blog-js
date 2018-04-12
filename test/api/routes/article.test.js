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
  t.deepEqual(_.map(response.body, 'id').sort(), [50794, 89832, 90697])
})

test('show should return article', async (t) => {
  const {request} = t.context

  // mock jwks
  const token = createToken(privateKey, '123', currentUser)
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .get('/api/articles/89832')
    .set('Authorization', `Bearer ${token}`)

  t.is(response.status, 200)

  t.deepEqual(response.body.id, 89832)
  t.deepEqual(response.body.title, 'capacitor Handmade Fresh Car withdrawal')
  t.deepEqual(response.body.summary, 'cultivate core PCI')
  t.deepEqual(response.body.slug, 'unde-ad-et')
  t.deepEqual(response.body.isPublished, true)
  t.deepEqual(
    response.body.content,
    'Rem commodi iusto inventore. Rerum voluptatem necessitatibus quo repellat rerum. Itaque minus voluptate. Quia error temporibus libero unde cupiditate distinctio ex quibusdam. Earum sit qui excepturi sit dolorem voluptatem. Odio laborum natus laborum omnis.'
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
        id: 83051,
        title: 'Intelligent reboot',
        summary: 'Hungary open-source',
        slug: 'consequatur-vitae-necessitatibus',
        isPublished: false,
        content:
          'Aperiam ut esse quia laudantium ipsum. Beatae nisi rerum neque voluptatem eaque ratione porro ipsa sit. Et quis tenetur maxime similique et modi ex sapiente. Eum ut nihil ducimus incidunt quia fuga repudiandae occaecati. Est tenetur aut qui facere aspernatur.'
      }
    })

  t.is(response.status, 200)

  t.deepEqual(response.body.id, 83051)
  t.deepEqual(response.body.title, 'Intelligent reboot')
  t.deepEqual(response.body.summary, 'Hungary open-source')
  t.deepEqual(response.body.slug, 'consequatur-vitae-necessitatibus')
  t.deepEqual(response.body.isPublished, false)
  t.deepEqual(
    response.body.content,
    'Aperiam ut esse quia laudantium ipsum. Beatae nisi rerum neque voluptatem eaque ratione porro ipsa sit. Et quis tenetur maxime similique et modi ex sapiente. Eum ut nihil ducimus incidunt quia fuga repudiandae occaecati. Est tenetur aut qui facere aspernatur.'
  )
})

test('update should update article', async (t) => {
  const {request} = t.context

  // mock jwks
  const token = createToken(privateKey, '123', currentUser)
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .put('/api/articles/89832')
    .set('Authorization', `Bearer ${token}`)
    .send({
      article: {
        id: 89832,
        title: 'Intelligent reboot',
        summary: 'Hungary open-source',
        slug: 'consequatur-vitae-necessitatibus',
        isPublished: false,
        content:
          'Aperiam ut esse quia laudantium ipsum. Beatae nisi rerum neque voluptatem eaque ratione porro ipsa sit. Et quis tenetur maxime similique et modi ex sapiente. Eum ut nihil ducimus incidunt quia fuga repudiandae occaecati. Est tenetur aut qui facere aspernatur.'
      }
    })

  t.is(response.status, 200)

  t.deepEqual(response.body.id, 89832)
  t.deepEqual(response.body.title, 'Intelligent reboot')
  t.deepEqual(response.body.summary, 'Hungary open-source')
  t.deepEqual(response.body.slug, 'consequatur-vitae-necessitatibus')
  t.deepEqual(response.body.isPublished, false)
  t.deepEqual(
    response.body.content,
    'Aperiam ut esse quia laudantium ipsum. Beatae nisi rerum neque voluptatem eaque ratione porro ipsa sit. Et quis tenetur maxime similique et modi ex sapiente. Eum ut nihil ducimus incidunt quia fuga repudiandae occaecati. Est tenetur aut qui facere aspernatur.'
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
    .delete('/api/articles/89832')
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
  t.deepEqual(_.map(response.body, 'id').sort(), [89832])
})
/* mat Custom tests [end] */
