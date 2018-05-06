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

  let response = await Tag.query()
    .applyFilter('default')
    .eager('[articles.[reactions.reactedBy, author]]')
    .leftOuterJoinRelation('[articles]')
    .where(params)

  /* mat After index [start] */
  // exclude tag that not has article(simulate rightOuterJoin behavior.)
  response = _.uniqBy(_.filter(response, (tag) => {
    return tag.articles.length > 0
  }), 'id')

  response = _.reverse(_.sortBy(response, (tag) => tag.articles.length))
  /* mat After index [end] */

  ctx.body = response
})

/* mat Custom actions [start] */
tag.get('/:label', async (ctx) => {
  const {Tag} = ctx.state.models
  let params = {}

  /* mat Before show [start] */
  /* mat Before show [end] */

  ctx.body = await Tag.query()
    .eager('[articles.[reactions.reactedBy, author, tags]]')
    .leftOuterJoinRelation('[articles]')
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
