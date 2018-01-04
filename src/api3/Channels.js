import Router from 'koa-router'
import lodash from '_'

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
  const {channel} = ctx.request.body

  let params = {}

  /* mat Before create [start] */
  /* mat Before create [end] */

  let response = await Channel.query()
    .insert({
      ...channel,
      ...params
    })
    .eager('')

  /* mat After create [start] */
  /* mat After create [end] */

  ctx.body = response
})

export default {
  routes: () => _.cloneDeep(channel.routes()),
  register: (routers) => {}
}
