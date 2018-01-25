import Router from 'koa-router'
import _ from 'lodash'

const comment = new Router()

comment.get('/', async (ctx) => {
  const {Comment} = ctx.state.models
  let params = {}

  /* mat Before index [start] */
  /* mat Before index [end] */

  ctx.body = await Comment.query()
    .eager('[attachment, commentedBy]')
    .where(params)
})

comment.post('/', async (ctx) => {
  const {Comment} = ctx.state.models
  const {comment} = ctx.request.body

  let params = {}

  /* mat Before create [start] */
  if (_.get(ctx, 'params.channelId')) {
    params['channelId'] = Number(_.get(ctx, 'params.channelId'))
  }

  const currentUser = await ctx.state.getCurrentUser()
  if (currentUser) {
    params['commentedById'] = currentUser.id
  }
  /* mat Before create [end] */

  let response = await Comment.query()
    .insert({
      ...comment,
      ...params
    })
    .eager('[attachment, commentedBy]')

  /* mat After create [start] */
  /* mat After create [end] */

  ctx.body = response
})

comment.delete('/:id', async (ctx) => {
  const {Comment} = ctx.state.models
  await Comment.query()
    .delete()
    .where({id: ctx.params.id})
  ctx.body = null
})

export default {
  routes: () => _.cloneDeep(comment.routes()),
  register: (routers) => {
    /* mat Register [start] */
    /* mat Register [end] */
  }
}
