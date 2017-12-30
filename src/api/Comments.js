import Router from 'koa-router'
import _ from 'lodash'

const comments = new Router()

comments.get('/', async (ctx) => {
  const {Comment} = ctx.state.models

  let params = {}
  if (_.get(ctx, 'params.channelId')) {
    params['channelId'] = _.get(ctx, 'params.channelId')
  }
  ctx.body = await Comment.query()
    .eager('attachment')
})

comments.post('/', async (ctx) => {
  const {Comment} = ctx.state.models
  const {comment} = ctx.request.body

  let params = {}
  if (_.get(ctx, 'params.channelId')) {
    params['channelId'] = _.get(ctx, 'params.channelId')
  }

  const currentUser = await ctx.state.getCurrentUser()
  if (currentUser) {
    params['commentedById'] = currentUser.id
  }

  ctx.body = await Comment.query().insert({
    ...comment,
    ...params
  }).eager('commentedBy')
})

comments.delete('/:id', async (ctx) => {
  const {Comment} = ctx.state.models

  await Comment.query().delete().where({id: ctx.params.id})
  ctx.body = null
})

export default {
  routes: () => _.cloneDeep(comments.routes()),
  register: (routers) => {}
}
