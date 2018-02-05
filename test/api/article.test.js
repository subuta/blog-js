import test from 'ava'
import _ from 'lodash'
import sinon from 'sinon'
import request from 'supertest'

// use mock from jwks-rsa tests.
import { jwksEndpoint } from 'jwks-rsa/tests/mocks/jwks'
import { publicKey, privateKey } from 'jwks-rsa/tests/mocks/keys'
import { createToken } from 'jwks-rsa/tests/mocks/tokens'

import Koa from 'koa'

import importFresh from 'import-fresh'
import { absolutePath } from '../../config'

import { currentUser } from 'test/helper/user'
import runSeed, { runMigration } from 'test/helper/fixtures'

const sandbox = sinon.sandbox.create()

const proxyquire = require('proxyquire')

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

  console.log(response.status);

  t.is(response.status, 200)
  t.deepEqual(response.body.length, 1)
})

test('show should return article', async (t) => {
  const {request} = t.context

  // mock jwks
  const token = createToken(privateKey, '123', currentUser)
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .get('/api/articles/1')
    .set('Authorization', `Bearer ${token}`)

  t.is(response.status, 200)
  t.deepEqual(response.body.id, 1)
  t.deepEqual(response.body.title, 'Awesome React')
  t.deepEqual(response.body.tags.length, 1)
})

test('post should create article', async (t) => {
  const {request} = t.context

  // mock jwks
  const token = createToken(privateKey, '123', currentUser)
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .post('/api/articles')
    .set('Authorization', `Bearer ${token}`)
    .send({
      article: {
        id: 2,
        title: 'Awesome Redux',
        content: 'Hello World'
      }
    })

  t.is(response.status, 200)
  t.deepEqual(response.body.id, 2)
})

test('update should update article', async (t) => {
  const {request} = t.context

  // mock jwks
  const token = createToken(privateKey, '123', currentUser)
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .put('/api/articles/1')
    .set('Authorization', `Bearer ${token}`)
    .send({
      article: {
        title: 'Awesome Redux 2'
      }
    })

  t.is(response.status, 200)
  t.deepEqual(response.body.id, 1)
  t.deepEqual(response.body.title, 'Awesome Redux 2')
  t.deepEqual(response.body.tags[0].label, 'react')
})

test('delete should delete article', async (t) => {
  const {request, Article} = t.context

  let articles  = await Article.query()
  t.deepEqual(articles.length, 1)

  // mock jwks
  const token = createToken(privateKey, '123', currentUser)
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .delete('/api/articles/1')
    .set('Authorization', `Bearer ${token}`)

  articles = await Article.query()
  t.deepEqual(articles.length, 0)

  t.is(response.status, 204)
  t.deepEqual(response.body, {})
})

