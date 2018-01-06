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
  } = props.config

  let routes = {
    'index': IndexRoute(props),
    'show': ShowRoute(props),
    'create': CreateRoute(props),
    'update': UpdateRoute(props),
    'delete': DeleteRoute(props)
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
    config
  } = props

  const {
    imports = []
  } = config

  // Ensure naming convention.
  model = pluralize.singular(model)
  const models = pluralize(model)

  const Import = s.import([
    ...imports,
    ['koa-router', 'Router'],
    ['lodash', '_'],
  ])

  return build`
    ${Import}
    
    const ${models} = new Router()
    
    ${Routes(props)}
    
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
