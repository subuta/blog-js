import Router from 'koa-router'
import _ from 'lodash'

const comment = new Router()

comment.get('/', async (ctx) => {
  const {Comment} = ctx.state.models

  ctx.body = await Comment.query().eager('')
})

comment.post('/', async (ctx) => {
  const {Comment} = ctx.state.models

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
    .where({id: ctx.params.id})
  ctx.body = null
})

export default {
  routes: () => _.cloneDeep(comment.routes()),
  register: (routers) => {}
}
