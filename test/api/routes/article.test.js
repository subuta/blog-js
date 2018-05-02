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
import { ids as userIds } from 'test/api/fixtures/006_user'
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
  t.deepEqual(_.map(response.body, 'id').sort(), [24271, 48587, 67738])
})

test('show should return article', async (t) => {
  const {request} = t.context

  // mock jwks
  const token = createToken(privateKey, '123', currentUser)
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .get('/api/articles/24271')
    .set('Authorization', `Bearer ${token}`)

  t.is(response.status, 200)

  t.deepEqual(response.body.id, 24271)
  t.deepEqual(response.body.title, 'Burkina Faso Distributed redundant')
  t.deepEqual(response.body.summary, 'orchestrate')
  t.deepEqual(response.body.slug, 'ab-qui-repellat')
  t.deepEqual(response.body.isPublished, true)
  t.deepEqual(
    response.body.content,
    'Ipsa incidunt sed quia expedita. Voluptas accusantium alias dolorem voluptas nostrum. Ipsum recusandae esse aperiam eum vero sunt dolores impedit. Et dignissimos provident incidunt. Corporis est est assumenda possimus quas natus praesentium.'
  )
  t.deepEqual(response.body.authorId, 61127)
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
        id: 91390,
        title: 'Unbranded',
        summary: 'cross-platform',
        slug: 'et-consequatur-officia',
        isPublished: true,
        content:
          'Enim accusamus magnam dignissimos et temporibus perferendis harum. Sapiente repellat molestias sit et. Magnam magni possimus eum praesentium ea odit rem quos enim. Voluptates similique sint nesciunt quibusdam excepturi saepe illo ea. Non est quo voluptas possimus vero culpa architecto explicabo. Qui aut dignissimos illum molestiae enim.'
      }
    })

  t.is(response.status, 200)

  t.deepEqual(response.body.id, 91390)
  t.deepEqual(response.body.title, 'Unbranded')
  t.deepEqual(response.body.summary, 'cross-platform')
  t.deepEqual(response.body.slug, 'et-consequatur-officia')
  t.deepEqual(response.body.isPublished, true)
  t.deepEqual(
    response.body.content,
    'Enim accusamus magnam dignissimos et temporibus perferendis harum. Sapiente repellat molestias sit et. Magnam magni possimus eum praesentium ea odit rem quos enim. Voluptates similique sint nesciunt quibusdam excepturi saepe illo ea. Non est quo voluptas possimus vero culpa architecto explicabo. Qui aut dignissimos illum molestiae enim.'
  )
})

test('update should update article', async (t) => {
  const {request} = t.context

  // mock jwks
  const token = createToken(privateKey, '123', currentUser)
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .put('/api/articles/24271')
    .set('Authorization', `Bearer ${token}`)
    .send({
      article: {
        id: 24271,
        title: 'Unbranded',
        summary: 'cross-platform',
        slug: 'et-consequatur-officia',
        isPublished: true,
        content:
          'Enim accusamus magnam dignissimos et temporibus perferendis harum. Sapiente repellat molestias sit et. Magnam magni possimus eum praesentium ea odit rem quos enim. Voluptates similique sint nesciunt quibusdam excepturi saepe illo ea. Non est quo voluptas possimus vero culpa architecto explicabo. Qui aut dignissimos illum molestiae enim.',
        authorId: 61127
      }
    })

  t.is(response.status, 200)

  t.deepEqual(response.body.id, 24271)
  t.deepEqual(response.body.title, 'Unbranded')
  t.deepEqual(response.body.summary, 'cross-platform')
  t.deepEqual(response.body.slug, 'et-consequatur-officia')
  t.deepEqual(response.body.isPublished, true)
  t.deepEqual(
    response.body.content,
    'Enim accusamus magnam dignissimos et temporibus perferendis harum. Sapiente repellat molestias sit et. Magnam magni possimus eum praesentium ea odit rem quos enim. Voluptates similique sint nesciunt quibusdam excepturi saepe illo ea. Non est quo voluptas possimus vero culpa architecto explicabo. Qui aut dignissimos illum molestiae enim.'
  )
  t.deepEqual(response.body.authorId, 61127)
})

test('delete should delete article', async (t) => {
  const {request, Article} = t.context

  let articles = await Article.query()
  t.deepEqual(articles.length, 3)

  // mock jwks
  const token = createToken(privateKey, '123', currentUser)
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .delete('/api/articles/24271')
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
    .query({tagId: 71041})
    .set('Authorization', `Bearer ${token}`)

  t.is(response.status, 200)
  t.deepEqual(response.body.length, 1)
  t.deepEqual(_.map(response.body, 'id').sort(), [24271])
})

test('get should return article by slug', async (t) => {
  const {request} = t.context

  // mock jwks
  const token = createToken(privateKey, '123', currentUser)
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .get('/api/articles/slug/ab-qui-repellat')
    .set('Authorization', `Bearer ${token}`)

  t.is(response.status, 200)

  t.deepEqual(response.body.id, 24271)
  t.deepEqual(response.body.title, 'Burkina Faso Distributed redundant')
  t.deepEqual(response.body.summary, 'orchestrate')
  t.deepEqual(response.body.slug, 'ab-qui-repellat')
  t.deepEqual(response.body.isPublished, true)
  t.deepEqual(
    response.body.content,
    'Ipsa incidunt sed quia expedita. Voluptas accusantium alias dolorem voluptas nostrum. Ipsum recusandae esse aperiam eum vero sunt dolores impedit. Et dignissimos provident incidunt. Corporis est est assumenda possimus quas natus praesentium.'
  )
})

test('put reaction should add reaction to article', async (t) => {
  const {request} = t.context

  // mock jwks
  const token = createToken(privateKey, '123', currentUser)
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .put('/api/articles/24271/reaction')
    .set('Authorization', `Bearer ${token}`)
    .send({
      reaction: {
        emoji: ':+1:'
      }
    })

  t.is(response.status, 200)

  t.deepEqual(response.body.id, 24271)
  t.deepEqual(response.body.title, 'Burkina Faso Distributed redundant')
  t.deepEqual(response.body.summary, 'orchestrate')
  t.deepEqual(response.body.slug, 'ab-qui-repellat')
  t.deepEqual(response.body.isPublished, true)
  t.deepEqual(
    response.body.content,
    'Ipsa incidunt sed quia expedita. Voluptas accusantium alias dolorem voluptas nostrum. Ipsum recusandae esse aperiam eum vero sunt dolores impedit. Et dignissimos provident incidunt. Corporis est est assumenda possimus quas natus praesentium.'
  )
  t.deepEqual(_.get(response.body.reactions, [0, 'emoji']), ':+1:')
})

test('put reaction should not add reaction to article if duplicated', async (t) => {
  const {request} = t.context

  // mock jwks
  const token = createToken(privateKey, '123', currentUser)
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  let response = await request
    .put('/api/articles/24271/reaction')
    .set('Authorization', `Bearer ${token}`)
    .send({
      reaction: {
        emoji: ':+1:'
      }
    })

  response = await request
    .put('/api/articles/24271/reaction')
    .set('Authorization', `Bearer ${token}`)
    .send({
      reaction: {
        emoji: ':+1:'
      }
    })

  t.is(response.status, 200)

  t.deepEqual(response.body.title, 'Burkina Faso Distributed redundant')
  t.deepEqual(response.body.summary, 'orchestrate')
  t.deepEqual(response.body.slug, 'ab-qui-repellat')
  t.deepEqual(response.body.isPublished, true)
  t.deepEqual(
    response.body.content,
    'Ipsa incidunt sed quia expedita. Voluptas accusantium alias dolorem voluptas nostrum. Ipsum recusandae esse aperiam eum vero sunt dolores impedit. Et dignissimos provident incidunt. Corporis est est assumenda possimus quas natus praesentium.'
  )
  t.deepEqual(response.body.reactions.length, 1)
  t.deepEqual(_.get(response.body.reactions, [0, 'emoji']), ':+1:')
})

test('delete reaction should delete reaction from article', async (t) => {
  const {request, Article, User} = t.context

  const _currentUser = await User.query().findOne({auth0Id: currentUser.sub})

  let article = await Article.query()
    .findById(24271)
    .eager('[tags.articles, reactions]')

  await article
    .$relatedQuery('reactions')
    .insert({
      emoji: ':+1:',
      reactedById: _currentUser.id
    })

  // should have reaction before delete.
  t.deepEqual(_.get(article.reactions, [0, 'emoji']), ':+1:')

  // mock jwks
  const token = createToken(privateKey, '123', currentUser)
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .delete('/api/articles/24271/reaction')
    .set('Authorization', `Bearer ${token}`)
    .query({
      emoji: ':+1:'
    })

  t.is(response.status, 200)

  t.deepEqual(response.body.title, 'Burkina Faso Distributed redundant')
  t.deepEqual(response.body.summary, 'orchestrate')
  t.deepEqual(response.body.slug, 'ab-qui-repellat')
  t.deepEqual(response.body.isPublished, true)
  t.deepEqual(
    response.body.content,
    'Ipsa incidunt sed quia expedita. Voluptas accusantium alias dolorem voluptas nostrum. Ipsum recusandae esse aperiam eum vero sunt dolores impedit. Et dignissimos provident incidunt. Corporis est est assumenda possimus quas natus praesentium.'
  )

  // should not have reaction after delete.
  article = await article.$query()
    .eager('[tags.articles, reactions]')

  t.deepEqual(_.get(article.reactions, [0, 'emoji']), undefined)
})

test('delete should delete article of other user if currentUser is admin', async (t) => {
  const {request, User, Article} = t.context

  let articles = await Article.query()
  t.deepEqual(articles.length, 3)

  // set User as admin
  let adminUser = await User.query().findFirst({id: userIds.admin})
  let article = await Article.query().findFirst({authorId: userIds.user})

  // mock jwks
  const token = createToken(privateKey, '123', createPayload(adminUser.auth0Id))
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .delete(`/api/articles/${article.id}`)
    .set('Authorization', `Bearer ${token}`)

  articles = await Article.query()
  t.deepEqual(articles.length, 2)

  t.is(response.status, 204)
  t.deepEqual(response.body, {})
})

test('delete should not delete article of other user if currentUser is not admin', async (t) => {
  const {request, User, Article} = t.context

  let articles = await Article.query()
  t.deepEqual(articles.length, 3)

  // set User as admin
  let nonAdminUser = await User.query().findFirst({id: userIds.user})
  let article = await Article.query().findFirst({authorId: userIds.admin})

  // mock jwks
  const token = createToken(privateKey, '123', createPayload(nonAdminUser.auth0Id))
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .delete(`/api/articles/${article.id}`)
    .set('Authorization', `Bearer ${token}`)

  articles = await Article.query()
  t.deepEqual(articles.length, 3)

  t.is(response.status, 204)
  t.deepEqual(response.body, {})
})

test('update should update article of other user if currentUser is admin', async (t) => {
  const {request, User, Article} = t.context

  // mock jwks
  // set User as admin
  let adminUser = await User.query().findFirst({id: userIds.admin})
  let article = await Article.query().findFirst({authorId: userIds.user})

  // mock jwks
  const token = createToken(privateKey, '123', createPayload(adminUser.auth0Id))
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .put(`/api/articles/${article.id}`)
    .set('Authorization', `Bearer ${token}`)
    .send({
      article: {
        id: article.id,
        content: 'Updated content'
      }
    })

  t.is(response.status, 200)

  t.deepEqual(response.body.id, article.id)
  t.deepEqual(
    response.body.content,
    'Updated content'
  )
})

test('update should not update article of other user if currentUser is not admin', async (t) => {
  const {request, User, Article} = t.context

  // mock jwks
  // set User as admin
  let nonAdminUser = await User.query().findFirst({id: userIds.user})
  let article = await Article.query().findFirst({authorId: userIds.admin})

  // mock jwks
  const token = createToken(privateKey, '123', createPayload(nonAdminUser.auth0Id))
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .put(`/api/articles/${article.id}`)
    .set('Authorization', `Bearer ${token}`)
    .send({
      article: {
        id: article.id,
        content: 'Updated content'
      }
    })

  t.is(response.status, 404)
})
/* mat Custom tests [end] */
