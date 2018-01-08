import { build, format, snippets as s } from 'bld.js'

export default async (ctx) => {
  const {filePath, fileName, fs} = ctx

  const imports = s.import([
    ['koa-router', 'Router'],
    ['lodash', '_'],
    ['koa-body', 'koaBody'],
    ['./middlewares/auth', 'auth', [
      'getCurrentUser'
    ]],
    ['./middlewares/models', 'models'],
    ['./Channels', 'Channels'],
    ['./Comments', 'Comments'],
    ['./Users', 'Users'],
    ['./Attachments', 'Attachments'],
  ])

  const data = build`
    ${imports}
   
    const api = new Router({
      prefix: '/api'
    })
    
    // register routers to api.
    const registerRouters = (routers) => {
      _.each(routers, (router, name) => {
        router.register && router.register(routers)
        api.use(\`/\$\{\_.snakeCase(name)\}\`, router.routes())
      })
    }
    
    // routers set before auth middleware will not be protected
    // parse body
    api.use(
      koaBody({
        multipart: true
      })
    )
    
    // set jwt middleware
    api.use(auth)
    
    // inject Objection.js models middleware.
    api.use(models)
    
    // inject getCurrentUser to state for ease of use.
    api.use(getCurrentUser)
    
    // routers set after auth middleware will be protected
    registerRouters(${s.raw({
      Channels: 'Channels',
      Comments: 'Comments',
      Attachments: 'Attachments',
      Users: 'Users',
    })})
    
    export default api

  `

  return fs.writeFile(`${filePath}/${fileName}`, format(data))
}
