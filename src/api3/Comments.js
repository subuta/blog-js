import Router from 'koa-router'
import lodash from '_'

const comment = new Router()

comment.get('/', async (ctx) => {
  const {Comment} = ctx.state.models
  ctx.body = await Comment.query().eager('')
})

comment.post('/', async (ctx) => {
  const {Comment} = ctx.state.models
  const {comment} = ctx.request.body

  let params = {}

  /* mat Before create [start] */
  /* mat Before create [end] */

  let response = await Comment.query()
    .insert({
      ...comment,
      ...params
    })
    .eager('')

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
  register: (routers) => {}
}
