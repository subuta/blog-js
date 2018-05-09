import Router from 'koa-router'
import { PassThrough } from 'stream'
import _ from 'lodash'
import {authenticate as auth} from 'src/api/middlewares/auth'

import {
  subscribe,
  unsubscribe,
  publish
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

stream.post('/broadcast', auth, async ctx => {
  const {event, data} = ctx.request.body

  const currentUser = await ctx.state.getCurrentUser()

  publish(ChannelAll, {
    event,
    data: {
      ...data,
      // Append currentUser's info.
      by: _.pick(currentUser, [
        'id',
        'nickname'
      ])
    }
  })

  // Set dummy body.
  ctx.body = {}
})

export default stream
