import Router from 'koa-router'
import _ from 'lodash'

const channel = new Router()

channel.get('/', async (ctx) => {
  const {Channel} = ctx.state.models

  ctx.body = await Channel.query().eager('')
})

channel.get('/:id', async (ctx) => {
  const {Channel} = ctx.state.models

  ctx.body = await Channel.query()
    .eager('')
    .findFirst({id: ctx.params.id})
})

channel.post('/', async (ctx) => {
  const {Channel} = ctx.state.models

  let params = {}

  let response = await Channel.query()
    .insert({
      ...channel,
      ...params
    })
    .eager('')

  ctx.body = response
})

export default {
  routes: () => _.cloneDeep(channel.routes()),
  register: (routers) => {}
}
