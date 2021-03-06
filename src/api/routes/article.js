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
  const currentUser = await ctx.state.getCurrentUser()

  // return draft only if params passed.
  if (_.get(ctx, 'query.draft') !== undefined && currentUser) {
    // limit draft list to currentUser's if they were not admin.
    if (_.get(currentUser, 'isAdmin') !== true) {
      params = {
        'authorId': currentUser.id
      }
    }

    ctx.body = await Article.query()
      .applyFilter('draft')
      .eager('[tags, reactions.reactedBy, author]')
      .where(params)

    return
  }

  // set tag id to params.
  if (_.get(ctx, 'query.tagId')) {
    params['tags.id'] = Number(_.get(ctx, 'query.tagId'))
  }

  // Fetch records with paging.
  const pageSize = 30
  let page = _.get(ctx, 'request.query.page') !== undefined && Number(_.get(ctx, 'request.query.page'))
  if (page || page === 0) {
    const result = await Article.query()
      .eager('[tags, reactions.reactedBy, author]')
      .joinRelation('[tags]')
      .orderBy('created_at', 'desc')
      .orderBy('id', 'desc')
      .where('isPublished', true)
      .where(params)
      .page(page, pageSize);

    const hasNext = result.total > (page + 1) * pageSize
    if (hasNext) {
      page++
    }

    ctx.body = {
      ...result,
      current: page,
      next: page,
      isLast: !hasNext
    }
    return
  }
  /* mat Before index [end] */

  let response = await Article.query()
    .applyFilter('default')
    .eager('[tags, reactions.reactedBy, author]')
    .leftOuterJoinRelation('[tags]')
    .where(params)



  ctx.body = response
})

article.get('/:id', async (ctx) => {
  const {Article} = ctx.state.models
  let params = {}

  /* mat Before show [start] */
  const currentUser = await ctx.state.getCurrentUser()

  if (currentUser) {
    const found = await Article.query()
      .eager('[tags, reactions.reactedBy, author]')
      .findFirst({...params,
        id: ctx.params.id
      })

    // Assert currentUser as author if article is not published yet.
    if (currentUser.isAdmin || (!found.isPublished && found.authorId === currentUser.id)) {
      ctx.body = found
      return
    }
  }
  /* mat Before show [end] */

  ctx.body = await Article.query()
    .applyFilter('default')
    .eager('[tags, reactions.reactedBy, author]')
    .findFirst({...params, id: ctx.params.id})
})

article.post('/', auth, async (ctx) => {
  const {Article} = ctx.state.models
  const {article} = ctx.request.body

  let params = {}

  /* mat Before create [start] */
  // ignore deleting other users comment(if not admin).
  const currentUser = await ctx.state.getCurrentUser()

  params['authorId'] = currentUser.id
  /* mat Before create [end] */

  let response = await Article.query()
    .insert({
      ...article,
      ...params
    })
    .eager('[tags, reactions.reactedBy, author]')

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

  // ignore updating other users comment(if not admin).
  const oldArticle = await Article.query()
    .findFirst({id: ctx.params.id})

  if (!currentUser || (!currentUser.isAdmin && oldArticle.authorId !== currentUser.id)) {
    return
  }
  /* mat Before update [end] */

  let response = await Article.query()
    .patchAndFetchById(ctx.params.id, {
      ...article,
      ...params
    })
    .eager('[tags, reactions.reactedBy, author]')

  /* mat After update [start] */
  const Promise = require('bluebird')
  const {Tag} = ctx.state.models

  const TAG_REGEX = /#([\w+!@\-1-:]+)/g
  const tags = []

  let match
  while (match = TAG_REGEX.exec(article.content)) {
    tags.push(match[1])
  }

  // retrieve created article.
  const found = await Article.query()
    .eager('[tags, reactions.reactedBy, author]')
    .findFirst({id: ctx.params.id})

  const oldTags = _.map(found.tags, 'label')

  // relate tags.
  const tagsToRelate = _.differenceBy(tags, oldTags)
  await Promise.map(tagsToRelate, async (tag) => {
    const _tag = await Tag.query()
      .findOrCreate({where: {label: tag}, defaults: {label: tag}})

    return await _tag.$relatedQuery('articles')
      .relate(found.id)
  })

  // remove un-used tags.
  const tagsToUnRelate = _.differenceBy(oldTags, tags)
  await found.$relatedQuery('tags')
    .whereIn('label', tagsToUnRelate)
    .unrelate()

  response = await found.$query()
    .eager('[tags, reactions.reactedBy, author]')
  /* mat After update [end] */

  ctx.body = response
})

article.delete('/:id', auth, async (ctx) => {
  const {Article} = ctx.state.models
  let params = {id: ctx.params.id}

  /* mat Before destroy [start] */
  const currentUser = await ctx.state.getCurrentUser()

  // ignore deleting other users article(if not admin).
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
  const currentUser = await ctx.state.getCurrentUser()

  if (currentUser) {
    const found = await Article.query()
      .eager('[tags, reactions.reactedBy, author]')
      .findFirst({...params,
        slug: ctx.params.slug
      })

    // Assert currentUser as author if article is not published yet.
    if (currentUser.isAdmin || (!found.isPublished && found.authorId === currentUser.id)) {
      ctx.body = found
      return
    }
  }
  /* mat Before show [end] */

  ctx.body = await Article.query()
    .applyFilter('default')
    .eager('[tags, reactions.reactedBy, author]')
    .findFirst({...params, slug: ctx.params.slug})
})

article.put('/:id/reaction', auth, async (ctx) => {
  const {Article} = ctx.state.models
  const {reaction} = ctx.request.body

  const article = await Article.query()
    .applyFilter('default')
    .findById(ctx.params.id)
    .eager('[tags, reactions.reactedBy, author]')

  if (!article) return

  const currentUser = await ctx.state.getCurrentUser()
  reaction['reactedById'] = currentUser.id

  const found = await article
    .$relatedQuery('reactions')
    .findFirst(reaction)

  // create if not exists.
  if (!found) {
    await article
      .$relatedQuery('reactions')
      .insert(reaction)
  }

  ctx.body = await article.$query()
    .eager('[tags, reactions.reactedBy, author]')
})

article.delete('/:id/reaction', auth, async (ctx) => {
  const {Article} = ctx.state.models
  const query = ctx.request.query

  const article = await Article.query()
    .applyFilter('default')
    .findById(ctx.params.id)
    .eager('[tags, reactions.reactedBy, author]')

  if (!article) return

  const currentUser = await ctx.state.getCurrentUser()
  query['reactedById'] = currentUser.id

  await article
    .$relatedQuery('reactions')
    .delete()
    .where(query)

  ctx.body = await article.$query()
    .eager('[tags, reactions.reactedBy, author]')
})
/* mat Custom actions [end] */

export default {
  routes: () => _.cloneDeep(article.routes()),
  register: (routers) => {
    /* mat Register [start] */
    /* mat Register [end] */
  }
}
