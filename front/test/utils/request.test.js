/* global describe, it */
import nock from 'nock'

import sinon from 'sinon'
import request from 'src/utils/request'

jest.mock('file-saver', () => ({saveAs: jest.fn()}))

describe('request', () => {
  it('should add Authorization header', async () => {
    const config = {
      reqheaders: {
        'Authorization': /Bearer .*/
      }
    }

    nock('http://localhost:3000/api', config)
      .get('/')
      .reply(200, {
        result: {},
        attachment: {
          id: 'xxxx-xxxx-xxxx-xxxx',
          name: 'hoge.png',
          type: 'image/png'
        }
      })

    await request.get('/')
  })

  it('should handle blob response', async () => {
    const { saveAs } = require('file-saver')
    const data = ''

    expect(saveAs.mock.calls).toEqual([]);

    nock('http://localhost:3000/api')
      .get('/')
      .reply(200, data, {
        'content-disposition': 'attachment'
      })

    await request.get('/', {responseType: 'blob'})

    expect(saveAs.mock.calls).toEqual([[ '', null ]]);
  })
})
