import Router from 'koa-router'
import _ from 'lodash'

const user = new Router({
  prefix: '/users'
})

user.get('/me', async (ctx) => {
  const {User} = ctx.state.models
  ctx.body = await ctx.state.getCurrentUser()
})

user.put('/me', async (ctx) => {
  const {User} = ctx.state.models
  const {user} = ctx.request.body
  const {sub} = ctx.state.user

  const currentUser = await ctx.state.getCurrentUser()

  // check for malicious request.
  user.id = _.get(currentUser, 'id', null)

  // findOrCreate specified user.
  // update id with current user in params if specified
  const params = _.pickBy(
    {
      ...user,
      auth0Id: sub
    },
    _.identity
  )

  const opts = {
    relate: true,
    unrelate: true
  }

  ctx.body = await User.query()
    .eager('')
    .upsertGraphAndFetch(params, opts)
})

export default {
  routes: () => _.cloneDeep(user.routes()),
  register: (routers) => {
    /* mat Register [start] */
    /* mat Register [end] */
  }
}
