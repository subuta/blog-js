import { build, format, snippets as s } from 'bld.js'
import _ from 'lodash'
import pluralize from 'pluralize'

import Base from './Base'

export default (props) => {
  let {model, config} = props
  const {
    eager = ''
  } = config
  model = pluralize.singular(model)
  const Model = _.upperFirst(model)

  return Base(
    {...props, path: '/:id', method: 'put'},
    build`
      const {${model} = ctx.request.body
      const {sub} = ctx.state.user
    
      // findOrCreate specified ${model}.
      const params = {...${model}}
      ctx.body = await ${Model}
        .query()
        .findOrCreate({where: {id: ctx.params.id}, defaults: params})
        .eager('${eager}')
    `
  )
}
