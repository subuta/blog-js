import Router from 'koa-router'
import _ from 'lodash'

import Channels from './Channels'
import Comments from './Comments'
import Upload from './Upload'

const api = new Router({prefix: '/api'})

const routers = {
  Channels,
  Comments,
  Upload
}

_.each(routers, (router, name) => {
  router.register && router.register(routers)
  api.use(`/${_.snakeCase(name)}`, router.routes())
})

export default api
