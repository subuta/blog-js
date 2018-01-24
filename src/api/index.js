import Router from 'koa-router'
import _ from 'lodash'
import koaBody from 'koa-body'
import auth, {getCurrentUser} from './middlewares/auth'
import models from './middlewares/models'
import Channels from './Channels'
import Comments from './Comments'
import Users from './Users'
import Attachments from './Attachments'

const api = new Router({
  prefix: '/api'
})

// register routers to api.
const registerRouters = (routers) => {
  _.each(routers, (router, name) => {
    router.register && router.register(routers)
    api.use(`/${_.snakeCase(name)}`, router.routes())
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
  Attachments,
  Channels,
  Comments,
  Users
})

export default api
