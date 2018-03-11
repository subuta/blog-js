import Router from 'koa-router'
import _ from 'lodash'
import {authenticate as auth} from 'src/api/middlewares/auth'

const comment = new Router({
  prefix: '/channels/:channelId/comments'
})

comment.get('/', async (ctx) => {
  const {Comment} = ctx.state.models
  let params = {}

  /* mat Before index [start] */
  if (_.get(ctx, 'params.channelId')) {
    params['channelId'] = Number(_.get(ctx, 'params.channelId'))
  }
  /* mat Before index [end] */

  ctx.body = await Comment.query()
    .eager(
      '[channel.[comments.[attachment, commentedBy]], attachment, commentedBy]'
    )
    .where(params)
})

comment.post('/', auth, async (ctx) => {
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
    .eager(
      '[channel.[comments.[attachment, commentedBy]], attachment, commentedBy]'
    )

  /* mat After create [start] */
  /* mat After create [end] */

  ctx.body = response
})

comment.put('/:id', auth, async (ctx) => {
  const {Comment} = ctx.state.models
  const {comment} = ctx.request.body
  const {sub} = ctx.state.user

  // update specified comment.
  const params = {}



  ctx.body = await Comment.query()
    .patchAndFetchById(ctx.params.id, {
      ...comment,
      ...params
    })
    .eager(
      '[channel.[comments.[attachment, commentedBy]], attachment, commentedBy]'
    )
})

comment.delete('/:id', auth, async (ctx) => {
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
