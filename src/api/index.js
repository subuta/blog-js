import Router from 'koa-router'

import models from './middlewares/models'
import koaBody from 'koa-body'

const api = new Router({prefix: '/api'})

// routers set before auth middleware will not be protected
// parse body
api.use(koaBody({
  multipart: true
}))

// load waterline models.
api.use(models)

api.get('/', async (ctx) => {
  const User = ctx.state.models.user

  const users = await User.find()
  users

})

export default api
