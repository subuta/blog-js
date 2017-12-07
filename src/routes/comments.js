import Router from 'koa-router'

const comments = new Router({prefix: '/comments'})

comments.get('/', async (ctx) => {
  ctx.body = 'comments'
})

export default comments
