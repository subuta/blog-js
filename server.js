import next from 'next'
import Koa from 'koa'
import Router from 'koa-router'
import cors from '@koa/cors'
import logger from 'koa-logger'
import serve from 'koa-static'
import 'zone.js'
import uuid from 'uuid/v4'

import routes from 'src/api/routes'

import { PUBLIC_DIR } from './config'

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({
  dev,
  dir: 'src/views'
})
const handle = app.getRequestHandler()

// Middleware for injecting req and uuid to current zone.
const withZone = async (ctx, next) => {
  const requestZone = Zone.current.fork({name: 'request'})
  await requestZone.run(async () => {
    // init zone at each request.
    Zone.current.req = ctx.req
    Zone.current.uuid = uuid()
    await next()
  })
}

app.prepare()
  .then(() => {
    const server = new Koa()
    const router = new Router()

    // apply withZone to next.js routes.
    router.use(withZone)

    router.get('/c/:id', async ctx => {
      const actualPage = '/channel'
      const queryParams = {id: ctx.params.id}
      await app.render(ctx.req, ctx.res, actualPage, queryParams)
      ctx.respond = false
    })

    router.get('/c', async ctx => {
      const actualPage = '/channels'
      await app.render(ctx.req, ctx.res, actualPage, ctx.query)
      ctx.respond = false
    })

    router.get('/w/:slug', async ctx => {
      const actualPage = '/article'
      const queryParams = {slug: ctx.params.slug}
      await app.render(ctx.req, ctx.res, actualPage, queryParams)
      ctx.respond = false
    })

    router.get('/w/:slug/edit', async ctx => {
      const actualPage = '/article'
      const queryParams = {slug: ctx.params.slug, edit: true}
      await app.render(ctx.req, ctx.res, actualPage, queryParams)
      ctx.respond = false
    })

    router.get('/w', async ctx => {
      const actualPage = '/articles'
      await app.render(ctx.req, ctx.res, actualPage, ctx.query)
      ctx.respond = false
    })

    router.get('*', async ctx => {
      await handle(ctx.req, ctx.res)
      ctx.respond = false
    })

    // log requests
    server.use(logger())

    // cors
    server.use(cors())

    // handle /api requests
    server.use(routes.routes())

    server.use(routes.allowedMethods())

    // otherwise PUBLIC_DIR
    server.use(serve(PUBLIC_DIR))

    server.use(async (ctx, next) => {
      ctx.res.statusCode = 200
      await next()
    })

    server.use(router.routes())

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })
