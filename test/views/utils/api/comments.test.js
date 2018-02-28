/* global describe, it */
import nock from 'nock'

import comments from 'src/utils/api/comments'

describe('comments', () => {
  it('should call index API', async () => {
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

    const res = await comments.indexByChannel(1)

    expect(res.result).toEqual([1, 2])
    expect(res.entities).toEqual({
      comments: {
        1: {
          id: 1,
          channelId: 1,
          commentedById: 1,
          text: 'lorem ipsum'
        },

        2: {
          id: 2,
          channelId: 1,
          commentedById: 1,
          text: '',
          attachmentId: 'xxxx-xxxx-xxxx-xxxx'
        }
      }
    })
  })

  it('should call create API', async () => {
    nock('http://localhost:3000/api')
      .post('/channels/1/comments')
      .reply(200, {
        id: 4,
        text: 'hoge',
        channelId: 1,
        commentedById: 1,
        attachmentId: 'xxxx-xxxx-xxxx-xxxx'
      })

    const res = await comments.create(1, {
      text: 'hoge',
      channelId: 1,
      commentedById: 1,
      attachmentId: 'xxxx-xxxx-xxxx-xxxx'
    })

    expect(res.result).toEqual(4)
    expect(res.entities).toEqual({
      comments: {
        4: {
          id: 4,
          text: 'hoge',
          channelId: 1,
          commentedById: 1,
          attachmentId: 'xxxx-xxxx-xxxx-xxxx'
        }
      }
    })
  })
})
