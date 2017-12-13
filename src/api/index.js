import Router from 'koa-router'
import _ from 'lodash'

import auth, { getCurrentUser } from './middlewares/auth'

import Channels from './Channels'
import Comments from './Comments'
import Attachments from './Attachments'
import Users from './Users'

const api = new Router({prefix: '/api'})

// register routers to api.
const registerRouters = (routers) => {
  _.each(routers, (router, name) => {
    router.register && router.register(routers)
    api.use(`/${_.snakeCase(name)}`, router.routes())
  })
}

// routers set before auth middleware will not be protected

// set jwt middleware
api.use(auth)

// inject getCurrentUser to state for ease of use.
api.use(getCurrentUser)

// routers set after auth middleware will be protected
registerRouters({
  Channels,
  Comments,
  Attachments,
  Users
})

export default api
