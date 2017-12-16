import test from 'ava'
import sinon from 'sinon'
import { port } from 'src'
import axios from 'axios'

const sandbox = sinon.sandbox.create()

const proxyquire = require('proxyquire').noCallThru()

test.beforeEach(async (t) => {
})

test.afterEach((t) => {
  sandbox.reset()
})

test('should return 401 with No Authorization header', async (t) => {
  const request = axios.get(`http://localhost:${port}/api/channels`)
  const {response} = await t.throws(request)
  t.is(response.status, 401)
})

// test('should return 200 with Authorization header', async (t) => {
//   const request = axios.get(`http://localhost:${port}/api/channels`, {
//     headers: {
//       Authorization: `Bearer xxx`
//     }
//   })
//   const {response} = await request
//   console.log(response)
//   t.is(response.status, 200)
// })
