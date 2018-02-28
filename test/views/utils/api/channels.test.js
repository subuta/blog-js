/* global describe, it */
import nock from 'nock'

import channels from 'src/utils/api/channels'

describe('channels', () => {
  it('should call index API', async () => {
    nock('http://localhost:3000/api')
      .get('/channels')
      .reply(200, [
        {id: 1, name: 'i_subuta'},
        {id: 2, name: 'react'},
        {id: 3, name: 'redux'}
      ])

    const res = await channels.index({})

    expect(res.result).toEqual([1, 2, 3]);
    expect(res.entities).toEqual({
      channels: {
        1: {id: 1, name: 'i_subuta'},
        2: {id: 2, name: 'react'},
        3: {id: 3, name: 'redux'}
      }
    });
  })

  it('should call show API', async () => {
    nock('http://localhost:3000/api')
      .get('/channels/1')
      .reply(200, {id: 1, name: 'i_subuta'})

    const res = await channels.show(1)

    expect(res.result).toEqual(1);
    expect(res.entities).toEqual({
      channels: {
        1: {id: 1, name: 'i_subuta'}
      }
    });
  })

  it('should call create API', async () => {
    nock('http://localhost:3000/api')
      .post('/channels')
      .reply(200, {id: 4, name: 'hoge'})

    const res = await channels.create({ name: 'hoge' })

    expect(res.result).toEqual(4);
    expect(res.entities).toEqual({
      channels: {
        4: {id: 4, name: 'hoge'}
      }
    });
  })
})
