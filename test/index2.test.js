import test from 'ava'
import _ from 'lodash'
import sinon from 'sinon'
import path from 'path'
import { Channel } from 'src/model'

import fixtures from 'test/helper/fixtures'

const sandbox = sinon.sandbox.create()

const proxyquire = require('proxyquire').noCallThru()

test.beforeEach(async (t) => {
  await fixtures('test/fixtures/*.yml')
})

test.afterEach((t) => {
  sandbox.reset()
})

test('should run test a', async (t) => {
  const channel = await Channel.findAll()
  const nextChannel = await Channel.findAll()
  console.log(channel.length)
  console.log(nextChannel)
  t.is(true, true)
})

test('should run test b', async (t) => {
  const channel = await Channel.findAll()
  console.log(channel)
  t.is(true, true)
})
