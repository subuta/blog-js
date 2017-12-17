/* global describe, it */
import nock from 'nock'

import attachments from 'src/utils/api/attachments'

const assert = require('assert')

describe('attachments API', () => {
  it('should create', async () => {
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

    assert.deepEqual(res.result, {})
    assert(res.normalized.result === 'xxxx-xxxx-xxxx-xxxx')
    assert.deepEqual(res.normalized.entities, {
      attachments: {
        'xxxx-xxxx-xxxx-xxxx': {
          id: 'xxxx-xxxx-xxxx-xxxx',
          name: 'hoge.png',
          type: 'image/png'
        }
      }
    })
  })

  it('should upload', async () => {
    nock('http://localhost:3000')
      .put('/dummy-uploads')
      .reply(200, {
        data: {}
      })

    const file = {}

    const res = await attachments.upload(file, 'http://localhost:3000/dummy-uploads', {})

    assert.deepEqual(res.data, {})
  })
})
