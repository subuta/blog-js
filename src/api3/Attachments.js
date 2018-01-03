import Router from 'koa-router'
import _ from 'lodash'

const attachment = new Router()

export default {
  routes: () => _.cloneDeep(attachment.routes()),
  register: (routers) => {}
}
