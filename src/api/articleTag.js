import Router from 'koa-router'
import _ from 'lodash'

const articleTag = new Router({
  prefix: '/articleTags'
})

/* mat Custom actions [start] */
/* mat Custom actions [end] */

export default {
  routes: () => _.cloneDeep(articleTag.routes()),
  register: (routers) => {
    /* mat Register [start] */
    /* mat Register [end] */
  }
}
