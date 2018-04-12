import Router from 'koa-router'
import _ from 'lodash'
import {authenticate as auth} from 'src/api/middlewares/auth'

const reaction = new Router({
  prefix: '/reactions'
})

/* mat Custom actions [start] */
/* mat Custom actions [end] */

export default {
  routes: () => _.cloneDeep(reaction.routes()),
  register: (routers) => {
    /* mat Register [start] */
    /* mat Register [end] */
  }
}
