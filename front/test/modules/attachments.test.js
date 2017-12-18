/* global describe, it */
import nock from 'nock'

import mockStore from 'test/helper/mockStore'

import {
  setAttachments,
  createAttachment,
  uploadAttachment
} from 'src/modules/attachments'

describe('attachments module', () => {
  it('setAttachments should dispatch valid action', async () => {
    const store = mockStore({})
    const attachment = {
      id: 'xxxx-xxxx-xxxx-xxxx',
      name: 'hoge.png',
      type: 'image/png'
    }

    await store.dispatch(setAttachments(attachment))

    expect(store.getActions()).toEqual([
      {
        type: 'SET_ATTACHMENTS',
        payload: attachment
      }
    ])
  })

  it('createAttachments should dispatch valid action', async () => {
    nock('http://localhost:3000/api')
      .post('/attachments')
      .reply(200, {
        result: {},
        attachment: {
          id: 'xxxx-xxxx-xxxx-xxxx',
          name: 'hoge.png',
          type: 'image/png'
        }
      })

    const store = mockStore({
      attachments: {
        ids: [],
        entities: {
          'xxxx-xxxx-xxxx-xxxx': {
            id: 'xxxx-xxxx-xxxx-xxxx',
            name: 'hoge.png',
            type: 'image/png'
          }
        }
      }
    })

    const result = await store.dispatch(createAttachment({}))

    expect(store.getActions().length).toEqual(2)
    expect(store.getActions()).toEqual([
      {type: 'REQUEST_ATTACHMENTS'},
      {
        type: 'SET_ATTACHMENTS',
        payload: {
          entities: {
            attachments: {
              'xxxx-xxxx-xxxx-xxxx': {
                id: 'xxxx-xxxx-xxxx-xxxx',
                name: 'hoge.png',
                type: 'image/png'
              }
            }
          },
          result: 'xxxx-xxxx-xxxx-xxxx'
        }
      }
    ])

    expect(result).toEqual({
      result: {},
      attachment:
        {
          id: 'xxxx-xxxx-xxxx-xxxx',
          name: 'hoge.png',
          type: 'image/png'
        }
    })
  })

  it('uploadAttachment should dispatch valid action', async () => {
    nock('http://localhost:3000')
      .put('/uploads-dummy')
      .reply(200, {})

    const store = mockStore()
    await store.dispatch(uploadAttachment({}, 'http://localhost:3000/uploads-dummy'))

    expect(store.getActions().length).toEqual(0)
  })
})
