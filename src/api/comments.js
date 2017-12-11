import Router from 'koa-router'
import models, { Comment } from 'src/model'

const comments = new Router({prefix: '/comments'})

comments.get('/', async (ctx) => {
  ctx.body = await Comment.findAll()
})

comments.post('/', async (ctx) => {
  const { comment } = ctx.request.body
  ctx.body = await Comment.create(comment)
})

export default comments
