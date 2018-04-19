import Router from 'koa-router'
import _ from 'lodash'
import {authenticate as auth} from 'src/api/middlewares/auth'

const user = new Router({
  prefix: '/users'
})

user.get('/me', auth, async (ctx) => {
  const {User} = ctx.state.models
  ctx.body = await ctx.state.getCurrentUser()
})

user.put('/me', auth, async (ctx) => {
  const {User} = ctx.state.models
  const {user} = ctx.request.body
  const {sub} = ctx.state.user
  const protectedFields = ['isAdmin']

  const currentUser = await ctx.state.getCurrentUser()

  // check for malicious request.
  user.id = _.get(currentUser, 'id', null)

  // findOrCreate specified user.
  // update id with current user in params if specified
  const params = _.omit(
    _.pickBy(
      {
        ...user,
        auth0Id: sub
      },
      _.identity
    ),
    protectedFields
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
