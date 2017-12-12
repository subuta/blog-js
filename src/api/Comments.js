import Router from 'koa-router'
import _ from 'lodash'
import models, { Comment } from 'src/model'

const comments = new Router()

comments.get('/', async (ctx) => {
  let params = {}
  if (_.get(ctx, 'params.channelId')) {
    params['channelId'] = _.get(ctx, 'params.channelId')
  }
  ctx.body = await Comment.findAll({
    where: params,
    include: [models.Attachment]
  })
})

comments.post('/', async (ctx) => {
  let params = {}
  if (_.get(ctx, 'params.channelId')) {
    params['channelId'] = _.get(ctx, 'params.channelId')
  }

  const {comment} = ctx.request.body

  // FIXME: https://github.com/sequelize/sequelize/issues/3807
  // association won't loaded by passing options.include to `create`
  const record = await Comment.create({
    ...comment,
    ...params
  })

  ctx.body = await record.reload({include: [models.Attachment]})
})

export default {
  routes: () => _.cloneDeep(comments.routes()),
  register: (routers) => {}
}
