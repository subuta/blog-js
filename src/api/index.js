import Koa from 'koa'
import {PUBLIC_DIR} from '../../config'
import routes from './routes'

const app = new Koa()
const PORT = process.env.PORT || 3000

// log requests
app.use(logger())

// cors
app.use(cors())

// handle /api requests
app.use(routes.routes())

app.use(routes.allowedMethods())

// otherwise PUBLIC_DIR
app.use(serve(PUBLIC_DIR))

if (!module.parent) {
  app.listen(PORT)
}

export default app
