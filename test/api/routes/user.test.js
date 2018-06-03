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

test.serial('get me should return user', async (t) => {
  const {request} = t.context

  // mock jwks
  const token = createToken(privateKey, '123', currentUser)
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .get('/api/users/me')
    .set('Authorization', `Bearer ${token}`)

  t.is(response.status, 200)

  t.deepEqual(response.body.id, 61127)
  t.deepEqual(response.body.locale, 'sv')
  t.deepEqual(response.body.nickname, 'Marcelino80')
  t.deepEqual(response.body.status, 'white Cayman Islands Dollar')
  t.deepEqual(response.body.isAdmin, true)
  t.deepEqual(
    response.body.avatar,
    'https://s3.amazonaws.com/uifaces/faces/twitter/low_res/128.jpg'
  )
})

test.serial('put me should update user if exists', async (t) => {
  const {request, User} = t.context

  const user = await User.query().findOne({
    auth0Id: 'ecc04041-8e1d-4a05-8078-eea261323182'
  })
  t.not(user, undefined)

  // mock jwks
  const token = createToken(privateKey, '123', createPayload(user.auth0Id))
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .put('/api/users/me')
    .set('Authorization', `Bearer ${token}`)
    .send({
      user: {
        id: 61127,
        auth0Id: 'ecc04041-8e1d-4a05-8078-eea261323182',
        locale: 'de_CH',
        nickname: 'Alexane16',
        status: 'Reverse-engineered lavender',
        isAdmin: true,
        avatar:
          'https://s3.amazonaws.com/uifaces/faces/twitter/benoitboucart/128.jpg'
      }
    })

  t.is(response.status, 200)

  t.deepEqual(response.body.id, 61127)
  t.deepEqual(response.body.locale, 'de_CH')
  t.deepEqual(response.body.nickname, 'Alexane16')
  t.deepEqual(response.body.status, 'Reverse-engineered lavender')
  t.deepEqual(response.body.isAdmin, true)
  t.deepEqual(
    response.body.avatar,
    'https://s3.amazonaws.com/uifaces/faces/twitter/benoitboucart/128.jpg'
  )
})

test.serial('post me should create user if not exists', async (t) => {
  const {request, User} = t.context

  const user = await User.query().findOne({
    auth0Id: '4ed007fa-6ec1-4744-9205-db0bb81ab1bd'
  })
  t.is(user, undefined)

  // mock jwks
  const token = createToken(
    privateKey,
    '123',
    createPayload('4ed007fa-6ec1-4744-9205-db0bb81ab1bd')
  )
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .post('/api/users/me')
    .set('Authorization', `Bearer ${token}`)
    .send({
      user: {
        id: 64548,
        auth0Id: '4ed007fa-6ec1-4744-9205-db0bb81ab1bd',
        locale: 'de_CH',
        nickname: 'Alexane16',
        status: 'Reverse-engineered lavender',
        isAdmin: false,
        avatar:
          'https://s3.amazonaws.com/uifaces/faces/twitter/benoitboucart/128.jpg'
      }
    })

  t.is(response.status, 200)

  // should ignore invalid id param
  t.not(response.body.id, 64548)

  // other props should persisted.
  t.deepEqual(response.body.locale, 'de_CH')
  t.deepEqual(response.body.nickname, 'Alexane16')
  t.deepEqual(response.body.status, 'Reverse-engineered lavender')
  t.deepEqual(response.body.isAdmin, false)
  t.deepEqual(
    response.body.avatar,
    'https://s3.amazonaws.com/uifaces/faces/twitter/benoitboucart/128.jpg'
  )
})

test.serial(
  'post me should not create new user if already exists',
  async (t) => {
    const {request, User} = t.context

    await User.query()
      .insert({
        id: 64548,
        auth0Id: '4ed007fa-6ec1-4744-9205-db0bb81ab1bd',
        locale: 'de_CH',
        nickname: 'Alexane16',
        status: 'Reverse-engineered lavender',
        isAdmin: false,
        avatar:
          'https://s3.amazonaws.com/uifaces/faces/twitter/benoitboucart/128.jpg'
      })
      .eager('')

    const user = await User.query().findOne({
      auth0Id: '4ed007fa-6ec1-4744-9205-db0bb81ab1bd'
    })

    // mock jwks
    const token = createToken(
      privateKey,
      '123',
      createPayload('4ed007fa-6ec1-4744-9205-db0bb81ab1bd')
    )
    jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

    const response = await request
      .post('/api/users/me')
      .set('Authorization', `Bearer ${token}`)
      .send({
        user: {
          id: 64548,
          auth0Id: '4ed007fa-6ec1-4744-9205-db0bb81ab1bd',
          locale: 'de_CH',
          nickname: 'Alexane16',
          status: 'Reverse-engineered lavender',
          isAdmin: false,
          avatar:
            'https://s3.amazonaws.com/uifaces/faces/twitter/benoitboucart/128.jpg'
        }
      })

    t.is(response.status, 200)

    // All props should persisted.
    t.deepEqual(response.body.id, 64548)
    t.deepEqual(response.body.locale, 'de_CH')
    t.deepEqual(response.body.nickname, 'Alexane16')
    t.deepEqual(response.body.status, 'Reverse-engineered lavender')
    t.deepEqual(response.body.isAdmin, false)
    t.deepEqual(
      response.body.avatar,
      'https://s3.amazonaws.com/uifaces/faces/twitter/benoitboucart/128.jpg'
    )
  }
)

/* mat Custom test [start] */
test.serial('put me should throw 422 if date is invalid', async (t) => {
  const {request, User} = t.context

  const user = await User.query().findOne({
    auth0Id: 'ecc04041-8e1d-4a05-8078-eea261323182'
  })
  t.not(user, undefined)

  // mock jwks
  const token = createToken(privateKey, '123', createPayload(user.auth0Id))
  jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])

  const response = await request
    .put('/api/users/me')
    .set('Authorization', `Bearer ${token}`)
    .send({
      user: {
        nickname: '',
      }
    })

  t.is(response.status, 422)
})
/* mat Custom test [end] */
