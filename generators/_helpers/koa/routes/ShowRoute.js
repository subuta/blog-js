import { build, format, snippets as s } from 'bld.js'
import _ from 'lodash'
import pluralize from 'pluralize'

import Base from './Base'

export default (props) => {
  let {model, config} = props
  const {
    eager = ''
  } = config
  const Model = _.upperFirst(pluralize.singular(model))

  return Base(
    {...props, path: '/:id'},
    build`
      let params = {}
      
      /* mat Before show [start] */
      /* mat Before show [end] */
    
      ctx.body = await ${Model}
        .query()
        .eager('${eager}')
        .findFirst({...params, id: ctx.params.id})
    `
  )
}
