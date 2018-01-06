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
      const {${model}} = ctx.request.body
      const {sub} = ctx.state.user
    
      // update specified ${model}.
      const params = {}
      
      /* mat Before update [start] */
      /* mat Before update [end] */
      
      ctx.body = await ${Model}
        .query()
        .update({
          ...${model},
          ...params
        })
        .where({id: ctx.params.id})
        .eager('${eager}')
    `
  )
}
