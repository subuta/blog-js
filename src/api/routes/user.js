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
  const protectedFields = ['id', 'isAdmin', 'auth0Id']

  const currentUser = await ctx.state.getCurrentUser()

  // findOrCreate specified user.
  // update id with current user in params if specified
  let params = {
    ..._.omit(user, protectedFields),
    auth0Id: sub
  }

  if (_.get(currentUser, 'isAdmin', false)) {
    params['isAdmin'] = true
  }

  ctx.body = await User.query()
    .eager('')
    .patchAndFetchById(currentUser.id, params)
})

user.post('/me', auth, async (ctx) => {
  const {User} = ctx.state.models
  const {user} = ctx.request.body
  const {sub} = ctx.state.user
  const protectedFields = ['id', 'isAdmin']

  let params = {}

  let found = await User.query()
    .eager('')
    .findFirst({auth0Id: sub})

  // create if not exists.
  if (!found) {
    // findOrCreate specified user.
    // update id with current user in params if specified
    let params = _.omit(
      {
        ...user,
        auth0Id: sub
      },
      protectedFields
    )



    found = await User.query()
      .insert(params)
      .eager('')


  }

  ctx.body = found
})

export default {
  routes: () => _.cloneDeep(user.routes()),
  register: (routers) => {
    /* mat Register [start] */
    /* mat Register [end] */
  }
}
