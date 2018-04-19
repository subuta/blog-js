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
  t.deepEqual(_.map(response.body, 'id').sort(), [35666, 60920, 66239])
})

test('show should return article', async (t) => {
  const {request} = t.context

  // mock jwks
  const token = createToken(privateKey, '123', currentUser)
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .get('/api/articles/35666')
    .set('Authorization', `Bearer ${token}`)

  t.is(response.status, 200)

  t.deepEqual(response.body.id, 35666)
  t.deepEqual(response.body.title, 'Refined Rubber Tuna user-centric expedite')
  t.deepEqual(response.body.summary, 'monitor Armenian Dram enhance')
  t.deepEqual(response.body.slug, 'velit-voluptatibus-incidunt')
  t.deepEqual(response.body.isPublished, false)
  t.deepEqual(
    response.body.content,
    'Beatae voluptatem voluptatem ut temporibus quia. Id perferendis aperiam et mollitia debitis et nihil et. Explicabo eligendi mollitia cumque eius quas illo rerum accusamus veritatis. Rerum sed nesciunt. Maxime assumenda molestiae enim est perspiciatis aperiam amet quas. Maxime veritatis vitae maxime rerum beatae laborum cupiditate.'
  )
  t.deepEqual(response.body.authorId, 75900)
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
        id: 36060,
        title: 'deposit Applications',
        summary: 'Customer neural-net',
        slug: 'tempora-eum-harum',
        isPublished: true,
        content:
          'Dolorum possimus harum sed quos. Rerum consequatur soluta ratione unde cumque nobis. Amet ut tempora.'
      }
    })

  t.is(response.status, 200)

  t.deepEqual(response.body.id, 36060)
  t.deepEqual(response.body.title, 'deposit Applications')
  t.deepEqual(response.body.summary, 'Customer neural-net')
  t.deepEqual(response.body.slug, 'tempora-eum-harum')
  t.deepEqual(response.body.isPublished, true)
  t.deepEqual(
    response.body.content,
    'Dolorum possimus harum sed quos. Rerum consequatur soluta ratione unde cumque nobis. Amet ut tempora.'
  )
})

test('update should update article', async (t) => {
  const {request} = t.context

  // mock jwks
  const token = createToken(privateKey, '123', currentUser)
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .put('/api/articles/35666')
    .set('Authorization', `Bearer ${token}`)
    .send({
      article: {
        id: 35666,
        title: 'deposit Applications',
        summary: 'Customer neural-net',
        slug: 'tempora-eum-harum',
        isPublished: true,
        content:
          'Dolorum possimus harum sed quos. Rerum consequatur soluta ratione unde cumque nobis. Amet ut tempora.',
        authorId: 75900
      }
    })

  t.is(response.status, 200)

  t.deepEqual(response.body.id, 35666)
  t.deepEqual(response.body.title, 'deposit Applications')
  t.deepEqual(response.body.summary, 'Customer neural-net')
  t.deepEqual(response.body.slug, 'tempora-eum-harum')
  t.deepEqual(response.body.isPublished, true)
  t.deepEqual(
    response.body.content,
    'Dolorum possimus harum sed quos. Rerum consequatur soluta ratione unde cumque nobis. Amet ut tempora.'
  )
  t.deepEqual(response.body.authorId, 75900)
})

test('delete should delete article', async (t) => {
  const {request, Article} = t.context

  let articles = await Article.query()
  t.deepEqual(articles.length, 3)

  // mock jwks
  const token = createToken(privateKey, '123', currentUser)
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .delete('/api/articles/35666')
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
  t.deepEqual(_.map(response.body, 'id').sort(), [35666])
})

test('get should return article by slug', async (t) => {
  const {request} = t.context

  // mock jwks
  const token = createToken(privateKey, '123', currentUser)
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .get('/api/articles/slug/velit-voluptatibus-incidunt')
    .set('Authorization', `Bearer ${token}`)

  t.is(response.status, 200)

  t.deepEqual(response.body.id, 35666)
  t.deepEqual(response.body.title, 'Refined Rubber Tuna user-centric expedite')
  t.deepEqual(response.body.summary, 'monitor Armenian Dram enhance')
  t.deepEqual(response.body.slug, 'velit-voluptatibus-incidunt')
  t.deepEqual(response.body.isPublished, false)
  t.deepEqual(
    response.body.content,
    'Beatae voluptatem voluptatem ut temporibus quia. Id perferendis aperiam et mollitia debitis et nihil et. Explicabo eligendi mollitia cumque eius quas illo rerum accusamus veritatis. Rerum sed nesciunt. Maxime assumenda molestiae enim est perspiciatis aperiam amet quas. Maxime veritatis vitae maxime rerum beatae laborum cupiditate.'
  )
})

test('put reaction should add reaction to article', async (t) => {
  const {request} = t.context

  // mock jwks
  const token = createToken(privateKey, '123', currentUser)
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .put('/api/articles/35666/reaction')
    .set('Authorization', `Bearer ${token}`)
    .send({
      reaction: {
        emoji: ':+1:'
      }
    })

  t.is(response.status, 200)

  t.deepEqual(response.body.id, 35666)
  t.deepEqual(response.body.title, 'Refined Rubber Tuna user-centric expedite')
  t.deepEqual(response.body.summary, 'monitor Armenian Dram enhance')
  t.deepEqual(response.body.slug, 'velit-voluptatibus-incidunt')
  t.deepEqual(response.body.isPublished, false)
  t.deepEqual(
    response.body.content,
    'Beatae voluptatem voluptatem ut temporibus quia. Id perferendis aperiam et mollitia debitis et nihil et. Explicabo eligendi mollitia cumque eius quas illo rerum accusamus veritatis. Rerum sed nesciunt. Maxime assumenda molestiae enim est perspiciatis aperiam amet quas. Maxime veritatis vitae maxime rerum beatae laborum cupiditate.'
  )
  t.deepEqual(_.get(response.body.reactions, [0, 'emoji']), ':+1:')
})

test('delete reaction should delete reaction from article', async (t) => {
  const {request, Article, User} = t.context

  const _currentUser = await User.query().findOne({auth0Id: currentUser.sub})

  let article = await Article.query()
    .findById(35666)
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
    .delete('/api/articles/35666/reaction')
    .set('Authorization', `Bearer ${token}`)
    .query({
      emoji: ':+1:'
    })

  t.is(response.status, 200)

  t.deepEqual(response.body.id, 35666)
  t.deepEqual(response.body.title, 'Refined Rubber Tuna user-centric expedite')
  t.deepEqual(response.body.summary, 'monitor Armenian Dram enhance')
  t.deepEqual(response.body.slug, 'velit-voluptatibus-incidunt')
  t.deepEqual(response.body.isPublished, false)
  t.deepEqual(
    response.body.content,
    'Beatae voluptatem voluptatem ut temporibus quia. Id perferendis aperiam et mollitia debitis et nihil et. Explicabo eligendi mollitia cumque eius quas illo rerum accusamus veritatis. Rerum sed nesciunt. Maxime assumenda molestiae enim est perspiciatis aperiam amet quas. Maxime veritatis vitae maxime rerum beatae laborum cupiditate.'
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
