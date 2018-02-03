import Router from 'koa-router'
import _ from 'lodash'

const channel = new Router({
  prefix: '/channels'
})

channel.get('/', async (ctx) => {
  const {Channel} = ctx.state.models
  let params = {}

  /* mat Before index [start] */
  /* mat Before index [end] */

  ctx.body = await Channel.query()
    .eager('[comments.[attachment, commentedBy]]')
    .where(params)
})

channel.get('/:id', async (ctx) => {
  const {Channel} = ctx.state.models
  let params = {}

  /* mat Before show [start] */
  /* mat Before show [end] */

  ctx.body = await Channel.query()
    .eager('[comments.[attachment, commentedBy]]')
    .findFirst({...params, id: ctx.params.id})
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
    .eager('[comments.[attachment, commentedBy]]')

  /* mat After create [start] */
  /* mat After create [end] */

  ctx.body = response
})



export default {
  routes: () => _.cloneDeep(channel.routes()),
  register: (routers) => {
    /* mat Register [start] */
    /* mat Register [end] */
  }
}
