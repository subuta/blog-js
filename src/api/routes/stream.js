import Router from 'koa-router'
import { PassThrough } from 'stream'
import _ from 'lodash'

import {
  subscribe,
  unsubscribe
} from 'src/api/utils/redis'

import {
  ChannelAll
} from 'src/api/constants/config'

const stream = new Router({
  prefix: '/stream'
})

// EventSource.onmessage expects event as 'message'
// Use EventSource.addEventListener for other event type.
const sse = (data, event = 'message') => {
  return `event:${ event }\ndata: ${ data }\n\n`
}

stream.get('/all', async ctx => {
  const stream = ctx.body = new PassThrough()

  // Send data to stream
  const send = (data) => stream.write(sse(data))

  // Close subscription and stream.
  const close = () => {
    unsubscribe(ChannelAll, send)
    ctx.res.end()
  }

  subscribe(ChannelAll, send)

  ctx.req.on('close', close)
  ctx.req.on('finish', close)
  ctx.req.on('error', close)

  ctx.type = 'text/event-stream'
  ctx.flushHeaders()
})

export default stream
