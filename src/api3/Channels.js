import Router from 'koa-router'
import _ from 'lodash'

const channels = new Router()

channels.get('/', async (ctx) => {
  const {Channel} = ctx.state.models
  let params = {}

  /* mat Before index [start] */
  /* mat Before index [end] */

  ctx.body = await Channel.query()
    .eager('comments.attachment')
    .where(params)
})

channels.get('/:id', async (ctx) => {
  const {Channel} = ctx.state.models
  let params = {}

  /* mat Before show [start] */
  /* mat Before show [end] */

  ctx.body = await Channel.query()
    .eager('comments.attachment')
    .findFirst({...params, id: ctx.params.id})
})

channels.post('/', async (ctx) => {
  const {Channel} = ctx.state.models
  const {channel} = ctx.request.body

  let params = {}

  /* mat Before create [start] */
  /* mat Before create [end] */

  let response = await Channel.query()
    .eager('comments.attachment')
    .insert({
      ...channel,
      ...params
    })

  /* mat After create [start] */
  /* mat After create [end] */

  ctx.body = response
})

export default {
  routes: () => _.cloneDeep(channels.routes()),
  register: (routers) => {
    /* mat Register [start] */
    channels.use('/:channelId/comments', routers.Comments.routes())
    /* mat Register [end] */
  }
}
