import Router from 'koa-router'
import _ from 'lodash'
import {authenticate as auth} from 'src/api/middlewares/auth'

const article = new Router({
  prefix: '/articles'
})

article.get('/', async (ctx) => {
  const {Article} = ctx.state.models
  let params = {}

  /* mat Before index [start] */
  if (_.get(ctx, 'query.tagId')) {
    params['tags.id'] = Number(_.get(ctx, 'query.tagId'))
  }
  /* mat Before index [end] */

  ctx.body = await Article.query()
    .eager('[tags.articles, reactions.reactedBy]')
    .joinRelation('[tags]')
    .where(params)
})

article.get('/:id', async (ctx) => {
  const {Article} = ctx.state.models
  let params = {}

  /* mat Before show [start] */
  /* mat Before show [end] */

  ctx.body = await Article.query()
    .eager('[tags.articles, reactions.reactedBy]')
    .findFirst({...params, id: ctx.params.id})
})

article.post('/', auth, async (ctx) => {
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
    .eager('[tags.articles, reactions.reactedBy]')

  /* mat After create [start] */
  /* mat After create [end] */

  ctx.body = response
})

article.put('/:id', auth, async (ctx) => {
  const {Article} = ctx.state.models
  const {article} = ctx.request.body
  const {sub} = ctx.state.user

  // update specified article.
  const params = {}

  /* mat Before update [start] */
  const currentUser = await ctx.state.getCurrentUser()

  // ignore deleting other users comment(if not admin).
  const oldArticle = await Article.query()
    .findFirst({id: ctx.params.id})

  if (!currentUser.isAdmin && oldArticle.authorId !== currentUser.id) {
    return
  }
  /* mat Before update [end] */

  ctx.body = await Article.query()
    .patchAndFetchById(ctx.params.id, {
      ...article,
      ...params
    })
    .eager('[tags.articles, reactions.reactedBy]')
})

article.delete('/:id', auth, async (ctx) => {
  const {Article} = ctx.state.models
  let params = {id: ctx.params.id}

  /* mat Before destroy [start] */
  const currentUser = await ctx.state.getCurrentUser()

  // ignore deleting other users comment(if not admin).
  if (!currentUser.isAdmin) {
    params['authorId'] = currentUser.id
  }
  /* mat Before destroy [end] */

  await Article.query()
    .delete()
    .where(params)
  ctx.body = null
})

/* mat Custom actions [start] */
article.get('/slug/:slug', async (ctx) => {
  const {Article} = ctx.state.models
  let params = {}

  /* mat Before show [start] */
  /* mat Before show [end] */

  ctx.body = await Article.query()
    .eager('[tags.articles, reactions.reactedBy]')
    .findFirst({...params, slug: ctx.params.slug})
})

article.put('/:id/reaction', auth, async (ctx) => {
  const {Article} = ctx.state.models
  const {reaction} = ctx.request.body

  const article = await Article.query()
    .findById(ctx.params.id)
    .eager('[tags.articles, reactions.reactedBy]')

  const currentUser = await ctx.state.getCurrentUser()
  reaction['reactedById'] = currentUser.id

  await article
    .$relatedQuery('reactions')
    .insert(reaction)

  ctx.body = await article.$query()
    .eager('[tags.articles, reactions.reactedBy]')
})

article.delete('/:id/reaction', auth, async (ctx) => {
  const {Article} = ctx.state.models
  const query = ctx.request.query

  const article = await Article.query()
    .findById(ctx.params.id)
    .eager('[tags.articles, reactions.reactedBy]')

  const currentUser = await ctx.state.getCurrentUser()
  query['reactedById'] = currentUser.id

  await article
    .$relatedQuery('reactions')
    .delete()
    .where(query)

  ctx.body = await article.$query()
    .eager('[tags.articles, reactions.reactedBy]')
})
/* mat Custom actions [end] */

export default {
  routes: () => _.cloneDeep(article.routes()),
  register: (routers) => {
    /* mat Register [start] */
    /* mat Register [end] */
  }
}
