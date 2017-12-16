import Koa from 'koa'
import { PUBLIC_DIR } from '../config'

import sequelize from 'src/utils/sequelize'

import api from './api'

import cors from '@koa/cors'
import logger from 'koa-logger'
import serve from 'koa-static'
import koaBody from 'koa-body'

const app = new Koa()
export let port = process.env.PORT || 3000

// log requests
app.use(logger())

// parse body
app.use(koaBody({
  multipart: true
}))

// cors
app.use(cors())

// handle /api requests
app.use(api.routes())
app.use(api.allowedMethods())

// otherwise PUBLIC_DIR
app.use(serve(PUBLIC_DIR))

const server = app.listen(port)
port = server.address().port

export default app
