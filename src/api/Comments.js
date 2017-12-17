import Router from 'koa-router'
import _ from 'lodash'

const comments = new Router()

comments.get('/', async (ctx) => {
  const {Comment} = ctx.state.models

  let params = {}
  if (_.get(ctx, 'params.channelId')) {
    params['channelId'] = _.get(ctx, 'params.channelId')
  }
  ctx.body = await Comment.findAll()
  // ctx.body = await Comment.findAll({
  //   where: params,
  //   include: [models.Attachment]
  // })
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

  // FIXME: https://github.com/sequelize/sequelize/issues/3807
  // association won't loaded by passing options.include to `create`
  const record = await Comment.create({
    ...comment,
    ...params
  })

  ctx.body = await record.reload({
    include: [
      models.Attachment,
      {
        model: models.User,
        as: 'commentedBy'
      }
    ]
  })
})

export default {
  routes: () => _.cloneDeep(comments.routes()),
  register: (routers) => {}
}
