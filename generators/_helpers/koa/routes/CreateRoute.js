import { build, format, snippets as s } from 'bld.js'
import _ from 'lodash'
import pluralize from 'pluralize'

import Base from './Base'

export default (props) => {
  let {model} = props
  model = pluralize.singular(model)
  const Model = _.upperFirst(model)

  return Base(
    {...props, path: '/', method: 'post'},
    build`
      let params = {}
    
      let response = await ${Model}.query()
        .insert({
          ...${model},
          ...params
        })
        .eager('')
    
      ctx.body = response
    `
  )
}
