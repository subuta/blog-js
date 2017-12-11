import Router from 'koa-router'
import _ from 'lodash'
import models, { Comment } from 'src/model'

const comments = new Router()

comments.get('/', async (ctx) => {
  let params = {}
  if (_.get(ctx, 'params.channelId')) {
    params['channelId'] = _.get(ctx, 'params.channelId')
  }
  ctx.body = await Comment.findAll({ where: params })
})

comments.post('/', async (ctx) => {
  let params = {}
  if (_.get(ctx, 'params.channelId')) {
    params['channelId'] = _.get(ctx, 'params.channelId')
  }
  const { comment } = ctx.request.body
  ctx.body = await Comment.create({
    ...comment,
    ...params
  })
})

export default {
  routes: () => _.cloneDeep(comments.routes()),
  register: (routers) => {}
}
