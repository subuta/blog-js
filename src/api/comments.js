import Router from 'koa-router'
import Comment from 'src/model/Comment'

const comments = new Router({prefix: '/comments'})

comments.get('/', async (ctx) => {
  ctx.body = await Comment.findAll()
})

comments.post('/', async (ctx) => {
  console.log(ctx.request.body);
  ctx.body = 'comments'
})

export default comments
