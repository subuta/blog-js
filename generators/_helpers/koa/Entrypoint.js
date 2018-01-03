/** @jsx h */

import { build, format, snippets as s } from 'bld.js'
import api from '../../../src/api'
import { PUBLIC_DIR } from '../../../config'

export default () => {
  const imports = s.import([
    ['koa', 'Koa'],
    ['../config', null, [
      'PUBLIC_DIR'
    ]],
    ['./api', 'api'],
    ['@koa/cors', 'cors'],
    ['koa-logger', 'logger'],
    ['koa-static', 'serve'],
  ])

  return build`
    ${imports}
    
    const app = new Koa()
    const PORT = process.env.PORT || 3000
    
    // log requests
    app.use(logger())
    
    // cors
    app.use(cors())
    
    // handle /api requests
    app.use(api.routes())
    
    app.use(api.allowedMethods())
    
    // otherwise PUBLIC_DIR
    app.use(serve(PUBLIC_DIR))
    
    if (!module.parent) {
      app.listen(PORT)
    }
    
    ${s.export('app')}
  `
}
