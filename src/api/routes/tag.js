import Router from 'koa-router'
import _ from 'lodash'
import {authenticate as auth} from 'src/api/middlewares/auth'

const tag = new Router({
  prefix: '/tags'
})

tag.get('/', async (ctx) => {
  const {Tag} = ctx.state.models
  let params = {}

  /* mat Before index [start] */
  /* mat Before index [end] */

  ctx.body = await Tag.query()
    .applyFilter('default')
    .eager('[articles.[reactions.reactedBy, tags, author]]')
    .joinRelation('[articles]')
    .where(params)
})

/* mat Custom actions [start] */
tag.get('/:label', async (ctx) => {
  const {Tag} = ctx.state.models
  let params = {}

  /* mat Before show [start] */
  /* mat Before show [end] */

  ctx.body = await Tag.query()
    .eager('[articles.[reactions.reactedBy, tags, author]]')
    .joinRelation('[articles]')
    .findFirst({...params, label: ctx.params.label})
})
/* mat Custom actions [end] */

export default {
  routes: () => _.cloneDeep(tag.routes()),
  register: (routers) => {
    /* mat Register [start] */
    /* mat Register [end] */
  }
}
