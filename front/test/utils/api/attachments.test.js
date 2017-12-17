/* global describe, it */
import nock from 'nock'

import attachments from 'src/utils/api/attachments'

describe('attachments', () => {
  it('should call create API', async () => {
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

    const res = await attachments.create({})

    expect(res.result).toEqual({});
    expect(res.normalized.result).toEqual('xxxx-xxxx-xxxx-xxxx');
    expect(res.normalized.entities).toEqual({
      attachments: {
        'xxxx-xxxx-xxxx-xxxx': {
          id: 'xxxx-xxxx-xxxx-xxxx',
          name: 'hoge.png',
          type: 'image/png'
        }
      }
    });
  })

  it('should call upload API', async () => {
    nock('http://localhost:3000')
      .put('/dummy-uploads')
      .reply(200, {
        data: {}
      })

    const file = {}

    const res = await attachments.upload(file, 'http://localhost:3000/dummy-uploads', {})

    expect(res.data).toEqual({});
  })
})
