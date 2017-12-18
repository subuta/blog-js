/* global describe, it */
import nock from 'nock'

import mockStore from 'test/helper/mockStore'

import {
  setComments,
  requestChannelComments,
  createComment
} from 'src/modules/comments'

describe('comments module', () => {
  it('setComments should dispatch valid action', async () => {
    const store = mockStore({})
    const channels = [
      {
        id: 1,
        channelId: 1,
        commentedById: 1,
        text: 'lorem ipsum'
      },
      {
        id: 2,
        channelId: 1,
        commentedById: 1,
        text: '',
        attachmentId: 'xxxx-xxxx-xxxx-xxxx'
      }
    ]

    await store.dispatch(setComments(channels))

    expect(store.getActions()).toEqual([
      {
        type: 'SET_COMMENTS',
        payload: [
          {
            id: 1,
            channelId: 1,
            commentedById: 1,
            text: 'lorem ipsum'
          },
          {
            id: 2,
            channelId: 1,
            commentedById: 1,
            text: '',
            attachmentId: 'xxxx-xxxx-xxxx-xxxx'
          }
        ]
      }
    ])
  })

  it('requestChannelComments should dispatch valid action', async () => {
    nock('http://localhost:3000/api')
      .get('/channels/1/comments')
      .reply(200, [
        {
          id: 1,
          channelId: 1,
          commentedById: 1,
          text: 'lorem ipsum'
        },
        {
          id: 2,
          channelId: 1,
          commentedById: 1,
          text: '',
          attachmentId: 'xxxx-xxxx-xxxx-xxxx'
        }
      ])

    const store = mockStore({})

    await store.dispatch(requestChannelComments(1))

    expect(store.getActions().length).toEqual(2)
    expect(store.getActions()).toEqual([
      {type: 'REQUEST_COMMENTS'},
      {
        type: 'SET_COMMENTS',
        payload: {
          entities: {
            comments: {
              '1': {
                id: 1,
                channelId: 1,
                commentedById: 1,
                text: 'lorem ipsum'
              },
              '2': {
                id: 2,
                channelId: 1,
                commentedById: 1,
                text: '',
                attachmentId: 'xxxx-xxxx-xxxx-xxxx'
              }
            }
          },
          result: [1, 2]
        }
      }
    ])
  })

  it('createComment should dispatch valid action', async () => {
    nock('http://localhost:3000/api')
      .post('/channels/1/comments')
      .reply(200, {id: 1, name: 'i_subuta'})

    const store = mockStore({})

    await store.dispatch(createComment(1, {name: 'i_subuta'}))

    expect(store.getActions().length).toEqual(2)
    expect(store.getActions()).toEqual([
      {type: 'REQUEST_COMMENTS'},
      {
        type: 'SET_COMMENTS',
        payload: {
          entities: {
            comments: {
              '1': {
                id: 1,
                name: 'i_subuta'
              }
            }
          },
          result: 1
        }
      }
    ])
  })
})
