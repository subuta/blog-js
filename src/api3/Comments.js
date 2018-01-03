import Router from 'koa-router'
import _ from 'lodash'

const comment = new Router()

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

export default {
  routes: () => _.cloneDeep(comment.routes()),
  register: (routers) => {}
}
