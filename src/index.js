import Koa from 'koa'

import { PUBLIC_DIR } from '../config'

import sequelize from 'src/utils/sequelize'

import api from './api'

import cors from '@koa/cors'
import logger from 'koa-logger'
import serve from 'koa-static'
import koaBody from 'koa-body'

const app = new Koa()

// log requests
app.use(logger())

// parse body
app.use(koaBody({
  multipart: true,
  formidable: {
    uploadDir: __dirname + '/uploads'
  }
}))

// cors
app.use(cors());

// handle /api requests
app.use(api.routes())
app.use(api.allowedMethods())

// otherwise PUBLIC_DIR
app.use(serve(PUBLIC_DIR));

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.')
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err)
//   })

app.listen(3000)
