import Router from 'koa-router'
import _ from 'lodash'
import models, { Channel } from 'src/model'

import Comments from './Comments'

const channels = new Router()

channels.get('/', async (ctx) => {
  ctx.body = await Channel.findAll()
})

channels.get('/:id', async (ctx) => {
  ctx.body = await Channel.findById(ctx.params.id, {
    include: [models.Comment]
  })
})

channels.post('/', async (ctx) => {
  const {channel} = ctx.request.body
  ctx.body = await Channel.create(channel)
})

// export default channels
export default {
  routes: () => _.cloneDeep(channels.routes()),
  register: (routers) => {
    channels.use('/:channelId/comments', routers.Comments.routes());
  }
}
