import { build, format, snippets as s } from 'bld.js'
import _ from 'lodash'
import pluralize from 'pluralize'

import IndexRoute from './IndexRoute'
import ShowRoute from './ShowRoute'
import CreateRoute from './CreateRoute'
import UpdateRoute from './UpdateRoute'
import DeleteRoute from './DeleteRoute'

const Routes = (props) => {
  const {
    model
  } = props

  const {
    only, // the routes will generated.
    except  // the routes will ignored.
  } = props.routes

  let routes = {
    'index': IndexRoute({model}),
    'show': ShowRoute({model}),
    'create': CreateRoute({model}),
    'update': UpdateRoute({model}),
    'delete': DeleteRoute({model})
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
