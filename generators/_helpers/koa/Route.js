import { build, format, snippets as s } from 'bld.js'
import _ from 'lodash'
import pluralize from 'pluralize'

const RouteBase = ({model, children = [], path = '/', method = 'get'}) => {
  const Model = _.upperFirst(pluralize.singular(model))

  return build`
    ${model}.post('/', async (ctx) => {
      const {${Model}} = ctx.state.models
    
      ${children}
    })
  `
}

const IndexRoute = (props) => {
  const {model} = props
  const Model = _.upperFirst(pluralize.singular(model))

  return build`
    ${RouteBase({
      ...props, 
      path: '/',
      children: build`
        const {${model}} = ctx.request.body
    
        let params = {}
      
        let response = await ${Model}.query()
          .insert({
            ...${model},
            ...params
          })
          .eager('')
      
        ctx.body = response
      `
    })}
  `
}

const Routes = (props) => {
  const {
    model
  } = props

  const {
    only, // the routes will generated.
    except  // the routes will ignored.
  } = props.routes

  let routes = {
    'index': IndexRoute({ model }),
    // 'show': <ShowRoute model={model} />,
    // 'create': <CreateRoute model={model} />,
    // 'update': <UpdateRoute model={model} />,
    // 'delete': <DeleteRoute model={model} />
  }

  if (only) {
    routes = _.pick(routes, only)
  } else if (except) {
    routes = _.omit(routes, except)
  }

  return _.values(routes)
}

export default (props) => {
  let {
    model,
    routes
  } = props

  // Ensure naming convention.
  model = pluralize.singular(model)
  const models = pluralize(model)

  const imports = s.import([
    ['koa-router', 'Router'],
    ['lodash', '_'],
  ])

  return build`
    ${imports}
    
    const ${model} = new Router()
    
    ${Routes(props)}
    
    ${s.export(build`
      {
        routes: () => _.cloneDeep(${model}.routes()),
        register: (routers) => {}
      }
    `)}
  `
}
