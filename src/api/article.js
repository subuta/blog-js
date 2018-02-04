import Router from 'koa-router'
import _ from 'lodash'

const article = new Router({
  prefix: '/articles'
})

article.get('/', async (ctx) => {
  const {Article} = ctx.state.models
  let params = {}

  /* mat Before index [start] */
  /* mat Before index [end] */

  ctx.body = await Article.query()
    .eager('[tags]')
    .where(params)
})

article.get('/:id', async (ctx) => {
  const {Article} = ctx.state.models
  let params = {}

  /* mat Before show [start] */
  /* mat Before show [end] */

  ctx.body = await Article.query()
    .eager('[tags]')
    .findFirst({...params, id: ctx.params.id})
})

article.post('/', async (ctx) => {
  const {Article} = ctx.state.models
  const {article} = ctx.request.body

  let params = {}

  /* mat Before create [start] */
  /* mat Before create [end] */

  let response = await Article.query()
    .insert({
      ...article,
      ...params
    })
    .eager('[tags]')

  /* mat After create [start] */
  /* mat After create [end] */

  ctx.body = response
})

article.put('/:id', async (ctx) => {
  const {Article} = ctx.state.models
  const {article} = ctx.request.body
  const {sub} = ctx.state.user

  // update specified article.
  const params = {}

  /* mat Before update [start] */
  /* mat Before update [end] */

  ctx.body = await Article.query()
    .patchAndFetchById(ctx.params.id, {
      ...article,
      ...params
    })
    .eager('[tags]')
})

article.delete('/:id', async (ctx) => {
  const {Article} = ctx.state.models
  await Article.query()
    .delete()
    .where({id: ctx.params.id})
  ctx.body = null
})

/* mat Custom actions [start] */
/* mat Custom actions [end] */

export default {
  routes: () => _.cloneDeep(article.routes()),
  register: (routers) => {
    /* mat Register [start] */
    /* mat Register [end] */
  }
}
