import test from 'ava'
import _ from 'lodash'
import sinon from 'sinon'
import path from 'path'
import { Channel } from 'src/model'

const sandbox = sinon.sandbox.create()

const proxyquire = require('proxyquire').noCallThru()

test.beforeEach(async (t) => {
  await Channel.sync({force: true})
})

test.afterEach((t) => {
  sandbox.reset()
})

test('should run test a', async (t) => {
  const channel = await Channel.findAll()
  await Channel.create({name: 'hoge'})
  const nextChannel = await Channel.findAll()
  console.log(channel)
  console.log(nextChannel)
  t.is(true, true)
})

test('should run test b', async (t) => {
  const channel = await Channel.findAll()
  console.log(channel)
  t.is(true, true)
})
