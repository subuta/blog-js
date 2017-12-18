/* global describe, it */
import nock from 'nock'

import mockStore from 'test/helper/mockStore'

import {
  setUsers,
  setCurrentUser,
  requestUpdateUser,
  requestMe
} from 'src/modules/users'

describe('users module', () => {
  it('setUsers should dispatch valid action', async () => {
    const store = mockStore({})
    const users = {
      id: 1,
      auth0Id: 'google-oauth2|dummy',
      locale: 'ja',
      nickname: 'subuta',
      status: 'happy coding :)',
      avatar: 'http://lorempixel.com/200/200/cats/',
    }

    await store.dispatch(setUsers(users))

    expect(store.getActions()).toEqual([
      {
        type: 'SET_USERS',
        payload: users
      }
    ])
  })

  it('setCurrentUser should dispatch valid action', async () => {
    const store = mockStore({})
    const user = {
      id: 1,
      auth0Id: 'google-oauth2|dummy',
      locale: 'ja',
      nickname: 'subuta',
      status: 'happy coding :)',
      avatar: 'http://lorempixel.com/200/200/cats/',
    }

    await store.dispatch(setCurrentUser(user))

    expect(store.getActions()).toEqual([
      {
        type: 'SET_CURRENT_USER',
        payload: {
          id: 1,
          auth0Id: 'google-oauth2|dummy',
          locale: 'ja',
          nickname: 'subuta',
          status: 'happy coding :)',
          avatar: 'http://lorempixel.com/200/200/cats/',
        }
      }
    ])
  })

  it('requestUpdateUser should dispatch valid action', async () => {
    nock('http://localhost:3000/api')
      .put('/users/me')
      .reply(200, {
        id: 1,
        auth0Id: 'google-oauth2|dummy',
        locale: 'ja',
        nickname: 'subuta',
        status: 'happy coding :)',
        avatar: 'http://lorempixel.com/200/200/cats/',
      })

    const store = mockStore({})

    await store.dispatch(requestUpdateUser({}))

    expect(store.getActions().length).toEqual(2)
    expect(store.getActions()).toEqual([
      {type: 'REQUEST_USERS'},
      {
        type: 'SET_USERS',
        payload: {
          entities: {
            users: {
              '1': {
                id: 1,
                auth0Id: 'google-oauth2|dummy',
                locale: 'ja',
                nickname: 'subuta',
                status: 'happy coding :)',
                avatar: 'http://lorempixel.com/200/200/cats/'
              }
            }
          },
          result: 1
        }
      }
    ])
  })

  it('requestMe should dispatch valid action', async () => {
    nock('http://localhost:3000/api')
      .get('/users/me')
      .reply(200, {
        id: 1,
        auth0Id: 'google-oauth2|dummy',
        locale: 'ja',
        nickname: 'subuta',
        status: 'happy coding :)',
        avatar: 'http://lorempixel.com/200/200/cats/'
      })

    const store = mockStore({})

    await store.dispatch(requestMe(1))

    expect(store.getActions().length).toEqual(2)
    expect(store.getActions()).toEqual([
      {type: 'REQUEST_USERS'},
      {
        type: 'SET_CURRENT_USER',
        payload: {
          entities: {
            users: {
              '1': {
                id: 1,
                auth0Id: 'google-oauth2|dummy',
                locale: 'ja',
                nickname: 'subuta',
                status: 'happy coding :)',
                avatar: 'http://lorempixel.com/200/200/cats/'
              }
            }
          },
          result: 1
        }
      }
    ])
  })
})
