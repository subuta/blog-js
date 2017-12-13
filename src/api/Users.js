import Router from 'koa-router'
import _ from 'lodash'
import models, { User } from 'src/model'

const users = new Router()

users.get('/me', async (ctx) => {
  ctx.body = await ctx.state.getCurrentUser()
})

users.put('/me', async (ctx) => {
  const {user} = ctx.request.body
  const {sub} = ctx.state.user

  // findOrCreate specified user.
  // update id with current user in params if specified
  const params = {...user, auth0Id: sub}
  ctx.body = await User.findOrCreate({where: {auth0Id: sub}, defaults: params})
})

export default {
  routes: () => _.cloneDeep(users.routes()),
  register: (routers) => {}
}
