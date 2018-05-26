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

test('index should list comment', async (t) => {
  const {request} = t.context

  // mock jwks
  const token = createToken(privateKey, '123', currentUser)
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .get('/api/channels/93290/comments')
    .set('Authorization', `Bearer ${token}`)

  t.is(response.status, 200)
  t.deepEqual(response.body.length, 1)
  t.deepEqual(_.map(response.body, 'id').sort(), [2826])
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
        id: 39166,
        text:
          'Corporis sed nemo totam est. Optio in sed aut et rerum commodi non distinctio quibusdam. Alias ducimus consequatur fuga et nobis ratione enim necessitatibus. Qui eius quas officia iste omnis impedit.'
      }
    })

  t.is(response.status, 200)

  t.deepEqual(response.body.id, 39166)
  t.deepEqual(
    response.body.text,
    'Corporis sed nemo totam est. Optio in sed aut et rerum commodi non distinctio quibusdam. Alias ducimus consequatur fuga et nobis ratione enim necessitatibus. Qui eius quas officia iste omnis impedit.'
  )
})

test('update should update comment', async (t) => {
  const {request} = t.context

  // mock jwks
  const token = createToken(privateKey, '123', currentUser)
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .put('/api/channels/93290/comments/2826')
    .set('Authorization', `Bearer ${token}`)
    .send({
      comment: {
        id: 2826,
        text:
          'Corporis sed nemo totam est. Optio in sed aut et rerum commodi non distinctio quibusdam. Alias ducimus consequatur fuga et nobis ratione enim necessitatibus. Qui eius quas officia iste omnis impedit.',
        channelId: 93290,
        commentedById: 61127,
        attachmentId: '28d15c5a-a70c-48e4-9772-bc910f421907'
      }
    })

  t.is(response.status, 200)

  t.deepEqual(response.body.id, 2826)
  t.deepEqual(
    response.body.text,
    'Corporis sed nemo totam est. Optio in sed aut et rerum commodi non distinctio quibusdam. Alias ducimus consequatur fuga et nobis ratione enim necessitatibus. Qui eius quas officia iste omnis impedit.'
  )
  t.deepEqual(response.body.channelId, 93290)
  t.deepEqual(response.body.commentedById, 61127)
  t.deepEqual(
    response.body.attachmentId,
    '28d15c5a-a70c-48e4-9772-bc910f421907'
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
    .delete('/api/channels/93290/comments/2826')
    .set('Authorization', `Bearer ${token}`)

  comments = await Comment.query()
  t.deepEqual(comments.length, 2)

  t.is(response.status, 204)
  t.deepEqual(response.body, {})
})

/* mat Custom tests [start] */
test('put reaction should add reaction to comment', async (t) => {
  const {request} = t.context

  // mock jwks
  const token = createToken(privateKey, '123', currentUser)
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .put('/api/channels/93290/comments/2826/reaction')
    .set('Authorization', `Bearer ${token}`)
    .send({
      reaction: {
        emoji: ':+1:'
      }
    })

  t.is(response.status, 200)

  t.deepEqual(response.body.id, 2826)
  t.deepEqual(
    response.body.text,
    'Aut repellendus rerum. Ut dolores est libero provident. Explicabo repellendus dolor similique velit qui ut asperiores. Et nihil quis omnis iusto. Inventore impedit doloremque excepturi ut explicabo recusandae eos odio. Accusantium quae quibusdam aliquid adipisci consequatur et.'
  )
  t.deepEqual(response.body.channelId, 93290)
  t.deepEqual(response.body.commentedById, 61127)
  t.deepEqual(
    response.body.attachmentId,
    '28d15c5a-a70c-48e4-9772-bc910f421907'
  )

  t.deepEqual(_.get(response.body.reactions, [0, 'emoji']), ':+1:')
})

test('put reaction should not add reaction to comment if duplicated', async (t) => {
  const {request} = t.context

  // mock jwks
  const token = createToken(privateKey, '123', currentUser)
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  let response = await request
    .put('/api/channels/93290/comments/2826/reaction')
    .set('Authorization', `Bearer ${token}`)
    .send({
      reaction: {
        emoji: ':+1:'
      }
    })

  response = await request
    .put('/api/channels/93290/comments/2826/reaction')
    .set('Authorization', `Bearer ${token}`)
    .send({
      reaction: {
        emoji: ':+1:'
      }
    })

  t.is(response.status, 200)

  t.deepEqual(response.body.id, 2826)
  t.deepEqual(
    response.body.text,
    'Aut repellendus rerum. Ut dolores est libero provident. Explicabo repellendus dolor similique velit qui ut asperiores. Et nihil quis omnis iusto. Inventore impedit doloremque excepturi ut explicabo recusandae eos odio. Accusantium quae quibusdam aliquid adipisci consequatur et.'
  )
  t.deepEqual(response.body.channelId, 93290)
  t.deepEqual(response.body.commentedById, 61127)
  t.deepEqual(
    response.body.attachmentId,
    '28d15c5a-a70c-48e4-9772-bc910f421907'
  )

  t.deepEqual(response.body.reactions.length, 1)
  t.deepEqual(_.get(response.body.reactions, [0, 'emoji']), ':+1:')
})

test('delete reaction should delete reaction from comment', async (t) => {
  const {request, Comment, User} = t.context

  const _currentUser = await User.query().findOne({auth0Id: currentUser.sub})

  let comment = await Comment.query()
    .findById(2826)
    .eager('[channel.[comments.[attachment, commentedBy]], attachment, commentedBy, reactions.reactedBy]')

  await comment
    .$relatedQuery('reactions')
    .insert({
      emoji: ':+1:',
      reactedById: _currentUser.id
    })

  // should have reaction before delete.
  t.deepEqual(_.get(comment.reactions, [0, 'emoji']), ':+1:')

  // mock jwks
  const token = createToken(privateKey, '123', currentUser)
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .delete('/api/channels/93290/comments/2826/reaction')
    .set('Authorization', `Bearer ${token}`)
    .query({
      emoji: ':+1:'
    })

  t.is(response.status, 200)

  t.deepEqual(response.body.id, 2826)
  t.deepEqual(
    response.body.text,
    'Aut repellendus rerum. Ut dolores est libero provident. Explicabo repellendus dolor similique velit qui ut asperiores. Et nihil quis omnis iusto. Inventore impedit doloremque excepturi ut explicabo recusandae eos odio. Accusantium quae quibusdam aliquid adipisci consequatur et.'
  )
  t.deepEqual(response.body.channelId, 93290)
  t.deepEqual(response.body.commentedById, 61127)
  t.deepEqual(
    response.body.attachmentId,
    '28d15c5a-a70c-48e4-9772-bc910f421907'
  )

  // should not have reaction after delete.
  comment = await comment.$query()
    .eager('[channel.[comments.[attachment, commentedBy]], attachment, commentedBy, reactions.reactedBy]')

  t.deepEqual(_.get(comment.reactions, [0, 'emoji']), undefined)
})

test('delete should delete comment of other user if currentUser is admin', async (t) => {
  const {request, User, Comment} = t.context

  let comments = await Comment.query()
  t.deepEqual(comments.length, 3)

  // set User as admin
  let adminUser = await User.query().findFirst({id: userIds.admin})
  let comment = await Comment.query().findFirst({commentedById: userIds.user})

  // mock jwks
  const token = createToken(privateKey, '123', createPayload(adminUser.auth0Id))
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .delete(`/api/channels/82160/comments/${comment.id}`)
    .set('Authorization', `Bearer ${token}`)

  comments = await Comment.query()
  t.deepEqual(comments.length, 2)

  t.is(response.status, 204)
  t.deepEqual(response.body, {})
})

test('delete should not delete comment of other user if currentUser is not admin', async (t) => {
  const {request, User, Comment} = t.context

  let comments = await Comment.query()
  t.deepEqual(comments.length, 3)

  // set User as non-admin
  let nonAdminUser = await User.query().findFirst({id: userIds.user})
  let comment = await Comment.query().findFirst({commentedById: userIds.admin})

  // mock jwks
  const token = createToken(privateKey, '123', createPayload(nonAdminUser.auth0Id))
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .delete(`/api/channels/82160/comments/${comment.id}`)
    .set('Authorization', `Bearer ${token}`)

  comments = await Comment.query()
  t.deepEqual(comments.length, 3)

  t.is(response.status, 204)
  t.deepEqual(response.body, {})
})

test('update should update comment of other user if currentUser is admin', async (t) => {
  const {request, User, Comment} = t.context

  // set User as admin
  let adminUser = await User.query().findFirst({id: userIds.admin})
  let comment = await Comment.query().findFirst({commentedById: userIds.user})

  // mock jwks
  const token = createToken(privateKey, '123', createPayload(adminUser.auth0Id))
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .put(`/api/channels/82160/comments/${comment.id}`)
    .set('Authorization', `Bearer ${token}`)
    .send({
      comment: {
        id: comment.id,
        text: 'Updated comment',
      }
    })

  t.is(response.status, 200)

  t.deepEqual(response.body.id, comment.id)
  t.deepEqual(response.body.text, 'Updated comment')
})

test('update should not update comment of other user if currentUser is not admin', async (t) => {
  const {request, User, Comment} = t.context

  // set User as admin
  let adminUser = await User.query().findFirst({id: userIds.user})
  let comment = await Comment.query().findFirst({commentedById: userIds.admin})

  // mock jwks
  const token = createToken(privateKey, '123', createPayload(adminUser.auth0Id))
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .put(`/api/channels/82160/comments/${comment.id}`)
    .set('Authorization', `Bearer ${token}`)
    .send({
      comment: {
        id: comment.id,
        text: 'Updated comment',
      }
    })

  t.is(response.status, 404)
  comment = await comment.$query();

  t.not(comment.text, 'Updated comment')
})

test('show should return channel with correct comments order', async (t) => {
  const {request, Comment, User} = t.context
  const Promise = require('bluebird')

  const adminUser = await User.query().findFirst({id: userIds.user})

  // insert 50 comment
  const comments = _.times(50, (i) => `comment ${i}`);

  // should preserve order.
  await Promise.each(comments, async (comment) => {
    await Comment.query()
      .insert({
        channelId: 93290,
        commentedById: adminUser.id,
        text: comment
      })
  })

  // mock jwks
  const token = createToken(privateKey, '123', currentUser)
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .get('/api/channels/93290/comments')
    .set('Authorization', `Bearer ${token}`)

  t.is(response.status, 200)

  // should return `latest 30 comments`
  t.deepEqual(_.map(response.body, 'text'), _.reverse(_.takeRight(comments, 30)))
})
/* mat Custom tests [end] */
