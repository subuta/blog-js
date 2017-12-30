import Router from 'koa-router'
import _ from 'lodash'
const channels = new Router()

channel.get('/', async (ctx) => {
  const {Channel} = ctx.state.models

  ctx.body = await Channel.query()
})

channel.get('/:id', async (ctx) => {
  const {Channel} = ctx.state.models

  ctx.body = await Channel.query()
    .eager('')
    .findFirst({
      id: ctx.params.id
    })
})

channel.post('/', async (ctx) => {
  const {Channel} = ctx.state.models

  const {channel} = ctx.request.body

  let params = {}

  ctx.body = await Channel.query()
    .insert({
      ...channel,
      ...params
    })
    .eager('')
})

export default {
  routes: () => _.cloneDeep(channels.routes()),
  register: (routers) => {}
}
