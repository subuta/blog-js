import { build, format, snippets as s } from 'bld.js'
import _ from 'lodash'
import pluralize from 'pluralize'

import Base from './routes/Base'

// route for user.
export default (props) => {
  let {
    model = 'user',
    config = {}
  } = props

  const {
    eager = '',
  } = config

  // Ensure naming convention.
  model = pluralize.singular(model)
  const Model = _.upperFirst(model)
  const models = pluralize(model)

  const Import = s.import([
    ['koa-router', 'Router'],
    ['lodash', '_'],
  ])

  const ShowRoute = Base(
    {model, path: '/me', method: 'get'},
    build`
      ctx.body = await ctx.state.getCurrentUser()
    `
  )

  const UpdateRoute = Base(
    {model, path: '/me', method: 'put'},
    build`
      const {${model}} = ctx.request.body
      const {sub} = ctx.state.user
    
      // findOrCreate specified user.
      // update id with current user in params if specified
      const params = {...${model}, auth0Id: sub}
      ctx.body = await ${Model}
        .query()
        .eager('${eager}')
        .findOrCreate({where: {auth0Id: sub}, defaults: params})
    `
  )

  return build`
    ${Import}
    
    const ${models} = new Router()
    
    ${ShowRoute}
    
    ${UpdateRoute}
    
    ${s.export(build`
      {
        routes: () => _.cloneDeep(${models}.routes()),
        register: (routers) => {
          /* mat Register [start] */
          /* mat Register [end] */
        }
      }
    `)}
  `
}
