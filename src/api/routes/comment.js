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

  // Fetch records with paging.
  const pageSize = 30
  let page = _.get(ctx, 'request.query.page') !== undefined && Number(_.get(ctx, 'request.query.page'))
  if (page !== undefined) {
    const result = await Comment.query()
      .orderBy('created_at', 'desc')
      .orderBy('id', 'desc')
      .eager('[attachment, commentedBy, reactions.reactedBy]')
      .where(params)
      .page(page, pageSize);

    const hasNext = result.total > (page + 1) * pageSize
    if (hasNext) {
      page++
    }

    ctx.body = {
      ...result,
      current: page,
      next: page,
      isLast: !hasNext
    }
    return
  }

  /* mat Before index [end] */

  ctx.body = await Comment.query()
    .applyFilter('default')
    .eager('[attachment, commentedBy, reactions.reactedBy]')
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
    .eager('[attachment, commentedBy, reactions.reactedBy]')

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

  /* mat Before update [start] */
  const currentUser = await ctx.state.getCurrentUser()

  // ignore deleting other users comment(if not admin).
  const oldComment = await Comment.query()
    .findFirst({id: ctx.params.id})

  if (!currentUser.isAdmin && oldComment.commentedById !== currentUser.id) {
    return
  }
  /* mat Before update [end] */

  ctx.body = await Comment.query()
    .patchAndFetchById(ctx.params.id, {
      ...comment,
      ...params
    })
    .eager('[attachment, commentedBy, reactions.reactedBy]')
})

comment.delete('/:id', auth, async (ctx) => {
  const {Comment} = ctx.state.models
  let params = {id: ctx.params.id}

  /* mat Before destroy [start] */
  const currentUser = await ctx.state.getCurrentUser()

  // ignore deleting other users comment(if not admin).
  if (!currentUser.isAdmin) {
    params['commentedById'] = currentUser.id
  }
  /* mat Before destroy [end] */

  await Comment.query()
    .delete()
    .where(params)
  ctx.body = null
})

/* mat Custom actions [start] */
comment.put('/:id/reaction', auth, async (ctx) => {
  const {Comment} = ctx.state.models
  let {reaction} = ctx.request.body

  const comment = await Comment.query()
    .findById(ctx.params.id)
    .eager('[attachment, commentedBy, reactions.reactedBy]')

  const currentUser = await ctx.state.getCurrentUser()
  reaction['reactedById'] = currentUser.id

  // ignore invalid column
  reaction = _.pick(reaction, ['emoji', 'reactedById'])

  const found = await comment
    .$relatedQuery('reactions')
    .findFirst(reaction)

  // create if not exists.
  if (!found) {
    await comment
      .$relatedQuery('reactions')
      .insert(reaction)
  }

  ctx.body = await comment.$query()
    .eager('[attachment, commentedBy, reactions.reactedBy]')
})

comment.delete('/:id/reaction', auth, async (ctx) => {
  const {Comment} = ctx.state.models
  let query = ctx.request.query

  const comment = await Comment.query()
    .findById(ctx.params.id)
    .eager('[attachment, commentedBy, reactions.reactedBy]')

  const currentUser = await ctx.state.getCurrentUser()
  query['reactedById'] = currentUser.id

  // ignore invalid column
  query = _.pick(query, ['emoji', 'reactedById'])

  await comment
    .$relatedQuery('reactions')
    .delete()
    .where(query)

  ctx.body = await comment.$query()
    .eager('[attachment, commentedBy, reactions.reactedBy]')
})
/* mat Custom actions [end] */

export default {
  routes: () => _.cloneDeep(comment.routes()),
  register: (routers) => {
    /* mat Register [start] */
    /* mat Register [end] */
  }
}
