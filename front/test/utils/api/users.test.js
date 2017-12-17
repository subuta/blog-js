/* global describe, it */
import nock from 'nock'

import users from 'src/utils/api/users'

describe('comments', () => {
  it('should call update API', async () => {
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

    const res = await users.update({
      locale: 'ja',
      nickname: 'subuta',
      status: 'happy coding :)',
      avatar: 'http://lorempixel.com/200/200/cats/',
    })

    expect(res.result).toEqual(1)
    expect(res.entities).toEqual({
      users: {
        1: {
          id: 1,
          auth0Id: 'google-oauth2|dummy',
          locale: 'ja',
          nickname: 'subuta',
          status: 'happy coding :)',
          avatar: 'http://lorempixel.com/200/200/cats/',
        }
      }
    })
  })

  it('should call me API', async () => {
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

    const res = await users.me()

    expect(res.result).toEqual(1)
    expect(res.entities).toEqual({
      users: {
        1: {
          id: 1,
          auth0Id: 'google-oauth2|dummy',
          locale: 'ja',
          nickname: 'subuta',
          status: 'happy coding :)',
          avatar: 'http://lorempixel.com/200/200/cats/'
        }
      }
    })
  })
})
