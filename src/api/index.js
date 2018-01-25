import Router from 'koa-router'
import _ from 'lodash'
import pluralize from 'pluralize'
import koaBody from 'koa-body'
import auth, { getCurrentUser } from './middlewares/auth'
import models from './middlewares/models'
import attachment from './attachment'
import channel from './channel'
import comment from './comment'
import user from './user'

const api = new Router({
  prefix: '/api'
})

// register routers to api.
const registerRouters = (routers) => {
  _.each(routers, (router, name) => {
    router.register && router.register(routers)
    api.use(`/${_.snakeCase(pluralize(name))}`, router.routes())
  })
}

// routers set before auth middleware will not be protected
// parse body
api.use(
  koaBody({
    multipart: true
  })
)

// set jwt middleware
api.use(auth)

// inject Objection.js models middleware.
api.use(models)

// inject getCurrentUser to state for ease of use.
api.use(getCurrentUser)

// routers set after auth middleware will be protected
registerRouters({
  attachment,
  channel,
  comment,
  user
})

export default api
