import Router from 'koa-router'
import _ from 'lodash'
const comments = new Router()

comment.get('/', async (ctx) => {
  const {Comment} = ctx.state.models

  ctx.body = await Comment.query()
})

comment.post('/', async (ctx) => {
  const {Comment} = ctx.state.models

  const {comment} = ctx.request.body

  let params = {}

  let response = await Comment.query()
    .insert({
      ...comment,
      ...params
    })
    .eager('')

  ctx.body = response
})

comment.delete('/:id', async (ctx) => {
  const {Comment} = ctx.state.models

  await Comment.query()
    .delete()
    .where({
      id: ctx.params.id
    })

  ctx.body = null
})

export default {
  routes: () => _.cloneDeep(comments.routes()),
  register: (routers) => {}
}
