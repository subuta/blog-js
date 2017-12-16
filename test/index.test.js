import test from 'ava'
import _ from 'lodash'
import sinon from 'sinon'
import path from 'path'

const sandbox = sinon.sandbox.create()

const proxyquire = require('proxyquire').noCallThru()

test.beforeEach((t) => {
})

test.afterEach((t) => {
  sandbox.reset()
})

test('should run test', async (t) => {
  t.is(true, false)
})
