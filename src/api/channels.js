import Router from 'koa-router'
import models, { Channel } from 'src/model'

const channels = new Router({prefix: '/channels'})

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

export default channels
