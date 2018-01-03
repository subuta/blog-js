import Router from 'koa-router'
import _ from 'lodash'

const channel = new Router()

channel.post('/', async (ctx) => {
  const {Channel} = ctx.state.models

  const {channel} = ctx.request.body

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
