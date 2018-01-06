import { build, format, snippets as s } from 'bld.js'
import _ from 'lodash'
import pluralize from 'pluralize'

export default ({model, path = '/', method = 'get'}, children = []) => {
  const Model = _.upperFirst(pluralize.singular(model))
  const models = pluralize(model)

  return build`
    ${models}.${method}('${path}', async (ctx) => {
      const {${Model}} = ctx.state.models
      ${children}
    })
  ` + s.EOL // append EOL to each line.
}
