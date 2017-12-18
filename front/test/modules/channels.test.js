/* global describe, it */
import nock from 'nock'

import mockStore from 'test/helper/mockStore'

import {
  setChannels,
  requestChannels,
  requestChannel,
  createChannel
} from 'src/modules/channels'

describe('channels module', () => {
  it('setChannels should dispatch valid action', async () => {
    const store = mockStore({})
    const channels = [
      {id: 1, name: 'i_subuta'}
    ]

    await store.dispatch(setChannels(channels))

    expect(store.getActions()).toEqual([
      {
        type: 'SET_CHANNELS',
        payload: channels
      }
    ])
  })

  it('requestChannels should dispatch valid action', async () => {
    nock('http://localhost:3000/api')
      .get('/channels')
      .reply(200, [
        {id: 1, name: 'i_subuta'}
      ])

    const store = mockStore({})

    await store.dispatch(requestChannels({}))

    expect(store.getActions().length).toEqual(2)
    expect(store.getActions()).toEqual([
      {type: 'REQUEST_CHANNELS'},
      {
        type: 'SET_CHANNELS',
        payload: {
          entities: {
            channels: {
              '1': {id: 1, name: 'i_subuta'}
            }
          },
          result: [1]
        }
      }
    ])
  })

  it('requestChannel should dispatch valid action', async () => {
    nock('http://localhost:3000/api')
      .get('/channels/1')
      .reply(200, {id: 1, name: 'i_subuta'})

    const store = mockStore({})

    await store.dispatch(requestChannel(1))

    expect(store.getActions().length).toEqual(2)
    expect(store.getActions()).toEqual([
      {type: 'REQUEST_CHANNELS'},
      {
        type: 'SET_CHANNELS',
        payload: {
          entities: {
            channels: {
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

  it('createChannel should dispatch valid action', async () => {
    nock('http://localhost:3000/api')
      .post('/channels')
      .reply(200, {id: 1, name: 'i_subuta'})

    const store = mockStore({})

    await store.dispatch(createChannel({ name: 'i_subuta' }))

    expect(store.getActions().length).toEqual(2)
    expect(store.getActions()).toEqual([
      {type: 'REQUEST_CHANNELS'},
      {
        type: 'SET_CHANNELS',
        payload: {
          entities: {
            channels: {
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
